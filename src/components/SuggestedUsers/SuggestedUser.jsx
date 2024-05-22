import {Flex, Button, Avatar, VStack, Box} from "@chakra-ui/react"
import { useFollowAndUnfollowUser } from "../../hooks/useFollowAndUnfollowUser"
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";

export function SuggestedUser({user, setUser}) {
const {isUpdating, isFollowing,handleFollowUser} = useFollowAndUnfollowUser(user.uid); 
const authUser = useAuthStore((state) => state.user);

async function onFollowUser (){
  await handleFollowUser();

  {/* If the user is already following then we filter out the authorised user from the follower list otherwise we add them*/}
  setUser({
    ...user,
    followers: isFollowing ? user.followers.filter((follower) => follower.uid !== authUser.uid) : [...user.followers, authUser] 
  })
}

  return (
    <Flex 
    justifyContent={"space-between"} 
    alignItems={"center"} 
    w={"full"} >
      
      <Flex 
      alignItems={"center"} 
      gap={2} >
        
        <Link to={`/${user?.username}`} >
        <Avatar 
        src={user.profilePicURL} 
        size={"md"} />
        </Link>
        
        <VStack 
        spacing={2} >
          
          <Link to={`/${user?.username}`} >
          <Box 
          fontSize={14} 
          fontWeight={"bold"} >
            {user.fullName}
          </Box>
          </Link>

          <Box 
          alignSelf={"start"} 
          fontSize={12}
          color={"gray.500"} >
            {user.followers.length} followers
          </Box>

        </VStack>
      </Flex>

    {/*If authorised user is not equal to the user being search then show the follow or unfollow button otherwise dont show it */}
    {authUser.uid  !== user.uid &&
    <Button 
    onClick={onFollowUser} 
    bg={"transparent"} 
    fontSize={14} 
    p={0} 
    h={"max-content"} 
    fontWeight={"medium"} 
    cursor={"pointer"} 
    _hover={{color:"white"}} 
    color={"blue.400"}
    isLoading={isUpdating}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button> }
      
      
    </Flex>
  )
}

