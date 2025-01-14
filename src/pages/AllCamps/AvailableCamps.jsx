import { useQuery } from "@tanstack/react-query"
import CampCard from "../../components/CampCard/CampCard"
import useAxiosPublic from "../../hooks/useAxiosPublic"

const AvailableCamps = () => {

    const axiosPublic = useAxiosPublic()

    const { data } = useQuery({
        queryKey: ['all-camps'],
        queryFn: async () => {
            const { data } = await axiosPublic('/all-camps')
            return data
        }
    })
    console.log(data)
    return (
        <div className="dark:text-light2">
            available camps details
            <div className="grid grid-cols-4 gap-5">
                {data?.map(item => <CampCard key={item._id}></CampCard>)}
                <CampCard></CampCard>
                <CampCard></CampCard>
                <CampCard></CampCard>
                <CampCard></CampCard>
            </div>
        </div>
    )
}

export default AvailableCamps
