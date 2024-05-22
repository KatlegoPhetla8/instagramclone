import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { usePostStore } from "../store/usePostStore";
import { useUserProfileStore } from "../store/userProfileStore";
import { useShowToast } from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoredb } from "../firebase/firebase";

export function useGetFeedPosts() {
    const [isLoading, setIsLoading] = useState(true);
    const {posts, setPosts} = usePostStore();
    const authUser = useAuthStore((state) => state.user)
    const {setUserProfile} = useUserProfileStore();
    const showToast = useShowToast();

    useEffect(()=>{
        const getFeedPosts = async () =>{
            setIsLoading(true);
            if (authUser.following.length === 0){ // If the user is following no one then this code runs
                setIsLoading(false);
                setPosts([]);
                return
            }
            const q = query(collection(firestoredb, "posts"), where("createdBy", "in", authUser.following )) // This query will give us posts of users this user follows 

            try {
                const querySnapshot = await getDocs(q);
                const feedPosts = [];

              querySnapshot.forEach((doc)=>{
                feedPosts.push({id:doc.id, ...doc.data()})
              }) // This is how we push the feed posts into an array

              feedPosts.sort((a,b) => b.createdAt - a.createdAt); // sorting the posts in a way of crearedAt. So the ones created the latest are at the top
              setPosts(feedPosts);

            } catch (error) {
                showToast("Error", error.message, "error")

            }finally{
                setIsLoading(false)
            }
        }
        if (authUser){
            getFeedPosts(); // Function only runs if the authUser is authenticated
        }

    },[authUser, showToast, setPosts, setUserProfile ])
    return {isLoading, posts}
}
