import { useQuery } from '@tanstack/react-query';
import { format } from "date-fns";
import { Button, Modal } from "flowbite-react";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { useState } from "react";
import bg from '../../../assets/profile-bg.png';
import ProfileUpdate from "../../../components/ProfileUpdate/ProfileUpdate";
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading/Loading';

const OrganizerProfile = () => {

  const { user } = useAuth()
  const admin = useAdmin()
  const axiosSecure = useAxiosSecure()


  // user profile update state or function
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const { data: profileData , isLoading} = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`)
      return data
    }
  })

  if (isLoading) {
    return <Loading></Loading>
}

  return (
    <div>
      <div className=" pt-20">
        <div className="">
          <div>
            <div className="flex flex-col items-center justify-center p-4 dark:text-light3">
              <div className="w-full  relative">
                <img className="w-full hidden md:flex object-cover md:h-full h-screen" src={bg} alt="" />
                <div className="md:absolute top-10 right-[45%]">
                  <div className="flex items-center flex-col justify-center">
                    <img className="rounded-full w-28 h-28" src={user?.photoURL} alt="" />
                    <p className="pt-2 text-green-400">Role: {admin ? 'Organizer' : 'Participant'}</p>
                    <p className="flex items-center gap-2">Verify: {user?.emailVerified ? <BadgeCheck className="text-green-400" /> : <BadgeAlert className="text-red-500" />}</p>
                  </div>

                  <div className="text-start space-y-2 mt-5">
                    <p className="font-bold "> Name: {user?.displayName}</p>
                    <p>Email: {user?.email}</p>
                    {user && <div className="space-y-2">
                      <p>AC create: {format(new Date(user?.metadata?.creationTime), "P")}</p>
                      <p>Last Login: {format(new Date(user?.metadata?.lastSignInTime), "P")}</p>
                    </div>}
                    <p className="font-bold "> Address: {profileData?.address || "No data found"}</p>
                  </div>
                  <div className="flex items-center justify-center mt-10">
                    <Button onClick={() => setOpenModal(true)}>Update Profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal components */}
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <ProfileUpdate></ProfileUpdate>
        </Modal.Body>
      </Modal>
      {/* modal components */}
    </div>
  )
}

export default OrganizerProfile
