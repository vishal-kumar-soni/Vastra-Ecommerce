import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";


function ListProducts() {
  const [allProducts, setAllProducts] = useState([])

  // fetch all products
  const fetchAllProducts = async () => {
    const response = await axios.get('https://vastra-ecommerce-backend-w9o9.onrender.com/api/product/getallproducts')
    setAllProducts(response.data.data)
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])


  // Remove Product
  const removeProduct = async (id) => {
     await axios.post('https://vastra-ecommerce-backend-w9o9.onrender.com/api/product/removeproduct', { id: id })

    fetchAllProducts()
  }


  return (
    <div className='flex flex-col item-center w-full h-[750px] py-2 px-8 m-4 bg-white rounded-sm'>
      <h1 className='text-4xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan bg-clip-text text-transparent  text-center uppercase py-8 '>All Products</h1>
      <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-[10px] w-full py-[20px] text-[#272727] text-[15px] font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <hr className='h-[4px] mb-7 border-2 rounded-2xl text-[#a09797] ' />

      <div className=' '>
        {
          allProducts.map((product, index) => {
            if (product.length < 0) {
              return <p>No Products</p>
            }
            return (
              <div key={index} className="grid bg-gray-200 gap-y-4 my-4 grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-[10px] w-full  text-[#454545] text-[15px] font-semibold">
                <img src={product.image} alt="product Image" className='h-[58px] m-1.5' />
                <p className='py-6'>{product.name}</p>
                <p className='py-6'>${product.old_price}</p>
                <p className='py-6'>${product.new_price}</p>
                <p className='py-6'>{product.category}</p>
                <p className='h-6 py-7 ml-2 font-bold cursor-pointer text-[18px]'><RxCross2 onClick={() => removeProduct(product.id)} /></p>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default ListProducts
