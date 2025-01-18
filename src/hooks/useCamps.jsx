import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useCamps = ({ currentPage, itemPerPage, search ,sortFee , sortRegister }) => {
    const axiosPublic = useAxiosPublic()

    console.log(currentPage, itemPerPage)
    const { data: camps = [], refetch } = useQuery({
        queryKey: ['all-camps', currentPage, itemPerPage, search ,sortFee , sortRegister],
        queryFn: async () => {
            const { data } = await axiosPublic(`/all-camps?page=${currentPage}&size=${itemPerPage}&search=${search}&sortFee=${sortFee}&sortRegister=${sortRegister}`)
            return data
        }
    })
    return [camps, refetch]
}

export default useCamps
