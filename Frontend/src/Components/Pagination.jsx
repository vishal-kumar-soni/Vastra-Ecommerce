import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';


function Pagination({ AllProductsLength, productPerPage, currentPage }) {
    const { setCurrentPage } = useContext(ShopContext);
    
    let pages = [];

    for (let i = 1; i <= Math.ceil(AllProductsLength / productPerPage); i++) {
        pages.push(i);
    }

    return (
        <>
            {
                pages.map((page, idx) => {
                    return <button
                        onClick={()=>setCurrentPage(page)}
                        className={`px-3 py-1 mx-1.5 text-black/80 border-2 rounded-md cursor-pointer font-semibold border-black/30 ${page==currentPage ? "bg-cyan-500 border-cyan-500 text-white" : ""} `}
                        key={idx}
                    >{page}</button>
                })
            }
        </>
    )
}

export default Pagination
