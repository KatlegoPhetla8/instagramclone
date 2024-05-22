import  { useState } from 'react'
import { useShowToast } from './useShowToast';
import { firestoredb } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export function useSearchUser() {
const [isLoading, setIsLoading] = useState(false);
const [user,setUser] = useState(null);
const showToast = useShowToast();

async function getUserProfile (username){
    setIsLoading(true);
    setUser(null); // While a user is being searched and it shows the loading the compoent below is empty
    try {
        const q = query(collection(firestoredb,"users"), where("username" ,"==", username)); // query gets use the username where it is equal to the username we are looking for.

        const querySnapshot = await getDocs(q); // We are getting the doc into a snapshot
        if (querySnapshot.empty) return showToast("Error", "User not found", "error")

            querySnapshot.forEach((doc)=>{
                setUser(doc.data())
            }) // username is now set to setUser/user

    } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null)
    } finally{
        setIsLoading(false)
    }
}
return {isLoading, getUserProfile, user, setUser }

}

