import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { Cloud } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../API/ImageAPI";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddCamp = () => {


    const { register, handleSubmit, formState: { errors } } = useForm()


    // camp image manage function section
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [image, setImage] = useState(null)
    const axiosSecure = useAxiosSecure()


    // Handle file selection when dropped or clicked
    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        setImage(file)
        handleFile(file);
        setIsDragging(false)
    };

    // Function to validate and display the image
    const handleFile = (file) => {
        if (!file) return;

        if (file.type.startsWith("image/")) {
            setErrorMessage("");
            const reader = new FileReader();
            reader.onload = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        } else {
            setErrorMessage("Please upload an image file.");
            setSelectedImage(null);
        }
    };

    // Handle drag over event to allow the drop
    const handleImageDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };
    // camp image manage function section



    // camp add for database
    const onSubmit = async (data) => {

        // camp image upload api call
        const imageURL = await imageUpload(image)

        if (imageURL) {
            const campData = {
                ...data,
                image: imageURL,
                postTime: new Date(),
                participantCount: 0,
            }
            const { data: result } = await axiosSecure.post('/add-camp', campData)
            console.log(result)
        }
    }

    return (
        <div className="md:flex pt-20 dark:bg-dark1  bg-light2 justify-center items-center ">
            <div className="md:flex items-center h-full gap-5 ">
                {/* image file upload or preview section */}
                <div className="md:w-[600px] h-full relative">
                    <div className="flex justify-center items-center w-full flex-col">
                        <div
                            className={`${isDragging ? "border-blue-300 " : "border-gray-300"} ${selectedImage ? "" : "border-dashed border-2 p-6"} rounded-lg w-full flex flex-col justify-center items-center `}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleFileDrop}
                            onDragOver={handleImageDragOver}
                        >
                            {selectedImage ? (
                                <img src={selectedImage} alt="Preview"
                                    className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <>
                                    {
                                        isDragging ? (
                                            <h5 className="text-[2rem] text-blue-700 font-[600]">Drop
                                                Here</h5>
                                        ) : (
                                            <>
                                                <Cloud
                                                    className="text-[3rem] mb-4 text-gray-400" />
                                                <p className="text-gray-500 text-center text-[1.1rem] font-[500] mb-2">Drag
                                                    & Drop your image
                                                    here</p>
                                                <p className="text-gray-400">or</p>
                                                <label
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer py-2 px-4 bg-gray-200 rounded-md mt-2"
                                                >
                                                    Browse File
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleFileDrop}
                                                />
                                            </>
                                        )
                                    }
                                </>
                            )}
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 mt-4">{errorMessage}</p>
                        )}
                        {selectedImage && (
                            <div className="mt-4 absolute top-0 right-5">
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="bg-red-500 text-white px-4 py-2  rounded-lg"
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* image file upload or preview section */}
                <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <Label>Camp Name</Label>
                        <TextInput
                            {...register('campName')}
                            extra="mb-3"
                            label="camp-name*"
                            placeholder="Camp Name"
                            id="camp-name"
                            type="text" />
                        <Label>Healthcare Professional Name</Label>
                        <TextInput
                            {...register('healthcareName')}
                            variant="auth"
                            extra="mb-3"
                            label="Healthcare Name*"
                            placeholder="Healthcare Professional Name"
                            id="healthcareName"
                            type="text" />
                        <div className="md:flex justify-between gap-5">
                            <div className="flex flex-col w-full">
                                <Label>Camp Fees </Label>
                                <input
                                    {...register('campFee')}
                                    placeholder="Camp Fee"
                                    id="fee"
                                    type="number"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <Label>Date</Label>
                                <input
                                    {...register('date')}
                                    placeholder="Date or Time"
                                    id="date"
                                    type="date" />
                            </div>
                            <div className="flex flex-col w-full">
                                <Label>Time</Label>
                                <input
                                    {...register('time')}
                                    placeholder="Date or Time"
                                    id="time"
                                    type="time" />
                            </div>
                        </div>
                        <Label>Camp Location</Label>
                        <TextInput
                            {...register('campLocation')}
                            variant="auth"
                            extra="mb-3"
                            label="location*"
                            placeholder="Camp Location"
                            id="location"
                            type="text" />
                        <Label>Description</Label>
                        <Textarea rows={5}
                            {...register('description')}
                            placeholder="Describe Your Project Plan ......"
                            className="" />
                        <div className="flex items-center">
                            <Checkbox />
                            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                Keep me logged In
                            </p>
                        </div>
                        <button><Button className="w-full">Add Camp</Button></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCamp
