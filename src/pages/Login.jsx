import { Checkbox, TextInput } from "flowbite-react";
import { House } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from '../assets/banner-log.jpg';
import useAuth from "../hooks/useAuth";
import GoogleProvider from "../components/SocialLogin/GoogleProvider";


const Login = () => {

    const { loginUser } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        // user login function
        loginUser(data.email, data.password)
            .then(async (res) => {
                console.log(res.user)
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        <div className=" min-h-screen relative">
            <Link to={'/'}><p className="absolute flex dark:text-light2 top-10 md:left-48"><House />-Back to Home</p></Link>
            <div className="md:w-10/12 h-screen mx-auto flex items-center">

                <div className="flex h-full w-full items-center justify-center md:mx-0 lg:items-center lg:justify-center">
                    {/* Sign in section */}
                    <div className="w-full max-w-full flex-col items-center lg:pl-0 xl:max-w-[420px] space-y-2">
                        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-light2">
                            Sign In
                        </h4>
                        <p className="py-3 text-base dark:text-light2 text-gray-600">
                            Enter your email and password to sign in!
                        </p>
                        <GoogleProvider></GoogleProvider>
                        <div className="mb-6 flex items-center  gap-3">
                            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                            <p className="text-base text-gray-600 dark:text-white"> or </p>
                            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="dark:text-light2">
                            <p className="mb-2">Email</p>
                            <TextInput
                                {...register('email')}
                                variant="auth"
                                extra="mb-3"
                                label="Email*"
                                placeholder="mail@simmmple.com"
                                id="email"
                                type="text"
                            />

                            <p className="my-2">Password</p>
                            <TextInput
                                {...register('password')}
                                variant="auth"
                                extra="mb-3"
                                label="Password*"
                                placeholder="Min. 8 characters"
                                id="password"
                                type="password"
                            />
                            {/* Checkbox */}
                            <div className="mb-4 flex items-center justify-between px-2">
                                <div className="flex items-center">
                                    <Checkbox />
                                    <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                        Keep me logged In
                                    </p>
                                </div>
                                <a
                                    className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white my-3"
                                    href=" "
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <button className="linear w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 bg-[#3311DB]">
                                Sign In
                            </button>
                        </form>
                        <div className="my-4 mt-5">
                            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                                Not registered yet?
                            </span>
                            <Link to={'/auth/register'}
                                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white text-blue-400">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex">
                    <img className="h-full object-cover" src={logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login
