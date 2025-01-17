
import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { BsEye, BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { HiMiniShare } from "react-icons/hi2";
import { Link } from "react-router-dom";


const CampCard = ({ camp }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const { _id, campName, healthcareName, campFee, date, time, campLocation, description, image, participantCount } = camp || {}

  return (
    <div className="">

      <i className="fa fa-lock"></i>
      <div className="shadow-lg dark:bg-dark2 rounded">
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
      </div>

    </div>
  );
};

export default CampCard;