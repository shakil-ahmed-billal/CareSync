import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useCamps = ({currentPage , itemPerPage}) => {
    const axiosPublic = useAxiosPublic()

    console.log(currentPage , itemPerPage)
    const { data: camps = [] , refetch} = useQuery({
        queryKey: ['all-camps' , currentPage , itemPerPage],
        queryFn: async () => {
            const { data } = await axiosPublic(`/all-camps?page=${currentPage}&size=${itemPerPage}`)
            return data
        }
    })
    return [camps , refetch]
}

export default useCamps
