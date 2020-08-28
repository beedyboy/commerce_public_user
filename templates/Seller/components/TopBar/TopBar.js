import React, { useState, Fragment }  from 'react';
import {
    Modal,
    ModalHeader,ModalBody, Button
} from 'reactstrap';     
import { Login, SignUp } from '../../../../components/auth';
import Link from 'next/link'; 
import CookieService from '../../../../services/CookieService';
import Storage from '../../../../services/Storage'; 
import { observer } from 'mobx-react';
import { useMobxStores } from '../../../../stores/stores';
const TopBar = ({openAccount, openSideBar, setOpenAccount}) => { 
        const { authStore } = useMobxStores();
        const { extendToBuyer, loading } = authStore;
        const [loginModal, setLoginModal] = useState(false); 
        const token = Storage.get('token');
        const access_token = CookieService.get('access_token');  
        const logout = () => CookieService.logout();
        const initial_data = {  
        referred: true,
        goto: 'BUYERS'
        }  

        const toggleLogin = () => setLoginModal(!loginModal);
        const closeLoginBtn = <Button className="close" onClick={toggleLogin}>&times;</Button>; 

       
const authenticatorLinks = () => { 
    if(access_token) { 
        return ( 

            <Fragment> 
                 <div className="accounts-item"> 
                <div className="text">
                <Link href="/seller/profile">
                    <a className="nav-link">Profile</a>
                    </Link> 
                </div>
          </div>
               {token ? 
                <div className="accounts-item"> 
                <div className="text">
                <Link href="/buyer/dashboard">
                    <a className="nav-link">Buyer Dashboard</a>
                    </Link> 
                </div>
          </div> : 

          <div className="accounts-item"> 
          <div className="text">
           <span className="nav-link"  onClick={createBuyer}>Create Buyer Account</span> 
          </div>
         </div> 
                
             }

               <div className="accounts-item"> 
          <div className="text">
          <span className="nav-link" onClick={logout}>Logout</span>
          </div>
         </div> 
            </Fragment>
        )

   
    } 
}

const handleForm = () => { 
      toggleLogin();
  }
 

const createBuyer = () => {
    extendToBuyer();
} 
    return (
        <Fragment>  

        <div className="hamburger">
                <div className="hamburger__inner">
                  <i className="fa fa-bars" aria-hidden="true" onClick={openSideBar}></i>
                </div>
              </div>
              <ul className="menu">
              <li><Link href="/"><a>Blogs</a></Link></li>
              <li><Link href="/"><a>Contact</a></Link></li>
              <li><Link href="/"><a>Product</a></Link></li>
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
          <span className="nav-link" onClick={handleForm}>Buyer Login</span>
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