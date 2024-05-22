import { Grid, Skeleton, VStack, Box, Flex, Text } from "@chakra-ui/react"
import {ProfilePost} from "./ProfilePost"
import { useGetUserPosts } from "../../hooks/useGetUserPosts"

export function ProfilePosts() {

  const {isLoading, posts} =  useGetUserPosts();

  const noPostsFound = !isLoading && posts.length === 0;

  if (noPostsFound){
    return <NoPostsFound/>
  }


// {/* This useEffect is for when the page reloads, SetTimeout is how long the reload runs for */}
// useEffect(() =>{
//   setTimeout (() =>{
//     setIsLoading(false)
//   }, 2000)
// },[])

  return (    
    <Grid 
    templateColumns={{sm:"repeat(1, fr)", md:"repeat(3, 1fr)"}}  
    gap={1} 
    columnGap={1}>
          
  {isLoading && [0,1,2,3].map((_,idx)=>(
        <VStack 
        key={idx} 
        alignItems={"flex-start"} 
        gap={4} >

            <Skeleton 
            w={"full"}>

              <Box 
              h={"300px"} >
                contents wrapped
                </Box>
                
            </Skeleton>
        </VStack>
        ))}


  {!isLoading && 
        <>
        {posts.map((post)=> (
          <ProfilePost post={post} key={post.id} />
        ))}
        </>}
    </Grid>

  )
}

function NoPostsFound (){
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10} >
      <Text fontSize={"2xl"} >
        No Posts Found
      </Text>
    </Flex>
  )
}