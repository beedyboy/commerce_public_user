import React, { useState, Fragment }  from 'react';
import {
    Modal,
    ModalHeader,ModalBody, Button, Navbar, 
    NavbarBrand, Container,  NavbarToggler, Collapse, Nav, NavItem
} from 'reactstrap';     
import { Login, SignUp } from '../../../../components/auth';
import Link from 'next/link';
import CookieService from '../../../../services/CookieService';
import Storage from '../../../../services/Storage'; 
import { observer } from 'mobx-react';
import { useMobxStores } from '../../../../stores/stores'; 
 
const TopBar = ({openAccount, openSideBar, setOpenAccount, isOpen, toggle, scroll}) => { 
    const { authStore } = useMobxStores();
    const { extendToSeller, loading } = authStore;  
    const [loginModal, setLoginModal] = useState(false); 
    const [registerModal, setRegisterModal] = useState(false); 

    const toggleLogin = () => setLoginModal(!loginModal);
    const closeLoginBtn = <Button className="close" onClick={toggleLogin}>&times;</Button>;  
  
    const toggleRegister = () => setRegisterModal(!registerModal);
    const closeRegisterBtn = <Button className="close" onClick={toggleRegister}>&times;</Button>;  
  
    const token = Storage.get('token');
    const access_token = CookieService.get('access_token');  

    const logout = () => Storage.logout();
    const initial_data = {  
    referred: false,
    goto: ''
    }  

    const switcher = () => {
        if (!access_token || !token) {
          
        return (
            <>
            <div className="accounts-item"> 
                    <div className="text">
                    <span className="nav-link" onClick={() => handleForm('register')}>Register</span>
                    </div>
                  </div>  
            <div className="accounts-item"> 
            <div className="text">
            <span className="nav-link" onClick={() => handleForm('login')}>Login</span>
            </div>
            </div>  
              
        </>
        )
    }
        
    }
    

    const authenticatorLinks = () => { 
    if(token) { 
     
        <div className="accounts-item"> 
        <div className="text">
        <Link href="/buyer/profile">
            <a className="nav-link">Profile</a>
            </Link> 
        </div>
   </div>
    }
    {access_token ? 
        <div className="accounts-item"> 
        <div className="text">
        <Link href="/seller/dashboard">
            <a className="nav-link" target="blank">Seller Dashboard</a>
            </Link> 
        </div>
   </div>
    : 
       <Fragment>
            <div className="accounts-item"> 
             <div className="text">
              <span className="nav-link"  onClick={createSeller}>Create Seller Account</span> 
             </div>
            </div>  
        
       </Fragment>
       }
    
     <div className="accounts-item"> 
          <div className="text">
           <span className="nav-link"  onClick={logout}>Logout</span> 
          </div>
         </div>  

    
}
const handleForm = (item) => { 
    if(item === 'login') {
        toggleLogin()
    } else {
        toggleRegister()
    } 
  }
 

const createSeller = () => {
    extendToSeller();
} 
    return (
        <Fragment>
             <Navbar  color="light" light  className={`pb_navbar pb_scrolled-light ${scroll} `} id="templateux-navbar" expand="md">
        <Container>
        <NavbarBrand><span className="text-danger">Online</span>Shopping</NavbarBrand> 
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={!isOpen} id="templateux-navbar-nav" navbar>
        <Nav className="ml-auto" navbar> 
            <NavItem>
              <Link href="/">
                  <a className="nav-link">Home</a>
            </Link> 
            </NavItem> 
            <NavItem> 
            <span className="nav-link" onClick={e => setOpenAccount(!openAccount)}><i className="fa fa-user"></i></span>
            </NavItem> 
            <div className={`accounts ${openAccount? 'box-active': ''}`} id="box">
                  <h2>Account </h2>  
                {authenticatorLinks()}  
                {switcher()}
              </div>
        </Nav>
        </Collapse>
        </Container>
        </Navbar>
 
              <Modal isOpen={loginModal} toggle={toggleLogin}>
                <ModalHeader toggle={toggleLogin} close={closeLoginBtn}>Login</ModalHeader>
                <ModalBody>
                    <Login toggle={toggleLogin}  initial_data={initial_data}  />
                </ModalBody>
             </Modal>  
            
             <Modal isOpen={registerModal} toggle={toggleRegister}>
                <ModalHeader toggle={toggleRegister} close={closeRegisterBtn}>Register</ModalHeader>
                <ModalBody>
                    <SignUp toggle={toggleRegister}  initial_data={initial_data}  />
                </ModalBody>
             </Modal>  

</Fragment> 
           
    )
}

export default observer(TopBar);
   