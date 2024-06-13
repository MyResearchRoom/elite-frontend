import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProjDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  // *************  Get All Details Of Project **************
  const getProject = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/project/${id}`
      );

      if (response.status === 200) {
        setData(response?.data?.project);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="h-auto w-full bg-black">
      <div
        className="relative lg:w-[400px] w-[200px] md:w-[300px] h-[100vh] lg:h-[64vh] bg-gray-900"
        style={{ backgroundColor: "rgba(36, 40, 52, 1)" }}
      >
        <div className="lg:w-[85vw] w-[85vw]  lg:h-[70%] h-[100vh] lg:flex lg:flex-row justify-between flex-col absolute lg:top-[40px] top-[30px] lg:left-[100px]  left-[40px] gap-10">
          <div className="lg:w-[50%] lg:h-full  md:h-[40%] w-full  mb-4">
            <img
              src={`data:${data?.image?.contentType};base64,${data.image?.data}`}
              alt="img"
              className="w-full h-[300px] lg:h-full lg:w-[400px] object-cover"
            />
          </div>
          <div
            className="lg:w-[60%]  w-full lg:h-full md:h-[50%]   text-white overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
          >
            <p className="sm:text-4xl lg:text-2xl text-2xl w-full  font-semibold mb-2 ">
              {data.heading}
            </p>
            {/* <p className="sm:text-xl text-[18px] lg:mb-10 mb-2">
              Enhancing Value Through Optimised Engineering Solutions
            </p> */}
            <p className="text-base text-justify">{data.description}</p>
          </div>
        </div>
      </div>


      {/* ************  Paragraph Datails **************** */}

      {data?.paragraphs ? (
        <div className="h-auto w-full bg-black relative top-[30px] lg:top-0">
          <div className="lg:w-[80%] lg:ml-[100px] ml-[40px]  mb-3  ">
            <p className="text-white sm:text-4xl text-2xl">{data.heading2}</p>
          </div>

          <div className=" flex">
            <div className=" w-[85vw] relative lg:left-[100px] left-[40px]    ">
              {data?.paragraphs.map((para, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="md:flex sm:w-auto md:w-[100%]  gap-2 mb-10 p-2"
                    >
                      <p
                        className="text-white text-[18px] text-justify  md:w-[50%] sm:mb-0 mb-4  mr-2"
                       
                      >
                        {para}
                      </p>
                      <div className="h-full md:w-[50%] mb-4">
                        <img
                          src={`data:${data?.images[index]?.contentType};base64,${data?.images[index]?.data}`}
                          alt="img"
                          className="w-full h-[300px]  md:object-fill mb-4"
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            {/* <div
              className=" sm:w-[350px] h-auto float-right "
              style={{ backgroundColor: "rgba(36, 40, 52, 1)" }}
            ></div> */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjDetails;
