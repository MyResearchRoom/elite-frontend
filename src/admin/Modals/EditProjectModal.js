import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditModal = ({ setShowEditProjectModal, editProjectId, getProjects }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // ************  Handle Image ************
  const handleMainImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // ************* Handle Paragraph ****************
  const handleParagraphChange = (index, value) => {
    setFormData((prev) => {
      let paragraphs = prev.paragraphs;
      paragraphs[index] = value;
      return {
        ...prev,
        paragraphs: paragraphs,
      };
    });
  };

  // ************* Handle Paragraph Image ****************
  const handleImageChange = (index, value) => {
    setFormData((prev) => {
      let images = prev.images;
      images[index] = value;
      return {
        ...prev,
        images: images,
      };
    });
  };


  // ************* Submit Data **************
  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/project/edit-project/${editProjectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getProjects();
        toast.success(response?.data?.message);
        setShowEditProjectModal(false);
      } else if (response.status === 500) {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  // ************* Get  Project Details ************
  const getProject = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/project/${editProjectId}`
      );
      if (response.status === 200) {
        const modifiedData = { ...response.data.project };
        modifiedData.image = null;
        modifiedData.images = modifiedData.images.map(() => null);
        setFormData(modifiedData);
      } else if (response.status === 500) {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div
        className="bg-white p-6 rounded-lg w-[500px] h-[500px] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <div>
          <div className="flex gap-4">
            <div className="w-[50%] relative">
              <label className="text-[14px] font-semibold">Location</label>{" "}
              <br />
              <input
                placeholder="Enter Location"
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="location"
                value={formData?.location}
                onChange={handleChange}
              />
              <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
            </div>

            <div className="w-[50%]">
              <label className="text-[14px] font-semibold">Date</label> <br />
              <input
                type="date"
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
                name="date"
                value={`${formData?.date?.slice(0, 10)}`}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">Heading 1</label>{" "}
            <br />
            <input
              placeholder="Enter Heading 1 "
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
              name="heading"
              value={formData?.heading}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">Description 1</label>{" "}
            <br />
            <textarea
              placeholder="Enter Description 1"
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md resize-none"
              style={{scrollbarWidth:"none"}}
              name="description"
              value={formData?.description}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">Add Image 1</label>{" "}
            <br />
            <input
              type="file"
              id="upload"
              className="hidden"
              accept="image/*"
              onChange={handleMainImageChange}
            />
            <label for="upload" className="flex justify-between gap-2 ">
              <input
                placeholder="Add Image Here"
                value={
                  formData.image?.name ? formData.image?.name : "Main image"
                }
                className="w-[100%] bg-[#f9f8f9]  p-2 mt-2 outline-none rounded-md"
              />
              <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
            </label>
          </div>

          <div className="relative">
            <label className="text-[14px] font-semibold">Heading 2</label>{" "}
            <br />
            <input
              placeholder="Enter Heading 2 "
              className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md"
              name="heading2"
              value={formData?.heading2}
              onChange={handleChange}
            />
            <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
          </div>

          {formData?.paragraphs?.map((paragraph, index) => (
            <div key={index} className="relative">
              <label className="text-[14px] font-semibold">
                Paragraph {index + 1}
              </label>{" "}
              <br />
              <textarea
                placeholder={`Enter Paragraph ${index + 1}`}
                className="bg-[#f9f8f9] w-full p-2 mt-2 outline-none rounded-md resize-none"
                style={{scrollbarWidth:"none"}}
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
              />
              <i class="fa-solid fa-pen-to-square absolute right-2 top-10 text-gray-500 cursor-pointer"></i>
              <label className="text-[14px] font-semibold">
                Add Image - Paragraph {index + 1}
              </label>
              <br />
              <input
                type="file"
                id={`upload-${index}`}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
              />
              <label
                htmlFor={`upload-${index}`}
                className="flex justify-between gap-2 relative"
              >
                <input
                  placeholder={`Add Image ${index + 1} Here`}
                  className="w-[100%] bg-[#f9f8f9] rounded-md p-2 mt-2 outline-none "
                  value={
                    formData.images[index]?.name
                      ? formData.images[index]?.name
                      : `image ${index + 1}`
                  }
                />

                <i class="fa-solid fa-pen-to-square absolute right-2 top-5 text-gray-500 cursor-pointer"></i>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <button
            className="w-[120px] border-2 px-4 py-2 rounded-md mr-2"
            onClick={() => setShowEditProjectModal(false)}
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

export default EditModal;
