import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useAuthStore } from "../store/useAuthStore";
import { useShowToast } from "./useShowToast";
import { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import {firestoredb,storage} from "../firebase/firebase"
import { useUserProfileStore } from "../store/userProfileStore";

export function useEditProfile() {
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser); //Does same thing as login function from useAuthStore. Just makes it more visible for us that is updates this state.
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile); // Updating the user profile.
    const showToast = useShowToast();
    const [isUpdating, setIsUpdating] = useState(false);
    

    async function editProfile (inputs,selectedFile){
        if (isUpdating || !authUser) return

        setIsUpdating(true) // if it is being updated then we set to true.

        const storageRef = ref(storage, `profilePics/${authUser.uid}`) // The profilePics/${authUser.uid} is the path
        const userDocRef = doc(firestoredb, "users", authUser.uid) // This holds user doc ref for this user.

        let URL = "";
        try {
            if (selectedFile){
                await uploadString(storageRef, selectedFile, "data_url"); // This is where the picture has not been uploaded.
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`)); // This gets the url of the image
            }

            // This is for when you have updated the user or are updating it.
            const updatedUser = {
                ...authUser, // So we dont override the other data in authUser.
                fullName: inputs.fullName || authUser.fullName,
                username :inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL
            }

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser)) // Updating the localStorage with the updatedUser
            setAuthUser(updatedUser); // We do this by making sure every state is in sync and update.
            setUserProfile(updatedUser); // We do this by making sure every state is in sync and update.
            showToast('Success', "Profile updated successfully", "success")

        } catch (error){
            showToast("Error", error.message, "error")
        }
    }
    return {editProfile, isUpdating}
}

