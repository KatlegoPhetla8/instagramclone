import { useEffect, useState } from "react";
import { useShowToast } from "./useShowToast";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestoredb } from "../firebase/firebase";

export function useGetUserProfileById(userId) {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    const showToast = useShowToast();

    useEffect (()=>{
        async function getUserProfile (){
            setIsLoading(true);
            setUserProfile(null);

            try {
                // const q = query(collection(firestoredb, "users", where("uid", "==", "userId")));
                // const querySnapshot = await getDocs(q);

                const userRef = await getDoc(doc(firestoredb, "users", userId));
                if (userRef.exists()){
                    setUserProfile(userRef.data())
                }

            } catch (error) {
                showToast("Error", error.message, "error")
            }finally{
               setIsLoading(false) 
            }
        };
        getUserProfile();
    },[showToast, setUserProfile, userId])
    
    return {isLoading, userProfile, setUserProfile}
}

