import { Box, VStack, Image, Input, Button, Flex, Text} from "@chakra-ui/react"
import { useState } from "react"
import { Login } from "./Login";
import { Signup } from "./Signup";
import { GoogleAuth } from "./GoogleAuth";

export function AuthForm() {
  const [login, setLogin] = useState(true);

  return (
    <>
    <Box 
    border={"1px solid"} 
    borderRadius={4} 
    padding={5}>

        <VStack
        spacing={4}>

            {/*LOGIN INFORMATION */}
            <Image 
            src="/logo.png" 
            h={28} 
            cursor={"pointer"} 
            alt={"instagram text-logo"}/>
            
            {/*LOGIN OR SIGN UP INFORMATION. LINKS TO THE COMPONENTS OF LOGIN AND SIGNUP */}
            {login ? <Login/> : <Signup/>}


            {/* ----OR---- TEXT DIVIDE */}
          <Flex 
            alignItems={"center"} 
            justifyContent={"center"} 
            my={4} 
            gap={1} 
            w={"full"}>

              <Box 
              flex={2} 
              h={"1px"} 
              bg={"gray.400"} />

                <Text 
                mx={1} 
                color={"white"}>OR</Text>

              <Box 
              flex={2} 
              h={"1px"} 
              bg={"gray.400"}/>

          </Flex>

            {/*LOG IN WITH GOOGLE COMPONENT*/}
              <GoogleAuth prefix={login ? "Log in" : "Sign up"} />

        </VStack>
    </Box>
    
    {/* NOT SIGNED UP BOX */}
    <Box 
    border={"1px solid"} 
    borderRadius={4} 
    padding={5}>

      <Flex 
      alignItems={"center"} 
      justifyContent={"center"} 
      gap={1}>

      <Text>{login ? "Don't have an account?" : "Already have an account"} </Text>

      <Text 
      onClick={()=> setLogin(!login)} 
      color={"blue.500"} 
      cursor={"pointer"}> {login ? "Sign up" : "Log in"}</Text>

      </Flex>
    </Box>
    </>
  )
}

