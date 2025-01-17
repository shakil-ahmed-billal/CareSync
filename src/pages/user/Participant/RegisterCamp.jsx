import { useQuery } from '@tanstack/react-query'
import { Table } from "flowbite-react"
import ResultError from '../../../error/ResultError'
import useAuth from '../../../hooks/useAuth'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import RegisterRow from './RegisterRow'



const RegisterCamp = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: registerCamp, refetch } = useQuery({
        queryKey: ['register:email', user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/registerCamp/${user?.email}`)
            return data
        }
    })



    console.log(registerCamp)
    return (
        <div className="mt-20">
            <div className="overflow-x-auto">
                {registerCamp && registerCamp[0] ? <Table >
                    <Table.Head>
                        <Table.HeadCell>Camp name</Table.HeadCell>
                        <Table.HeadCell>Camp Fee</Table.HeadCell>
                        <Table.HeadCell>Participant Name</Table.HeadCell>
                        <Table.HeadCell>Payment Status</Table.HeadCell>
                        <Table.HeadCell>Confirmation Status</Table.HeadCell>
                        <Table.HeadCell>Cancel</Table.HeadCell>
                        <Table.HeadCell className='text-center'>Feedback</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {registerCamp?.map(item => <RegisterRow key={item._id} item={item} refetch={refetch}></RegisterRow>)}
                    </Table.Body>
                </Table> : <ResultError></ResultError>}
            </div>
        </div>
    )
}

export default RegisterCamp
