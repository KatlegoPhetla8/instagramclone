import { useAuthStore } from "../store/useAuthStore";
import { useUserProfileStore } from "../store/userProfileStore";
import { useShowToast } from "./useShowToast";
import {firestoredb} from "../firebase/firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";


export function useFollowAndUnfollowUser(userId) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false); // Ckecks if we are currently following the user.
    const authUser = useAuthStore((state => state.user)); // Getting the authenticated user.
    const setAuthUser = useAuthStore((state => state.setUser))
    const {userProfile, setUserProfile} = useUserProfileStore();
    const showToast = useShowToast();

    async function handleFollowUser (){
        setIsUpdating(true);
        try {
            const currentUserRef = doc(firestoredb, "users",  authUser.uid);
            const userToFolloworUnfollowRef = doc(firestoredb, "users", userId);

            await updateDoc(currentUserRef,{
                following: isFollowing ?  arrayRemove(userId) : arrayUnion(userId) // So this object and function is saying the userId will be added or removed depending on if they are following or not.
            })

            await updateDoc(userToFolloworUnfollowRef,{
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            });

            if (isFollowing){
                // unfollow
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId) // We are removing the userId from user.
                })

                if (userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter (uid => uid !== authUser.id) // We are removing id of authenticated authUser.
                    })
                }
                   
                    localStorage.setItem("user-info", JSON.stringify({
                        ...authUser,
                    following: authUser.following.filter(uid => uid !== userId) //
                    })) // We are setting authUser to local storage because its the user we are holding as the authenticated user.

                    setIsFollowing(false)
                
            } else{
                //follow
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId] // When someone decides to follow the authUser. This is who is following authUser.
                });

            if (userProfile){
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, authUser.uid]
                })
            };
                

                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId] 
                }));
                setIsFollowing(true)

            }



        } catch (error) {
            showToast("Error", error.message, "error")
        } finally{
            setIsUpdating(false);
        }
    }
    
    useEffect(()=>{
        if (authUser){
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing)
        }
    },[authUser, userId]) // This useEffect will run whenever the authUser changes or userId changes.
    return {isUpdating, isFollowing, handleFollowUser }
}

