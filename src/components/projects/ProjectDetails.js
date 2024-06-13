import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectData, setProjectData] = useState([]);

  // ************ Get All Projects in Particular Category  *************

  const getProjects = async () => {
    try {
      const requestData = id ? { id } : {};

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project`,
        requestData
      );

      if (response.status === 200) {
        setProjectData(response?.data?.projects);
        console.log(response?.data?.projects);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getProjects();
  }, [id]);

  return (
    <div className="sm:h-auto w-full bg-black text-white p-6">
      <div className="lg:w-[80%] relative lg:left-24 mb-10">
        <h1 className="text-2xl font-bold mb-4 md:text-4xl text-white text-left">
          {projectData[0]?._doc.category}
        </h1>
        {/* <p>Enhancing Value Through Optimised Engineering Solutions</p> */}
      </div>

      {projectData ? (
        <div className="lg:w-[80%] h-auto relative lg:left-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
          {projectData.map((project) => (
            <div
              key={project?._doc._id} //`url(data:${project?.image.contentType};base64,${project.image.data})`
              className="relative bg-cover bg-center  h-[400px] mb-10">
                <img 
                src={`data:${project?.image.contentType};base64,${project.image.data}`}
                alt="img"
                className="w-full h-full object-fit opacity-50 transition-opacity duration-300 hover:opacity-80"/>
              <div className="absolute bottom-0 w-full h-1/2 bg-black bg-opacity-50 backdrop-blur-md p-4 py-2 flex flex-col justify-center">
                <div className="text-white">
                  <div className="flex justify-between items-center">
                    <p className="lg:text-[16px] text-[14px]">Location: {project?._doc.location}</p>
                    <p className="lg:text-[16px] text-[14px]">Date: {project?._doc?.date?.slice(0, 10)}</p>
                  </div>
                  <h1 className="mt-2 lg:text-[18px] font-semibold h-[80px] text-ellipsis">
                    {project?._doc.heading}
                  </h1>
                </div>
                <button
                  className="border p-2 rounded-xl hover:bg-blue-600 hover:border-none "
                  onClick={() => navigate(`/project/${project?._doc._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectDetails;
