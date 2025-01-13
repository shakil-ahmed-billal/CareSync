import { Checkbox, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from '../assets/banner-log.jpg'

const Login = () => {
    return (
        <div className="bg-light1 min-h-screen relative">
            <Link to={'/'}><p className="md:w-10/12 mx-auto pt-10">---Back to Home</p></Link>
            <div className="md:w-10/12 mx-auto flex">

                <div className="mb-16 pt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                    {/* Sign in section */}
                    <form className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px] space-y-2">
                        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                            Sign In
                        </h4>
                        <p className="mb-9 ml-1 text-base text-gray-600">
                            Enter your email and password to sign in!
                        </p>
                        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-light3 hover:cursor-pointer dark:bg-navy-800">
                            <div className="rounded-full text-xl">
                                {/* <FcGoogle /> */}
                            </div>
                            <h5 className="text-sm font-medium text-navy-700 dark:text-white">
                                Sign In with Google
                            </h5>
                        </div>
                        <div className="mb-6 flex items-center  gap-3">
                            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                            <p className="text-base text-gray-600 dark:text-white"> or </p>
                            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                        </div>
                        Email
                        <TextInput
                            variant="auth"
                            extra="mb-3"
                            label="Email*"
                            placeholder="mail@simmmple.com"
                            id="email"
                            type="text"
                        />

                        Password
                        <TextInput
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
                                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                                href=" "
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <button className="linear mt-5 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 bg-[#3311DB]">
                            Sign In
                        </button>
                        <div className="mt-4">
                            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
                                Not registered yet?
                            </span>
                            <a
                                href=" "
                                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                            >
                                Create an account
                            </a>
                        </div>
                    </form>
                </div>
                <div className="hidden md:flex">
                    <img className="h-full object-cover" src={logo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login
