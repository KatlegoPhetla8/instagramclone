import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useShowToast } from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestoredb } from "../firebase/firebase";


export function useGetSuggestedUsers() {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const authUser = useAuthStore((state)=> state.user);
    const showToast = useShowToast();

    useEffect(()=>{
       async function getSuggestedUsers (){ // function only runs if user is authenticated/ logged in.
        setIsLoading(true);
        try {
            const usersRef = collection(firestoredb, "users");
            const q = query(usersRef, // query usersRef
                where("uid", "not-in",[authUser.uid, ...authUser.following]), // where the uid is not equal to the authUser and where people you already follow wont be suggested. Also we using the spread operator to get them one by one and not nested.
                orderBy("uid"), // order in the way of uid, no other fields will be included.
                limit(3)); // limit to a number of 3 suggested users

                const querySnapshot = await getDocs(q);
                const users = [];
                
                querySnapshot.forEach((doc)=>{
                    users.push({...doc.data(), id: doc.id}) // pushing all the users who will be reccommended to the users array. Also its a object so when we map it in react we dont get key errors.
                });

                setSuggestedUsers(users);

             
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally{
            setIsLoading(false);
        }
        }

        if (authUser){
            getSuggestedUsers();
        }
    },[authUser, showToast])

    return {isLoading, suggestedUsers}
}

