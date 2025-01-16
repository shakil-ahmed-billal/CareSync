import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"

const useCamps = () => {
    const axiosPublic = useAxiosPublic()

    const { data: camps = [] } = useQuery({
        queryKey: ['all-camps'],
        queryFn: async () => {
            const { data } = await axiosPublic('/all-camps')
            return data
        }
    })
    return [camps]
}

export default useCamps
