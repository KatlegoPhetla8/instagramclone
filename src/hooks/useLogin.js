import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestoredb } from "../firebase/firebase";
import { useShowToast } from "./useShowToast"
import { useAuthStore } from "../store/useAuthStore";
import { doc, getDoc } from "firebase/firestore";

export function useLogin() {
    const showToast = useShowToast();
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth) // The , , is needed before loading if you remove the user property. It does not work properly if you remove user and don't put  , ,.
    const loginUser = useAuthStore((state) => state.login)
    
    async function login (inputs){
        // Checks if the fields are empty then returns an error
        if(!inputs.email || !inputs.password){
            return showToast("Error", "Please fill in all the fields", "error")
        }

        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password); // Checking if email and password is correct for login
            
            if (userCred){
                // This is how we would retrieve data for a user in firestore

                const docRef = doc(firestoredb, "users", userCred.user.uid); // Getting the reference. From firestoredb and "users" collection
                const docSnap = await getDoc(docRef); // Getting the document snap. This gives us the user that is logged in.
                localStorage.setItem("user-info", JSON.stringify(docSnap.data())); // the data() method gives us the data of this user.
                loginUser(docSnap.data()) // This sets the user to an active user. It goes back to the useAuthStore object with the login function.
            }

        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }
    return {loading,error,login}
}