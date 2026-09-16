import Logo from '../components/Assets/logoshoping.png'


function Navabar() {
    return (
        <div className="flex justify-around bg-[#d1fff7] w-full z-50 shadow-sky-200 shadow max-md:justify-betwee">

            <div id="logoImage" className='flex  justify-center gap-1 items-center max-md:ml-10'>
                <img src={Logo} alt="Logo" className='w-20 h-18 max-lg:size-12' />
                <p className='bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-clip-text text-transparent text-[30px] max-lg:text-[26px] font-extrabold'>VASHTRA </p>
            </div>
 
            <div id='adminPanel' className='flex justify-center items-center'>
                <p className='text-[25px] font-semibold'>Admin Panel</p>
            </div>

            {/* Admin profile */}
            <div id='profilePicture' className='flex items-center justify-center gap-3  '>
                <img id='profilePicture-image' className='h-12 w-12 rounded-full max-lg:h-10 max-lg:w-10' src="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwbWVufGVufDB8fDB8fHww" alt="" />
            </div>
        </div>
    )
}

export default Navabar
