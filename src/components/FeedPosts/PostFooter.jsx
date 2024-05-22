import React, { useRef, useState } from 'react'
import {Flex, Box, Text, Button, Input, InputGroup, InputRightElement, useDisclosure} from "@chakra-ui/react"
import { NotificationsLogo, UnlikeLogo, CommentLogo } from '../../assets/constants';
import { usePostComment } from '../../hooks/usePostComment';
import { useAuthStore } from '../../store/useAuthStore';
import { useLikePost } from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/timeAgo';
import {CommentsModal}  from "../Comments/CommentsModal"

export function PostFooter({post, creatorProfile, isProfilePage}) {
  const {isCommenting, handlePostComment } = usePostComment();
  const [comment, setIsComment] = useState("");
  const authUser = useAuthStore((state)=> state.user);
  const commentRef = useRef(null); // Tjhis used used when comment logo is clicked, the comment input will focus
  const {isLiked,likes,handleLikePost} = useLikePost(post);
  const {isOpen, onOpen, onClose} = useDisclosure();
  

  async function handleSubmitComment (){
    await handlePostComment(post.id, comment);
    setIsComment("")
  }



  return (
  <Box 
    my={10} 
    marginTop={"auto"}>

    {/*The flex below includes the like and comment button */}
    <Flex 
    alignItems={"center"} 
    gap={4} 
    w={"full"} 
    pt={4 } 
    mt={4} 
    mb={2} >

      <Box 
      onClick={handleLikePost} 
      cursor={"pointer"} 
      fontSize={18}
      > {/*Like logo code */}

        {!isLiked ? (<NotificationsLogo/>) : (<UnlikeLogo/>)}
      </Box>

      <Box 
      cursor={"pointer"} 
      fontSize={18}
      onClick={()=> commentRef.current.focus()}>
        {<CommentLogo/>}
      </Box>

    </Flex>

    <Text 
    fontWeight={600} 
    fontSize={"sm"}
    >{likes} {""}
    likes
    </Text> {/*This code is for the likes State */}
    
    {/*If user is in profile page you can see when post was created just not in feedpost page */}
    {isProfilePage && (
      <Text fontSize={12} color={"gray"} >
      Posted {timeAgo(post.createdAt)}
      </Text>
    )}

    {/*If the profile page is open then it doesn't show this part of code */}
    {!isProfilePage && 
      <>
        <Text 
        fontWeight={700} 
        fontSize={"sm"}>{creatorProfile?.username} {""}

        <Text 
        as="span" 
        fontWeight={400}>
          {post.caption}
        </Text> {/*This code is for the likes State */}
        </Text> {/*This code is for the likes State */}

     

      {post.comments.length > 0 && 
      <Text 
      color={'gray'} 
      fontSize={"sm"} 
      _hover={{cursor:"pointer"}}
      cursor={"pointer"}
      maxW={"fit-content"}
      onClick={onOpen}
      >
       View all {post.comments.length} comments
      </Text>
}
   {/*COMMENTS MODAL ONLY OPEN IN HOME PAGE */}
   {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}     
      </>}
    
    {/* If user is logged in then it shows the add comment with the post button */}
    {authUser && (
    <Flex 
    justifyContent={"space-between"} 
    alignItems={"center"} 
    gap={2} w={"full"} 
    color>

  <InputGroup>
      <Input 
      placeholder="Add a comment..." 
      variant={"flushed"} 
      fontSize={14}
      onChange={(e)=> setIsComment(e.target.value)}
      value={comment}
      ref={commentRef}/>

    <InputRightElement>

      <Button 
      fontSize={14} 
      color={"blue.500"} 
      fontWeight={600} 
      cursor={"pointer"} 
      _hover={{color: "white", bg:"transparent"}}
      isLoading={isCommenting}
      onClick={handleSubmitComment}>
        Post
      </Button>

    </InputRightElement>
  </InputGroup>

    </Flex>)}
    
  </Box>
  )
}

