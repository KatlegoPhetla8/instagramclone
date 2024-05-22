import { Box, Flex, Link, Tooltip, Button } from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom"
import { InstagramLogo, InstagramMobileLogo} from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../../hooks/useLogout";
import { SidebarItems } from "./SidebarItems";

export function Sidebar() {
  const {handleLogout, isLoggingOut} = useLogout()

  // Exporting icons from assets and React Icons to use as display

  
  return (
<Box 
    height={"100vh"} 
    borderRight={"1px solid"} 
    borderColor={"whiteAlpha.300"} 
    py={8} 
    position={"sticky"} 
    top={0} 
    bottom={0} 
    px={{base: "2", md:"4"}}>
    
  <Flex 
    direction={"column"} 
    gap={10} w={"full"}
    height={"full"}>
        
        {/*---This code display Instagram text logo when size is bigger than mobile--- */}
        <Link 
        to={"/"} 
        as={RouterLink} 
        pl={2} 
        display={{base:"none", md:"block"}} 
        cursor={"pointer"}>

          <InstagramLogo/> {/*Imported from the constants. They are Svg images */}

        </Link>

        {/*---This code display Instagram logo when display is mobile size--- */}
        <Link 
        to={"/"} 
        as={RouterLink} 
        p={2} 
        display={{base:"block", md:"none"}}
        cursor={"pointer"} 
        borderRadius={6} 
        _hover={{bg:"whiteAlpha.200"}} w={{base:10}} >

        <InstagramMobileLogo/> {/*Imported from the constants. They are Svg images */}

        </Link>

        {/*---Dispalying the icons on the side of the page, we are mapping them for the sidebarItems array.--- */}
      <Flex 
      direction={"column"} 
      gap={5} 
      cursor={"pointer"}>
        <SidebarItems/>
      </Flex>
      
    <Tooltip 
      hasArrow label={"Log out"} 
      placement="right" ml={1} 
      openDelay={500} 
      display={{base:"block", md:"none"}} >


        {/*lOGOUT */}
      <Flex 
        marginTop={"auto"} 
        alignItems={"center"} 
        gap={4}  
        _hover={{bg: "whiteAlpha.400"}} 
        borderRadius={6} p={2} 
        w={{base: 10, md:"full"}} 
        justifyContent={{base:"center", md:"flex-start"}} >

          <BiLogOut size={25}/>

          <Button
          onClick={handleLogout}
          display={{base:"none", md:"block"}}
          variant={"ghost"}
          _hover={{bg:"transparent"}}
          isLoading={isLoggingOut}>
            Log out
          </Button>

      </Flex>
    </Tooltip>
  </Flex>
</Box>
  )
}

