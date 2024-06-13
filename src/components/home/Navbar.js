import React,{useState} from 'react'

import logo from "../../assets/Images/Elite Logo.png"
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const NavItems = [
    {  text: "Home",link:"/"  },
    { text: "About",link:"/about"  },
    {  text: "Services", link:"/service" },
    {  text: "Projects" ,link:"/project" },
    // { text: "Contact Us", link: "/contact" },

  ];
  const [activeItem, setActiveItem] = React.useState('');

    const handleItemClick = (index) => {
      setActiveItem(index);
      setShowMenu(false);
    };
  
  return (
    <div className='h-[100px]  w-full bg-black flex justify-between items-center sticky top-0 z-50'>
      <div className='md:w-[20%]  md:px-10 px-5 lg:ml-[5%]'>
        <Link to={'/'}><img src={logo} alt='' className='sm:w-[100px] sm:h-[40px] h-[20px] mb-2' /></Link>
        <p className='text-white lg:text-xs text-xs'>CONSULTING ENGINEERS</p>
      </div>




      <div className={`md:flex md:justify-center md:items-center ${showMenu ? 'block' : 'hidden'} md:h-full h-[90vh] md:w-[70%] w-full md:relative absolute md:top-0 top-[100px] right-0    bg-black z-50 transition-all duration-500 ease-in-out`} style={{transition:"all 0.5s ease-in"}}>
        <ul className="flex flex-col justify-evenly items-center md:flex-row md:text-white gap-10 cursor-pointer lg:w-[70%]  font-semibold md:gap-0 md:pr-6 md:mb-0 mb-4">


          {
            NavItems.map((item,index)=>(
              <li key={index}  style={{marginBottom:'2px',padding:"5px",display:"flex",justifyContent:"center",alignItems:"center" ,textAlign:"center",width:"100px"}} onClick={() => handleItemClick(index)}
              className={"text-white font-bold hover:text-yellow-400 2xl:text-2xl"}>
                <Link to={item.link}>{item.text}</Link>
            </li>
            ))
          }
        </ul>

        <div className='flex flex-col justify-center items-center '>
          <Link to={'/contact'}><button className='bg-blue-600 rounded-md text-white font-bold p-3' onClick={toggleMenu} >Contact Us</button></Link>
        </div>
      </div>

      <div className="md:hidden ">
        <button className="text-white text-xl" onClick={toggleMenu}>
          <i className={`fas ${showMenu ? 'fa-times' : 'fa-bars'} p-4`}></i>
        </button>
      </div>
    </div>
  )
}

export default Navbar

