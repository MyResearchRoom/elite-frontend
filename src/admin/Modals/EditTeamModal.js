import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditTeam = ({ editTeamMemberId, getTeam, setShowEditModal }) => {

  // *********** store FormData ************
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    image: null,
    linkedInUrl: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // **************  Handle Profile Image **************
  const handleProfileImage = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // ******** Submit Data ************
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/team/edit-member/${editTeamMemberId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getTeam();
        setShowEditModal(false);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };



  // *********** Get Team Member Details ***********
  const getTeamMember = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/team/${editTeamMemberId}`,
        formData
      );

      if (response.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          name: response.data?.teamMember?._doc.name,
        }));
        setFormData((prevData) => ({
          ...prevData,
          designation: response.data?.teamMember?._doc.designation,
        }));
        setFormData((prevData) => ({
          ...prevData,
          linkedInUrl: response.data?.teamMember?._doc.linkedInUrl,
        }));
        setFormData((prevData) => ({
          ...prevData,
          image: null,
        }));
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTeamMember();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg w-[500px] h-[500px] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* <h2 className="text-xl font-semibold mb-2">Edit Project</h2> */}
        <div>
          <div className="w-[100%] relative">
            <label className="text-[14px] font-semibold">Name</label> <br />
            <input
              placeholder="Enter Name"
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
              name="name"
              value={formData?.name}
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
              value={formData?.designation}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">Add Image</label>{" "}
            <br />
            <p>
              {formData?.image ? formData?.image?.name : "No file selected"}{" "}
            </p>
            {/* <i class="fa-solid fa-pen-to-square absolute right-2  text-gray-500 cursor-pointer"></i> */}
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="image/*"
              onChange={handleProfileImage}
            />
            <label htmlFor="upload">
              <div className="w-full h-[100px]  bg-[#f9f8f9] flex justify-center items-center">
                <p>
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> Upload Image
                </p>
              </div>
            </label>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">LinkedIn URL </label>{" "}
            <br />
            <input
              placeholder="Enter LinkedInURL "
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
              name="linkedInUrl"
              value={formData.linkedInUrl}
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

export default EditTeam;
