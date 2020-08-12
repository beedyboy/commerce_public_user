import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
  NavbarText,
  Container,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button 
} from 'reactstrap';
import Head from 'next/head';
import Link from 'next/link';
import Aos from "aos"; 
import Login from './login';
import SignUp from './signup';

export default function About() {
    const [isOpen, setIsOpen] = useState(false); 
    const [scroll, setScroll] = useState('');  
    const [doForm, setDoForm] = useState({
        login: 'none',
        register: 'none'
    });  
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
      Aos.init({ duration: 2000});
  }, []);
  
  useEffect(() => {
      if(typeof window !== "undefined") {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
      }
     
  }, []);

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
      <> 
      <Head>
      <title>About</title>
      <link rel="icon" href="/favicon.ico" />
    </Head> 
        <Navbar  color="light" light  className={`pb_navbar pb_scrolled-light ${scroll} `} id="templateux-navbar" expand="md">
<Container>
<NavbarBrand href="/"><span className="text-danger">Red</span>Planet</NavbarBrand> 
<NavbarToggler onClick={toggle} />
<Collapse isOpen={!isOpen} id="templateux-navbar-nav" navbar>
<Nav className="ml-auto" navbar> 
    <NavItem>
         <NavLink><Link href="/">Home</Link></NavLink>
    </NavItem>
    <NavItem>
         <NavLink  href="about">About</NavLink>
    </NavItem> 
    
    <NavItem> 
         <NavLink  href="#section-contact">Contact</NavLink>
    </NavItem>
<NavItem className="cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0 pt-2"> 
        <span className="pb_rounded-4 px-4 rounded" onClick={() => handleForm('register','login')}>Login</span>
         <div className="arrow-up" style={{display: doForm['login']}}></div>
            <div className="top-container">
         <div className="login-form" style={{display: doForm['login']}}>
             <Login />
         </div>
            </div> 
    </NavItem>

    <NavItem className="cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0 pt-2"> 
        <span className="pb_rounded-4 px-4 rounded" onClick={() => handleForm('login','register')}>Register</span>
         <div className="arrow-up" style={{display: doForm['register']}}></div>
            <div className="top-container">
         <div className="login-form" style={{display: doForm['register']}}>
             <SignUp />
         </div>
            </div> 
    </NavItem>
</Nav>
</Collapse>
</Container>
</Navbar>
   
<section className="site-hero overlay" style={{backgroundImage: `url(/images/hero_5.jpg)`}} data-stellar-background-ratio="0.5" id="section-home">
        <div className="container">
        <div className="row site-hero-inner justify-content-center align-items-center">
        <div className="col-md-10 text-center" data-aos="fade-up">
        <h1 className="heading">Stay With Us &amp; Relax</h1>
        </div>
        </div>
        </div>
        <a className="mouse smoothscroll" href="#next">
        <div className="mouse-icon">
        <span className="mouse-wheel"></span>
        </div>
        </a>
</section> 
<section className="section bg-light pb-0">
<Container>
    <Row className="check-availabilty" id="next">
    <div className="block-32" data-aos="fade-up" data-aos-offset="-200">
        <Form>
            <Row>
                <Col md="6" lg="4" className="mb-lg-0">
                    <Label for="checkin_date" className="font-weight-bold text-black">Location</Label>
                    <div className="field-icon-wrap">
                        <div className="icon"><span className="icon-calendar"></span></div>
                        <Input type="text" id="checkin_date" className="form-control" />
                        </div>
                </Col>
                <Col md="6" lg="4" className="mb-lg-0">
                    <Label for="checkout_date" className="font-weight-bold text-black">Product</Label>
                    <div className="field-icon-wrap">
                        <div className="icon"><span className="icon-calendar"></span></div>
                        <Input type="text" id="checkout_date" className="form-control" />
                        </div>
                </Col>
                <Col md="6" lg="4" className=" align-self-end"> 
                     <Button color="primary" className="text-white">
                     Check Availabilty
                    </Button> 
                </Col>
            </Row>
        </Form>
    </div>

    </Row>
</Container>
</section>

<section className="py-5 bg-light" id="section-about">
    <Container>
        <Row className="align-items-center">
            <Col md="12" lg={{ size: 7, order: 2}} className="position-relative mb-5 ml-auto" data-aos="fade-up">
            <img src="images/hero_4.jpg" alt="Image" className="img-fluid rounded" />
            </Col>
            <Col md="12" lg={{size: 4, order: 1}} data-aos="fade-up">
            <h2 className="heading mb-4">Hey there!</h2>
            <p className="mb-5">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
              <p><a href="https://vimeo.com/channels/staffpicks/93951774" data-fancybox className="btn btn-primary text-white py-2 mr-3 text-uppercase letter-spacing-1">Watch the video</a></p>
            </Col>
        </Row>
    </Container>
</section>


  
<footer className="section footer-section">
    <Container>
        <Row className="mb-4">
            <Col md="3" className="mb-5">
                <ul className="list-unstyled link">
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Terms &amp; Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Rooms</a></li>
                </ul>
            </Col>
            <Col md="3" className="mb-5">
                <ul className="list-unstyled link">
                    <li><a href="#">The Rooms &amp; Suites</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Restaurant</a></li>
                </ul>
            </Col>
            <Col md="3" className="mb-5 pr-md-5 contact-info">
            <p>
                <span className="d-block">
                    <span className="ion-ios-location h5 mr-3 text-primary"></span>Address:</span>
                     <span> 198 West 21th Street, <br /> Suite 721 New York NY 10016 </span>
            </p>
            <p>
                <span className="d-block">
                    <span className="ion-ios-telephone h5 mr-3 text-primary"></span>Phone:</span>
             <span> (+1) 435 3533</span>
          </p>
            <p>
                <span className="d-block">
                    <span className="ion-ios-email h5 mr-3 text-primary"></span>Email:</span>
             <span>
                  <a href="https://colorlib.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="4f262129200f36203a3d2b20222e2621612c2022">[email&#160;protected]</a>
            </span>
            </p>
            </Col>
        
            <Col md="3" className="mb-5">
            <p>Sign up for our newsletter</p>
            <Form className="footer-newsletter">
            <div className="form-group">
                <Input type="email" className="form-control" placeholder="Email..." />
                <Button type="submit" className="btn"><span className="fa fa-paper-plane"></span></Button>
            </div>
            </Form>
            </Col>
        </Row>
        <Row className="pt-5">
            <Col md="8">
            <p className="text-left"> 
                Copyright &copy;
                {new Date().getFullYear()}
                  All rights reserved | This template is made with <i className="fa fa-heart text-primary" aria-hidden="true"></i> by <a href="https://colorlib.com/" target="_blank">Colorlib</a>

        </p>
            </Col>
            <Col md="4">
            <p className="text-right social">
                <a href="#"><span className="fa fa-tripadvisor"></span></a>
                <a href="#"><span className="fa fa-facebook"></span></a>
                <a href="#"><span className="fa fa-twitter"></span></a>
                <a href="#"><span className="fa fa-linkedin"></span></a>
                <a href="#"><span className="fa fa-vimeo"></span></a>
</p>
            </Col>
        </Row>
    </Container> 
  
</footer>
  
      </> 

  )
}

