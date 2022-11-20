import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import { createProduct } from "../redux/productSlice";


const Header =(props)=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
    return(
<Navbar bg="light" expand="lg">
<Container>
  <Navbar.Brand className="mx-4"><Link to={'/'}>React-Exemple </Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Link to={'/'}className="mx-4">Home</Link>
      {props.user?<NavDropdown title={props.user?.name} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={()=>navigate('/profile')}>Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>dispatch(logout()).then(()=>navigate('/'))}>
         Logout
        </NavDropdown.Item>
      
      </NavDropdown>:<div><button className="btn btn-dark mx-1" onClick={()=>navigate('/login')}>Login</button>
      <button className="btn btn-dark mx-1" onClick={()=>navigate('/loginPassport')}>Login passport</button></div>}
      <button
        onClick={() =>
          dispatch(createProduct()).then((res) =>
            navigate(`/createProduct/${res.payload._id}`)
          )
        }
        className="btn btn-secondary mx-1"
      >
        create product
      </button>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>)}
export default Header