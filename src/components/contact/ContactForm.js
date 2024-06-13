import React, { useState } from "react";
import call from "../../assets/Contact/call.png";
import email from "../../assets/Contact/email.png";
import location from "../../assets/Contact/location.png";
import Twitter from "../../assets/Contact/Twitter.png";
import Insta from "../../assets/Contact/Insta.png";
import Game from "../../assets/Contact/Game.png";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });


  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOptionChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      subject: e.target.value,
    }));
  };


  // *********  Submit Form Data *********
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.subject ||
      !formData.message
    ) {
      toast.warn("Please provide all necessary fields");
      return;
    }


    // **********  Phone Number Validation  *************
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error("Phone number must be 10 digits and only digits");
      return;
    }

    // **********  Email Validation  *************

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact/create-contact`,
        formData
      );
      if (response.status === 201) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: "",
        });
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full lg:h-[90vh] flex flex-col justify-evenly items-center bg-white">
      <div className="flex flex-col sm:flex-row sm:h-full sm:w-[80%] w-[90%] border mb-2">
        <div className="sm:w-3/5 flex flex-col justify-center sm:order-2 bg-white">
          <div className="flex flex-col gap-5 justify-center items-center relative  sm:mb-0 mb-2">
            <div className="sm:flex gap-5 sm:w-[90%] w-[81%] justify-between sm:px-6 mt-10 ">
              <div className="sm:mb-0 lg:w-[50%] mb-4">
                <label className="text-xl">First Name</label> <br />
                <input
                  type="text"
                  className="border-b-2 outline-none w-full"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-[50%] ">
                <label className="text-xl">Last Name</label> <br />
                <input
                  type="text"
                  className="border-b-2 outline-none w-full"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="sm:flex gap-5 sm:w-[90%] w-[81%] justify-between sm:px-6 mt-10">
              <div className="sm:mb-0 lg:w-[50%]  mb-4">
                <label className="text-xl">Email</label> <br />
                <input
                  type="email"
                  className="border-b-2 outline-none w-full "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="lg:w-[50%] ">
                <label className="text-xl ">Phone No</label> <br />
                <input
                  type="text"
                  className="border-b-2 outline-none w-full"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:px-[50px] justify-evenly h-[300px] ">
            <div className="w-[81%]  justify-between px-6 ">
              <p className="text-xl">Select Subject ?</p>
            </div>
            <div className="flex gap-5 w-full justify-between px-6 text-sm ">
              <label className="text-[16px]">
                <input
                  type="radio"
                  name="subject"
                  value="Inquiry"
                  checked={formData.subject === "Inquiry"}
                  onChange={handleOptionChange}
                />{" "}
                Inquiry
              </label>
              <label className="text-[16px]">
                <input
                  type="radio"
                  name="subject"
                  value="Careers"
                  checked={formData.subject === "Careers"}
                  onChange={handleOptionChange}
                />{" "}
                Careers
              </label>
              <label className="text-[16px]">
                <input
                  type="radio"
                  name="subject"
                  value="Quotation"
                  checked={formData.subject === "Quotation"}
                  onChange={handleOptionChange}
                />{" "}
                Quotation
              </label>
              <label className="text-[16px]">
                <input
                  type="radio"
                  name="subject"
                  value="Services"
                  checked={formData.subject === "Services"}
                  onChange={handleOptionChange}
                />{" "}
                Services
              </label>
            </div>
            <div className="w-full justify-between px-6 mt-4">
              <p className="text-[18px]">Message</p>
              <textarea
                placeholder="Write Your Message"
                className="border-b outline-none sm:w-full w-full"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="w-full justify-between px-6">
              <button
                className="border float-right p-2 bg-blue-500 text-white rounded-full w-[170px] sm:w-[150px]"
                onClick={handleSubmit}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* ***** Left ***** */}
        <div
          className="sm:w-2/5 sm:h-full h-[350px] flex flex-col md:justify-between  p-6 sm:order-1"
          style={{ backgroundColor: "rgba(36, 40, 52, 1)" }}
        >
          <div className="">
            <h1 className="md:text-3xl text-xl font-semibold text-white mb-2">
              Contact Information
            </h1>
            <p className="text-gray-300 sm:text-[18px] text-[16px] mb-6">
              Say something to start a live chat!
            </p>
          </div>
          <div className="sm:w-[80%] h-[40%] flex flex-col md:justify-between  text-gray-300 ">
            <div className="h-[40%]">
              <div className="flex  gap-10 mb-0 sm:mb-4">
                <img src={call} alt="" className="h-[30px]" />
                <p>808-276-3379</p>
              </div>
              <div className="flex  gap-10 mb-0 sm:mb-4 mt-3">
                <img src={email} alt="" className="h-[30px] " />
                <p>info@eliteengineers.tech</p>
              </div>
              <div className="flex  gap-10 mb-0 sm:mb-4 mt-3">
                <img src={location} alt="" className="h-[30px]" />
                <p>52, Jansukh Apt., Kasturba Rd. Kandivali W, Mumbai-67</p>
              </div>
            </div>

            <div className="flex gap-5 h-[10%] mt-24">
              <img src={Twitter} alt="" className="h-[20px]" />
              <img src={Insta} alt="" className="h-[20px] bg-white p-1 rounded-full" />
              {/* <i class="fa-brands fa-instagram" style={{height:}}></i> */}
              <img src={Game} alt="" className="h-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
