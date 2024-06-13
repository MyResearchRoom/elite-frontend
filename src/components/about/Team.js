import React, { useEffect, useState } from "react";

import Linkedin from "../../assets/About/Linkedin.png";

import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Team = () => {
  const [team, setTeam] = useState([]);

  // ************  Get Team Data  ******************
  const getTeam = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/team`);
      if (response.status === 200) {
        setTeam(response?.data?.team);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  // ********** Handle Screen Size ************
  const [slidesToShow, setSlidesToShow] = useState(3);
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
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjust the speed as needed
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <div className="p-6 bg-black text-white h-auto">
      <div className="w-full lg:px-[100px]">
        <h1 className="text-2xl md:text-4xl  mb-4  ">Meet Our Team</h1>
        <hr className="mb-10  " />
      </div>
      {/* <div className="w-full m-auto lg:px-[100px]"> */}
      <div className="lg:px-[100px]  gap-2 h-auto  ">
        {/* ***************  Team Data Horizontal Auto Scroll   **************** */}

        <div className=" w-[100%] grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 h-full gap-4"> 
          {/* <Slider {...settings} className=""> */}
            {team?.map((member) => {
              return (
                <div
                  key={member?._doc._id}
                  className="mr-6 sm:mb-0 gap-4  relative h-[100%] w-full  "
                >
                  <div className="flex justify-center items-center h-[85%]   ">
                    <img
                      src={`data:${member?.image.contentType};base64,${member?.image.data}`}
                      alt=""
                      className=" h-[380px] md:h-[250px] md:w-[250px] sm:object-cover lg:object-fill  w-full  transition-opacity mb-4 duration-300 hover:opacity-50"
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-50 text-white">
                    <Link to={member?._doc?.linkedInUrl}>
                      <img
                        src={Linkedin}
                        alt=""
                        className="h-[70px] transition-opacity duration-300 hover:opacity-50"
                      />
                    </Link>
                  </div>
                  <div className="h-[15%]">
                    <p className="text-center lg:text-lg text-[18px]">
                      {member?._doc.name}
                    </p>
                    <p className="text-center mb-4 lg:text-lg text-[18px]">
                      {member?._doc.designation}
                    </p>
                  </div>
                </div>
              );
            })}
          {/* </Slider> */}
        </div>
      </div>
    </div>
  );
};

export default Team;
