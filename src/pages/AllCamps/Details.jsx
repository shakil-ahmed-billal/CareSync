
import { Button, Label, Modal } from "flowbite-react";
import { useState } from "react";


// react icons
import { useQuery } from "@tanstack/react-query";
import { Calendar, Watch } from "lucide-react";
import { BiChevronLeft, BiChevronRight, BiLocationPlus } from "react-icons/bi";
import { IoHeart, IoHeartOutline, IoShareSocialOutline, IoStar } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Details = () => {

    // camp dynamic details
    const { id } = useParams()
    const { user } = useAuth()
    const [isFavorite, setIsFavorite] = useState(false)
    const axiosPublic = useAxiosPublic()


    const { data: details , refetch } = useQuery({
        queryKey: ['camp-details' , id],
        queryFn: async () => {
            const { data } = await axiosPublic(`/camp/${id}`)
            return data
        }
    })

    console.log(details)
    const { _id, campName, healthcareName, campFee, date, time, campLocation, description, image, participantCount } = details || {}
    // camp dynamic details


    // modal functionality option
    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }

    const handleRegister = async(event) => {
        event.preventDefault()
        const form = event.target;
        const age = form.age.value;
        const phone = form.phoneNumber.value;
        const gender = form.gender.value;
        const emergencyContact = form.emergencyContact.value;

        const info = {
            age,
            phone,
            gender,
            campFee,
            campName,
            campId: _id,
            emergencyContact,
            participantName: user?.displayName,
            participantEmail: user?.email,
            participantPhoto: user?.photoURL,
            registerTime: new Date()
        }
        
        // send to server this information
        
        const {data} = await axiosPublic.post('/register' , info)
        console.log(data)
        if(data){
            refetch()
        }
    }

    return (
        <div className="">
            {/* details section */}
            <div className="min-h-[calc(100vh-68px)] flex justify-center items-center">
                <div className="lg:p-8 bg-light1 dark:bg-dark3">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Image Section */}
                        <div className="relative">
                            <div className="flex">
                                <div className="flex items-center justify-center  bg-gray-100 overflow-hidden rounded-md">
                                    <img
                                        src={image}
                                        className="w-full md:min-h-[400px] object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-between gap-[15px] ml-[20px]">

                                    <div className="flex flex-col gap-[10px]">
                                        <button className="bg-gray-100 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200">
                                            <IoShareSocialOutline className="w-5 h-5" />
                                        </button>

                                        <button
                                            className="bg-gray-100 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200"
                                            onClick={() => setIsFavorite(!isFavorite)}
                                        >
                                            {
                                                isFavorite ? (
                                                    <IoHeart className="w-5 h-5 text-red-500" />
                                                ) : (
                                                    <IoHeartOutline className="w-5 h-5" />
                                                )
                                            }
                                        </button>
                                    </div>

                                    <div className="flex flex-col gap-[10px]">
                                        <button

                                            className="bg-gray-100 rounded-md w-max text-gray-600 p-2 hover:bg-gray-200"
                                            aria-label="Previous image"
                                        >
                                            <BiChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button

                                            className="bg-gray-100 rounded-md w-max text-gray-600 p-2 hover:bg-gray-200"
                                            aria-label="Next image"
                                        >
                                            <BiChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div className="flex flex-col dark:text-light3">
                            <div className="flex justify-between items-start">
                                <div className="w-full">
                                    <p className=" text-[0.9rem]">{healthcareName}</p>
                                    <h1 className="text-[1.6rem] lg:text-[1.8rem] font-semibold mb-3">{campName}</h1>
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-1 lg:gap-4 mb-4">
                                        <div className="flex items-center">
                                            <span className="text-[1.4rem] font-semibold ">${campFee}</span>
                                            <span className=" text-[1rem] line-through ml-2">${parseInt(campFee) + 40}</span>
                                        </div>
                                        <div className="">
                                            <div className="flex items-center gap-1">
                                                <IoStar className="text-yellow-400 text-[1.1rem]" />
                                                <span className=" font-semibold"> Rating 4.5</span>

                                            </div>
                                            <span className="text-gray-500">Participant ({participantCount})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-2 border-t-[2px]  border-gray-200 border-dashed mt-1 pt-6">
                                <h2 className="text-gray-700 dark:text-light3 font-semibold mb-2">Description:</h2>
                                <p className="text-[0.9rem] dark:text-light2 text-gray-600">
                                    {description}
                                </p>
                            </div>
                            <div className="space-y-2 mb-2">
                                <p className="flex gap-2 items-center ">Location: {campLocation} <BiLocationPlus></BiLocationPlus></p>
                                <p className="flex gap-2 items-center ">Date: {date} <Calendar></Calendar></p>
                                <p className="flex gap-2 items-center ">Time: {time} <Watch></Watch></p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-4 mt-auto">
                                <button onClick={() => setOpenModal(true)} className="grow py-3 px-6 bg-[#0FABCA] hover:bg-[#0FABCA]/90 rounded-md text-white">
                                    Join Camp
                                </button>
                                <button className="grow py-3 px-6 border border-gray-300 text-gray-600 rounded-md">
                                    Checkout Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal section */}
            <>
                <Modal className="" show={openModal} size="2xl" onClose={onCloseModal} popup>
                    <Modal.Header className="dark:bg-dark1" />
                    <Modal.Body className="dark:bg-dark1">
                        <div className="p-2 ">
                            <div className="grid grid-cols-2 gap-5 dark:text-light2">
                                <div className="">
                                    <div className="">
                                        <p>Camp Fee: ${campFee}</p>
                                        <p>Location: {campLocation}</p>
                                        <p>Camp Name: {campName}</p>
                                        <p>Healthcare Name: {healthcareName}</p>
                                    </div>
                                    <hr className="my-5" />
                                    <div className="">
                                        <p>Your Information</p>
                                        <p>Participant Name: {user?.displayName}</p>
                                        <p>Participant Email: {user?.email}</p>
                                    </div>
                                </div>
                                <div className="">
                                    <form onSubmit={handleRegister} className="w-full space-y-2 ">
                                        <Label>Age</Label>
                                        <input
                                            // {...register('age')}
                                            className="w-full rounded-md bg-light3 dark:bg-dark3"
                                            type="number"
                                            placeholder="age"
                                            name="age" id="" />
                                        <Label>Phone Number</Label>
                                        <input
                                            // {...register('phone')}
                                            className="w-full rounded-md bg-light3 dark:bg-dark3"
                                            type="number"
                                            placeholder="Phone Number"
                                            name="phoneNumber" id="phone" />
                                        <Label>Your Gender</Label>
                                        <select
                                            // {...register('gender')}
                                            className="w-full rounded-md bg-light3 dark:bg-dark3"
                                            defaultValue=''
                                            name="gender" id="gender">
                                            <option disabled selected value="">Gender
                                            </option>
                                            <option value="men"> Men
                                            </option>
                                            <option value="women"> women
                                            </option>
                                        </select>
                                        <Label>Emergency Contact Information</Label>
                                        <textarea
                                            // {...register('emergencyContact')}
                                            className="w-full rounded-md bg-light3  dark:bg-dark3"
                                            name="emergencyContact" placeholder="Emergency Contact" id=""></textarea>
                                        <button><Button>Save Info</Button></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
            {/* modal section */}
        </div>
    );
};

export default Details;
