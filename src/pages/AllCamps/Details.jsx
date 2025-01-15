



// react icons
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoHeart, IoHeartOutline, IoShareSocialOutline, IoStar } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Details = () => {

    // camp dynamic details
    const [isFavorite, setIsFavorite] = useState(false)
    const { id } = useParams()
    const axiosPublic = useAxiosPublic()


    const { data: details } = useQuery({
        queryKey: ['camp-details'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/camp/${id}`)
            return data
        }
    })

    console.log(details)
    const { _id, campName, healthcareName, campFee, date, time, campLocation, description, image, participantCount } = details || {}
    // camp dynamic details



    return (
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
                                <p className=" text-[0.9rem]">John Lewis ANYDAY</p>
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

                        <div className="mb-6 border-t-[2px]  border-gray-200 border-dashed mt-1 pt-6">
                            <h2 className="text-gray-700 dark:text-light3 font-semibold mb-2">Description:</h2>
                            <p className="text-[0.9rem] dark:text-light2 text-gray-600">
                                {description}
                                <button className="text-blue-600 hover:underline ml-1">See More...</button>
                            </p>
                        </div>

                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">

                            </div>
                        </div>

                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-2">

                                <button className="text-gray-600 text-[0.8rem] underline">View Size Chart</button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4 mt-auto">
                            <button className="grow py-3 px-6 bg-[#0FABCA] hover:bg-[#0FABCA]/90 rounded-md text-white">
                                Register Now
                            </button>
                            <button className="grow py-3 px-6 border border-gray-300 text-gray-600 rounded-md">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
