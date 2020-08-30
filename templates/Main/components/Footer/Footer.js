import React, { useState, useEffect } from 'react';
import { 
  Container,
  Row,
  Col,
  Form, 
  Input,
  Button 
} from 'reactstrap';
import { useMobxStores } from '../../../../stores/stores';
import { observer } from 'mobx-react';

 const Footer = observer(props => { 
    const { userStore } = useMobxStores(); 
    const {  inviteAFriend, invited, loading, setInvited } = userStore;
    const [ email, setEmail ] = useState('');
    useEffect(() => {
        
        return () => {
            if(invited === true) {
                setInvited(false);
                setEmail('');
            }
        };
    }, [invited]);
    const sendInvite =  e => {
        e.preventDefault(); 
        inviteAFriend(email);
    }
    return (
         
<footer> 
       <section className="foot-section footer-section">
       <Row>
            <Col md="4" className="mb-2">
                <h2 className="heading text-white">About Us</h2>
                <span className="text-center"> With our vast varity of certified sellers,
                we are the trusted stop-shop for better shopping experience.
                 Gone through our site yet? You totally should, we fix you up real good!
                </span>
                <p className="text-center social">
                <a href="#"><span className="fa fa-tripadvisor"></span></a>
                <a href="#"><span className="fa fa-facebook"></span></a>
                <a href="#"><span className="fa fa-twitter"></span></a>
                <a href="#"><span className="fa fa-linkedin"></span></a>
                <a href="#"><span className="fa fa-vimeo"></span></a>
            </p>
            </Col>
            <Col md="4" className="mb-2">
            <h2 className="heading text-white">Links</h2>
            <ul className="list-unstyled link text-center">  
                    <li><a href="#">Terms &amp; Conditions</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Sponsored Products</a></li>
                </ul>
            </Col>
          
            <Col md="4" className="mb-2"> 
            <h2 className="heading text-white">Invite a friend</h2>
            <Form className="footer-newsletter">
            <div className="form-group  text-center">
                <Input type="email" name="email" onChange={(event) => setEmail(event.target.value)} className="form-control" placeholder="Email..." />{" "}
                <Button type="button" onClick={(e) => sendInvite(e)} className="btn">
                    <span className="fa fa-paper-plane"></span>
                </Button>
            </div>
            </Form>
            </Col>
        </Row>
       </section>
    
        <Row className="pt-5 footer-downpart">
            <Col md="8">
            <p className="text-left"> 
                Copyright &copy;
                {new Date().getFullYear()}
                  All rights reserved <a href="https://devprima.com/" target="_blank">online shopping</a>
            </p>
            </Col> 
            <Col md="4">
                 <img src="/assets/images/payment.jpg" alt="hey there" className="img-fluid rounded" />
            </Col> 
        </Row>
   
</footer>
  
    )
})
export default Footer;