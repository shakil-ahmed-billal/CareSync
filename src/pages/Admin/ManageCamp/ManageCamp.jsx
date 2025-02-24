import { Select, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react";
import { Delete, Edit } from "lucide-react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCamps from "../../../hooks/useCamps";
const ManageCamp = () => {


  const [search, setSearch] = useState('')
  const [sortFee, setFee] = useState('')
  const [sortRegister, setRegister] = useState('')
  const axiosSecure = useAxiosSecure()


  const { result } = useLoaderData()
  const [itemPerPage, setItemPerPage] = useState(8)
  const [currentPage, setCurrentPage] = useState(0)
  const numberOfPages = Math.ceil(result / itemPerPage)
  const pages = [...Array(numberOfPages).keys()];
  const handlePage = (data) => {
    setItemPerPage(data)
    setCurrentPage(0)
  }

  const [camps, refetch, isLoading] = useCamps({ currentPage, itemPerPage, search, sortFee, sortRegister })

  const handleDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/delete-camp/${id}`)
    if (data.deletedCount > 0) {
      refetch()
    }
  }

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="mb-5 flex gap-3 items-center justify-center mt-5">
          <TextInput onChange={e => setSearch(e.target.value)} placeholder='Search'></TextInput>
          <Select defaultValue={''} onClick={e => setRegister(e.target.value)}>
            <option selected disabled value="">Most Registered</option>
            <option value="as">Low Registered</option>
            <option value="ds">High Registered</option>
          </Select>
          <Select defaultValue={''} onClick={e => setFee(e.target.value)}>
            <option selected disabled value="">Price Sort</option>
            <option value="as">Low Price</option>
            <option value="ds">High Price</option>
          </Select>
        </div>
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
                <Link to={`/camp/${item._id}`}><img src={item?.image} className="w-12 h-12 rounded-full object-cover" alt="" /></Link>
              </TableCell>
              <TableCell>{item?.campName}</TableCell>
              <TableCell>{item?.date} & {item?.time}</TableCell>
              <TableCell>{item?.campLocation}</TableCell>
              <TableCell>{item?.healthcareName}</TableCell>
              <TableCell className="flex items-center gap-5">
                <Link to={`/dashboard/updateCamp/${item?._id}`}><Edit className="text-blue-500"></Edit></Link>
                <Delete onClick={() => handleDelete(item?._id)} className="text-red-500 cursor-pointer"></Delete></TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </div>
      {/* pagination section */}
      <div className="w-full gap-2 flex flex-wrap justify-center mt-2">
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
