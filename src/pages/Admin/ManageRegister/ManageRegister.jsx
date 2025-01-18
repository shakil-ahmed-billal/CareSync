import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { BadgeCheck, Ban, ShieldCheck } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageRegister = () => {

  
  const axiosSecure = useAxiosSecure()


  const { data: registerCamp = [], refetch } = useQuery({
    queryKey: ['manage-register'],
    queryFn: async () => {
      const { data } = await axiosSecure('/manage-register')
      return data
    }
  })

  const handleDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/registerCamp/${id}`)
    if (data.deletedCount > 0) {
      refetch()
    }
    console.log(data)
  }

  return (
    <div>
      <div className="overflow-x-auto mt-20">
        <Table>
          <TableHead>
            <TableHeadCell>Camp Name</TableHeadCell>
            <TableHeadCell>Camp Fee</TableHeadCell>
            <TableHeadCell>Participant Name</TableHeadCell>
            <TableHeadCell>Payment Status</TableHeadCell>
            <TableHeadCell>Confirmation Status</TableHeadCell>
            <TableHeadCell>Action Button</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {registerCamp.map(item => <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{item?.campName}</TableCell>
              <TableCell>$ {item?.campFee}</TableCell>
              <TableCell>{item?.participantName}</TableCell>
              <TableCell>{item?.paymentStatus === "Paid" ? <p className="flex items-center gap-1"><BadgeCheck className="text-green-400" /> Paid</p> : 'Unpaid'}</TableCell>
              <TableCell>{item?.confirmationStatus}</TableCell>
              <TableCell>
                {item?.paymentStatus === "Paid" ? <Ban className="text-rose-500" /> : <ShieldCheck onClick={() => handleDelete(item?._id)} className="text-green-500 cursor-pointer" />}
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageRegister
