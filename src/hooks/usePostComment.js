import { useState } from "react";
import {useShowToast} from "./useShowToast"
import {useAuthStore} from "../store/useAuthStore"
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { usePostStore } from "../store/usePostStore";
import { firestoredb } from "../firebase/firebase";

export function usePostComment() {
const [isCommenting, setIsCommenting] = useState(false);
const showToast = useShowToast();
const authUser = useAuthStore((state) => state.user);
const addComment = usePostStore((state) => state.addComment);

async function handlePostComment (postId, comment){
    if (isCommenting) return
    if(!authUser) return showToast("Error", "Please log in to comment", "error")
    setIsCommenting(true);

    const newComment = {
        comment: comment,
        createdBy: authUser.uid,
        postId: postId,
        createdAt: Date.now(),
    }

try {
  await updateDoc(doc(firestoredb, "posts", postId),{
    comments: arrayUnion(newComment) // updating the posts.comment document with the new data from newComment
  })
  
  addComment(postId, newComment); // this is what updates the comments in the UI.
    
} catch (error) {
    showToast("Error", error.message, "error")
} finally{
    setIsCommenting(false)
}
}
return {isCommenting, handlePostComment}
}

