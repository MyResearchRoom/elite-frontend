
// Services.js
import React from 'react';
import Finite from "../../assets/Finite.png"
import fluid from "../../assets/Fluid.png"
import piping from "../../assets/piping.png"
import pressure from "../../assets/pressure.png"
import Structural from "../../assets/Structural.png"
import Solar from "../../assets/Solar.png";

import { useNavigate } from 'react-router-dom';
const Services = () => {
  const navigate=useNavigate();

  // ******** Navigate to Service Page **********
  const handle=()=>{
    navigate('/service')
  }


  // ***********  Service Data **********
  const serviceItems = [
    { image: Finite, text: 'Finite Element Analysis' },
    { image: fluid, text: 'Computational Fluid Dynamics' },
    { image: piping, text: 'Piping Layout and Analysis' },
    { image: pressure, text: 'Pressure Vessel& Static Equipment' },
    { image: Structural, text: 'Structural Engineering' },
    { image: Solar, text: 'Solar Plant Development' },
  ];
  return (
    <div className='bg-black p-6 h-auto w-full'>
      <div className='w-full lg:px-[100px]'>
        <h1 className='text-white  mb-4 sm:text-3xl lg:text-3xl text-xl font-semibold'>Our Services</h1>
        <hr className='' />
      </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full lg:px-[100px] h-full gap-4 font-semibold mt-10">

            {
              serviceItems.map((item,ind)=>{
                return(
                  <div key={ind} className="relative rounded-md hover:bg-yellow-300 text-yellow-300  hover:text-white hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer" onClick={handle}>
                    <img src={item.image} alt="Sixth" className="w-[100%] rounded-md transition-opacity duration-300 hover:opacity-50 opacity-50" style={{ boxShadow: "0px -23px 25px 0px rgba(0, 0, 0, 0.17) inset, 0px -36px 30px 0px rgba(0, 0, 0, 0.15) inset, 0px -79px 40px 0px rgba(0, 0, 0, 0.1) inset, 0px 2px 1px rgba(0, 0, 0, 0.06), 0px 4px 2px rgba(0, 0, 0, 0.09), 0px 8px 4px rgba(0, 0, 0, 0.09), 0px 16px 8px rgba(0, 0, 0, 0.09)"}} />
                    <p className=" absolute bottom-0 text-center lg:text-2xl text-xl p-2 w-full">{item.text}</p>
                  </div>
                )
              })
            }
        </div>

    <div className='mt-10 h-[50px] w-full lg:px-[100px]'>
    <button className=' bg-blue-600 sm:w-[170px] w-[120px] sm:h-full  p-2 rounded-md text-white font-semibold' onClick={handle}>See Cataloge</button>

    </div>
    </div>
  );
};

export default Services;
