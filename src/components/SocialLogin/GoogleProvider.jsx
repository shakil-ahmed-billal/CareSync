import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import saveUser from "../../API/UserSave"
import useAuth from "../../hooks/useAuth"

const GoogleProvider = () => {

    const { signInPopup } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()


    console.log(location)
    const handleLogin = async () => {
        try {
            const result = await signInPopup()
            await saveUser({ ...result?.user })
            toast.success('User Login Success')
            navigate(location.state ? location?.state : '/')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div>
            <button onClick={handleLogin}
                className="border w-full justify-center border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] dark:text-light3 text-[#424242] hover:bg-gray-50 transition-all duration-200 hover:dark:text-black">
                <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png" alt="google logo"
                    className="w-[23px]" />
                Sign in with Google
            </button>
        </div>
    )
}

export default GoogleProvider
