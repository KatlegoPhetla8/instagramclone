import { AuthForm } from '../../components/AuthForm/AuthForm'
import { Box, Container, Flex, VStack, Image } from '@chakra-ui/react'

export const Authorisation = () => {
  return (

<Flex 
    minH={"100vh"}  
    justifyContent={"center"} 
    alignItems={"center"} 
    px={4}>

  <Container 
        maxW={"container.md"} 
        padding={0}>

    <Flex 
    justifyContent={"center"} 
    alignItems={"center"} 
    gap={10}>

      {/*Left side image */}
          <Box 
          display={{base:"none", md:"block"}}> {/*This block of code is for displaying on size of device screen */}

            <Image 
            src="/auth.png" 
            h={650} 
            alt="Phone img"/>
          </Box>

       {/*Right sidde image */}
       <VStack 
       spacing={4} 
       align={"stretch"}>

          <AuthForm/>

        <Box
        textAlign={"center"}>
          Get the App.
        </Box>
            
              <Flex 
              gap={5} 
              justifyContent={"center"}>

                <Image 
                src="/playstore.png" 
                h={10} 
                alt={"playstore img"}/>
                
                <Image 
                src="/microsoft.png" 
                h={10} 
                alt={"microsoft img"}/>

              </Flex>
            </VStack>
    </Flex>
  </Container>
</Flex>
  )
}
