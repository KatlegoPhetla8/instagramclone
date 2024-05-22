import React from 'react'
import {Flex, Avatar, Box, Text, SkeletonCircle, Skeleton, Button} from "@chakra-ui/react"
import { BiPackage } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useFollowAndUnfollowUser } from '../../hooks/useFollowAndUnfollowUser'
import { timeAgo } from '../../utils/timeAgo'

export function PostHeader({post, creatorProfile}) {
  const {isUpdating,isFollowing, handleFollowUser} = useFollowAndUnfollowUser(post.createdBy) // Id of this user will go back to the parameter of this custom hook
  
  return (
  <Flex  
    justifyContent={"space-between"} 
    alignItems={"center"} 
    w={"full"} 
    my={2}>

    <Flex 
      alignItems={"center"} 
      gap={2}>

      {creatorProfile ? (
        <Link to={`/${creatorProfile.username}`} >  
        <Avatar 
        src={creatorProfile?.profilePicURL} 
        alt={" user profile pic"} 
        size={"sm"} 
        cursor={"pointer"}/>
        </Link>  
      ) 

      :(
          <SkeletonCircle size={"10"} />
        )}
        
        {creatorProfile ? (<Link to={`/${creatorProfile.username}`} >
          <Flex 
        fontSize={"12px"} 
        fontWeight={"bold"} 
        gap={2} 
        cursor={"pointer"}>
            {creatorProfile.username}

          </Flex>
        </Link>)

         :(
          <Skeleton w={"100px"} h={"10px"}  />
        )}
        
            <Box color={"gray.500"}>
            • {timeAgo(post.createdAt)}
            </Box>
      </Flex>

        <Box 
        cursor={"pointer"} >

          <Button 
          size={"xs"}
          bg={"transparent"}
          fontSize={12} 
          color={"blue.500"} 
          fontWeight={"bold"} 
          _hover={{color: "white"}} 
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
          isLoading={isUpdating} >
          {isFollowing ? "Unfollow" : "Follow"}
          </Button>
          
        </Box>
        
  </Flex>
  )
}

