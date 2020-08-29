import React, { useState, Fragment }  from 'react';
import {
    Modal,
    ModalHeader,ModalBody, Button
} from 'reactstrap';     
import { Login } from '../../../../components/auth';
import Link from 'next/link';
import CookieService from '../../../../services/CookieService';
import Storage from '../../../../services/Storage'; 
import { observer } from 'mobx-react';
import { useMobxStores } from '../../../../stores/stores'; 
 
const TopBar = ({openAccount, openSideBar, setOpenAccount}) => { 
    const { authStore } = useMobxStores();
    const { extendToSeller, loading } = authStore;  
    const [loginModal, setLoginModal] = useState(false); 

    const toggleLogin = () => setLoginModal(!loginModal);
    const closeLoginBtn = <Button className="close" onClick={toggleLogin}>&times;</Button>;  
    const token = Storage.get('token');
    const access_token = CookieService.get('access_token');  

    const logout = () => Storage.logout();
    const initial_data = {  
    referred: true,
    goto: 'SELLERS'
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
}
const handleForm = () => { 
    toggleLogin()
  }
 

const createSeller = () => {
    extendToSeller();
} 
    return (
        <Fragment>
        <div className="hamburger">
                <div className="hamburger__inner">
                  <i className="fa fa-bars" aria-hidden="true" onClick={openSideBar}></i>
                </div>
              </div>
              <ul className="menu">
              <li><Link href="/"><a>Home</a></Link></li>
              <li><Link href="/buyer/buyer-bids"><a>Bids</a></Link></li>
              <li><Link href="/"><a>Orders</a></Link></li>
              </ul>
              <ul className="right_bar">
              <li><Link href="/"><a><i className="fa fa-bell"></i></a></Link></li>
              <li><span onClick={e => setOpenAccount(!openAccount)}><i className="fa fa-user"></i></span>
              
              </li>
              </ul>
              <div className={`accounts ${openAccount? 'box-active': ''}`} id="box">
                  <h2>Account </h2> 
                  {!token ?
             <Fragment>
                  <div className="accounts-item"> 
          <div className="text">
          <span className="nav-link" onClick={handleForm}>Seller Login</span>
          </div>
         </div>  
             </Fragment> 
            :null} 
            {authenticatorLinks()}  
              </div>
              <Modal isOpen={loginModal} toggle={toggleLogin}>
                <ModalHeader toggle={toggleLogin} close={closeLoginBtn}>Login</ModalHeader>
                <ModalBody>
                    <Login toggle={toggleLogin}  initial_data={initial_data}  />
                </ModalBody>
             </Modal>  
            

</Fragment> 
           
    )
}

export default observer(TopBar);
   