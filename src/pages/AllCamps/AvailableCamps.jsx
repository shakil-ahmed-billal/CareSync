
import { Select } from "flowbite-react"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import CampCard from "../../components/CampCard/CampCard"
import useCamps from "../../hooks/useCamps"

const AvailableCamps = () => {

    
    const { result } = useLoaderData()


    console.log(result)
    // pagination function make
    const [itemPerPage, setItemPerPage] = useState(6)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(result / itemPerPage)
    const pages = [...Array(numberOfPages).keys()];
    const handlePage = (data) => {
        setItemPerPage(data)
        setCurrentPage(0)
    }

    const [camps] = useCamps({currentPage, itemPerPage})
    return (
        <div className="dark:text-light2 py-10">

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
