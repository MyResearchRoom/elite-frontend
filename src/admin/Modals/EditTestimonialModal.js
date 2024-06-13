import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditTestimonialModal = ({
  editTestimonialId,
  setShowEditModal,
  getTestimonials,
}) => {

  
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    designation: "",
    image: "",
    description: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  // *********** Handle Profile Image ************

  const handleProfileImage = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // ************ Submit Data **************
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/testimonial/edit-testimonial/${editTestimonialId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getTestimonials();
        setShowEditModal(false);
        setFormData({
          name: "",
          organization: "",
          designation: "",
          image: "",
          description: "",
        });
        document.getElementById("upload").value = "";
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // ************* Get Testimonials Details ********************
  const getTestimonial = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/testimonial/${editTestimonialId}`
      );
      if (response.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          name: response.data.testimonial._doc.name,
        }));
        setFormData((prevData) => ({
          ...prevData,
          organization: response.data.testimonial._doc.organization,
        }));
        setFormData((prevData) => ({
          ...prevData,
          designation: response.data.testimonial._doc.designation,
        }));
        setFormData((prevData) => ({
          ...prevData,
          image: null,
        }));
        setFormData((prevData) => ({
          ...prevData,
          description: response.data.testimonial._doc.description,
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg w-[500px] h-[500px] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <div>
          <div className="w-[100%] relative">
            <label className="text-[14px] font-semibold">Name</label> <br />
            <input
              placeholder="Enter Name"
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          <div className="w-[100%] relative">
            <label className="text-[14px] font-semibold">
              Organization/Working In
            </label>{" "}
            <br />
            <input
              type="text"
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">Designation</label>{" "}
            <br />
            <input
              placeholder="Enter Heading 1 "
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">
              Add Profile Image
            </label>{" "}
            <br />
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="image/*"
              onChange={handleProfileImage}
            />
            <label for="upload" className="flex justify-between gap-2 ">
              <input
                placeholder="Add Image Here"
                readOnly
                className="w-[100%] bg-[#f9f8f9]  p-2 mt-2 outline-none rounded-md"
                value={formData.image ? formData.image.name : ""}
              />
              <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
            </label>
          </div>
          <div className="relative">
            <label className="text-[14px] font-semibold">Description </label>{" "}
            <br />
            <textarea
              placeholder="Enter Description "
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md resize-none"
              style={{scrollbarWidth:"none"}}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          {/* Render other input fields similarly */}
        </div>
        <div className="flex justify-end mt-10">
          <button
            className="w-[120px] border-2 px-4 py-2 rounded-md mr-2"
            onClick={() => setShowEditModal(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTestimonialModal;
