import React, { useState, Fragment }  from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem, 
  Container,
  Spinner, 
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';     
import { Login } from '../../../../components/auth';
import Link from 'next/link';
import CookieService from '../../../../services/CookieService';
import Storage from '../../../../services/Storage'; 
import { observer } from 'mobx-react';
import { useMobxStores } from '../../../../stores/stores'; 
 
    const TopBar = ({scroll, handleForm, isOpen, toggle, doForm}) => {
    const { authStore } = useMobxStores();
    const { extendToSeller, loading } = authStore; 
    const [dropdownOpen, setOpen] = useState(false);
    const toggleDp = () => setOpen(!dropdownOpen);
    const token = Storage.get('token');
    const access_token = CookieService.get('access_token');  

    const logout = () => Storage.logout();
    const initial_data = {  
    referred: true,
    goto: 'SELLERS'
    }  

    const authenticatorLinks = () => { 
    if(token) { 
    return (
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDp}>
    <DropdownToggle caret>
    Account
    </DropdownToggle>
    <DropdownMenu> 
    <DropdownItem>
    <Link href="/buyer/profile">
        <a className="nav-link">Profile</a>
    </Link> 
    </DropdownItem>
    {access_token ? 
    <DropdownItem>
    <Link  href="/seller/dashboard">
        <a className="nav-link" target="blank">Seller Dashboard</a>
    </Link>

    </DropdownItem> : 
    <Fragment>
    <DropdownItem className="cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0 pt-2"> 
    <span  onClick={createSeller}>Create Seller Account</span>

    </DropdownItem>


    </Fragment>
    }
    <DropdownItem divider />
    <DropdownItem>
    <span className="nav-link" onClick={logout}>Logout</span></DropdownItem>
    </DropdownMenu>
    </ButtonDropdown>
    )

    } 
    }

 

const createSeller = () => {
    extendToSeller();
}
if(loading) {
    return (<Spinner type="grow" color="info" style={{width: '5rem', height: '5rem'}} /> )
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
            {!token ?
            (
                <NavItem className="cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0 pt-2"> 
                <span onClick={() => handleForm('register','login')}>Seller Login</span>
                <div className="arrow-up" style={{display: doForm['login']}}></div>
                    <div className="top-container">
                <div className="login-form" style={{display: doForm['login']}}>
                    <Login initial_data={initial_data} />
                </div>
                    </div> 
            </NavItem> 
            )
            :null}
            {authenticatorLinks()}
           
      </Nav>
        </Collapse>
        </Container>
        </Navbar>

<Navbar  color="dark" dark  expand="md">
    <Nav>
    <NavItem>
          <Link href="/buyer/dashboard">
            <a className="nav-link">Dashboard</a>
          </Link> 
            </NavItem>
            <NavItem>
               <Link href="/buyer/bids">
                <a className="nav-link">Bids</a>
                </Link> 
            </NavItem>  
            <NavItem> 
                 <Link  href="/buyer/my-orders">
                     <a className="nav-link">My Orders</a>
                 </Link>
            </NavItem>  
            <NavItem> 
                <Link href="/buyer/profile">
                <a className="nav-link">Profile</a>
                </Link> 
            </NavItem>
    </Nav> 
</Navbar>
</Fragment> 
           
    )
}

export default observer(TopBar);