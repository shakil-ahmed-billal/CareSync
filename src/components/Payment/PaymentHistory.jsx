import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import TransactionError from "../../error/TransactionError";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import { CircleCheck } from "lucide-react";


const PaymentHistory = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: history = [] , isLoading } = useQuery({
        queryKey: ['payment-history', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/payment-history/${user?.email}`)
            return data
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }

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
                        <TableCell className="flex items-center gap-2">{item?.paymentStatus} <CircleCheck className="text-green-500 " /></TableCell>
                        <TableCell>{item?.confirmationStatus}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table> : <TransactionError></TransactionError>}
        </div>
    )
}

export default PaymentHistory
