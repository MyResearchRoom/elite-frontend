import React, { useState } from "react";
import logo from "../../assets/admin/logo.png";

import Email from "../../assets/admin/Email.png";
import Lock from "../../assets/admin/Lock.png";
import axios from "axios";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const navigate = useNavigate();

  // ********  store Form Data ********
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ********  Hide and View Password  ************
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // ********* Submit Data ***************
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    // *******  Password Validation **********
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!password.match(passwordRegex)) {
      toast.error(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords are not matching.");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/change-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password change successfully");
        navigate("/admin/projectCategory");
      } else {
        toast.error(response?.status?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full p-6 h-[100vh] bg-[#ececec]">
      <div className="bg-white w-full h-full rounded-xl p-6 flex flex-col items-center">
        <div className="w-full">
          <img src={logo} alt="" className="w-[150px] h-[50px] float-left" />
        </div>

        <div className="flex flex-col justify-center items-center border w-[40%] h-[80%] rounded-[16px] ">
          <h1 className="text-black font-semibold text-xl mt-4 mb-10">
            Change Paasword
          </h1>
          <form className="w-[90%] " onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label className="text-black">Email or Username</label>
              <img src={Email} alt="" className="absolute left-2 top-[55%] h-[20px]" />
              <input
                type="email"
                name="email"
                placeholder="eg. maddy@powerrental.com"
                style={{ boxShadow: " rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;" }}
                className="p-2 bg-[#f9f8f9] pl-10 outline-none rounded-md w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 relative">
              <label className="text-black">Password</label>
              <img src={Lock} alt="" className="absolute left-2 top-[55%] h-[20px]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="eg. R#6%efdgs"
                style={{ boxShadow: " rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;" }}
                className="p-2 pl-10 bg-[#f9f8f9] outline-none rounded-md w-full"
                value={formData.password}
                onChange={handleChange}
              />
              <p
                className="absolute right-2 top-[35px]  cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VscEye size={"20px"} />
                ) : (
                  <VscEyeClosed size={"20px"} />
                )}
              </p>
            </div>
            <div className="mb-4 relative">
              <label className="text-black">Re-enter Password</label>
              <img src={Lock} alt="" className="absolute left-2 top-[55%] h-[20px]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="eg. R#6%efdgs"
                style={{ boxShadow: " rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;" }}
                className="p-2 pl-10 bg-[#f9f8f9] outline-none rounded-md w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <p
                className="absolute right-2 top-[35px]  cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <VscEye size={"20px"} />
                ) : (
                  <VscEyeClosed size={"20px"} />
                )}
              </p>
            </div>
            <button className="bg-[#3a6afd] w-full p-2 rounded-md mb-2 text-white font-medium">
              Save Changes
            </button>
            <input type="checkbox" />{" "}
            <span className="text-sm text-black">Remember Me</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
