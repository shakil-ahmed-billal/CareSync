import { useQuery } from "@tanstack/react-query"
import { Card } from "flowbite-react"
import { HandCoins, Nfc, Star, TicketPlus } from "lucide-react"
import PieChartAnalytics from "../../../components/Chart/PieChartAnalytics"
import TableChart from "../../../components/Chart/TableChart"
import Loading from "../../../components/Loading/Loading"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"


const UserAnalytics = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: analytic = {}, isLoading } = useQuery({
        queryKey: ['analytics', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/analytics/${user?.email}`)
            return data
        }
    })


    if (isLoading) {
        return <Loading></Loading>
    }
    
    return (
        <div>
            <div>
                <div className="dark:text-light3">
                    <p className="text-4xl font-bold ml-20 mt-5 mb-10">Overview</p>
                    <div className="grid md:grid-cols-4 gap-3">
                        <Card className="">
                            <HandCoins />
                            <p>Total Payment</p>
                            <div className="flex items-center gap-2">
                                <p className="text-4xl font-bold">{analytic?.payment}</p>
                                <p className="bg-green-300 px-2 py-1 border border-green-500 bg-opacity-50">2.31%</p>
                            </div>
                        </Card>
                        <Card className="">
                            <TicketPlus />
                            <p>Total Register</p>
                            <div className="flex items-center gap-2">
                                <p className="text-4xl font-bold">{analytic?.register}</p>
                                <p className="bg-green-300 px-2 py-1 border border-green-500 bg-opacity-50">2.31%</p>
                            </div>
                        </Card>
                        <Card className="">
                            <Star />
                            <p>Reviews</p>
                            <div className="flex items-center gap-2">
                                <p className="text-4xl font-bold">{analytic?.review}</p>
                                <p className="bg-green-300 px-2 py-1 border border-green-500 bg-opacity-50">2.31%</p>
                            </div>
                        </Card>
                        <Card className="">
                            <Nfc />
                            <p>Spend Amount</p>
                            <div className="flex items-center gap-2">
                                <p className="text-4xl font-bold">$ {analytic?.totalAmount}</p>
                                <p className="bg-green-300 px-2 py-1 border border-green-500 bg-opacity-50">2.31%</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5 h-full">
                <div className="h-full flex items-center justify-center">
                    <TableChart></TableChart>
                </div>
                <div className="">
                    <PieChartAnalytics></PieChartAnalytics>
                </div>
            </div>
        </div>
    )
}

export default UserAnalytics
