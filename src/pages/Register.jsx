import { Checkbox, TextInput } from "flowbite-react";
import { House, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { imageUpload } from "../API/ImageAPI";
import saveUser from "../API/UserSave";
import logo from '../assets/banner-log.jpg';
import GoogleProvider from "../components/SocialLogin/GoogleProvider";
import useAuth from "../hooks/useAuth";


const Register = () => {

  const { createNewUser, userProfile } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [imageLink, setImageLink] = useState("");
  const [image, setImage] = useState(null)
  const navigate = useNavigate()



  // user image profile function
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file)
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageLink(imageURL);
    }
  };


  // user form control function
  const onSubmit = async (data) => {

    const imageFile = image
    const imageURL = await imageUpload(imageFile)

    console.log(imageURL)
    console.log(data)


    try {
      // new user create firebase 
      const result = await createNewUser(data.email, data.password)
      // user profile update info
      await userProfile({ displayName: data.name, photoURL: imageURL })
      // user save database
      await saveUser({ ...result?.user, name: data.name, photoURL: imageURL })
      navigate('/')

    } catch (error) {
      console.log(error)
    }
  }

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
            <GoogleProvider></GoogleProvider>
            <div className="mb-6 flex items-center  gap-3">
              <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
              <p className="text-base text-gray-600 dark:text-white"> or </p>
              <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
            </div>
            {/* yser profile image section */}
            <div className=" text-center dark:text-light2 flex flex-row-reverse justify-center items-center gap-3">
              <input
                type="file"
                name="image"
                id="fourthImage"
                className="w-28"
                onChange={handleFileChange} />
              <div className="w-[100px] h-[100px] rounded-full border border-[#e5eaf2] flex items-center justify-center">
                {!imageLink ? (
                  <UserRoundPen className="size-10 text-[#e5eaf2]" />
                ) : (
                  <img
                    src={imageLink}
                    alt="image"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
            </div>
            {/* yser profile image section */}
            <form onSubmit={handleSubmit(onSubmit)} className="dark:text-light2">

              <p className="mb-2">Name</p>
              <TextInput
                {...register('name')}
                variant="auth"
                extra="mb-3"
                label="name*"
                placeholder="Full Name write"
                id="name"
                type="text"
              />
              <p className="mb-2">Email</p>
              <TextInput
                {...register('email')}
                variant="auth"
                extra="mb-3"
                label="Email*"
                placeholder="mail@simmmple.com"
                id="email"
                type="email"
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
                <div className="mt-3 gap-4 flex items-center">
                  <Checkbox />
                  <p className=" text-sm font-medium text-navy-700 dark:text-white">
                    Keep me logged In
                  </p>
                </div>
              </div>
              <button className="linear w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 bg-[#3311DB]">
                Register
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

