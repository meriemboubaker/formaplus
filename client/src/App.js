
import './App.css';
import {BrowserRouter as Router , Routes ,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home';
import Product from './screens/Product';
import CreateProduct from './screens/CreateProduct';
import CreateUser from './screens/CreateUser';
import Login from './screens/Login';
import LoginPassport from './screens/LoginPassport';
import Header from './Components/Header';
import Profile from './screens/Profile';
import {ProtectedRoute} from "./AuthRoute"
import {useSelector} from "react-redux";
function App() {
  const {user} = useSelector(state=>state.user)
  return (
    <div className="App">
    <Router>
      <Header user={user}/>
  
      <Routes>
        <Route index path="*" element={<Home/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/createProduct/:id" element={<CreateProduct/>}/>
        <Route path ="/createUser" element={<CreateUser/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/loginPassport" element={<LoginPassport/>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
