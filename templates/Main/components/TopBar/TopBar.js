import React, { useState }  from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem, 
  Container,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';     
import { SignUp, Login } from '../../../../components/auth';
import Link from 'next/link'; 
import CookieService from '../../../../services/CookieService';
import Storage from '../../../../services/Storage';
const TopBar = (props) => {
    const {scroll, handleForm, isOpen, toggle, doForm} = props;
    const [dropdownOpen, setOpen] = useState(false);
    const tokenDp = () => setOpen(!dropdownOpen);
        const token = Storage.get('token');
        const access_token = CookieService.get('access_token');  
        const logout = () => Storage.logout();

    const authenticatorLinks = () => { 
        if(token) { 
            return (
                <ButtonDropdown isOpen={dropdownOpen} toggle={tokenDp}>
                    <DropdownToggle caret>
                        Account
                    </DropdownToggle>
                    <DropdownMenu> 
                    <DropdownItem>
                   <Link href="buyer/dashboard">
                       <a className="nav-link">Profile</a> 
                    </Link> 
                    </DropdownItem>
                    {access_token ? 
                     <DropdownItem>
                   <Link  href="seller/dashboard">
                       <a className="nav-link">Shop</a>
                   </Link>
                    </DropdownItem>: null}
                        <DropdownItem divider />
                        <DropdownItem>
                         <span className="nav-link" onClick={logout}>Logout</span></DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            ) 
        } 
    }

    
const switcher = () => {
    if (!access_token || !token) {
      
    return (
        <>
          <NavItem className="cta-btn ml-xl-1 ml-lg-1 ml-md-0 ml-sm-0 ml-0 pt-2"> 
                <span className="pb_rounded-4 px-4 rounded" onClick={() => handleForm('login','register')}>Sign up</span>
                 <div className="arrow-up" style={{display: doForm['register']}}></div>
                    <div className="top-container">
                 <div className="login-form" style={{display: doForm['register']}}>
                     <SignUp />
                 </div>
                    </div> 
            </NavItem>
        <NavItem className="cta-btn ml-xl-1 ml-lg-1 ml-md-0 ml-sm-0 ml-0 pt-2"> 
                <span className="pb_rounded-4 px-4 rounded" onClick={() => handleForm('register','login')}>Login</span>
                <div className="arrow-up" style={{display: doForm['login']}}></div>
                    <div className="top-container">
                <div className="login-form" style={{display: doForm['login']}}>
                    <Login />
                </div>
                    </div> 
            </NavItem> 
    </>
    )
}
    
}


    return (
         
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
             
            {switcher()}
            {authenticatorLinks()}
        </Nav>
        </Collapse>
        </Container>
        </Navbar>
           
    )
}

export default TopBar;