
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react" 
import {
  Button, Card, CardHeader, CardBody, FormGroup,
  Form, Input, Row, Col, Container, Label, Nav, NavLink, TabContent, TabPane, NavItem, Alert, Badge
} from "reactstrap";    
import Head from 'next/head';  
import SellerLayout from '../../templates/Seller/components/Layout/SellerLayout'; 
import { useMobxStores } from "../../stores/stores";
const SellerProfile = observer( () => { 
  const { userStore, locationStore} = useMobxStores(); 
//   const { profile, updateProfile, setResponse, response, message  } = companyStore;
const { sellerProfile: profile,  getSellerProfile, updateSeller, updateShop } = userStore;
const { location } = locationStore; 
const [activeTab, setActiveTab] = useState('1');
const [visible, setVisible] = useState(true);
const changeTab = tab => {
  if(activeTab !== tab) setActiveTab(tab);
}
  const [data, setData] = useState({
    id: '',
    firstname: '',
    lastname: '',  
    email: '',
    phone_number: '',
    location: '',  
    shop_name: '', 
    currency: '', 
    status: '',
    description: ''
  }); 
  useEffect(() => {
    getSellerProfile(); 
}, []);
  useEffect(() => {
    const data = profile && profile[0];  
    if(data) {
      setData(state => ({
        ...state, 
          id: profile[0].id,
          email: profile[0].email,
          firstname: profile[0].firstname,
          lastname: profile[0].lastname,
          phone_number: profile[0].phone_number,
          location: profile[0].location,
          shop_name: profile[0].shop_name,
          currency: profile[0].currency,
          status: profile[0].status,
          description: profile[0].description,
      }));
    }
     
  }, [profile]); 
const handleChange = event => {
  event.persist(); 
  setData(formState => ({
    ...formState, 
      [event.target.name]:  event.target.value 
  }));
};
const onDismiss = () => setVisible(false);
const saveSeller = e => {
    e.preventDefault(); 
    updateSeller(data);
  }
  const saveShop = e => {
    e.preventDefault(); 
    updateShop(data);
  }
  // const hideAlert = () => {
  //   setResponse(false);
  // } 
    return (
      <>
         <Head>
            <title>Profile</title>
            <meta name="description" content={data.firstname} />
      </Head>

<SellerLayout>
  <Container className="pmt-2 mb-3">
    {data.shopName ? null :
      (<Row>
        <Col md="12">
          <Alert color="danger" isOpen={visible} toggle={onDismiss}>
            Complete your profile to get verified
          </Alert>
        
        </Col>
      </Row>
      ) 
      }
    <Row>
      <Col md="12">
        
        <Nav tabs> 
          <NavItem className={activeTab ==='1' ? 'active' : null}>
            <NavLink onClick={() => changeTab('1')}> 
                <i className="fa fa-globe"></i>General 
            </NavLink>
          </NavItem> 
          
          <NavItem className={activeTab ==='2' ? 'active' : null}>
            <NavLink onClick={() => changeTab('2')}> 
                <i className="fa fa-briefcase"></i>Settings 
            </NavLink>
          </NavItem>
        </Nav>
      
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" id="general">
        <Container className="rounded bg-white mt-1 mb-5">
          <Card>
            <CardHeader> 
            <h4>General</h4>
            </CardHeader>
            <CardBody>
              
          <Row>
            <Col md="3" className="border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img className="rounded-circle mt-5" width="100%" src="/assets/images/person_2.jpg" />
                  <span className="font-weight-bold">{data.firstname + ' '+ data.lastname || 'Update Name'}</span>
                <span className="text-black-50">{data.email}</span>
                <p><Badge color={data.status === 'Pending' ? 'danger' : 'success'} pill>
                  {data.status}</Badge></p>
                <span></span>
              </div>
            </Col>
            <Col md="5" className="border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <Form onSubmit={saveSeller}>
                  
                <Row className="mt-2">
                  <Col md="6">
                  <FormGroup>
                    <Label>First Name </Label>
                    <Input
                      value={data.firstname || ''} 
                      onChange={handleChange}
                      placeholder="First Name"
                      name="firstname"
                      type="text"
                    />
                  </FormGroup>
                  </Col>
                  <Col md="6">
                  <FormGroup>
                    <Label>Last Name </Label>
                    <Input
                      value={data.lastname || ''} 
                      onChange={handleChange}
                      placeholder="Last Name"
                      name="lastname"
                      type="text"
                    />
                  </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-3">
                <Col md="12">
                          <FormGroup>
                            <label>Phone</label>
                            <Input
                              value={data.phone_number || ''}
                              onChange={handleChange}
                              placeholder="Phone Number"
                              name="phone_number"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
              <FormGroup>
                <Label>Location</Label> 
                <Input
                      type="select" 
                      value={data.location || ''}
                      name="location"
                      id="location" 
                      onChange={handleChange}>
                          <option value="">select</option>
                          {location && location.map(loc => (
                          <option value={loc.id} key={loc.id}>{loc.name}</option>
                          ))}
                      </Input>
              </FormGroup>
            </Col>
                </Row>
                <div className="mt-5 text-center">
                  <Button color="primary" type="submit">Save Profile</Button>
                </div>
                </Form>
              </div>
            </Col>
        
            <Col md="4">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center"> 
                  <h4 className="text-right">Edit Shop</h4>
                  <span className="border px-3 p-1"><i className="fa fa-plus">&nbsp; Shop</i></span>
                </div>
                <br />
                <Form onSubmit={saveShop}>
                  
                <Row>
                
                <Col md="12">
              <FormGroup>
                <Label>Shop Name </Label>
                <Input
                  value={data.shop_name || ''} 
                  onChange={handleChange}
                  placeholder="Shop Name"
                  name="shop_name"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Currency</Label>
                <Input
                readOnly
                  value={data.currency || String.fromCharCode('8358')}
                  onChange={handleChange} 
                  name="currency"
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="12"> 
              <FormGroup>
                <Label>Description</Label> 
                <Input
                  value={data.description || ''}
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                  type="textarea" 
                />
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup>
                <label htmlFor="email">
                  Email address
                </label>
                <Input onChange={handleChange} readOnly placeholder="email address" name="email" value={data.email || ''} type="email" />
              </FormGroup>
            </Col>
            
          </Row>
          <div className="mt-5 text-center">
                  <Button color="primary" type="submit">Save Shop</Button>
                </div>
              
                </Form>
              </div>
            </Col>
          </Row>
      
            </CardBody>
          </Card>
        </Container>
  
          </TabPane>

          
          <TabPane tabId="2" id="settings">
                            <h3>Development ongoing!!!</h3>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  </Container>
 </SellerLayout>
 </>
    );
  })

export default SellerProfile


  