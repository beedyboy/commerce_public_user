import React, { useState, useEffect, Fragment } from 'react'; 
import Aos from "aos"; 
import TopBar from '../TopBar';
import Footer from '../Footer'; 
import Router from 'next/router';
import { Container, Row, Col } from 'reactstrap';
import CookieService from '../../../../services/CookieService'; 
  
const SellerLayout = props => { 
    const [isOpen, setIsOpen] = useState(true); 
    const [scroll, setScroll] = useState('');  
    const [doForm, setDoForm] = useState({
        login: 'none',
        register: 'none'
    });   

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
            <TopBar scroll={scroll} handleForm={handleForm} doForm={doForm} isOpen={isOpen} toggle={toggle} />
            <Container fluid>
              <Row>
              <Col xs={2}>    
              
            </Col>
              </Row>

                <Row> 
                    <Col  xs={12}>
                    {props.children}

                    </Col> 
                </Row>

            </Container> 
            
             <Footer />
         </Fragment>
    )
}
export default SellerLayout;