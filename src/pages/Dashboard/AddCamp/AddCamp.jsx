import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { Cloud } from "lucide-react";
import { useState } from "react";

const AddCamp = () => {




    // camp image manage function section
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    // Handle file selection when dropped or clicked
    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
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
    const onSubmit = (data) => {
        console.log(data)
    }
    const handleSubmit = () => {

    }

    return (
        <div className="min-h-[calc(100vh-68px)] flex justify-center items-center">
            <div className="flex gap-5 ">
                {/* image file upload or preview section */}
                <div className="w-[600px]  relative">
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
                            // {...register('camp-name')}
                            extra="mb-3"
                            label="camp-name*"
                            placeholder="Camp Name"
                            id="camp-name"
                            type="text" />
                        <Label>Healthcare Professional Name</Label>
                        <TextInput
                            // {...register('')}
                            variant="auth"
                            extra="mb-3"
                            label="Healthcare Name*"
                            placeholder="Healthcare Professional Name"
                            id="healthcareName"
                            type="text" />
                        <div className="flex justify-between gap-10">
                            <div className="flex flex-col w-full">
                                <Label>Camp Fees </Label>
                                <input
                                    // {...register('')}
                                    placeholder="Camp Fee"
                                    id="fee"
                                    type="number"
                                    className=""
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <Label>Date & Time</Label>
                                <input
                                    // {...register('')}
                                    placeholder="Date or Time"
                                    id="date"
                                    type="date" />
                            </div>
                        </div>
                        <Label>Camp Location</Label>
                        <TextInput
                            // {...register('')}
                            variant="auth"
                            extra="mb-3"
                            label="location*"
                            placeholder="Camp Location"
                            id="location"
                            type="text" />
                        <Label>Description</Label>
                        <Textarea rows={5}
                        placeholder="Describe Your Project Plan ......"
                        className="" />
                        <div className="flex items-center">
                            <Checkbox />
                            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                Keep me logged In
                            </p>
                        </div>
                        <Button className="w-full">Add Camp</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCamp
