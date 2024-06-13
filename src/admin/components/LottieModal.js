import React from "react";
import Lottie from "lottie-react";
import SuccessAnimation from "../../assets/admin/SuccessAnimation.json";

const LottieModal = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white flex flex-col justify-evenly items-center p-10 rounded-lg w-[360px] h-[250px]">
        <div className="">
          <Lottie animationData={SuccessAnimation} loop={true} style={{ height: "50px" }} />
        </div>
        <p>{message}</p>
        <button className="bg-[#3a6afd] w-[100px] p-2 rounded-md text-white" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
};

export default LottieModal;
