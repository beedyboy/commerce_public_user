import React, { useState, useEffect, Fragment } from 'react'; 
import Aos from "aos"; 
import TopBar from '../TopBar';
import Footer from '../Footer'; 
import Router from 'next/router';
import { Container, Row, Col } from 'reactstrap';
import CookieService from '../../../../services/CookieService'; 
import SellerSidebar from '../Sidebar/Sidebar';
import Link from 'next/link';
  
const SellerLayout = props => { 
  const [sidebar, setSidebar] = useState(false); 
  const [openAccount, setOpenAccount] = useState(false); 
  const [isOpen, setIsOpen] = useState(true); 
    const [scroll, setScroll] = useState('');  
    const [doForm, setDoForm] = useState({
        login: 'none',
        register: 'none'
    });   

    const openSideBar = () => setSidebar(true);
    const closeSideBar = () => setSidebar(false);
  const toggle = () => setIsOpen(!isOpen);
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
  const handleForm = (old, item) => { 
    setDoForm(prevState => ({
         ...prevState,
         [old]: 'none',
         [item]: prevState[item] === 'none' ? 'block' : 'none' 
        })); 
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
                  <h2>Notifications - <span>2</span></h2>
                  <div className="accounts-item"> <img src="https://i.imgur.com/uIgDDDd.jpg" alt="img" />
                      <div className="text">
                          <h4>Samso aliao</h4>
                          <p>Samso Nagaro Like your home work</p>
                      </div>
                  </div>
                  <div className="accounts-item"> <img src="https://img.icons8.com/flat_round/64/000000/vote-badge.png" alt="img" />
                      <div className="text">
                          <h4>John Silvester</h4>
                          <p>+20 vista badge earned</p>
                      </div>
                  </div>
              </div>
            </div>
               <Container>
               {props.children}
               </Container>
          </div>
        </div>
         </Fragment>
    )
}
export default SellerLayout;