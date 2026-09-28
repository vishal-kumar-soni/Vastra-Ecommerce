import { Link } from 'react-router-dom'
import Logo from '../components/Assets/logoshoping.png'
import AdminImage from '../components/Assets/admin.jpg'

function Navabar() {
    return (
        <div className="flex justify-around bg-[#d1fff7] w-full z-50 shadow-sky-200 shadow max-md:justify-betwee">

            <Link to='/'>
                <div id="logoImage" className='flex  justify-center gap-1 items-center max-md:ml-10'>
                    <img src={Logo} alt="Logo" className='w-20 h-18 max-lg:size-12' />
                    <p className='bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-clip-text text-transparent text-[30px] max-lg:text-[26px] font-extrabold'>VASHTRA </p>
                </div>
            </Link>

            <div id='adminPanel' className='flex justify-center items-center'>
                <p className='text-[25px] font-semibold'>Admin Panel</p>
            </div>

            {/* Admin profile */}
            <div id='profilePicture' className='flex items-center justify-center gap-3  '>
                <img id='profilePicture-image' className='h-12 w-12 rounded-full max-lg:h-10 max-lg:w-10' src={AdminImage} alt="" />
            </div>
        </div>
    )
}

export default Navabar
