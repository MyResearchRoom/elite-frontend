// TrustedBy.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// ********** Trusted By Data  **********
const trust=[
  "Maximizing value from Engineering Design and Simulation",
  "10 years of Experience",
  "Serving reputed EPC Industries and manufacturing sector companies",
  "State of art tools and technology"
]
const TrustedBy = () => {
  const navigate=useNavigate();

  // **********  Navigate to About Page *************
  const handle=()=>{
    navigate('/about')
  }
  return (
    <div className="bg-black p-6 w-full ">
        <div className='w-full lg:px-[100px] mb-4'>
          <h2 className="text-white font-semibold md:text-4xl lg:text-3xl text-xl mb-4 lg:mt-10 ">Why Choose Elite</h2>
          <hr className='' />
        </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 lg:px-[100px] ">

        {
          trust.map((data,ind)=>{
            return(
              <div key={ind} className="flex lg:w-[100%] lg:h-[70%]  items-center sm:mb-20 mb-5 border-l-8  rounded border-blue-500  ">
                <p className="text-white ml-2 sm:text-[18px] lg:text-2xl md:text-3xl text-xl">{data}</p>
            </div>
            )
          })
        }
      </div>

      <div className=' h-auto mt-4 lg:px-[100px]'>
        <p className='text-white lg:text-4xl md:text-3xl text-xl h-auto mb-8  sm:leading-[50px]'>We functions at the vanguard of engineering Design and Analysis, and repeatedly endeavour to attain the best solutions for our customers.</p>
        <button className=' bg-blue-600 sm:w-[170px] sm:h-[50px] text-white font-semibold p-2 rounded-md' onClick={handle}>See All Insights</button>
      </div>
    </div>
  );
};

export default TrustedBy;
