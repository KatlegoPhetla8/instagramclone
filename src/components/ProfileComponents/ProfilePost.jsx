import { Flex, GridItem,Image,Text, useDisclosure,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Avatar, Divider, VStack, Button } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Comment } from "../Comments/Comment";
import { PostFooter } from "../FeedPosts/PostFooter";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useShowToast } from "../../hooks/useShowToast";
import { useState } from "react";
import { firestoredb, storage } from "../../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { usePostStore } from "../../store/usePostStore";
import { Caption } from "../Comments/Caption";


export function ProfilePost({post}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const user = useUserProfileStore((state) => state.userProfile);
  const decrementPostUI = useUserProfileStore((state) => state.deletePost)
  const authUser = useAuthStore((state) => state.user);
  const deletePost = usePostStore((state)=> state.deletePost);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);

    async function handDeletePost (){
      if (!window.confirm("Are you sure you want to delete this post?")) return // pop up confrimation if user wants to delete the post.
      if(isDeleting) return // If its busy deleting wont overload the system
      
      try {
        // Deleting the image from storage
        const imageRef = ref(storage, `posts/${post.id}`); // We are retrieving the image we want to delete from the storage
        await deleteObject(imageRef); // This is where the image gets deleted

        const userRef = doc(firestoredb, "users", authUser.uid);

        await deleteDoc(doc(firestoredb, "posts", post.id)); // We are deleting the post from the post.id collection

        // Removing the post from the user object within the posts property
        await updateDoc(userRef, {
          posts: arrayRemove(post.id)
        });
        decrementPostUI(post.id) // deletes the post from the UI as well. It updates it
        deletePost(post.id); // from the usePostStore delete function
        showToast("Success", "Post deleted successfully", "success")

        
      } catch (error) {
        showToast("Error", error.message, "error")
      } finally{
        setIsDeleting(false)
      }
    }

  return (
    <>
    <GridItem 
    onClick={onOpen} 
    cursor={"pointer"} 
    borderRadius={4} 
    overflow={"hidden"} 
    border={"1px solid"} 
    borderColor={"whiteAlpha.300"}
    position={"relative"} 
    aspectRatio={1/1} >
      {/*Grid item is used here to style each picture in the GRID */}

      <Flex 
      opacity={0} 
      _hover={{opacity:1}} 
      position={"absolute"} 
      top={0} 
      bottom={0} 
      right={0} 
      left={0} 
      bg={"blackAlpha.700"} 
      transition={"all 0.3s ease"} 
      zIndex={1} 
      justifyContent={"center"} >

        <Flex 
        alignItems={"center"} 
        justifyContent={"center"} 
        gap={50}>
          
            {/*Flex with heart/like icon inside the picture when hovering */}
          <Flex>

            <AiFillHeart 
            size={20} />

            <Text 
            fontWeight={"bold"}
             ml={2} >
              {post.likes.length}
            </Text>
            
            </Flex>
            
            {/*Flex with comment icon inside the picture when hovering */}
          <Flex>

            <FaComment 
            size={20} />

            <Text 
            fontWeight={"bold"} 
            ml={2} >
              {post.comments.length}
            </Text>

          </Flex>

        </Flex>
      </Flex>

    <Image 
    src={post.imageURL} 
    alt="profile post"
     w={"full"} 
     h={"full"} 
     objectFit={"cover"}/>
    
    </GridItem>

    <Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    isCentered={true} 
    size={{base:"3xl", md:"5xl"}} >

      <ModalOverlay/>

      <ModalContent>

        <ModalCloseButton/>

        <ModalBody 
        bg={"black"} 
        pb={5} >

          <Flex 
          gap="4" 
          w={{base:"90%", sm:"70%", md:"full"}} 
          mx={"auto"} 
          maxH={"90vh"}
          minH={"50vh"} > 
            
            <Flex 
            borderRadius={4} 
            overflow={"hidden"} 
            border={"1px solid"} 
            borderColor={"whiteAlpha.500"} 
            flex={1.5}
            justifyContent={"center"}
            alignItems={"center"}> 

              <Image 
              src={post.imageURL}
              alt="profile post" />

            </Flex>

          {/* Left hand side */}
            <Flex 
            flex={1} 
            flexDirection={"column"} 
            px={10} 
            display={{base:"none", md:"flex"}} >

              <Flex 
              alignItems={"center"} 
              justifyContent={"space-between"}>

                <Flex 
                alignItems={"center"} 
                gap={4} >
                  <Avatar 
                  src={user.profilePicURL} 
                  size={"sm"} 
                  name="As a programmer" 
                  alt="profile pic" />

                  <Text 
                  fontWeight={"bold"} 
                  fontSize={12} >
                    {user.username}
                  </Text>



                </Flex>

              {/* Id user logged in is === to user profile we are in then delete button is showed */}
              {authUser?.uid ===  user.uid && (
                <Button 
                  size={"sm"}
                  bg={"transparent"}
                  _hover={{color:"red.600", bg:"whiteAlpha.300"}} 
                  borderRadius={4}
                  p={1}
                  onClick={handDeletePost}
                  isLoading={isDeleting}>

                    <MdDelete 
                    cursor={"pointer"} 
                    size={20}/>

                  </Button>)}

              </Flex>

              <Divider 
              bg={"gray.500"} 
              orientation="horizontal" 
              my={4} />

                {/*These are the comments in the modal. */}
              <VStack 
                w={"full"} 
                alignItems={"start"} 
                maxH={"350px"} 
                overflowY={"auto"}
                >

                  {post.caption &&(
                    <Caption post={post} />
                  )}

                {/*This code renders the comments to the UI */}
                {post.comments.map((comment, idx)=>(
                  <Comment key={idx} comment={comment} />
                ))}
                
              
              </VStack>

                <Divider 
                orientation="horizontal" 
                my={4} 
                bg={"gray.800"}/>
                
                {/*This post footer won't display the view 1000 comments when this page is open */}
                <PostFooter 
                isProfilePage={true} post={post} />

            </Flex>
          </Flex>

        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

