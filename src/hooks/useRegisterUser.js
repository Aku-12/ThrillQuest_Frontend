import { useMutation } from "@tanstack/react-query"
import {registerService } from "../services/AuthService"
import { toast } from "react-toastify"

const useRegisterUser=()=>{
    return useMutation(
        {
            mutationFn:registerService,
            mutationKey:['register-key'],
            onSuccess:(data)=>{
                toast.success(data.message || "Register Successfull")
            },
            onError:(err)=>{
                toast.error(err.message || "Register Failed")
            }
        }
    )
}

export default useRegisterUser