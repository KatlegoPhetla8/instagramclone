import { Container, Flex, Text, Link, SkeletonCircle, VStack, Skeleton } from "@chakra-ui/react";
import {ProfileHeader} from "../../components/ProfileComponents/ProfileHeader"
import {ProfileTabs} from "../../components/ProfileComponents/ProfileTabs"
import {ProfilePosts} from "../../components/ProfileComponents/ProfilePosts"
import { useParams } from "react-router-dom";
import {Link as RouterLink} from "react-router-dom"
import {useGetUserProfileByUsername} from "../../hooks/useGetUserProfileByUsername"

export function Profile() {
  const {username} = useParams(); // This is so when we go to the profile of eg localhost:5173/johndoe the username becomes johndoe. This is linked to the profile component in App.jsx component.
  const {isLoading, userProfile} = useGetUserProfileByUsername(username);
  
  const userNotFound = !isLoading && !userProfile;
  if(userNotFound){
    return <UserNotFound/> // This component is at the bottom of this page
  }

  return (
  <Container 
    maxW="container.lg"
    py={5} >

      <Flex 
      py={10} 
      px={4} 
      pl={{base: 4, md: 10}} 
      w={"full"} 
      mx={"auto"} 
      flexDirection={"column"} >

      {!isLoading && userProfile && <ProfileHeader/>}
      {isLoading && <ProfileHeaderSkeleton/>}
        

      </Flex>
      
      <Flex 
      px={{base:2, sm:4}}
       maxW={"full"} 
       mx={"auto"}
      borderTop={"1px solid"} 
      borderColor={"whiteAlpha.300"} 
      flexDirection={"column"} >

        <ProfileTabs/>
        <ProfilePosts/>

      </Flex>
  </Container>
  )
}

const ProfileHeaderSkeleton = () =>{
  return  (
    <Flex 
    gap={{base:4, sm:10}}
    py={10}
    direction={{base: "column", sm:"row"}}
    justifyContent={"center"}
    align-items={"center"}>
      <SkeletonCircle size="24" />

      <VStack 
      alignItems={{base:"center", sm:"flex-start"}} 
      gap={2} 
      mx={"auto"} 
      flex={1} >

        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />

      </VStack>
    </Flex>
  )
}


const UserNotFound = () =>{
  return(
    <Flex  flexDirection={"column"} textAlign={"center"} mx={"auto"}>
    <Text fontSize={"2xl"} >
      User Not Found
    </Text>

    <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"} >
    Go Home 
    </Link>

  </Flex>
  ) 
}
