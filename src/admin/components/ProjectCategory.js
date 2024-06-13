import React, { useEffect, useState } from "react";

import axios from "axios";
import EditCategoryModal from "../Modals/EditCategoryModal";
import LottieModal from "./LottieModal";
import { toast } from "react-toastify";
const ProjectCategory = () => {

  // ***************  Lottie Success ****************
  const [create, setIsCreate] = useState(false);

  // ***************  Lottie Delete ****************
  const [deleteModal, setDeleteModal] = useState(false);


  // ********* Edit Category **************
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  const [categories, setCategories] = useState([]);

  const [editCategoryId, setEditCategoryId] = useState(null);


  // ***********  store FormData ****************
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",

    categoryImage: null,
  });


  // ***********  Handle Input ***************
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ****************  Handle File *************
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      categoryImage: file,
    });
  };



  // ************ Delete Category ***************
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/category/delete-category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setDeleteModal(true);
        getCategories();
      } else {
        toast(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // ******** Submit Data *************

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/create-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setIsCreate(true);
        getCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      categoryName: "",
      categoryDescription: "",
      categoryImage: null,
    }));

    document.getElementById("upload").value = "";
  };


  // *************  Get All Categories ******************
  const getCategories = async () => {
    try {
      console.log(process.env.REACT_APP_API_URL);
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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {showEditCategoryModal && (
        <EditCategoryModal
          getCategories={getCategories}
          editCategoryId={editCategoryId}
          setShowEditCategoryModal={setShowEditCategoryModal}
        />
      )}
      <div className="bg-[#f8f8f8] flex h-[92vh] gap-4 p-6">
        {/* *******  Left Div ******** */}

        <div className="h-[100%] w-[40%]  bg-white rounded-2xl">
          <form className="p-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[18px] font-semibold">
                Create Project Category <span className="text-red-500">*</span>
              </label>{" "}
              <br />
              <input
                placeholder="Enter Project Category"
                // name="categoryName"
                name="categoryName"
                onChange={handleInputChange}
                value={formData.categoryName}
                className="bg-[#f9f8f9] p-2 w-full outline-none rounded-md mt-2"
                required
              />
            </div>
            <div>
              <label className="text-[18px] font-semibold">
                Add Description <span className="text-red-500">*</span>
              </label>{" "}
              <br />
              <textarea
                placeholder="Enter Project Category"
                // name="categoryDescription"
                name="categoryDescription"
                onChange={handleInputChange}
                value={formData.categoryDescription}
                className="bg-[#f9f8f9] p-2 w-full outline-none rounded-md mt-2 resize-none h-[150px]"
                // Set max height
                required
              />
            </div>

            <div>
              <label className="text-[18px] font-semibold">Add Image <span className="text-red-500">*</span></label>{" "}
              <br />
              <input
                type="file"
                id="upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
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
              {formData.categoryImage && (
                <div className="flex items-center justify-between mt-2">
                  <p className="mr-2">
                    {formData.categoryImage
                      ? formData?.categoryImage?.name + "- uploaded"
                      : ""}
                  </p>
                  <div>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i
                      className="fa-solid fa-trash-can text-red-500"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          categoryImage: null,
                        }));
                        document.getElementById("upload").value = "";
                      }}
                    ></i>
                  </div>
                </div>
              )}
            </div>

            <button className="bg-[#3a6afd] text-white p-2 rounded-md w-full mt-10">
              Create
            </button>
          </form>

          {/* Lottie Modal ***** */}
          {create && (
            <LottieModal
              message="Project Category Created Successfully !"
              onClose={() => setIsCreate(false)}
            />
          )}
        </div>

        {/* *************  Manage Project Category *************** */}
        <div
          className="h-[100%] w-[60%]  bg-white rounded-2xl p-4 overflow-y-auto"
          style={{ scrollbarColor: "transparent transparent" }}
        >
          {categories?.map((category, index) => {
            return (
              <div
                key={category?._doc._id}
                className="flex bg-[#f9f8f9] border p-4 rounded-md mb-2 justify-between"
              >
                <p className="w-[90%]">
                  {index + 1}. {category?._doc.categoryName}
                </p>
                <div className="w-[10%]">
                  <i
                    class="fa-solid fa-pen-to-square mr-2"
                    onClick={() => {
                      setEditCategoryId(category?._doc._id);
                      setShowEditCategoryModal(true);
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-trash-can text-red-500"
                    onClick={() => {
                      deleteCategory(category?._doc._id);
                    }}
                  ></i>

                  {/* **********  Delete Modal ***************** */}
                  {/* Lottie Modal ***** */}
                  {deleteModal && (
                    <LottieModal
                      message="Project Category Deleted Successfully !"
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

export default ProjectCategory;
