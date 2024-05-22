import { useSignOut} from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase";
import { useShowToast } from "./useShowToast";
import { useAuthStore } from "../store/useAuthStore";

export function useLogout() {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const showToast = useShowToast;
    const logoutUser = useAuthStore((state) => state.logout) // function from zustand from authStore, basically getting the function from useAuthStore object we created at authStore

   async function handleLogout (){

    // This async function with try cathc is loggin the user out using useSignOut hook as well
     try {
        await signOut();
        localStorage.removeItem("user-info"); // Removes the user from the local storage
        logoutUser();

     } catch(error){
        showToast("Error", error.message, "error")
     }
    }

  return {handleLogout, error, isLoggingOut}
}

