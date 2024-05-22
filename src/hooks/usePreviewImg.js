// Creating a hook that is called for when we want to render an image. It'so it is reusable, custom hooks are made so they can be reusable.
import { useState } from "react";
import {useShowToast} from "./useShowToast";

export function usePreviewImg() {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();

    const maxSizeFileInBytes = 2 * 1024 *1024 //2MB in size. We are saying the image being uploaded mustnt be larger than this.

   function handleImageChange (e){
    const file = e.target.files[0] // This will store the file taken from the machine/PC.

    if(file && file.type.startsWith("image/")){
        if(file.size > maxSizeFileInBytes){
            showToast("Error", "File size must be smaller than 2MB", "error")
            setSelectedFile(null)
            return
        }

        const reader = new FileReader();

        reader.onloadend = () =>{
            setSelectedFile(reader.result)
        }

        reader.readAsDataURL(file); // This coverts our file that was collected into URL string 

    } else{
        showToast("Error", 'Please select a image file', "error")
        setSelectedFile(null)
    }
   }
   return {selectedFile, handleImageChange, setSelectedFile}

}

