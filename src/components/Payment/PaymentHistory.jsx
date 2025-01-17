import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import TransactionError from "../../error/TransactionError";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const PaymentHistory = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: history = [] } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic(`/payment-history/${user?.email}`)
            return data
        }
    })

    console.log(history)

    return (
        <div className="overflow-x-auto mt-20">
            {history && history[0] ? <Table>
                <TableHead>
                    <TableHeadCell>Payment Transaction</TableHeadCell>
                    <TableHeadCell>Camp Name</TableHeadCell>
                    <TableHeadCell>Camp Fee</TableHeadCell>
                    <TableHeadCell>Payment Status</TableHeadCell>
                    <TableHeadCell>Confirmation Status</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {history?.map(item => <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="text-green-400">{item?.transaction}</TableCell>
                        <TableCell>{item?.campName}</TableCell>
                        <TableCell>${item?.amount}</TableCell>
                        <TableCell>{item?.paymentStatus}</TableCell>
                        <TableCell>{item?.confirmationStatus}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table> : <TransactionError></TransactionError>}
        </div>
    )
}

export default PaymentHistory
