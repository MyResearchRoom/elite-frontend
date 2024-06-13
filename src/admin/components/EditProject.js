import React, { useEffect, useState } from "react";
import EditProjectModal from "../Modals/EditProjectModal";
import "../../index.css";
import axios from "axios";
import LottieModal from "./LottieModal";
import { toast } from "react-toastify";

const EditProject = () => {

  // **********  Lottie Success ************
  const [create, setIsCreate] = useState(false);

  // **********  Lottie Delete ************
  const [deleteModal, setDeleteModal] = useState(false);


  // ********* Edit Project Modal  ***************
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category`
      );
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // ******** store form Data *********
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    date: "",
    heading: "",
    description: "",
    heading2: "",
    image: "",
    paragraphs: [{ text: "", image: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  // ***********  Handle Form Image ***********
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // Check if file size exceeds 2MB
      toast.error("File size exceeds the limit of 2MB.");
      return;
    }
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };


  // *********  Handle Paragraph ************
  const handleParagraphChange = (index, field, value) => {
    const updatedParagraphs = [...formData.paragraphs];
    updatedParagraphs[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      paragraphs: updatedParagraphs,
    }));
  };


   // *********  Handle Paragraph Image ************
  const handleParagraphImageChange = (index, image) => {
    if (image && image.size > 2 * 1024 * 1024) { // Check if file size exceeds 2MB
      toast.error("File size exceeds the limit of 2MB.");
      return;
    }

    const updatedParagraphs = [...formData.paragraphs];
    console.log(image);
    updatedParagraphs[index].image = image;
    setFormData((prevState) => ({
      ...prevState,
      paragraphs: updatedParagraphs,
    }));
  };

  // ********** store Paragraph **********
  const handleAddParagraph = () => {
    setFormData((prevState) => ({
      ...prevState,
      paragraphs: [...prevState.paragraphs, { text: "", image: "" }],
    }));
  };


  // ***********  Submit Data ***********
  const handleSubmit = async () => {
    const images = [];
    const paragraphs = [];

    for (const paragraph of formData?.paragraphs) {
      images.push(paragraph?.image);
      paragraphs.push(paragraph?.text);
    }

    const form_data = {   
      ...formData,
      images: images,
      paragraphs: paragraphs,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project/create-project`,
        form_data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setIsCreate(true);
        getProjects();
        setFormData(() => ({
          category: "",
          location: "",
          date: "",
          heading: "",
          description: "",
          heading2: "",
          image: "",
          paragraphs: [{ text: "", image: "" }],
        }));
        document.getElementById("upload").value = "";
        for (let i = 0; i < formData.paragraphs.length; i++) {
          document.getElementById(`upload-${i}`).value = "";
        }
      } else if (response.status === 500) {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // **********  Get All Projects **************
  const getProjects = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project`,
        {}
      );
      setData(response.data.projects);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // ********** Delete Project **************
  const deleteProject = async (projectId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/project/delete-project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getProjects();
        setDeleteModal(true);
      } else if (response.status === 500) {
        toast.error("Internal servewr error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getCategories();
    getProjects();
  }, []);

  return (
    <>
      {}
      {showEditProjectModal && (
        <EditProjectModal
          setShowEditProjectModal={setShowEditProjectModal}
          editProjectId={editProjectId}
          getProjects={getProjects}
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
            <div>
              <label className="text-[18px] font-semibold">
                Create New Project{" "} <span className="text-red-500">*</span>
              </label>{" "}
              <br />
              <select
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="category"
                value={formData.category}
                
                onChange={handleChange}
              >
                <option>Select Category</option>
                {categories?.map((category) => (
                  <option>{category?._doc?.categoryName}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="w-[50%]">
                <label className="text-[18px] font-semibold">Location</label>{" "}
                <br />
                <input
                  placeholder="Enter Location"
                  className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="w-[50%]">
                <label className="text-[18px] font-semibold">Date</label> <br />
                <input
                  type="date"
                  className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="text-[18px] font-semibold">Heading 1 <span className="text-red-500">*</span></label>{" "}
              <br />
              <input
                placeholder="Enter Heading 1 "
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-[18px] font-semibold">Description 1 <span className="text-red-500">*</span></label>{" "}
              <br />
              <textarea
                placeholder="Enter Description 1"
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none resize-none rounded-md"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-[18px] font-semibold">Add Image 1 <span className="text-red-500">*</span></label>{" "}
              <br />
              <input
                type="file"
                id="upload"
                className="hidden"
                accept="image/*"
                onChange={handleMainImageChange}
                required
              />
              <label for="upload" className="flex justify-between gap-2 ">
                <input
                  placeholder="Add Image Here"
                  readOnly
                  className="w-[80%] bg-[#f9f8f9]  p-2 mt-2 outline-none rounded-md"
                  value={formData.image ? formData.image.name : ""}
                />
                <div className="w-[20%] h-[40px]  bg-[#3a6afd] rounded-md text-white flex justify-center items-center p-2 mt-2 outline-none ">
                  Add
                </div>
              </label>
            </div>

            <div>
              <label className="text-[18px] font-semibold">Heading 2</label>{" "}
              <br />
              <input
                placeholder="Enter Heading 2 "
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="heading2"
                value={formData.heading2}
                onChange={handleChange}
              />
            </div>

            {formData.paragraphs.map((paragraph, index) => (
              <div key={index}>
                <label className="text-[18px] font-semibold">
                  Paragraph {index + 1}
                </label>{" "}
                <br />
                <textarea
                  placeholder={`Enter Paragraph ${index + 1}`}
                  className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md resize-none"
                  rows={2}
                  value={paragraph.text}
                  onChange={(e) =>
                    handleParagraphChange(index, "text", e.target.value)
                  }
                />
                <label className="text-[18px] font-semibold">
                  Add Image - Paragraph {index + 1}
                </label>{" "}
                <br />
                <input
                  type="file"
                  id={`upload-${index}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleParagraphImageChange(index, e.target.files[0])
                  }
                />
                <label
                  htmlFor={`upload-${index}`}
                  className="flex justify-between gap-2 "
                >
                  <input
                    placeholder={`Add Image ${index + 1} Here`}
                    readOnly
                    className="w-[80%] bg-[#f9f8f9] rounded-md p-2 mt-2 outline-none "
                    value={
                      formData.paragraphs[index].image
                        ? formData.paragraphs[index].image.name
                        : ""
                    }
                  />
                  <div className="w-[20%] h-[40px] bg-[#3a6afd] rounded-md text-white flex justify-center items-center p-2 mt-2 outline-none ">
                    Add
                  </div>
                </label>
              </div>
            ))}

            {/* Add paragraph button */}
            <button
              onClick={handleAddParagraph}
              className="bg-[#3a6afd] text-white p-2 rounded-md w-[40%] mt-4  outline-none "
            >
              Add Paragraph
            </button>

            <button
              className="bg-[#3a6afd] text-white p-2 rounded-md w-[80%] mt-10"
              onClick={handleSubmit}
            >
              Create Project
            </button>
          </div>

          {create && (
            <LottieModal
              message="Project Added Successfully !"
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
            Manage Project Details
          </h1>
          {data.map((project, index) => {
            return (
              <div
                key={project?._doc._id}
                className="flex bg-[#f9f8f9] border p-4 rounded-md mb-2 justify-between"
              >
                <p className="w-[90%]">
                  {index + 1} {project?._doc?.heading}
                </p>
                <div className="w-[10%]">
                  <i
                    class="fa-solid fa-pen-to-square mr-2"
                    onClick={() => {
                      setEditProjectId(project?._doc._id);
                      setShowEditProjectModal(true);
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-trash-can text-red-500"
                    onClick={() => {
                      deleteProject(project?._doc._id);
                    }}
                  ></i>

                  {deleteModal && (
                    <LottieModal
                      message="Project  Deleted Successfully !"
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

export default EditProject;
