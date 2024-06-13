import React, { useState, useEffect } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import "../../../src/index.css";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectCarousel = () => {
  const [slidesToShow, setSlidesToShow] = useState(3); // Default slides to show
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/project`,
        {}
      );
      if (response.status === 200) {
        setProjects(response?.data?.projects);
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
  }, []);


  // ********** Handle Screen Size ************
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1500) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // ********  Slider Animation *********
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };

  const navigate = useNavigate();

  return (
    <div className="bg-black w-full p-6">
      <div className="w-full lg:px-[100px]">
        <h1 className="text-white sm:text-3xl text-xl font-semibold mb-4">
          Our Projects
        </h1>
        <hr className="mb-4" />
      </div>
      <div className="w-full m-auto lg:px-[100px]">
        <div className="mt-10 gap-2 flex flex-col justify-center">

        {/* ******* Project  Slider  ************** */}
          <Slider {...settings}>
            {projects.map((project) => (
              <div
                key={project?._doc._id}
                className="flex rounded-md relative w-[100%] "
                style={{ marginRight: "20px" }}
              >
                <div className="h-[400px] w-[95%]">
                  <img
                    src={`data:${project?.image?.contentType};base64,${project?.image?.data}`}
                    alt=""
                    className="rounded-2xl  opacity-50 w-full cursor-pointer h-[100%] "
                    onClick={() => navigate(`/project/${project?._doc._id}`)}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0  py-4 px-6 text-white">
                  {/* <p className=''>{subproject.text}</p> */}
                  <p className="text-2xl font-bold ">{project?._doc.heading}</p>
                  <p
                    className="text-yellow-400 text-xl font-semibold rounded-md mt-2 cursor-pointer"
                    onClick={() => navigate(`/project/${project?._doc._id}`)}
                  >
                    Read more
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
