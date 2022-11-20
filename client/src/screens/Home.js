import {useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { createProduct , deleteProduct, fetchProductList } from "../redux/productSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom"
const Home = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(fetchProductList())
  },[])
  return (
    <div className="container">
    
      <div className="d-flex flex-wrap">
      {products?.map((elm) => (
        <Card style={{ width: "18rem", margin:"10px" }}>
          <Card.Img variant="top" src={elm?.image?.slice(6)} />
          <Card.Body>
            <Card.Title>{elm?.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary" onClick={()=>{navigate(`/product/${elm._id}`)}}>see details</Button>
            <Button variant="info" onClick={()=>{navigate(`/createProduct/${elm._id}`)}}>edit</Button>
            <Button variant="danger" onClick={()=>{dispatch(deleteProduct(elm._id)).then(()=>{  dispatch(fetchProductList())})}}>delete</Button>
            
          </Card.Body>
        </Card>
      ))}
      </div>
    </div>
    
  );
};
export default Home;
