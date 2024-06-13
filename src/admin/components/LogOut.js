import React from "react";
import Lottie from "lottie-react";
import LogoutAnimation from "../../assets/admin/LogoutAnimation.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LogOut = () => {
  const navigate = useNavigate();

  // ***********  Logout  *************
  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/user/logout`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       localStorage.removeItem("token");
  //       navigate("/admin");
  //     } else {
  //       toast.error(response?.data?.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };


  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/admin')
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px] h-[300px] flex flex-col justify-center items-center ">
        <div className="">
          <Lottie
            animationData={LogoutAnimation}
            loop={true}
            style={{ height: "50px" }}
          />
        </div>
        <h1 className="text-[18px] font-semibold mb-4">
          Are you sure you want to logout?
        </h1>
        <div>
          <button
            className="w-[100px] border-2 px-4 py-2 rounded-md mr-2"
            onClick={() => navigate("/admin/projectCategory")}
          >
            No
          </button>
          <button
            className="bg-blue-500 w-[100px] text-white px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
