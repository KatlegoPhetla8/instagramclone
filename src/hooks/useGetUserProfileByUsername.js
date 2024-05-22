import { useState, useEffect } from "react";
import {useShowToast} from "./useShowToast"
import { collection , where, query, getDocs} from "firebase/firestore";
import { firestoredb} from "../firebase/firebase";
import { useUserProfileStore } from "../store/userProfileStore";

export function useGetUserProfileByUsername(username) {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const {userProfile, setUserProfile} = useUserProfileStore();

    useEffect(()=>{
        async function getUserProfile (){
            setIsLoading(true); // Loading is true because we are now retrieving the data from the db
            
            try {
                const q = query(collection(firestoredb, "users"), where("username", "==", username)) // We are retrieving the username from the firestoredb in the "users" collection.
                const querySnapShot = await getDocs(q);

                if(querySnapShot.empty) return setUserProfile(null); // If there is no user in the snapshot then user is null.

                // So the code below is if the querySnapShot has a user.
                let userDoc;
                querySnapShot.forEach((doc)=>{
                    userDoc = doc.data();
                });
                
                setUserProfile(userDoc);

            } catch (error) {
               showToast("Error", error.message, "error") 
            } finally{
                setIsLoading(false)
            }
        };

        getUserProfile();
    }, [setUserProfile, username, showToast]);

    return {isLoading, userProfile}
};

