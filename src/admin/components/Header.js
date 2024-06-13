import React, { useEffect, useState } from "react";
import userProfile from "../../assets/admin/user.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full  border ">
      <div className=" h-[50px] p-3 flex justify-between">
        <div className="flex items-center">
          <h1 className="font-[600px] text-[24px] ">
            Elite Engineering Admin Panel
          </h1>
        </div>
        <div className="flex items-center relative">
          <img
            src={userProfile}
            alt=""
            className="w-[30px] h-[30px] mr-2 rounded-full"
          />
          <p className="mr-2 cursor-pointer" onClick={toggleModal}>
            {user.name}
          </p>
          <i
            class="fa-solid fa-angle-down cursor-pointer"
            onClick={toggleModal}
          ></i>
        </div>
        {showModal && (
          <div className=" w-[150px] mt-[40px] right-0 h-[50px] absolute float-right ">
            <div className="bg-white">
              <ul className="font-semibold">
                <li
                  className="flex items-center cursor-pointer p-2 border-b"
                  onClick={() => {
                    navigate("/admin/logout");
                    toggleModal();
                  }}
                >
                  Logout
                </li>
                <li
                  className="flex items-center cursor-pointer p-2"
                  onClick={() => {
                    navigate("/admin/changePassword");
                    toggleModal();
                  }}
                >
                  Change Password
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
