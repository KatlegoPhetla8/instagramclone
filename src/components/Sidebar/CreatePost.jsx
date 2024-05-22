import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { useShowToast } from "../../hooks/useShowToast";
import{useAuthStore} from "../../store/useAuthStore"
import { usePostStore } from "../../store/usePostStore";
import { useUserProfileStore } from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc} from "firebase/firestore";
import {firestoredb, storage} from "../../firebase/firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export function CreatePost() {
	const {isOpen,onOpen,onClose} = useDisclosure();
	const [caption, setCaption] = useState("");
	const imageRef = useRef(null) // Ref used for Input ref
	const {selectedFile, handleImageChange, setSelectedFile} = usePreviewImg();
	const {isLoading,handleCreatePost} = useCreatePost();
	const showToast = useShowToast();

		const handlePostCreation = async () => {
			try {
				await handleCreatePost(selectedFile,caption);
				onClose();
				setCaption("");
				setSelectedFile(null);

			} catch (error) {
				showToast("Error", error.message, "error")
			}
		}
	
	return (

    		<>
    			<Tooltip
    				hasArrow
    				label={"Create"}
    				placement='right'
    				ml={1}
    				openDelay={500}
    				display={{ base: "block", md: "none" }}
    			>
    				<Flex
    					alignItems={"center"}
    					gap={4}
    					_hover={{ bg: "whiteAlpha.400" }}
    					borderRadius={6}
    					p={2}
    					w={{ base: 10, md: "full" }}
    					justifyContent={{ base: "center", md: "flex-start" }}
						onClick={onOpen}
    				>
    					<CreatePostLogo />
    					<Box display={{ base: "none", md: "block" }}>Create</Box>
    				</Flex>
    			</Tooltip>

				
	 <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' value={caption} onChange={(e)=> setCaption(e.target.value)} />

						<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

						<BsFillImageFill
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
							onClick={() =>imageRef.current.click()} /*This icon is linked to the Input(type file) so when its clicked its where we can pick an image from our PC */
						/>

						{selectedFile && (
							<Flex 
							mt={5}
							w={"full"}
							position={"relative"}
							justifyContent={"center"} >
								<Image src={selectedFile} alt="Selected Image" />
								<CloseButton 
								position={"absolute"}
								top={2}
								right={2}
								onClick={()=> {setSelectedFile(null)}} /*When the CloseButton is clicked remove the selectedFile */ />

							</Flex>
						)}

					</ModalBody>

					<ModalFooter>
						<Button mr={3} isLoading={isLoading} onClick={handlePostCreation} >Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> 

    		</>
    	);
  
}

function useCreatePost (){
	const showToast  = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state)=> state.user);
	const createPost = usePostStore((state)=> state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost)
	const userProfile = useUserProfileStore((state) => state.userProfile)
	const {pathname} = useLocation();

	async function handleCreatePost(selectedFile, caption){
		if (isLoading) return // if user tries to keep clicking while its loading so it doesn't overload our servers.
		if (!selectedFile) {
			throw new Error("Please select an image")
		}

		setIsLoading(true);

		const newPost = {
			caption: caption,
			likes:[],
			comments:[],
			createdAt: Date.now(),
			createdBy: authUser.uid,

		}

		try {
			const postDocRef = await addDoc(collection(firestoredb, "posts"),newPost); // creating and adding a posts collection
			const userDocRef = doc(firestoredb, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`) // second part of this is the path in the firebase storage. So from posts/
			
			await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)}) // So here we are updating the posts property that is inside the users collection(userDocRef)
			await uploadString(imageRef, selectedFile, "data_url") // this uploads the image
			const downloadURL = await getDownloadURL(imageRef)
			
			await updateDoc(postDocRef,{imageURL:downloadURL}) // We are adding the url of the image to the newPost object or collection
			
			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid){
				createPost({...newPost, id:postDocRef.id}) // if the userProfile is equal to authUser then post will be created
			}

			if (pathname !== "/" && userProfile.uid === authUser.uid){ {/*If path we are in is not equal to home and userprofile.uid is equal to authuser.uid then execute this code because userProfile in the home page is null */}
				addPost({...newPost, id:postDocRef.id})
			}
			
			showToast("Success", "Post Created Succesfully", "success")

		} catch (error) {
			showToast("Error", error.message, "error")
		} finally{
			setIsLoading(false)
		}
	}
	return {isLoading, handleCreatePost}
}