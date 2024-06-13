import React from "react";
import logo from "../../assets/admin/elite logo 1.png";
import { Link, useLocation } from "react-router-dom";
import { FaBell,  FaUser } from "react-icons/fa";
import { FaFileLines } from "react-icons/fa6";
import { RiEditBoxFill, RiLogoutBoxRFill } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";


const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="border w-[250px] h-screen">
      <div className=" h-full">
        <div className="p-6 ">
          <img src={logo} alt="" className="h-[45px] w-[80px] mb-10 " />
        </div>
        <div className="flex justify-center">
          <ul className="h-auto flex flex-col w-[100%]  text-[#b1b1b1]">
            <Link to="/admin/projectCategory">
              <div
                className={`flex items-center mb-2 p-2 ${
                  location.pathname === "/admin/projectCategory"
                    ? "text-blue-500 border-l-4 rounded border-blue-500"
                    : ""
                }`}
              >
                <FaFileLines size={"20px"} />{" "}
                <li className="ml-4 font-[500] text-[16px]">
                  Project Category
                </li>
              </div>
            </Link>
            <Link to="/admin/editProject">
              <div
                className={`flex items-center mb-2 p-2 ${
                  location.pathname === "/admin/editProject"
                    ? "text-blue-500 border-l-4 rounded border-blue-500"
                    : ""
                }`}
              >
                <RiEditBoxFill size={"20px"} />{" "}
                <li className="font-[500] text-[16px] ml-4">Edit Projects</li>
              </div>
            </Link>
            <Link to="/admin/editTestimonial">
              <div
                className={`flex items-center mb-2 p-2 ${
                  location.pathname === "/admin/editTestimonial"
                    ? "text-blue-500 border-l-4 rounded border-blue-500"
                    : ""
                }`}
              >
                <FaUser size={"20px"} />
                <li className="font-[500] text-[16px] ml-4">
                  Edit Testimonials
                </li>
              </div>
            </Link>
            <Link to="/admin/addTeam">
              <div
                className={`flex items-center mb-2 p-2 ${
                  location.pathname === "/admin/addTeam"
                    ? "text-blue-500 border-l-4 rounded border-blue-500"
                    : ""
                }`}
              >
                <HiMiniUsers size={"20px"} />{" "}
                <li className="font-[500] text-[16px] ml-4">Add Team</li>
              </div>
            </Link>
            <Link to="/admin/notification">
              <div
                className={`flex items-center mb-2 p-2 ${
                  location.pathname === "/admin/notification"
                    ? "text-blue-500 border-l-4 rounded border-blue-500"
                    : ""
                }`}
              >
                <FaBell size={"20px"} />{" "}
                <li className="font-[500] text-[16px] ml-4">Notification</li>
              </div>
            </Link>
            <Link to="/admin/logout">
              <div
                className={`flex items-center mb-2 p-2 ${
                  location.pathname === "/admin/logout"
                    ? "text-blue-500 border-l-4 rounded border-blue-500"
                    : ""
                }`}
              >
                <RiLogoutBoxRFill size={"20px"} />
                <li className="font-[500] text-[16px] ml-4">LogOut</li>
              </div>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
