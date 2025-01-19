
import { Card } from "flowbite-react";
import { CalendarDays, CircleUserRound, GitFork, MapPinned, Timer } from "lucide-react";
import { Link } from "react-router-dom";


const CampCard = ({ camp }) => {


  const { _id, campName, healthcareName, campFee, date, time, campLocation, description, image, participantCount } = camp || {}

  return (
    <Card
      className="max-w-sm "
      imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
    // imgSrc={image}

    >
      <div className="h-48 w-full relative">
        <img
          src={image}
          alt="Apple Watch Series 7 in colors pink, silver, and black"
          className="object-cover h-full w-full"
        />
        <p className="absolute top-0 right-0 bg-gray-500 p-2 rounded-full flex items-center bg-opacity-60"><GitFork /> {participantCount}</p>
      </div>
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {campName}
        </h5>
      </a>
      <div className="space-y-1">
        <p className=" flex items-center gap-1"><Timer /> {time}</p>
        <p className=" flex items-center gap-1"><CalendarDays /> {date}</p>
        <p className=" flex items-center gap-1"> <CircleUserRound />{healthcareName}</p>
        <p className="flex items-center gap-1"><MapPinned />{campLocation}</p>
        <p></p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">${campFee}</span>
        <Link  to={`/camp/${_id}`}>
          <a
            href="#"
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Details
          </a></Link>
      </div>
    </Card>
  );
};

export default CampCard;

{/* <div className="">
        <img
          src={image}
          alt=""
          className="w-full h-[200px]  object-cover"
        />
        <div className="flex w-full justify-between items-center p-2">
          <div className="flex  items-center gap-4">
            <div className=" flex flex-col items-center">
              <h2 className="font-semibold">{campName}</h2>
            </div>
          </div>
          <BsThreeDotsVertical className="text-text rounded-full text-[2.5rem] p-2 hover:bg-[#ececec] cursor-pointer" />
        </div>

        <p className="text-text p-2">
          <div className="flex flex-row ">
            <button className="flex flex-row ">
              {" "}
              <BsEye className="text-2xl p-1" /> 50
            </button>
            <button className="flex flex-row ">
              <BiLike className="text-2xl p-1" /> 10
            </button>
          </div>
          {description.slice(0, 100)}
        </p>

        <div className="flex items-center justify-between w-full p-2 ">
          <div className="flex flex-col items-center gap-4 ">
            <div>
              {" "}
              <p className="text-text text-[0.9rem]">Price : ${campFee}</p>{" "}
            </div>
            <div className="flex flex-row gap-5">
              <FaHeart
                className={`${isFavorite ? "text-[#ff3d3d]" : "text-text"
                  } text-[1.4rem] cursor-pointer`}
                onClick={() => setIsFavorite(!isFavorite)}
              />
              <HiMiniShare className="text-text text-[1.4rem] cursor-pointer" />
            </div>
          </div>
          <Link to={`/camp/${_id}`}><button className="btn p-3 rounded border bg-black text-white hover:bg-blue-700 hover:text-white">
            Details
          </button></Link>
        </div>
      </div> */}