import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Modal, Table} from "flowbite-react";
import { Banknote, CircleCheck, CircleX, MessagesSquare } from "lucide-react";
import { useState } from "react";
import StripePayment from "../../../components/Payment/StripePayment";
import ReviewCard from "../../../components/Review/ReviewCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const RegisterRow = ({ item, refetch }) => {


    const { _id, campName, campFee, participantName, paymentStatus, confirmationStatus, feedback } = item || {}

    const axiosSecure = useAxiosSecure()


    const handleDelete = async (id) => {
        const { data } = await axiosSecure.delete(`/registerCamp/${id}`)
        if (data.deletedCount > 0) {
            console.log('delete')
            refetch()
        }
        console.log(data)
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
                    {campName}
                </Table.Cell>
                <Table.Cell>$ {campFee}</Table.Cell>
                <Table.Cell>{participantName}</Table.Cell>
                <Table.Cell>{paymentStatus === "Paid" ? <p className='flex gap-1 items-center'><CircleCheck className="text-green-500 " /> Paid</p> : <p onClick={() => setOpenModal(true)} className="flex items-center gap-1 text-blue-500 cursor-pointer"><Banknote />Pay</p>}</Table.Cell>
                <Table.Cell>{confirmationStatus}</Table.Cell>
                <Table.Cell><CircleX onClick={() => handleDelete(_id)} className="text-red-500 cursor-pointer" /></Table.Cell>
                <Table.Cell className="flex justify-center items-center">{feedback === "feedback" ? <MessagesSquare onClick={() => setOpenReview(true)} className="cursor-pointer" /> : feedback === "N/A" ? "N/A" : <Rating style={{ maxWidth: 80 }} value={feedback} readOnly />}</Table.Cell>
            </Table.Row>
            {/* modal payment section */}
            <>
                <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="">
                            <StripePayment item={item}></StripePayment>
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
                            <ReviewCard refetch={refetch} id={_id}></ReviewCard>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
            {/* modal review section */}
        </>
    )
}

export default RegisterRow
