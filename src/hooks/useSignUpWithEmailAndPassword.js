import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth"
import {auth, firestoredb} from "../firebase/firebase"
import { doc, setDoc } from "firebase/firestore";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/useAuthStore";

export function useSignUpWithEmailAndPassword() {
    const [createUserWithEmailandPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth)
    const showToast = useShowToast(); // custom hook created with a toast
    const loginUser = useAuthStore(state => state.login) // function from zustand from authStore


   async function signup (inputs){

        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
            showToast("Error", "Please fill in all fields", "error" ) //defining the custom hook with its parameters
            return
        } // If any of the input fields are empty then just return out of this function 

        try {
            const newUser = await createUserWithEmailandPassword (inputs.email, inputs.password)
            if(!newUser && error){
                showToast("Error", error.message, "error" ) //defining the custom hook with its parameters
                return;
            }

            if (newUser){ // If the user has succesfully signed up then a user doc is created like this one below
                const userDoc = {
                    uid:newUser.user.uid,
                    fullName:inputs.fullName,
                    username:inputs.username,
                    email:inputs.email,
                    bio:"",
                    profilePicURL:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt: Date.now()
                }
                await setDoc(doc(firestoredb, "users", newUser.user.uid), userDoc); //So we are creating a firebase document, need the firestoredb, users collection(name we are giving it), id of user and the user document we created.
                localStorage.setItem("user-info", JSON.stringify(userDoc)); //This creates a local storage of the user for us with a key being the "user-info" and then userDoc being the value
                loginUser(userDoc); // This is from zustand(useAuth file)
            }

        } catch (error){
        showToast("Error", error.message, "error") //defining the custom hook with its parameters

        }
    }

return {loading, error, signup}
}

