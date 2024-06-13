import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Project = () => {

  useEffect(()=> {
    document.title = "Projects";
  }, [])

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // ************ Get All Project Categories  **************
  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category`
      );
      if (response.status === 200) {
        setCategories(response?.data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-auto bg-black text-white p-6">
      <div className="w-full lg:px-[100px] mb-6">
        <h1 className="text-2xl mb-4 md:text-4xl text-left">
          Our Engineering Projects
        </h1>
        <p>Enhancing Value Through Optimised Engineering Solutions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:px-[100px]">
        {categories.map((category, index) => (
          <div key={index} className="relative mb-4 shadow-md ">
            <div className="h-[400px]">
              <img
                src={`data:${category?.categoryImage.contentType};base64,${category.categoryImage.data}`}
                alt="category"
                className="w-full h-full object-fit opacity-50 transition-opacity duration-300 hover:opacity-80"
              />
            </div>
            <div className="absolute bottom-0   left-0 w-full flex flex-col px-4 py-2">
              <div className="absolute top-0 left-0 w-[100%] h-[100%] backdrop-blur-md -z-1"></div>
              <div
                className="relative z-10 h-[150px] overflow-y-auto"
                style={{
                  scrollbarColor: "transparent transparent",
                  scrollbarWidth: "thin",
                }}
              >
                <h1 className="text-white font-semibold text-lg md:text-xl">
                  {category?._doc.categoryName}
                </h1>
                <p className=" text-xl md:text-[16px] text-gray-300 ">
                  {category?._doc.categoryDescription}
                </p>
              </div>
              <div className="relative z-10">


                {/* ***********  Navigate To ProjectDetails.js  which is in projects Component  **************** */}
                <button
                  className="mt-2 p-2  bg-blue-600 w-[150px] text-white text-sm md:text-base rounded-full bottom-0"
                  onClick={() =>
                    navigate(`/category/${category?._doc.categoryName}`)
                  }
                >
                  View Projects
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
