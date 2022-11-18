
import './App.css';
import {BrowserRouter as Router , Routes ,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home';
import Product from './screens/Product';
import CreateProduct from './screens/CreateProduct';
import CreateUser from './screens/CreateUser';
import Login from './screens/Login';
import Header from './Components/Header';
function App() {
  return (
    <div className="App">
      <Header/>
    <Router>
      <Routes>
        <Route index path="*" element={<Home/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/createProduct/:id" element={<CreateProduct/>}/>
        <Route path ="/createUser" element={<CreateUser/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
