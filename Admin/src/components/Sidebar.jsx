import { Link } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";

function Sidebar() {
    return (
        <div className='flex  flex-col gap-5 pt-5 w-full h-[100vh] max-w-[220px] bg-white max-md:flex-row max-md:w-full max-md:h-full max-md:py-6 max-md:px-0 max-md:max-w-none max-md:justify-center'>

            <Link 
                id='addProduct'
                to='/addproduct'
                className='flex items-center justify-center bg-[#f0ecec] mx-4 gap-4 py-2 px-3 rounded-sm cursor-pointer'
            >
                <FaCartPlus className='text-[20px]' />
                <p className='text-[20px]'>Add Product</p>
            </Link>

            <Link 
                id='productList'
                to='/listproduct'
                className='flex items-center justify-center mx-4 gap-4 py-2 px-3 rounded-sm bg-[#f0ecec] cursor-pointer'
            >
                <SiBookstack className='text-[20px] ' />
                <p className='text-[20px] '>Product List</p>
            </Link>

        </div>
    )
}

export default Sidebar