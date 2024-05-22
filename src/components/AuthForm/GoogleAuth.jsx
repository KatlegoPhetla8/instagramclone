import { Text, Image, Flex } from "@chakra-ui/react"
import { auth, firestoredb } from "../../firebase/firebase"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { useShowToast } from "../../hooks/useShowToast";
import { useAuthStore } from "../../store/useAuthStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export function GoogleAuth({prefix}) {
  const [signInwWithGoogle, user, loading, error ] =  useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

    async function handleGoogleAuth (){
      try {
        const newUser = await signInwWithGoogle();

        if (!user && error){
          showToast("Error", error.message, "error")
        }

        // Checking if the user logging in exists
        const userRef = doc(firestoredb, "users", newUser.user.uid );
        const userSnap = await getDoc(userRef);

        //LOGGING IN
        if (userSnap.exists()){
          const userDoc = userSnap.data();
          localStorage.setItem("user-info", JSON.stringify(userDoc));
          loginUser(userDoc)
        } else{

          // SIGNING UP
          const userDoc = {
            uid:newUser.user.uid,
            fullName:newUser.user.displayName, // This gets the name from the Google account
            username:newUser.user.email.split("@")[0], // This split will return the username as the name from the @ going backwards.
            email:newUser.user.email, 
            bio:"",
            profilePicURL:newUser.user.photoURL, // This will get the profile pic of the user
            followers:[],
            following:[],
            posts:[],
            createdAt: Date.now()
        }
        
        console.log(newUser, newUser.user)
          await setDoc(doc(firestoredb, "users", newUser.user.uid), userDoc); //So we are creating a firebase document, need the firestoredb, users collection(name we are giving it), id of user and the user document we created.
                localStorage.setItem("user-info", JSON.stringify(userDoc)); //This creates a local storage of the user for us with a key being the "user-info" and then userDoc being the value
                loginUser(userDoc); // This is from zustand(useAuth file)
        }

      } catch (error) {
        showToast("Error", error.message, "error")
      }
    }


  return (
    <>

      {/*LOG IN WITH GOOGLE FLEX */}
      <Flex 
      alignItems={"center"} 
      justifyContent={"center"} 
      gap={1} cursor={"pointer"}
      onClick={handleGoogleAuth}>

        <Image src="/google.png" w={5} alt="Google Logo"/>
            <Text
            mx={2}
            color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
     
    </>
  )
}

