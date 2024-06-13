import React, { useState } from "react";
import login_bg from "../assets/admin/login_bg.png";
import logo from "../assets/admin/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();

  // ********  Store Form Input Details  ************
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // ********  Password Hide And View ****************
  const [show, setShow] = useState(false);

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ************ Submit Form Data ***************8
  const handleSubmit = async (e) => {
    e.preventDefault();


    // *************  Email Validation ****************
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warn("Invalid email address");
      return;
    }

    // *********** Password Validation *************

    const validatePassword = (password) => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };
  

    if (!validatePassword(formData.password)) {
      toast.warn("Password must contain at least 8 characters");
      return;
    }


    // *******  Login  **********
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        formData
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin/projectCategory");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(
        error.message === "Request failed with status code 401"
          ? "Credentials are invalid"
          : error.message
      );
      console.log(error);
    }
  };


  return (
    <div className="w-full p-6 h-[100vh] bg-[#ececec]">
      <div className="w-full flex   h-full ">
        {/* ******  Left Div ********* */}
        <div
          className="w-[50%] bg-[#09175e]  rounded-tl-[32px]  rounded-bl-[32px] bg-cover"
          style={{ backgroundImage: `url(${login_bg})` }}
        >
          <img
            src={logo}
            alt=""
            className="h-[66px] w-[219px] relative left-[30px] top-[30px]"
          />
          <div className=" text-white relative top-[200px] left-[40px] w-[80%]">
            <div className="mb-2 ">
              <p className="font-semibold">Address: </p>
              <p className="text-gray-300">
                52, Jansukh Apt., Kasturba <br /> Rd. Kandivali W, Mumbai-67
              </p>
            </div>

            <div className="mb-2">
              <p className="font-semibold">Phone: </p>
              <p className="text-gray-300">+91 - 808-276-3379</p>
            </div>

            <div className="mb-2">
              <p className="font-semibold">Email: </p>
              <p className="text-gray-300">info@eliteengineers.tech</p>
            </div>
          </div>
        </div>

        {/* ******* Right Div ********** */}
        <div className="w-[50%] rounded-tr-[32px] bg-white rounded-br-[32px] flex justify-center items-center">
          <div className="border w-[70%] h-[400px] flex flex-col justify-center items-center rounded-3xl">
            <h1 className="text-center mb-8 text-xl font-semibold ">
              Log In👋
            </h1>
            <form
              className="w-[90%] flex flex-col justify-between "
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label>Email or Username</label> <br />
                <input
                  type="text"
                  placeholder="eg. aniket@gmail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#f9f8f9] p-2 w-full outline-none rounded-md mt-2"
                />{" "}
                <br />
              </div>

              <div className="mb-6 relative">
                <label>Password</label> <br />
                <input
                  type={show ? "text" : "password"}
                  placeholder="eg. nfkfnk"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-[#f9f8f9] p-2 w-full outline-none rounded-md mt-2"
                />
                <p
                  className="absolute right-2 top-[45px]  cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <VscEye size={"20px"} />
                  ) : (
                    <VscEyeClosed size={"20px"} />
                  )}
                </p>
                <br />
              </div>

              <button className="bg-[#3a6afd] p-2 rounded-md mb-2 text-white">
                Log In
              </button>
              <div>
                <input type="checkbox" /> Remember Me
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
