import React, { useEffect, useState } from "react";
import EditTestimonialModal from "../Modals/EditTestimonialModal";
import LottieModal from "./LottieModal";
import axios from "axios";
import { toast } from "react-toastify";

const EditTestimonial = () => {
  // ********* Edit Testimonial ***********
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTestimonialId, setEditTestimonialId] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  // ********** Store Testimonial Data *************
  const [testimonialData, setTestimonialData] = useState({
    name: "",
    organization: "",
    designation: "",
    image: "",
    description: "",
  });

  // **************  Lottie Success ****************
  const [create, setIsCreate] = useState(false);

  // **************  Lottie Delete ****************
  const [deleteModal, setDeleteModal] = useState(false);

  // ********* Handle Data *************
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonialData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ******* Handle Profile Image **********
  const handleProfileImage = (e) => {
    setTestimonialData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // ************** Submit Data **************
  const handleTestimonial = async () => {
    if (
      !testimonialData.description ||
      !testimonialData.designation ||
      !testimonialData.image ||
      !testimonialData.name ||
      !testimonialData.description
    ) {
      return toast.error("Plese provide all fields");
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/testimonial/create-testimonial`,
        testimonialData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getTestimonials();
        setIsCreate(true);
      } else if (response.status === 500) {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
    setTestimonialData(() => ({
      name: "",
      organization: "",
      designation: "",
      image: null,
      description: "",
    }));
    document.getElementById("upload").value = "";
  };

  // ********** Delete Testimonials  ***************
  const deleteTestimonial = async (deleteTestimonialId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/testimonial/delete-testimonial/${deleteTestimonialId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getTestimonials();
        setDeleteModal(true);
      } else if (response.status === 500) {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  // ***********  Get Testimonuial Data ************
  const getTestimonials = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/testimonial`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setTestimonials(response.data.testimonials);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <>
      {showEditModal && (
        <EditTestimonialModal
          editTestimonialId={editTestimonialId}
          setShowEditModal={setShowEditModal}
          getTestimonials={getTestimonials}
        />
      )}

      <div className="bg-[#f8f8f8] flex h-[92vh] gap-4 p-6">
        {/* *******  Left Div ******** */}

        <div className="h-[100%] w-[40%]  bg-white rounded-2xl flex flex-col justify-center items-center">
          <div
            className="p-4 w-[100%] h-[520px]  overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
          >
            <h1 className="text-[20px] font-semibold mb-2">Add Testimonials</h1>
            {/* <div className='flex gap-4'> */}
            <div className="w-[100%]">
              <label className="text-[18px] font-semibold">
                Name <span className="text-red-500">*</span>
              </label>{" "}
              <br />
              <input
                placeholder="Enter Name of Testimonial"
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="name"
                value={testimonialData.name}
                required
                onChange={handleChange}
              />
            </div>

            <div className="w-[100%]">
              <label className="text-[18px] font-semibold">
                Organization/Working In <span className="text-red-500">*</span>
              </label>{" "}
              <br />
              <input
                type="text"
                placeholder="Enter Name of Company"
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="organization"
                value={testimonialData.organization}
                onChange={handleChange}
                required
              />
            </div>
            {/* </div> */}

            <div>
              <label className="text-[18px] font-semibold">
                Designation <span className="text-red-500">*</span>
              </label>{" "}
              <br />
              <input
                placeholder="Eg. CEO "
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="designation"
                value={testimonialData.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-[18px] font-semibold">
                Upload Profile <span className="text-red-500">*</span>
              </label>{" "}
              <br />
              <input
                type="file"
                id="upload"
                className="hidden"
                accept="image/*"
                onChange={handleProfileImage}
                required
              />
              <label for="upload" className="flex justify-between gap-2 ">
                <input
                  placeholder="Add Image Here"
                  readOnly
                  className="w-[80%] bg-[#f9f8f9]  p-2 mt-2 outline-none rounded-md"
                  value={
                    testimonialData.image ? testimonialData.image.name : ""
                  }
                />
                <div className="w-[20%] h-[40px]  bg-[#3a6afd] rounded-md text-white flex justify-center items-center p-2 mt-2 outline-none ">
                  Add
                </div>
              </label>
            </div>

            <div>
              <label className="text-[18px] font-semibold">
                Add Description <span className="text-red-500">*</span>
              </label>
              <br />
              <textarea
                placeholder="Enter Testimonial Here"
                name="description"
                onChange={handleChange}
                value={testimonialData.description}
                rows={2}
                className="bg-[#f9f8f9] p-2 w-full outline-none rounded-md mt-2 resize-none "
                required
                // Set max height
              />
            </div>

            <button
              className="bg-[#3a6afd] text-white p-2 rounded-md w-[100%] mt-5"
              onClick={handleTestimonial}
            >
              Add Testimonials
            </button>
          </div>

          {create && (
            <LottieModal
              message="Testimonial Added Successfully !"
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
            Manage Testimonials
          </h1>
          {testimonials?.map((testimonial, index) => {
            return (
              <div
                key={index}
                className="flex bg-[#f9f8f9] border p-4 rounded-md mb-2 justify-between"
              >
                <div className="">
                  <p>
                    {index + 1} {testimonial?._doc.name} {"-"}
                  </p>
                  <p className="px-4">{testimonial?._doc.organization}</p>
                </div>
                <div>
                  <i
                    class="fa-solid fa-pen-to-square mr-2"
                    onClick={() => {
                      setEditTestimonialId(testimonial?._doc._id);
                      setShowEditModal(true);
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-trash-can text-red-500"
                    onClick={() => {
                      deleteTestimonial(testimonial?._doc._id);
                    }}
                  ></i>

                  {/* ****** DeleteModal ******* */}

                  {deleteModal && (
                    <LottieModal
                      message="Testimonial Deleted Successfully !"
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

export default EditTestimonial;
