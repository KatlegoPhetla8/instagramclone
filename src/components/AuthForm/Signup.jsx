import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { useSignUpWithEmailAndPassword } from "../../hooks/useSignUpWithEmailAndPassword";

export function Signup() {
    const [inputs, setInput] = useState({
        fullName:"",
        username:"",
        email: "",
        password: "",
      });

      const [showPassword, setShowPassword] = useState(false);
      const {loading, error, signup} = useSignUpWithEmailAndPassword(); // custom hook for signing up with email and password, the one we created.

  return (
    <>
        <Input
        placeholder="Full Name" 
        value={inputs.fullName} 
        h={9}  
        fontSize={16}
        size={"sm"}
        onChange={(e)=> setInput({...inputs,fullName: e.target.value})} 
        type="text"/>

        <Input
        placeholder="Username" 
        value={inputs.username} 
        h={9}  
        fontSize={16}
        size={"sm"}
        onChange={(e)=> setInput({...inputs,username: e.target.value})} 
        type="text"/>   

        <Input
        placeholder="Email" 
        value={inputs.email} 
        h={9}  
        fontSize={16}
        size={"sm"}
        onChange={(e)=> setInput({...inputs,email: e.target.value})} 
        type="email"/>

        <InputGroup>
            <Input 
            placeholder="Password" 
            value={inputs.password} 
            h={9} 
            fontSize={16}
            size={"sm"}
            onChange={(e)=> setInput({...inputs, password: e.target.value})} 
            type={showPassword ? "text" : "password" }/>

            <InputRightElement h={"full"} >
                <Button onClick={() => setShowPassword(!showPassword)} 
                variant={"ghost"} 
                size={"sm"}>
                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                </Button>

            </InputRightElement>
            
        </InputGroup>

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
        isLoading={loading}
        onClick={()=> signup(inputs)}>Signup
        </Button>

    
    </>
  )
}

