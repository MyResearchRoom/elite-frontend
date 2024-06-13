import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-14 w-full h-auto p-6">
      <div className="container mx-auto flex flex-wrap justify-evenly">
        {/* Contact */}
        <div className="w-full md:w-auto mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className='gap-4 text-gray-300'>
            {/* <p>123 Street, City</p>
            <p>Country, Postal Code</p> */}
            <p>52, Jansukh Apt.,</p>
            <p>Kasturba Rd.</p>
            <p>Kandivali W, Mumbai-67</p>
            <p>info@eliteengineers.tech</p>
            <p className='mb-[40px]'>808-276-3379</p>

            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md">Get a Quote</button>
          </div>
        </div>

        {/* Be in the Know */}
        <div className="w-full md:w-auto mb-8 md:mb-0 flex flex-col justify-between text-gray-300">
          <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Be in the Know</h3>
          <p>Please send us your email we shall include you in our mailing list</p>
          </div>
          <div className='flex flex-col justify-between '>
            <p>Email<sup>*</sup></p>
            <div className="flex gap-4">
              <input type="email" placeholder="" className="border bg-transparent border-gray-400 px-4 py-2 rounded-xl" />
              <button className="bg-white text-black px-4 py-2 rounded-xl text-[16px]">Submit</button>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="w-full md:w-auto mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Menu</h3>
          <ul className='text-gray-300'>
            <Link to={'/'}><li>Home</li></Link>
            <Link to='/about'><li>About</li></Link>
            <Link to='/contact'><li>Contact</li></Link>
            <Link to='service'><li>Service</li></Link>
            <Link to='/project'><li>Project</li></Link>
          </ul>
        </div>

        {/* Follow */}
        <div className="w-full md:w-auto">
          <h3 className="text-lg font-semibold mb-4">Follow us on</h3>
          
          <ul className='text-gray-300'>
            <li><Link to="https://www.facebook.com">Facebook</Link></li>
            <li><Link to="https://in.linkedin.com/company/elitecengg">Linkedin</Link></li>
            <li><Link to="https://twitter.com">Twitter</Link></li>
          </ul>
        </div>
      </div>
      <div className='float-right'>
        <p>Designed & Developed by <span className='text-blue-500 underline font-bold'><Link to='https://wesolutize.com/'>We Solutize</Link></span></p>
        <p>Powered by <span className='text-blue-500 underline font-bold'><Link to='https://myresearchroom.com/'>My Research Room</Link></span></p>
      </div>
    </footer>
  );
};

export default Footer;
