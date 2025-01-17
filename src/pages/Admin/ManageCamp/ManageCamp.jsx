import { Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Delete, Edit } from "lucide-react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useCamps from "../../../hooks/useCamps";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const ManageCamp = () => {

  const { result } = useLoaderData()
  const axiosPublic = useAxiosPublic()
  const [itemPerPage, setItemPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(0)
  const numberOfPages = Math.ceil(result / itemPerPage)
  const pages = [...Array(numberOfPages).keys()];
  const handlePage = (data) => {
    setItemPerPage(data)
    setCurrentPage(0)
  }

  const [camps , refetch] = useCamps({ currentPage, itemPerPage })

  const handleDelete = async(id)=>{
    const {data} = await axiosPublic.delete(`/delete-camp/${id}`)
    if(data.deletedCount >0){
      refetch()
    }
    console.log(data)
  } 

  return (
    <div>
      <div className="overflow-x-auto pt-20">
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
                <Link to={`/dashboard/updateCamp/${item?._id}`}><Edit className="text-blue-500"></Edit></Link>
                <Delete onClick={()=>handleDelete(item?._id)} className="text-red-500 cursor-pointer"></Delete></TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </div>
      {/* pagination section */}
      <div className="w-full gap-2 flex flex-wrap justify-center mb-10">
        {pages.map(item =>
          <button
            onClick={() => setCurrentPage(item)}
            className={currentPage == item ? ' bg-gradient-to-r from-pink-500 to-orange-500 text-white dark:border-white border-white border-2 font-bold w-10 h-10 rounded-full ' : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold w-10 h-10 rounded-full'}
            key={item}>{item}
          </button>)}
        <Select
          onChange={(e) =>
            handlePage(parseInt(e.target.value))}
          id="countries" required>
          <option selected disabled value='Web Development'>{itemPerPage}</option>
          <option value='2'>2</option>
          <option value='4'>4</option>
          <option value='6'>6</option>
          <option value='8'>8</option>

        </Select>
      </div>
    </div>
  )
}

export default ManageCamp
