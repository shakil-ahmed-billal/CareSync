import { format } from "date-fns";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { BadgeAlert, BadgeCheck, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../API/ImageAPI";
import bg from '../../../assets/profile-bg.png';
import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";


const OrganizerProfile = () => {

  const { user, userProfile } = useAuth()
  const admin = useAdmin()
  const [imageLink, setImageLink] = useState("");

  const [image, setImage] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()


  // user image profile function
  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file)
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageLink(imageURL);
    }
  };


  // user profile update state or function
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  const handleUpdate = async (data) => {

    const imageURL = image ? await imageUpload() : user?.photoURL;

    userProfile({ displayName: data?.name, photoURL: imageURL })
      .then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    console.log(imageURL, data.name)
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
                      <p>Last Login: {format(new Date(user?.metadata?.lastSignInTime), "P")}</p></div>}
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
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update Your Profile Information</h3>
            {/* yser profile image section */}
            <div className=" text-center dark:text-light2 flex flex-row-reverse justify-center items-center gap-3 py-5">
              <input
                type="file"
                name="image"
                id="fourthImage"
                className="w-28"
                onChange={handleFileChange} />
              <div className="w-[100px] h-[100px] rounded-full border border-[#e5eaf2] flex items-center justify-center">
                {!imageLink ? (
                  <UserRoundPen className="size-10 text-[#e5eaf2]" />
                ) : (
                  <img
                    src={imageLink}
                    alt="image"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
            </div>
            {/* yser profile image section */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Full Name" />
              </div>
              <TextInput
                id="name"
                placeholder="name"
                onChange={(event) => setEmail(event.target.value)}
                required
                {...register('name')}
                name="name"
              />
            </div>
            <div className="w-full flex justify-center">
              <button> <Button onClick={handleUpdate}>Update</Button></button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* modal components */}
    </div>
  )
}

export default OrganizerProfile
