import React, { useEffect, useState } from "react";
import EditTeam from "../Modals/EditTeamModal";
import LottieModal from "./LottieModal";
import axios from "axios";
import { toast } from "react-toastify";
const AddTeam = () => {

  // **********  Store Team Data Here **********8
  const [teamData, setTeamData] = useState({
    name: "",
    designation: "",
    image: "",
    linkedInUrl: "",
  });
  const [data, setData] = useState([]);

  // *******  Lottie Success  **********
  const [create, setIsCreate] = useState(false);

   // *******  Lottie Delete  **********
  const [deleteModal, setDeleteModal] = useState(false);

  // *******  Edit Modal ************
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTeamMemberId, setEditTeamMemberId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setTeamData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };


  // ***********  Submit  Data **********
  const handleSubmit = async () => {
    console.log(teamData);
    if (
      !teamData.designation ||
      !teamData.linkedInUrl ||
      !teamData.designation ||
      !teamData.image
    ) {
      return toast.error("Please provide all necessary fields.");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/team/add-member`,
        teamData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        getTeam();
        setIsCreate(true);
        setTeamData(() => ({
          name: "",
          designation: "",
          image: "",
          linkedInUrl: "",
        }));
        document.getElementById("upload").value = "";
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log(error);
    }
  };


  // ********  Get Team Data **********
  const getTeam = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/team`
      );

      if (response.status === 200) {
        setData(response.data.team);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // **********  Delete Team Member **********
  const deleteTeamMember = async (deleteTeamMemberId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/team/delete-member/${deleteTeamMemberId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setDeleteModal(true);
        getTeam();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <>
      {showEditModal && (
        <EditTeam
          setShowEditModal={setShowEditModal}
          getTeam={getTeam}
          editTeamMemberId={editTeamMemberId}
        />
      )}

      <div className="bg-[#f8f8f8] flex h-[92vh] gap-4 p-6">
        <div className="h-[100%] w-[40%]  bg-white rounded-2xl flex flex-col justify-center items-center">
          <div
            className="p-4 w-[100%] h-[520px]  overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
          >
            <div className="w-[100%]">
              <label className="text-[18px] font-semibold">Name <span className="text-red-500">*</span></label> <br />
              <input
                placeholder="Enter Full Name"
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="name"
                value={teamData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-[18px] font-semibold">Designation <span className="text-red-500">*</span></label>{" "}
              <br />
              <input
                placeholder="Enter Designation "
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="designation"
                value={teamData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-[18px] font-semibold">Profile <span className="text-red-500">*</span></label>{" "}
              <br />
              <input
                type="file"
                id="upload"
                className="hidden"
                accept="image/*"
                onChange={handleImage}
                required
              />
              <label htmlFor="upload">
                <div className="w-full h-[100px]  bg-[#f9f8f9] flex justify-center items-center">
                  <p>
                    <i class="fa-solid fa-arrow-up-from-bracket"></i> Upload
                    Image
                  </p>
                </div>
              </label>
              {teamData.image && (
                <div className="flex items-center justify-between mt-2">
                  <p className="mr-2">
                    {teamData.image ? teamData?.image?.name + "- uploaded" : ""}
                  </p>
                  <div>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i
                      className="fa-solid fa-trash-can text-red-500"
                      onClick={() => {
                        setTeamData((prev) => ({
                          ...prev,
                          image: null,
                        }));
                        document.getElementById("upload").value = "";
                      }}
                    ></i>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-[18px] font-semibold">LinkedIn URL <span className="text-red-500">*</span></label>{" "}
              <br />
              <textarea
                placeholder="Enter linkedInUrl Here"
                name="linkedInUrl"
                onChange={handleChange}
                value={teamData.linkedInUrl}
                className="bg-[#f9f8f9] p-2 w-full outline-none rounded-md mt-2 resize-none h-[50px]"
                // Set max height
                required
              />
            </div>

            <button
              className="bg-[#3a6afd] text-white p-2 rounded-md w-[100%] mt-14"
              onClick={handleSubmit}
            >
              Add Members
            </button>
          </div>

          {create && (
            <LottieModal
              message="Team Member Added Successfully !"
              onClose={() => setIsCreate(false)}
            />
          )}
        </div>

        {/* this is manage component */}
        <div
          className="h-[100%] w-[60%]  bg-white rounded-2xl p-4 overflow-y-auto"
          style={{ scrollbarColor: "transparent transparent" }}
        >
          <h1 className="text-[20px] font-semibold mb-4">
            Manage Team Details
          </h1>
          {data?.map((teamMember, index) => {
            return (
              <div
                key={teamMember._doc._id}
                className="flex bg-[#f9f8f9] border p-4 rounded-md mb-2 justify-between"
              >
                <div>
                  <p>
                    {index + 1} {teamMember._doc.name} {"-"}
                  </p>
                </div>
                <div>
                  <i
                    class="fa-solid fa-pen-to-square mr-2"
                    onClick={() => {
                      setEditTeamMemberId(teamMember._doc._id);
                      setShowEditModal(true);
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-trash-can text-red-500"
                    onClick={() => {
                      deleteTeamMember(teamMember._doc._id);
                    }}
                  ></i>

                  {deleteModal && (
                    <LottieModal
                      message="Team Member Deleted Successfully !"
                      onClose={() => setDeleteModal(false)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddTeam;
