
import React from 'react';


import first from "../../assets/firstImage.png"
import second from "../../assets/bajaj.png";
import third from "../../assets/godrej.png";
// import fourth from "../../../assets/paras.png";
import fifth from "../../assets/raja.png";
import sixth from "../../assets/skipper.png";
import seventh from "../../assets/tata.png";
import "./Scroll.css"
const Scroll = () => {
 

  return (
    <div className="flex bg-black sm:w-full " style={{overflow:"hidden",whiteSpace:"nowrap",}}>
        
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className='animation-scroll  sm:h-[150px] lg:h-[100px]' >
        <div style={{height:"110px ",width:"160px"}}><img src={first} alt="First" className='h-[80%]' /></div>
        <div style={{height:"110px ",width:"160px"}}><img src={second} alt="Second" className="h-[80%]" /></div>
        <div style={{height:"110px ",width:"160px"}}><img src={third} alt="Third" className="h-[80%]" /></div>
        <div style={{height:"110px ",width:"160px"}}><img src={fifth} alt="Fifth" className="h-[80%]" /></div>
        <div style={{height:"110px ",width:"160px"}}><img src={sixth} alt="Sixth" className="h-[80%]" /></div>
        <div style={{height:"110px ",width:"160px"}}><img src={seventh} alt="Seventh" className="h-[80%]" /></div>
      </div>

      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className='  animation-scroll sm:h-[150px] lg:h-[100px]' >
        <div style={{height:"110px",width:"160px"}}><img src={first} alt="First" className='h-[80%]' /></div>
        <div style={{height:"110px",width:"160px"}}><img src={second} alt="Second" className="h-[80%]" /></div>
        <div style={{height:"110px",width:"160px"}}><img src={third} alt="Third" className="h-[80%]" /></div>
        <div style={{height:"110px",width:"160px"}}><img src={fifth} alt="Fifth" className="h-[80%]" /></div>
        <div style={{height:"110px",width:"160px"}}><img src={sixth} alt="Sixth" className="h-[80%]" /></div>
        <div style={{height:"110px",width:"160px"}}><img src={seventh} alt="Seventh" className="h-[80%]" /></div>
      </div>
    </div>


    // <div className="flex bg-black sm:w-full ">
      
    // <Marquee speed={100} pauseOnHover className=''>
        
    //   <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} className='  sm:h-[150px]' >
    //     <div style={{height:"150px ",width:"200px"}}><img src={first} alt="First" className='h-[80%]' /></div>
    //     <div style={{height:"150px ",width:"200px"}}><img src={second} alt="Second" className="h-[80%]" /></div>
    //     <div style={{height:"150px ",width:"200px"}}><img src={third} alt="Third" className="h-[80%]" /></div>
    //     <div style={{height:"150px ",width:"200px"}}><img src={fifth} alt="Fifth" className="h-[80%]" /></div>
    //     <div style={{height:"150px ",width:"200px"}}><img src={sixth} alt="Sixth" className="h-[80%]" /></div>
    //     <div style={{height:"150px ",width:"200px"}}><img src={seventh} alt="Seventh" className="h-[80%]" /></div>
    //     <div style={{height:"150px ",width:"200px"}}><img src={fifth} alt="Fifth" className="h-[80%]" /></div>
    //   </div>
     
    //   </Marquee>

    // </div>

  );
};

export default Scroll;

