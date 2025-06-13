import { useMutation } from "@tanstack/react-query"
import { loginService } from "../services/AuthService"
import { toast } from "react-toastify"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"

const useLoginUser=()=>{
    const {login} = useContext(AuthContext)
    return useMutation(
        {
            mutationFn:loginService,
            mutationKey:['login-key'],
            onSuccess:(data)=>{
                console.log(data)
                toast.success(data.message || "Login Successfull")
                login(data?.data,data?.token)

            },
            onError:(err)=>{
                toast.error(err.message || "Login Failed")
            }
        }
    )
}

export default useLoginUser