import { Box, Flex, Text } from '@chakra-ui/react'
import { BsBookmark, BsGrid3X3, BsSuitHeart } from 'react-icons/bs'

export function ProfileTabs() {
  return (
  <Flex 
    w={"full"} 
    justifyContent={"center"} 
    gap={{base:4, sm:10}} 
    textTransform={"uppercase"} 
    fontWeight={"bold"} >

    {/*This code below is for the posts tab */}
    <Flex 
    borderTop={"1px solid white"} 
    alignItems={"center"} 
    p={3} 
    gap={1} 
    cursor={"pointer"} >

      <Box 
      fontSize={20} >

        <BsGrid3X3/> {/* This icon was imported from react icons */}

      </Box>

      <Text 
      fontSize={12} 
      display={{base:"none", sm:"block"}}>
        Posts
      </Text>

    </Flex>

    {/*This code below is for the posts tab */}
    <Flex  
    alignItems={"center"} 
    p={3} 
    gap={1} 
    cursor={"pointer"} >

      <Box 
      fontSize={20} >

        <BsBookmark/>
      </Box>

      <Text 
      display={{base:"none", sm:"block"}} 
      fontSize={12} >
        Saved
      </Text>

    </Flex>

    {/*This code below is for the posts tab */}
    <Flex  
    alignItems={"center"} 
    p={3} 
    gap={1} 
    cursor={"pointer"} >

      <Box 
      fontSize={20} >

        <BsSuitHeart 
        fontWeight={"bold"} />

      </Box>

      <Text 
      display={{base:"none", sm:"block"}} 
      fontSize={12} >
        Likes
      </Text>

    </Flex>
  
  </Flex>
  )
}

