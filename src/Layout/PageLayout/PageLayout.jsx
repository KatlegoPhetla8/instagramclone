import React from 'react'
import { Box, Flex, Spinner } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { Navbar } from '../../components/Navbar/Navbar';

export function PageLayout({children}) {

    const {pathname} = useLocation();
    const [user, loading] = useAuthState(auth) // Checking if the user is logged in, we are using it below 
    const canRenderSideBar = pathname !== "/auth" && user // If pathname is not !== to auth and user is not logged in then sidebar will not show.
    const canRenderNavbar = !user && !loading && pathname !== "/auth";
    
    const checkUserAuth = !user && loading;
    if(checkUserAuth){
      return <PageLayoutSpinner/>
    }

    // PageLayout component is visible in every page except the /auth page. So if pathname is equal to /auth it won't show the sidebar.
  return (
  <Flex flexDir={canRenderNavbar ? "column" : "row"} >
        {/* sidebar on the left */}
        {/*If the path is on the /auth page this will not be displayed */}

        {canRenderSideBar && 
      <Box w={{base : "70px", md: "240px"}}>
        <Sidebar/>
      </Box>}

      {canRenderNavbar ? <Navbar/> : null}

        {/* content on the right */}
        <Box 
        flex={1} 
        w={{base: "calc(100% - 70px)", md: "calc(100% - 240px)"}} mx={"auto"} >
            {children}
        </Box>
  </Flex>
  )
}

function PageLayoutSpinner (){
  return(
    <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  )
}