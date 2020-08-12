
import React, {  useEffect, useState } from "react";
import { observer } from "mobx-react" 
import {
  Button, Card, CardHeader, CardBody, FormGroup,
  Form, Input, Row, Col, Container, Label, Nav, NavLink, TabContent, TabPane, NavItem, Badge
} from "reactstrap";   
import Head from "next/head";  
import { useMobxStores } from "../../stores/stores";
import { BuyerLayout } from "../../templates";
const BuyerProfile = () => { 
  const { userStore, locationStore} = useMobxStores();  
//   const { buyer, updateProfile, setResponse, response, message  } = companyStore;
const {  buyer, getBuyerProfile, updateBuyer } = userStore;
const { location } = locationStore; 
const [activeTab, setActiveTab] = useState('1'); 
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
    gender: '', 
    nickname: '', 
    status: '' 
  }); 
  useEffect(() => {
    getBuyerProfile(); 
}, []);
  useEffect(() => {
    const data = buyer && buyer.id;  
    if(data) {
      setData(state => ({
        ...state, 
          id: buyer[0].id,
          email: buyer[0].email,
          firstname: buyer[0].firstname,
          lastname: buyer[0].lastname,
          phone_number: buyer[0].phone_number,
          location: buyer[0].location,
          gender: buyer[0].gender,
          nickname: buyer[0].nickname,
          status: buyer[0].status 
      }));
    }
     
  }, [buyer]); 
const handleChange = event => {
  event.persist(); 
  setData(formState => ({
    ...formState, 
      [event.target.name]:  event.target.value 
  }));
};
// const onDismiss = () => setVisible(false);
const saveBuyer = e => {
    e.preventDefault(); 
    updateBuyer(data);
  } 
  const fullname = data.firstname + ' '+ data.lastname;
  // const hideAlert = () => {
  //   setResponse(false);
  // } 
 
    return (
      <>
         <Head>
            <title>Profile </title>
            <meta name="description" content={data.firstname} />
        </Head>
      <BuyerLayout>
         <Container className="mt-2 mb-3"> 
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
                      <span className="font-weight-bold">{ data.firstname !== null ||  data.lastname !== null ? fullname :  'Update Name'}</span>
                    <span className="text-black-50">{data.email}</span>
                    <p><Badge color={data.status === 'Pending' ? 'danger' : 'success'} pill>
                      {data.status}</Badge></p>
                    <span></span>
                  </div>
                </Col>
                <Col md="9" className="border-right">
                    <div className="p-2 py-4">
                      <Row>
                        <Col md="12">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="text-right">Buyer Profile</h4>
                    </div>
                        </Col> 
                    </Row> 
                    <Form onSubmit={saveBuyer}>
                    <Row>
                        <Col md="6"> 

                      <Row className="mt-3">
                      <Col md="12">
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
                        <Col md="12">
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
                      
                      <Col md="12">
                          <FormGroup>
                          <label htmlFor="email">
                              Email address
                          </label>
                          <Input onChange={handleChange} readOnly placeholder="email address" name="email" value={data.email || ''} type="email" />
                          </FormGroup>
                      </Col>
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
                      </Row> 
                    
                        </Col>
                        <Col md="6"> 
                        <div className="py-3">  
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

                          <Col md="12">
                              <FormGroup>
                                  <Label>Gender</Label> 
                                  <Input
                                      type="select" 
                                      value={data.gender || ''}
                                      name="gender"
                                      id="gender" 
                                      onChange={handleChange}>
                                      <option value="">select</option> 
                                      <option value="Male"> Male </option>
                                      <option value="Female"> Female </option>
                                      <option value="Others"> Others </option>
                                      
                                          </Input>
                              </FormGroup>
                          </Col>
                          <Col md="12">
                        <FormGroup>
                            <label>Nickname</label>
                            <Input
                            value={data.nickname || ''}
                            onChange={handleChange}
                            placeholder="Nickname"
                            name="nickname"
                            type="text"
                            />
                        </FormGroup>
                      </Col> 
                      <div className="mt-5 text-center">
                        <Button color="primary" type="submit">Save Profile</Button>
                      </div>
                      </div>
                        </Col>
                        {/* <Col md="12">
                      
                        </Col> */}
                    </Row>
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
      </BuyerLayout>
 </>
    );
  } 

export default observer(BuyerProfile);


  