import {PostHeader} from "./PostHeader"
import {Box, Image} from "@chakra-ui/react"
import { PostFooter } from "./PostFooter";
import { useGetUserProfileById } from "../../hooks/useGetUserProfileById";
 
export function FeedPost({post}) {
  const {userProfile} = useGetUserProfileById(post.createdBy); // Id of this user will go back to the parameter of this custom hook
  return (
    <>
    
    {/* PostHeader component */}
      {<PostHeader
      post={post}
      creatorProfile={userProfile} 
      /> }

      <Box 
      borderRadius={4} 
      overflow={"hidden"} 
      my={2}>

        <Image 
        src={post.imageURL} 
        alt={"FEED POST IMG"}/>

      </Box>

    {<PostFooter
    post={post}
    creatorProfile={userProfile}/> }

    </>
  )
}

