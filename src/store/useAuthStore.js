import {create} from "zustand";

export const useAuthStore = create((set) =>({
    user:JSON.parse(localStorage.getItem("user-info")), // This is the state and then the login, logout and setUser are the functions that manipulate this state. Also if its in the local storage it then stores the uses info even when the page refreshes.
    login: (user) => set({user}),
    logout: ()=> set({user:null}), // By setting user null it delete's the "user-info" thus setting the user to null and when the user is null it sends us to the Auth page
    setUser: (user) => set({user})
}))