import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import useAuth from "./useAuth"

const useAdmin = () => {

  const { user } = useAuth()

  const { data: admin, isPending } = useQuery({
    queryKey: ['admin', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/${user?.email}`)
      return data.admin
    }
  })
  return [admin, isPending]
}

export default useAdmin
