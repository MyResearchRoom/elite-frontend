import React, { useEffect } from 'react'

import serviceData from '../DATA/ServiceData'

const Service = () => {

  useEffect(()=> {
    document.title = "Services";
  }, [])
  
  return (
    <div className='h-auto  bg-black text-white p-6'>
    <div className='w-full lg:px-[100px]'>
      <h1 className=" text-2xl mb-4 md:text-4xl text-left">Our Engineering Services</h1>
      <p>Enhancing Value Through Optimised Engineering Solutions</p>
    </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center gap-5 w-full h-full lg:px-[100px]">

      {/* *********  Service Data Mapping ************** */}
        {serviceData.map((service, index) => (
          <div key={index} className=" p-4 " style={{backgroundColor:"rgba(36, 40, 52, 1)",height:"100%"}} >
            <div className='mb-4'>
              <img src={service.image} alt={service.title}  className="w-full	h-[40%] object-cover" />
            </div>
            <div className='mb-4'>
              <button className="border  text-center p-4 rounded-xl w-full">{service.title}</button>

            </div>
            <ul className="max-h-[60vh] overflow-y-auto" style={{scrollbarWidth:"none"}}>
              {service.tasks.map((task, idx) => (
                <li key={idx} className='mb-1 font-semibold' >{task}</li>
              ))}
            </ul>
          </div>
        ))} 
      </div>
    </div>
  )
}

export default Service



















// import React from 'react'




// import serviceData from '../DATA/ServiceData'

// const Service = () => {
//   return (
//     <div className='h-auto w-full bg-green-900 text-white p-6'>
//     <div className='w-[80%] relative sm:left-24 mt-4'>
//       <h1 className="text-2xl mb-4  md:text-4xl text-left relative ">Our Engineering Services</h1>
//       <p>Enhancing Value Through Optimised Engineering Solutions</p>
//     </div>

//       <div className="lg:grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:px-[10%] sm:flex p-2 sm:flex-col sm:justify-center sm:items-center sm:px-[12%]  gap-[2%] bg-black mt-8">
//         {serviceData.map((service, index) => (
//           <div key={index} className="flex flex-col items-center sm:w-[350px] lg:w-auto p-10 md:h-[700px]  gap-[5%]" style={{backgroundColor:"rgba(36, 40, 52, 1)"}}>
//             <img src={service.image} alt={service.title}  className="w-full h-auto rounded-md opacity-50	" />
//             <button className="border font-semibold mt-2 p-4 rounded-xl w-full">{service.title}</button>
//             <ul className="text-sm text-left w-full">
//               {service.tasks.map((task, idx) => (
//                 <li key={idx} className='mb-1 font-semibold' >{task}</li>
//               ))}
//             </ul>
//           </div>
//         ))} 
//       </div>
//     </div>
//   )
// }

// export default Service
