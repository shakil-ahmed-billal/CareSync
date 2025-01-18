
import { Select, TextInput } from "flowbite-react"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import CampCard from "../../components/CampCard/CampCard"
import useCamps from "../../hooks/useCamps"

const AvailableCamps = () => {


    const { result } = useLoaderData()
    const [search, setSearch] = useState('')
    const [sortFee, setFee] = useState('')
    const [sortRegister, setRegister] = useState('')

    console.log(sortFee, sortRegister)
    // pagination function make
    const [itemPerPage, setItemPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(result / itemPerPage)
    const pages = [...Array(numberOfPages).keys()];
    const handlePage = (data) => {
        setItemPerPage(data)
        setCurrentPage(0)
    }

    const [camps] = useCamps({ currentPage, itemPerPage, search , sortFee , sortRegister })
    return (
        <div className="dark:text-light2 py-10">
            <div className="mb-5 flex gap-3 items-center justify-center">
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
            <div className="grid md:grid-cols-4 gap-5">
                {camps?.map(item => <CampCard camp={item} key={item._id}></CampCard>)}
            </div>
            {/* pagination section */}
            <div className="w-full gap-2 flex flex-wrap justify-center py-10">
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

export default AvailableCamps
