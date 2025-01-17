import { Card } from "flowbite-react"
import useAuth from "../../../hooks/useAuth"
import { format } from "date-fns";
import useAdmin from "../../../hooks/useAdmin";
import { BadgeAlert, BadgeCheck } from "lucide-react";
const OrganizerProfile = () => {

  const { user } = useAuth()
  const admin = useAdmin()

  return (
    <div>
      <div className="grid grid-cols-4 py-20">
        <div className="">
          <Card>
            <div className="flex flex-col items-center justify-center p-4 dark:text-light3">
              <div className="">
                <img className="rounded-full w-20 h-20" src={user?.photoURL} alt="" />
              </div>
              <p className="pt-2 text-green-400">Role: {admin? 'Organizer': 'Participant'}</p>
              <p className="flex items-center gap-2">Verify: {user?.emailVerified? <BadgeCheck className="text-green-400" />: <BadgeAlert className="text-red-500" />}</p>
              <div className="text-start space-y-2 mt-5">
              <p className="font-bold "> Name: {user?.displayName}</p>
              <p>Email: {user?.email}</p>
              {user&& <div className="space-y-2">
                <p>AC create: {format(new Date(user?.metadata?.creationTime), "P")}</p>
              <p>Last Login: {format(new Date(user?.metadata?.lastSignInTime), "P")}</p></div>}
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-3">

        </div>
      </div>
    </div>
  )
}

export default OrganizerProfile
