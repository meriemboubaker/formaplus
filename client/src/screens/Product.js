import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {fetchProduct,clearState} from '../redux/productSlice'
import {useDispatch , useSelector} from "react-redux"
import {useParams} from "react-router-dom"
const Product = () => {
    const param= useParams()
    const id = param.id
    const dispatch = useDispatch()
    const {product,loading} = useSelector(state=>state.product)
 useEffect(()=>{
dispatch(fetchProduct(id))
return(()=>{
    dispatch(clearState())//clean up the product state to remove glitshes
})
 },[])
    return(
        <>{loading?  
            <div className="w-100 mt-2 d-flex justify-content-center">
                <div className="spinner-border mx-auto" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        :<div className="d-flex container">
             <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={product?.image?.slice(6)}
          alt="First slide"
        />
       
      </Carousel.Item>
    
    </Carousel>
    <div className='border-1 m-5'>
        <h1>product: {product?.name}</h1>
        <h1>quantity :{product?.quantity}</h1>
    </div>
        </div>}</>
    )
}
export default Product