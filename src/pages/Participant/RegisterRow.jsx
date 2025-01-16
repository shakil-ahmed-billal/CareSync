import { Modal, Table } from "flowbite-react";
import { Banknote, CircleX } from "lucide-react";
import { useState } from "react";
import StripePayment from "../../components/Payment/StripePayment";
import useAxiosPublic from "../../hooks/useAxiosPublic";




const RegisterRow = ({ item, refetch }) => {


    const { _id, campName, campFee, participantName, paymentStatus, confirmationStatus, feedback } = item || {}
    const axiosPublic = useAxiosPublic()


    const handleDelete = async (id) => {
        const { data } = await axiosPublic.delete(`/registerCamp/${id}`)
        if (data.deletedCount > 0) {
            console.log('delete')
            refetch()
        }
        console.log(data)
    }


    // payment or modal function section
    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }
    return (
        <>
            <Table.Row key={_id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {campName}
                </Table.Cell>
                <Table.Cell>$ {campFee}</Table.Cell>
                <Table.Cell>{participantName}</Table.Cell>
                <Table.Cell>{paymentStatus === "paid" ? "Paid" : <p onClick={() => setOpenModal(true)} className="flex items-center gap-1 text-blue-500 cursor-pointer"><Banknote />Pay</p>}</Table.Cell>
                <Table.Cell>{confirmationStatus}</Table.Cell>
                <Table.Cell><CircleX onClick={() => handleDelete(_id)} className="text-red-500 cursor-pointer" /></Table.Cell>
                <Table.Cell>{feedback}</Table.Cell>
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
        </>
    )
}

export default RegisterRow
