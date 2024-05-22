import { useEffect, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import { useShowToast } from "./useShowToast";
import { useUserProfileStore } from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoredb } from "../firebase/firebase";


export function useGetUserPosts() {
 const [isLoading, setIsLoading] = useState(true);
 const {posts, setPosts} = usePostStore();
 const showToast = useShowToast();
 const userProfile = useUserProfileStore((state) => state.userProfile);


 useEffect(()=> {
    async function getPosts (){
        if (!userProfile) return
        setIsLoading(true);
        setPosts([]);

        try {
            const q = query(collection(firestoredb, "posts"), where("createdBy", "==", userProfile.uid))
            const querySnapshot = await getDocs(q);
            
            const posts = [];

            querySnapshot.forEach((doc)=>{
                posts.push({...doc.data(), id:doc.id}) // We are adding the id so we don't get a ket error when we using some jsx <div key={post.id} ></div>
            })

            posts.sort((a,b) => b.createdAt - a.createdAt); // This code sort its so the latest post is at the top.
            setPosts(posts);
            
        } catch (error) {
            showToast("Error", error.message, "error")
            setPosts([]);
        } finally{
            setIsLoading(false)
        }
    }

    getPosts();
    
 },[setPosts, userProfile, showToast])
 return {isLoading, posts}
}

