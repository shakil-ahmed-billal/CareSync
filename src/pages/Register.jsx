import { Checkbox, TextInput } from "flowbite-react";
import { House, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/banner-log.jpg';
import useAuth from "../hooks/useAuth";

const Register = () => {

  const { loading, signInPopup } = useAuth()


  // user image profile function
  const [imageLink, setImageLink] = useState("");

  const handleUploadImageClick = () => {
    document.getElementById("image").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageLink(imageURL);
    }
  };


  // user form control function
  

  return (
    <div className=" min-h-screen relative">
      <Link to={'/'}><p className="absolute flex dark:text-light2 top-10 md:left-48"><House />-Back to Home</p></Link>
      <div className="md:w-10/12 h-screen mx-auto flex items-center">


        <div className="hidden md:flex">
          <img className="h-full object-cover" src={logo} alt="" />
        </div>
        <div className="flex h-full w-full items-center justify-center md:mx-0 lg:items-center lg:justify-center">
          {/* Sign in section */}
          <div className="w-full max-w-full flex-col items-center lg:pl-0 xl:max-w-[420px] space-y-2">
            <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-light2">
              Register your account
            </h4>
            <p className="py-3 text-base dark:text-light2 text-gray-600">
              Enter your email and password to register account!
            </p>
            <button onClick={() => signInPopup()}
              className="border w-full justify-center border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] dark:text-light3 text-[#424242] hover:bg-gray-50 transition-all duration-200 hover:dark:text-black">
              <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png" alt="google logo"
                className="w-[23px]" />
              Sign in with Google
            </button>
            <div className="mb-6 flex items-center  gap-3">
              <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
              <p className="text-base text-gray-600 dark:text-white"> or </p>
              <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
            </div>
            <form  className="dark:text-light2">
              {/* yser profile image section */}
              <div className="text-center flex items-center justify-center gap-5">
                <input
                  type="file"
                  name="image"
                  id="fourthImage"
                  className="hidden"
                  onChange={handleFileChange} />
                <div className="w-[100px] h-[100px] rounded-full border border-[#e5eaf2] flex items-center justify-center">
                  {imageLink === "" ? (
                    <UserRoundPen className="size-14 text-[#e5eaf2]" />
                  ) : (
                    <img
                      src={imageLink}
                      alt="image"
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>

                <div className="">
                <button className="px-4 py-2 bg-[#3B9DF8] text-white rounded-md mt-5"
                  onClick={handleUploadImageClick}> Upload profile </button>
                </div>
              </div>
              {/* yser profile image section */}
              <p className="mb-2">Email</p>
              <TextInput
                variant="auth"
                extra="mb-3"
                label="Email*"
                placeholder="mail@simmmple.com"
                id="email"
                type="text"
              />

              <p className="my-2">Password</p>
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
                Already registered yet?
              </span>
              <Link to={'/auth/login'}
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white text-blue-500">
                Login an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

