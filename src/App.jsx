import {HomePage} from "./pages/Home/HomePage"
import { Authorisation } from "./pages/Auth/Auth"
import { Routes, Route, Navigate } from "react-router-dom"
import { PageLayout } from "./Layout/PageLayout/PageLayout"
import { Profile } from "./pages/Profile/Profile"
import { useAuthStore } from "./store/useAuthStore"

function App() {
  const authUser = useAuthStore((state) => state.user) // We are getting the authenticated user from authStore(zustand)
  return (
    
    <PageLayout> {/* Component called page layout that's been imported */}
      <Routes>

        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/auth"/>}/>
        <Route path="/auth" element={!authUser ? <Authorisation/> : <Navigate to="/"/>}/>
        <Route path="/:username" element={<Profile/>}/>

      </Routes>

    </PageLayout>
  )
}

export default App