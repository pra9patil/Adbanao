import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='bg-yellow-300'>
      <div className='w-11/12 bg-yellow-300 mx-auto flex justify-between py-4'>
        <div className='w-1/2' >
          logo
        </div>
      <ul className='w-1/2 flex justify-between text-lg font-semibold'>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/canvas">Design Template</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/About">About us</Link>
        </li>
      </ul>
      </div>
      
    </nav>
  );
}

export default Navbar;
