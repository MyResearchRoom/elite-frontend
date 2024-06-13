import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditCategoryModal = ({
  getCategories,
  editCategoryId,
  setShowEditCategoryModal,
}) => {

  // *********** Store Data ***********
  const [category, setCategory] = useState({
    categoryName: "",
    categoryDescription: "",
    categoryImage: null,
  });


  
  const handleChange = (e) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  // *************** Submit Data ***************
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/category/edit-category/${editCategoryId}`,
        category,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getCategories();
        setShowEditCategoryModal(false);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };


  // *************  Handle File *************
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCategory((prev) => ({
      ...prev,
      categoryImage: file,
    }));
  };


  // **************** Get Category Details ****************
  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/${editCategoryId}`
      );
      if (response.status === 200) {
        setCategory((prev) => ({
          ...prev,
          categoryName: response.data.category.categoryName,
        }));
        setCategory((prev) => ({
          ...prev,
          categoryDescription: response.data.category.categoryDescription,
        }));
        setCategory((prev) => ({ ...prev, categoryImage: null }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

 

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[500px] h-[500px]">
        <h2 className="text-xl font-semibold mb-2">Category Heading</h2>
        <div>
          <div className="mb-4">
            <input
              type="text"
              value={category?.categoryName}
              className="outline-none bg-[#f9f8f9] rounded-md p-2 w-full"
              name="categoryName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Add Description</label>
            {/* <textarea value={editCategory.description} className="outline-none bg-[#f9f8f9] rounded-md p-2 w-full" /> */}
            <textarea
              value={category?.categoryDescription}
              placeholder="Enter Project Category"
              className="bg-[#f9f8f9] p-2 w-full outline-none rounded-md mt-2 resize-none h-[100px]"
              style={{scrollbarWidth:"none"}}
              name="categoryDescription"
              onChange={handleChange}
              // Set max height
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Add Image</label>
            <div className="flex items-center justify-between mt-2">
              <p className="mr-2">{category?.categoryImage?.name} -uploaded</p>
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <input
              type="file"
              id="uploade"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange} // Add this line
            />

            <label htmlFor="uploade">
              <div className="w-full h-[100px] bg-[#f9f8f9] flex justify-center items-center">
                <p>
                  <i class="fa-solid fa-arrow-up-from-bracket"></i> Upload Image
                </p>
              </div>
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              onClick={() => setShowEditCategoryModal(false)}
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
    </div>
  );
};

export default EditCategoryModal;
