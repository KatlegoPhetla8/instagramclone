import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export function Login() {

    const [inputs, setInput] = useState({
        email: "",
        password: "",
      });

      const {loading, error, login} = useLogin();

  return (
    <>
        <Input 
        onChange={(e)=> setInput({...inputs,email: e.target.value})} 
        value={inputs.email} 
        h={9}
        size={"sm"}
        placeholder="Email" 
        fontSize={16} 
        type="email"/>

        <Input
        onChange={(e)=> setInput({...inputs, password: e.target.value})} 
        value={inputs.password} 
        h={9}
        size={"sm"}
        placeholder="Password" 
        fontSize={16} 
        type="password"/>

        {error && 
        (<Alert status="error" fontSize={13} p={2} borderRadius={4} >
            <AlertIcon fontSize={12} />
            {error.message}
        </Alert>)}{/* Alert from Chakra that can be used to display messages*/}

        <Button  
        w={"full"} 
        colorScheme="blue" 
        size={"sm"} 
        fontSize={14}
        onClick={() => login(inputs)}
        isLoading={loading}>Login
        </Button>


    </>
  )
}

