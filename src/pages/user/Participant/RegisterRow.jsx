import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Modal, Table } from "flowbite-react";
import { Banknote, BriefcaseConveyorBelt, CircleCheck, CircleDollarSign, CircleX,  MessagesSquare } from "lucide-react";
import { useState } from "react";
import Swal from 'sweetalert2';
import StripePayment from '../../../components/Payment/StripePayment';
import ReviewCard from "../../../components/Review/ReviewCard";
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from 'react-router-dom';



const RegisterRow = ({ item, refetch }) => {


    const { _id, campName, campFee, campId, participantName, paymentStatus, confirmationStatus, feedback } = item || {}

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this camp!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/registerCamp/${id}`)
                if (data.deletedCount > 0) {
                  
                    Swal.fire({
                        title: "Deleted!",
                        text: "this camp has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }


    // payment or modal function section
    const [openModal, setOpenModal] = useState(false);
    const [openReview, setOpenReview] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }
    function onCloseReview() {
        setOpenReview(false);
    }
    return (
        <>
            <div className="">

            </div>
            <Table.Row key={_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                   <Link to={`/camp/${campId}`}> {campName}</Link>
                </Table.Cell>
                <Table.Cell>$ {campFee}</Table.Cell>
                <Table.Cell>{participantName}</Table.Cell>
                <Table.Cell>{paymentStatus === "Paid" ? <p className='flex gap-1 items-center'><CircleCheck className="text-green-500 " /> Paid</p> : <p onClick={() => setOpenModal(true)} className="flex items-center gap-1 text-blue-500 cursor-pointer"><Banknote />Pay</p>}</Table.Cell>
                <Table.Cell>{confirmationStatus}</Table.Cell>
                <Table.Cell><button disabled={paymentStatus === "Paid"}><CircleX onClick={() => handleDelete(_id)} className="text-red-500 " /></button></Table.Cell>
                <Table.Cell className="flex justify-center items-center">{feedback === "feedback" ? <MessagesSquare onClick={() => setOpenReview(true)} className="cursor-pointer" /> : feedback === "N/A" ? "N/A" : <Rating style={{ maxWidth: 80 }} value={feedback} readOnly />}</Table.Cell>
            </Table.Row>
            {/* modal payment section */}
            <>
                <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                    <Modal.Header className='bg-gray-800 ' />
                    <Modal.Body className='bg-gray-800 '>
                        <div className="w-7/12 mx-auto text-light3 pb-3 space-y-1">
                            <p className='flex items-center gap-2'>
                                <CircleDollarSign /> Camp Fee: {campFee}
                            </p>
                            <p className='flex items-center gap-2'>
                                <BriefcaseConveyorBelt /> {campName}
                            </p>

                        </div>
                        <div className="mb-7">
                            <div className="flex flex-col justify-around bg-gray-800 p-4 border border-white border-opacity-30 rounded-lg shadow-md max-w-xs mx-auto">
                                <div className="flex flex-row items-center justify-between mb-3">
                                    <p className='text-sm text-light3'>{user?.displayName}</p>
                                    <div className="flex items-center justify-center relative w-14 h-9 bg-gray-800 border border-white border-opacity-20 rounded-md">
                                        <svg className="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48">
                                            <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                                            <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                                            <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex py-2 flex-col space-y-3">
                                    <StripePayment refetch={refetch} setOpenModal={setOpenModal} item={item}></StripePayment>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
            {/* modal payment section */}
            {/* modal review section */}
            <>
                <Modal show={openReview} size="xl" onClose={onCloseReview} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="">
                            <ReviewCard setOpenReview={setOpenReview} refetch={refetch} id={_id}></ReviewCard>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
            {/* modal review section */}
        </>
    )
}

export default RegisterRow
