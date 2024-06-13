
import React, { useState } from 'react';
import Faqbg from "../../assets/projectCarousel/Faq.jpeg"
const Faq = () => {

    // *********  Faq Data  *************
    const data = [
        {
            label: "1. How can I request a quote for engineering services from Elite Engineers?",
            description: "To request a quote, simply fill out the contact form on the Elite Engineers website, providing details about your project requirements."
        },
        {
            label: "2. Does Elite Engineers offer ongoing support after project completion?",
            description: "Yes, Elite Engineers provides ongoing support and maintenance services to ensure the continued success of completed projects."
        },
        {
            label: "3. What engineering services does Elite Engineers offer?",
            description: "Elite Engineers provides a comprehensive range of engineering services including, FEA - Finite Element Analysis,  Computational Fluid Dynamics, Solar Plant Design,"
        },
        {
            label: "4. What geographic regions does Elite Engineers serve?",
            description: "Elite Engineers serves clients globally, with a focus on delivering high-quality engineering services worldwide"
        }
    ];

    
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <div className='w-full p-6' style={{ backgroundImage: `url(${Faqbg})`, backgroundSize: 'cover' }}>
            
            <div className=" lg:w-[70%] w-[80%] p-4 relative lg:px-[100px] mt-10" >
            <h1 className='text-white mb-6 font-semibold sm:text-3xl text-xl'>FAQ</h1>
            {data.map((item, index) => (
                <div key={index} className="border-b border-white text-white mb-4">
                    <div className="flex justify-between items-center cursor-pointer p-4" onClick={() => toggleAccordion(index)}>
                        <h2 className="text-lg lg:text-xl font-semibold">{item.label}</h2>
                        <svg
                            className={`w-6 h-6 transition-transform transform ${openAccordion === index ? 'rotate-180' : 'rotate-0'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {openAccordion === index && (
                        <div className="p-4  border-gray-300" >
                            <p className="text-[18px] lg:text-xl">{item.description}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
        <div className=''>
            <ul className='flex text-white float-right p-2 text-2xl gap-5'>
                <li><i class="fa-brands fa-facebook"></i></li>
                <li><i class="fa-brands fa-x-twitter"></i></li>
                <li><i class="fa-brands fa-linkedin"></i></li>
                <li><i class="fa-solid fa-link"></i></li>
            </ul>
        </div>
        </div>
    );
};

export default Faq;
