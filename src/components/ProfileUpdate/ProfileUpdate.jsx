import { useQuery } from '@tanstack/react-query';
import { Button, Label, TextInput } from 'flowbite-react';
import { UserRoundPen } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { imageUpload } from '../../API/ImageAPI';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const ProfileUpdate = ({ setOpenModal }) => {


    const { userProfile, setLoading, user } = useAuth()
    const [imageLink, setImageLink] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure()

    const [image, setImage] = useState(null)
    // const [name, setName] = useState('')
    // const [address, setAddress] = useState('')


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

    const handleUpdate = async (data) => {
        console.log(data)

        const imageURL = image ? await imageUpload(image) : user?.photoURL;
        console.log(image)


        try {
            await userProfile({ displayName: data.name, photoURL: imageURL })
            const { data: result } = await axiosSecure.patch(`/profile-update/${user?.email}`, data)
            console.log(result)
            setLoading(false)
            setOpenModal(false)
            toast.success("user profile Update ")
        } catch (error) {
            console.log(error)
        }
    }

    const { data: profileData } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data
        }
    })
    return (
        <div>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Your Profile Information</h3>
                {/* yser profile image section */}
                <div className=" text-center dark:text-light2 flex flex-row-reverse justify-center items-center gap-3 py-5">
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
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Full Name" />
                    </div>
                    <TextInput
                        id="name"
                        placeholder="name"
                        required
                        defaultValue={profileData?.name}
                        name="name"
                        // onChange={(e) => setName(e.target.value)}
                        {...register('name')}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="address" value="Your Full Address" />
                    </div>
                    <TextInput
                        id="address"
                        placeholder="address"
                        defaultValue={profileData?.address}
                        required
                        name="address"
                        // onChange={(e) => setAddress(e.target.value)}
                        {...register('address')}
                    />
                </div>
                <div className="w-full flex justify-center">
                    <button> <Button >Update</Button></button>
                </div>
            </form>
        </div>
    )
}

export default ProfileUpdate
