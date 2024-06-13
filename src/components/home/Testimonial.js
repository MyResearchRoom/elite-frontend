import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);


  // **********  Get Testimonials Data  ***************
  const getTestimonials = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/testimonial`
      );
      if (response.status === 200) {
        setTestimonials(response?.data?.testimonials);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getTestimonials();
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
    <div className="p-6  bg-gray-900 text-white w-full h-auto">
      <div className="w-full lg:px-[100px]">
        <h1 className="sm:text-3xl text-xl font-semibold mb-4 ">Testimonial</h1>
        <hr className=" mb-10" />
      </div>

      <div
        className=" flex sm:justify-between  w-full lg:px-[100px]"
        style={{
          // maxHeight: "calc(80vh - 20px)",
          height:"100%",
          maxWidth: "100%",
          
        }}
      >
        


        {/* ************  Horizontal Auto Scroll   ****************8 */}
        


        <div className=" w-[100%] " >
      <Slider {...settings} className="h-auto">

          {testimonials.map((testimonial) => (
            <div key={testimonial?._doc._id} className="mb-4 mr-10 w-auto h-[100%] px-4 flex flex-col ">
             <div className="flex mb-10 " >
                <div className="w-2 h-48 bg-blue-500 mr-4 rounded-md"></div>
                <div className="w-[450px]  h-[310px] overflow-y-auto text-justify lg:text-xl text-xl lg:leading-10 leading-8" style={{scrollbarWidth:"none"}} >
                  {testimonial?._doc.description}
                </div>
              </div>

              <div className="flex h-[20%]">
                <div className="mr-4 w-[20%] h-full">
                  <img
                    src={`data:${testimonial?.image.contentType};base64,${testimonial?.image.data}`}
                    className="h-[80px] w-full rounded-md"
                    alt="testimonial"
                  />
                </div>
                <div className="w-[80%]">
                  <p className="lg:text-xl text-xl">{testimonial?._doc.name}</p>
                  <p className="text-gray-300 lg:text-[18px] text-xl truncate">
                    {testimonial?._doc.designation},
                  </p>
                  <p className="text-gray-300 lg:text-[18px] text-xl truncate">
                    {testimonial?._doc.organization}
                  </p>
                </div>
              </div>
             </div>
          ))}
      </Slider>

        </div>

      </div>

    </div>
  );
};

export default Testimonial;
