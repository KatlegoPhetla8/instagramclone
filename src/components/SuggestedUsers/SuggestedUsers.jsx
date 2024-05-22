import {VStack, Flex, Text, Box, Link} from "@chakra-ui/react"
import { SuggestedHeader } from "./SuggestedHeader"
import {SuggestedUser} from "./SuggestedUser"
import { useGetSuggestedUsers } from "../../hooks/useGetSuggestedUsers"

export function SuggestedUsers() {
  const {isLoading, suggestedUsers} = useGetSuggestedUsers();
  
  // optional render skeleton for loading
  if(isLoading){
    return null
  }

  return (
<VStack py={8} px={6} gap={4} >
        
    <SuggestedHeader/>

    {/*If there are not users in the suggested users array then this header wont be displayed */}
    {suggestedUsers.length !== 0 && (
            <Flex 
            justifyContent={"space-between"} 
            alignItems={"center"} 
            w={"full"} >
      
              <Text 
              color={"gray.500"} 
              fontWeight={"bold"} 
              fontSize={14} >
                Suggested User
              </Text>
      
              <Text 
              fontSize={14} 
              fontWeight={"bold"} 
              _hover={{color:"gray.400"}} 
              cursor={"pointer"}>
                See All
              </Text>
      
            </Flex>
    )}



      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))} {/*MAPPING EACH SUGGESTED USER TO THE PAGE */}


    <Box 
      fontSize={14} 
      color={"gray.500"} 
      mt={5} 
      alignSelf={"flex-start"} >

      © 2024 Built By {" "}
      <Link 
      href="https://github.com/KatlegoPhetla8?tab=repositories" 
      target="_blank" 
      color={"blue.500"} 
      fontSize={14} >
        Katlego
      </Link>

    </Box>
</VStack>
  )
}