import {Container, Text} from "@chakra-ui/react"
import { FeedPost } from "./FeedPost"
import {VStack, Box, Flex, Skeleton, SkeletonCircle} from "@chakra-ui/react"
import { useGetFeedPosts } from "../../hooks/useGetFeedPosts";

export function FeedPosts() {
const {isLoading, posts} = useGetFeedPosts();
  return (
  <Container 
    maxW={"container.sm"} 
    py={10} 
    px={2}>

      {/* The map below is mapping the amount of skeletons it must show or amount of loading parts */}
      {isLoading && [0,1,2].map((_,idx) => ( 

      <VStack 
        key={idx} 
        gap={4} 
        alignItems={"flex-start"} 
        mb={10}>

        <Flex 
          gap={2}>
          {/* The skeletonCirlce shows the skeleton loading for the picture in the corner*/}
          <SkeletonCircle
          size='10' />

          {/* VStack represents 2 skeleton loading parts */}
          <VStack 
          gap={2} 
          alignItems={"flex-start"} >

            <Skeleton 
            height={'10px'} 
            width={"200px"} />

            <Skeleton 
            height={'10px'} 
            width={"100px"} />

          </VStack>
        </Flex>

          {/* This skeleton shows the big skeleton loading for the main picture*/}
          <Skeleton 
          w={"full"}>
            <Box 
            height={"400px"} >contents wrapped</Box>

          </Skeleton>

      </VStack>
      ))}


    {!isLoading && posts.length > 0 &&
    posts.map((post)=> <FeedPost post={post} key={post.id} />)}

    {!isLoading && posts.length === 0 && <Text fontSize={"xl"} color={"red.400"} > You are not following any users</Text>}

     
  </Container>
  )
}

