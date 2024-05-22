import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Container maxW={"container.lg"} my={4} >
      <Flex w={"full"} justifyContent={{base:"center", sm:"space-between"}} alignItems={"center"} >
        <Image onClick={()=> navigate("/auth")} src="/logo.png" h={20} display={{base:"none", sm:"block"}} cursor={"pointer"} />
            <Flex>
                <Link to={"/auth"} >
                    <Button colorScheme="blue" size={"sm"}>
                        Login
                    </Button>
                </Link>
                <Link to={"/auth"} >
                    <Button variant={"outline"} size={"sm"} >
                        Signup
                    </Button>
                </Link>
            </Flex>
      </Flex>
    </Container>
  )
}

