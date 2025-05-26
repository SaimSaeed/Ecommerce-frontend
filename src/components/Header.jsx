import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../features/userApiSlice'
import { logout } from '../features/authSlice'
import {toast} from "react-toastify"
import SearchBox from './SearchBox'
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const CartItem = useSelector(state => state.cart.cartItems)
  const {userInfo} = useSelector(state=>state.auth)
  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler =async ()=>{
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate("/login")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <header>

      <Navbar bg='dark' variant='dark' expand="md" collapseOnSelect >
        <Container>
          <Navbar.Brand ><Link to={"/"} className='text-white'>Apparels Inc</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox/>
              <Nav.Link style={{position:"relative"}} className='mx-2'><Link to={"/cart"} style={{color:"white"}}>
                <FaShoppingCart />
                {CartItem?.length > 0 &&
                <Badge pill bg='secondary' style={{marginLeft:"5px"}} className="badge" >
                    {CartItem.reduce((a,c)=> a+= c.qty,0)}
                </Badge>}
                </Link>
              </Nav.Link>
              {
              
              userInfo ?   (<NavDropdown title={userInfo.username}  id="basic-nav-dropdown">
                
              <NavDropdown.Item ><Link to={"/profile"}>Profile</Link></NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>) :  (<Nav.Link style={{color:"white"}} ><Link to={"/login"} style={{color:"white"}}><FaUser /> Sign In</Link></Nav.Link>)
              }

            {
              
            userInfo && userInfo.isAdmin &&  (<NavDropdown title="Admin"  id="basic-nav-dropdown">
                
              <NavDropdown.Item ><Link to={"/admin/orderlist"}>Orders</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to={"/admin/productlist"}>Products</Link></NavDropdown.Item>
              <NavDropdown.Item ><Link to={"/admin/userlist"}>Users</Link></NavDropdown.Item>

            </NavDropdown>) 
              }

             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </header>
  )
}

export default Header