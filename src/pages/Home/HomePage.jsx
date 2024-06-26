import React from 'react'
import {Container, Flex, Box} from "@chakra-ui/react"
import { FeedPosts } from '../../components/FeedPosts/FeedPosts'
import { SuggestedUsers } from '../../components/SuggestedUsers/SuggestedUsers'

export const HomePage = () => {
  return (
  <Container 
    maxW={"container.lg"} >

      <Flex 
      gap={20}>

        {/*Imported FeedPosts component showing */}
        <Box 
        flex={2} 
        py={10}>

           <FeedPosts/> 

           </Box>

        <Box 
        flex={3} 
        mr={20} 
        display={{base:"none", lg:"block"}} 
        maxW={"380px"}>

          <SuggestedUsers/>

          </Box>
        
      </Flex>
  </Container>
  )
}
