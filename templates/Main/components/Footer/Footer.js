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
                <ion-icon name="location-outline"></ion-icon>Address:
                    {/* <span className="ion-ios-location h5 mr-3 text-primary"></span>Address: */}
                    </span>
                     <span> 198 West 21th Street, <br /> Suite 721 New York NY 10016 </span>
            </p>
            <p>
                <span className="d-block">
                <ion-icon name="phone-portrait-outline"></ion-icon>Phone:
                    {/* <span className="ion-ios-telephone h5 mr-3 text-primary"></span>Phone: */}
                    </span>
             <span> (+1) 435 3533</span>
          </p>
            <p>
                <span className="d-block">
                    <span className="ion-ios-email h5 mr-3 text-primary"></span>Email:
                    <ion-icon name="mail-outline"></ion-icon>Email:
                    </span>
             <span>
                  <a href="https://colorlib.com/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="4f262129200f36203a3d2b20222e2621612c2022">[email&#160;protected]</a>
            </span>
            </p>
            </Col>
        
            <Col md="3" className="mb-5">
            <p>Invite a friend</p>
            <Form className="footer-newsletter">
            <div className="form-group">
                <Input type="email" name="email" onChange={(event) => setEmail(event.target.value)} className="form-control" placeholder="Email..." />
                <Button type="button" onClick={(e) => sendInvite(e)} className="btn"><span className="fa fa-paper-plane"></span></Button>
            </div>
            </Form>
            </Col>
        </Row>
        <Row className="pt-5">
            <Col md="8">
            <p className="text-left"> 
                Copyright &copy;
                {new Date().getFullYear()}
                  All rights reserved | This template is made with <i className="fa fa-heart text-primary" aria-hidden="true"></i> by <a href="https://devprima.com/" target="_blank">online shopping</a>

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
  
    )
})
export default Footer;