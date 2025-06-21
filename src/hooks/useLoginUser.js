import { useMutation } from "@tanstack/react-query"
import { loginService } from "../services/AuthService"
import { toast } from "react-toastify"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import roleRoutes from "../../utils/roleRoutes"
import { useNavigate } from "react-router-dom"

const useLoginUser=()=>{
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    return useMutation(
        {
            mutationFn:loginService,
            mutationKey:['login-key'],
            onSuccess:(data)=>{
                console.log(data)
                toast.success(data.message || "Login Successfull")
                login(data?.data,data?.token)
                const route = roleRoutes[data?.data?.role]
                navigate(route)
            },
            onError:(err)=>{
                toast.error(err.message || "Login Failed")
            }
        }
    )
}

export default useLoginUser