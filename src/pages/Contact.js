
import React, { useEffect } from 'react';
import contact_bg from "../assets/Contact/Con_bg.jpeg"
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
  useEffect(()=> {
    document.title = "Contact Us";
  }, [])

  return (
    <div className="relative sm:h-auto w-full">
      <div className="sm:h-1/2">
        <img src={contact_bg} alt='' className="w-full h-[50vh]" />

        <div className="w-[80%] sm:left-24 absolute sm:top-[20px] top-[10px] left-[20px] text-white">
          <h1 className="text-2xl md:text-4xl text-left relative mb-2">Career</h1>
          <hr className="text-gray-300" />
          <p className="font-bold mb-4 md:text-4xl text-2xl mt-6">
            Explore Exciting Career <i className='text-yellow-400'>Opportunities</i> With Us
          </p>
          <p>Mail us at info@eliteengineers.tech</p>
        </div>
      </div>
      <ContactForm />
      
    </div>
  );
};

export default Contact;

