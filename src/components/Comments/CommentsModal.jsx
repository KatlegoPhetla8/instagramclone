import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import {Comment} from "./Comment"
import { usePostComment } from '../../hooks/usePostComment';

export function CommentsModal({isOpen, onClose, post}) {
	const {isCommenting, handlePostComment} = usePostComment();
	const commentRef = useRef(null);
	const commentsContainerRef = useRef(null); // this is so we scroll to the bottom of the comments when a comment is posted and when its first opened

	async function handleSubmitComment (event) {
		// do not refresh page. Prevents refreshing of the page
		event.preventDefault();

		await handlePostComment(post.id, commentRef.current.value) // comment ref is the value from the Input component. 
		commentRef.current.value = ""; // clearing the comment Input
	}

	useEffect (()=>{
		function scrollToBottom (){
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight // this code is for when a post is posted or when a user open the comments it scrolls to the bottom
		}
		if (isOpen){
			setTimeout(()=>{
				scrollToBottom() // This function is being delayed so we dont get a error because initially scrollHeight is null
			},100)
		}
	},[isOpen, post.comments.length]) // So when either of these change the useEffect comes in effect

    	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>

					{/*Comments being rendered to the modal */}
					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef}>
						{post.comments.map((comment, idx)=>(
							<Comment key={idx} comment={comment} />
						))}
					</Flex>

					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
						<Input placeholder='Comment' size={"sm"} ref={commentRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button isLoading={isCommenting} type='submit' ml={"auto"} size={"sm"} my={4}>
								Post
							</Button>
						</Flex>
					</form>

				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

