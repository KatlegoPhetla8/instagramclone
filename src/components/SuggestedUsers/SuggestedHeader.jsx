import {Flex, Avatar, Text, Button} from "@chakra-ui/react"
import { useLogout } from "../../hooks/useLogout"
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";

export function SuggestedHeader() {

  const {handleLogout, isLoggingOut} = useLogout();
  const authUser = useAuthStore((state) => state.user) // Getting the auth user details of the user logged in.
  return (

    <Flex 
    justifyContent={"space-between"} 
    alignItems={"center"} 
    w={"full"} >
    
        <Flex 
        alignItems={"center"} 
        gap={2}>
    
            <Link to={authUser.username} >
            <Avatar 
            size={"lg"} 
            src={authUser.profilePicURL} />
            </Link>

            <Link to={authUser.username} >
            <Text 
            fontSize={14} 
            fontWeight={"bold"} >
              {authUser.username}
            </Text>
            </Link>

        </Flex>
    
        <Button 
        size={"xs"}
        background={"transparent"}
        _hover={{background:"transparent"}}
        fontSize={14} 
        fontWeight={"medium"} 
        color={"blue.400"} 
        cursor={"pointer"}
        onClick={handleLogout}
        isLoading={isLoggingOut} >
          Log out
        </Button>

    </Flex>
  )
}

