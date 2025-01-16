import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import useCamps from "../../../hooks/useCamps";
import { Delete, Edit } from "lucide-react";
const ManageCamp = () => {

  const [camps] = useCamps()

  return (
    <div>
      <div className="overflow-x-auto mt-20">
        <Table>
          <TableHead>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Camp Name</TableHeadCell>
            <TableHeadCell>Date & Time</TableHeadCell>
            <TableHeadCell>Location</TableHeadCell>
            <TableHeadCell>Healthcare Name</TableHeadCell>
            <TableHeadCell>Action Button</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {camps.map(item => <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>
                <img src={item?.image} className="w-12 h-12 rounded-full object-cover" alt="" />
              </TableCell>
              <TableCell>{item?.campName}</TableCell>
              <TableCell>{item?.date} & {item?.time}</TableCell>
              <TableCell>{item?.campLocation}</TableCell>
              <TableCell>{item?.healthcareName}</TableCell>
              <TableCell className="flex items-center gap-5">
                <Edit className="text-blue-500"></Edit> 
                <Delete className="text-red-500"></Delete></TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageCamp
