import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import {ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home"
import { Container } from 'react-bootstrap';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import OrderDetail from './pages/OrderDetail';
import Profile from './pages/Profile';
import AdminRoute from './components/AdminRoute';
import OrderList from './pages/admin/OrderList';
import ProductList from './pages/admin/ProductList';
import ProductEdit from "./pages/admin/ProductEdit"
import UserList from './pages/admin/UserList';
import UserEdit from "./pages/admin/UserEdit"


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <ToastContainer/>
    <main className='py-3'>
<Container>
  <Routes>
    <Route index={true} path='/' element={<Home/>}/>
    <Route  path='/search/:keyword' element={<Home/>}/>
    <Route  path='/page/:pageNumber' element={<Home/>}/>
    <Route  path='/search/:keyword/page/:pageNumber' element={<Home/>}/>
    <Route path='/product/:id' element={<SingleProduct/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path='/shipping' element={<Shipping/>}/>
    <Route path='/payment' element={<Payment/>}/>
    <Route path='/placeorder' element={<PlaceOrder/>}/>
    <Route path='/order/:id' element={<OrderDetail/>}/>
    <Route path='/profile' element={<Profile/>}/>
    </Route>
    <Route element={<AdminRoute/>}>
    <Route path='/admin/orderlist' element={<OrderList/>}/>
    <Route path='/admin/productlist' element={<ProductList/>}/>
    <Route path='/admin/productlist/:pageNumber' element={<ProductList/>}/>
    <Route path='/admin/userlist' element={<UserList/>}/>
    <Route path='/admin/product/:id/edit' element={<ProductEdit/>}/>
    <Route path='/admin/user/:id/edit' element={<UserEdit/>}/>
   

    </Route>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
</Container>
    </main>
    <Footer/>
    </BrowserRouter>
   
    </>
  );
}

export default App;
