import { useMutation } from "@tanstack/react-query"
import {registerService } from "../services/authService"
import { toast } from "react-toastify"

const useRegisterUser=(onSuccessCallback)=>{
    return useMutation(
        {
            mutationFn:registerService,
            mutationKey:['register-key'],
            onSuccess:(data)=>{
                toast.success(data.message || "Register Successfull")
                if (onSuccessCallback) onSuccessCallback();
            },
            onError:(err)=>{
                toast.error(err.message || "Register Failed")
            }
        }
    )
}

export default useRegisterUser