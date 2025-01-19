
import { Textarea } from "flowbite-react";

import { useState } from "react";

// react icons
import { FaStar } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { PiShareFatLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReviewCard = ({ id, refetch , setOpenReview}) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const handleFeedback = async (e) => {
        e.preventDefault()
        const review = e.target.feedback.value;
        const reviewInfo = {
            name: user?.displayName,
            review,
            email: user?.email,
            registerId: id,
            rating: rating,
            photo: user?.photoURL
        }
        console.log(reviewInfo)
        const { data } = await axiosSecure.post('/feedback', reviewInfo)
        if (data.result.insertedId) {
            console.log('data add')
            setOpenReview(false)
            Swal.fire({
                title: "Review Done!",
                text: "Your review has been taken",
                icon: "success"
              });
            refetch()
        }
        console.log(data)
    }

    return (
        <div
            className=" boxShadow rounded-md  w-full p-4 sm:p-8 dark:text-light3">

            <h3 className="text-[24px] font-semibold text-center">Session
                feedback</h3>
            <p className="text-[14px] font-[400] text-center">
                Please rate your experience below
            </p>

            <div
                className="flex items-center sm:flex-row flex-col sm:space-x-12 w-full my-[20px] justify-center">
                <div className="flex items-center space-x-6 justify-center mb-[10px]">
                    {[...Array(5)].map((_, index) => {
                        const starRating = index + 1;
                        return (
                            <FaStar
                                key={starRating}
                                className={`cursor-pointer ${starRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                size={26}
                                onClick={() => setRating(starRating)}
                                onMouseEnter={() => setHover(starRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        );
                    })}
                </div>
                <span className="">4/5 stars</span>
            </div>

            <form onSubmit={handleFeedback}>
                <label className="">Additional feedback</label>
                <Textarea placeholder="My feedback!!"
                    name="feedback"
                    className="w-full border-gray-400 resize-none outline-none focus:border-primary border rounded-md p-2 min-h-[100px]">
                </Textarea>
                <button className={`py-2 px-4 border border-r-blue-400 rounded-md w-full mt-[10px]`}>Submit feedback
                </button>
            </form>

            <div className="flex items-center my-[10px]">
                <div className="h-[1px] w-full bg-gray-200"></div>
                <span className="">or</span>
                <div className="h-[1px] w-full bg-gray-200"></div>
            </div>

            <div
                className="flex sm:flex-row flex-col items-center justify-between gap-[15px]">
                <Link to={'/'} className="w-full"><button
                    className={`py-1.5 px-4 border border-r-blue-400 rounded-md w-full flex items-center justify-center gap-[10px]`}>
                    <GoHome className="text-[1.3rem]" />
                    Home
                </button></Link>
                <button
                    className={`py-1.5 px-4 border border-r-blue-400 rounded-md w-full flex items-center justify-center gap-[10px]`}>
                    <PiShareFatLight className="text-[1.3rem]" />
                    Rejoin session
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;
