import { Avatar, AvatarGroup, Flex, VStack, Text, Button, useDisclosure } from "@chakra-ui/react";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useAuthStore } from "../../store/useAuthStore";
import { EditProfile } from "./EditProfile";
import { useFollowAndUnfollowUser } from "../../hooks/useFollowAndUnfollowUser";

export function ProfileHeader() {
  const {userProfile} = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const {isUpdating, isFollowing, handleFollowUser } = useFollowAndUnfollowUser(userProfile?.uid); //userProfile and authUser are different users.

  const visitingOwnProfileAuth = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAuth = authUser && authUser.username !== userProfile.username;
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
  <Flex 
    gap={{base:4, sm:10}} 
    py={10} 
    direction={{base:"column", sm:"row"}} >
      
      <AvatarGroup 
      size={{base:"xl", md:"2xl" }} 
      justifySelf={"center"} 
      alignSelf={"flex-start"} 
      mx={"auto"} >
        <Avatar 
        src={userProfile.profilePicURL} 
        alt="As a Programmer logo" />

      </AvatarGroup>

    <VStack 
      alignItems={"start"} 
      gap={2} 
      mx={"auto"} 
      flex={1} >
      
      <Flex 
      gap={4} 
      direction={{base:"column", sm:"row"}} 
      justifyContent={{base:"center", sm:"flex-start"}} 
      alignItems={"center"} 
      w={"full"}>
          
          <Text 
          fontSize={{base:"sm", md:"lg"}} >
            {userProfile.username}
          </Text>

        {/*If user visiting their own profile then it shows the edit button */}
        {visitingOwnProfileAuth &&
        <Flex 
        gap={4} 
        alignItems={"center"} 
        justifyContent={"center"} >

          <Button 
          bg={"white"} 
          color={"black"} 
          _hover={{bg:"whiteAlpha.800"}} 
          size={{base:"xs", md:"sm"}}
          onClick={onOpen}>
            Edit Profile
          </Button>

        </Flex> }

        {visitingAnotherProfileAuth &&
        <Flex 
        gap={4} 
        alignItems={"center"} 
        justifyContent={"center"} >

          <Button 
          bg={"blue.500"} 
          color={"white"} 
          _hover={{bg:"blue.600"}} 
          size={{base:"xs", md:"sm"}}
          onClick={handleFollowUser} 
          isLoading={isUpdating}>
            {isFollowing ? "Unfolllow" : "Follow"}
          </Button>

        </Flex> }
        
      </Flex>

        <Flex 
        alignItems={"center"} 
        gap={{base:2, sm:4}} >

          <Text 
          cursor={"pointer"} 
          fontSize={{base:"xs", md:"sm"}} >

            <Text 
            as={"span"} 
            fontWeight={"bold"} 
            mr={1} >{userProfile.posts.length}</Text>
            Posts
            </Text>

            <Text 
            cursor={"pointer"} 
            fontSize={{base:"xs", md:"sm"}} >

                <Text 
                as={"span"} 
                fontWeight={"bold"} 
                mr={1} >
                {userProfile.followers.length}
                </Text>

              Followers
              </Text>

              <Text 
              cursor={"pointer"} 
              fontSize={{base:"xs", md:"sm"}}>

                <Text 
                as={"span"} 
                fontWeight={"bold"} 
                mr={1} >
                  {userProfile.following.length}
                </Text>

              Following
              </Text>
        </Flex>

        <Flex  
        alignItems={"center"} 
        gap={4} >

          <Text 
          fontSize={"sm"} 
          fontWeight={"bold"}>
          {userProfile.fullName}
          </Text>

        </Flex>

        <Flex  
        alignItems={"center"} 
        gap={4} >

          <Text 
          fontSize={"sm"}>
            {userProfile.bio}
          </Text>

        </Flex>

    </VStack>
    {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
  </Flex>
  )
}

