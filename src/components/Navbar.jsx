import {
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { useState } from 'react'
import { Link } from 'react-scroll'

const Navbar = () => {

  const [nav, setNav] = useState(false)

  const handleClick = () => setNav(!nav)

return (
  <div className="fixed top-0 w-full h-[80px] flex justify-between items-center px-4 bg-[#08192f] text-gray-300 z-20">
      <div>
          <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo image" style={{width: '60px'}} />
      </div>
      {/*  Menu */}
          <ul className='hidden md:flex'>
              <li className='mx-2 cursor-pointer'><Link to='originales' smooth={true} duration={500} >Originales</Link></li>
              <li className='mx-2 cursor-pointer'><Link to='editadas' smooth={true} duration={500} >Editados</Link></li>
          </ul>
          
      {/* Hamburger */}
      <div onClick={handleClick} className='md:hidden z-10'>
          {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile Menu */}
      <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#08192f] flex flex-col justify-center items-center'}>
              <li className='py-6 text-4xl'><Link onClick={handleClick} to='originales' smooth={true} duration={500} >Originales</Link></li>
              <li className='py-6 text-4xl'><Link  onClick={handleClick} to='editadas' smooth={true} duration={500} >Editados</Link></li>
      </ul>

  </div>
)
}

export default Navbar