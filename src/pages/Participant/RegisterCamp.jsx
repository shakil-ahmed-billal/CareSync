import { Table } from "flowbite-react"
import {useQuery} from '@tanstack/react-query'
import useAuth from "../../hooks/useAuth"
import useAxiosPublic from "../../hooks/useAxiosPublic"
import { Banknote, CircleX } from 'lucide-react'

const RegisterCamp = () => {

    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()

    const {data: registerCamp} = useQuery({
        queryKey: ['register:email' , user?.email],
        queryFn: async () =>{
            const {data} = await axiosPublic.get(`/registerCamp/${user?.email}`)
            return data
        }
    })

    console.log(registerCamp)
    return (
        <div className="mt-20">
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Camp name</Table.HeadCell>
                        <Table.HeadCell>Camp Fee</Table.HeadCell>
                        <Table.HeadCell>Participant Name</Table.HeadCell>
                        <Table.HeadCell>Payment Status</Table.HeadCell>
                        <Table.HeadCell>Confirmation Status</Table.HeadCell>
                        <Table.HeadCell>Cancel</Table.HeadCell>
                        <Table.HeadCell>Feedback</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {registerCamp?.map(item => <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item?.campName}
                            </Table.Cell>
                            <Table.Cell>$ {item?.campFee}</Table.Cell>
                            <Table.Cell>{item?.participantName}</Table.Cell>
                            <Table.Cell>{item?.paymentStatus === "paid"? "Paid": <p className="flex items-center gap-1"><Banknote />Pay</p>}</Table.Cell>
                            <Table.Cell>{item?.confirmationStatus}</Table.Cell>
                            <Table.Cell><CircleX className="text-red-500" /></Table.Cell>
                            <Table.Cell>{item?.feedback}</Table.Cell>
                        </Table.Row>)}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default RegisterCamp
