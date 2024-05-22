import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useShowToast } from "./useShowToast";
import { firestoredb } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export function useLikePost(post) {
    const showToast = useShowToast();
    const [isLiking, setIsLiking ] = useState(false); // is Updating state
    const authUser = useAuthStore((state)=> state.user);
    const [likes, setLikes] = useState(post.likes.length); // Likes are equal to the length of likes array for post
    const [isLiked, setisLiked] = useState(post.likes.includes(authUser?.uid)); // if authUser.uid is in the post.likes array then is liked is true
     
    async function handleLikePost (){
        if (isLiking) return;
        if(!authUser){
            return showToast("Error", "You must be logged in to like a toast", "error");
        }
        setIsLiking(true);

        try {
            const postRef = doc(firestoredb, "posts", post.id);
            await updateDoc(postRef,{
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)// If it has been liked we remove the user uid else we add it to likes array
            });
            setisLiked(!isLiked); // updating if post was liked or not
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1) // updating the number of likes if liked or not


        } catch (error) {
            showToast("Error", error.message, "error")
        } finally{
            setIsLiking(false);
            // setisLiked(true);
        }
    }
    return {isLiked, likes, handleLikePost}
}

