import { create } from "zustand"

export const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({userProfile}),
    
    // this is used to update the number of posts in the profile page. The state is the userProfile
    addPost: (post) => set(state => ({
        userProfile: {...state.userProfile, posts:[post.id, ...state.userProfile.posts]}
    })),

    deletePost : (postId) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: state.userProfile.posts.filter((id) => id !== postId)
        },
    })) // deletes the state from the UI where it shows how many posts
    
}))

