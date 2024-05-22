import { create } from "zustand";

export const usePostStore = create ((set) => ({
    posts:[],
    createPost: (post) => set(state => ({posts:[post,...state.posts]})), // posts takes the new posts and puts it at the top and the spread operator takes brings the previous posts.
    deletePost: (id) => set((state)=> ({posts: state.posts.filter(post => post.id !== id)})),
    addComment: (postId, comment) => set((state)=> ({
        posts: state.posts.map((post) =>{
            if (post.id === postId){ // Once we find the post we are commenting we map through and display the comments and add the latest comment
                return {
                    ...post,
                    comments: [...post.comments, comment] // comment is the latest comment, ...post.comments are the comments that a;ready exist
                }
            }
            return post
        })
    })),
    
    setPosts: (posts) => set({posts}),
}));

