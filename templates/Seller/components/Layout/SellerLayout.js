import React, { useState, useEffect, Fragment } from 'react'; 
import Aos from "aos"; 
import TopBar from '../TopBar';
import Footer from '../Footer'; 
import Router from 'next/router';
import { Container, Row, Col } from 'reactstrap';
import CookieService from '../../../../services/CookieService'; 
import SellerSidebar from '../Sidebar/Sidebar'; 
  
const SellerLayout = props => { 
  const [sidebar, setSidebar] = useState(false); 
  const [openAccount, setOpenAccount] = useState(false);  
    const [scroll, setScroll] = useState(''); 
    const openSideBar = () => setSidebar(true);
    const closeSideBar = () => setSidebar(false); 
  useEffect(() => {
      const token = CookieService.get('access_token');
      if (!token) {
        Router.push('/');
      }

      Aos.init({ duration: 2000}); 
      if(typeof window !== "undefined") {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
      }
     
  });

  const handleScroll = e => {
      const current = window.scrollY;  
    if (  current === 0 && current < 10 ) {
        setScroll('');
      }
      else  if ( current < 150 && current > 100 ) {
            setScroll('scrolled ');
          }
     else if ( current > 350 ) {
        setScroll('scrolled awake');
      } else {
        setScroll("");
      }
      
  } 
  
    return (
         <Fragment>
             <div className={`wrapper ${sidebar? 'active' : ''}`}>
          <div className="rsidebar">
            <div className="bg_shadow"></div>
            <div className="sidebar__inner">
          <div className="close">
            <i className="fa fa-times" aria-hidden="true" onClick={closeSideBar}></i>
          </div>
              <SellerSidebar />
          </div>
          </div>
          <div className="seller_main_container">
            <div className="top_navbar">
             
             <TopBar openAccount={openAccount} openSideBar={openSideBar} setOpenAccount={setOpenAccount} />
             </div>
               <Container >
               {props.children}
               </Container>
          </div>
        </div>
         </Fragment>
    )
}
export default SellerLayout;