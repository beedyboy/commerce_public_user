import React, { useEffect, Fragment, useState } from 'react'
import { observer } from 'mobx-react'   
import Head from 'next/head';  
import { useMobxStores } from "../../stores/stores";
import SellerCard from '../../components/Product/Card/SellerCard';
import { Row, Col, Button, Card, CardHeader, CardBody, NavLink, Container, Modal, ModalHeader, ModalBody, Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import { SellerLayout } from '../../templates';
import Loading from '../../components/Suspense/Loading'; 
import AddProduct from '../../components/Product/add-product';


 const ProductList = () => {
     const { productStore } = useMobxStores();
     const { filteredProduct, loading, myProducts } = productStore;
     const [modal, setModal] = useState(false); 
     const [activeTab, setActiveTab] = useState('1'); 
    //  const toggle = () => setModal(!modal);
     const toggle = tab =>  {
       if(activeTab !== tab) setActiveTab(tab);
     }
    //  const closeBtn = <Button className="close" onClick={toggle}>&times;</Button>;
      
     useEffect(() => {
         myProducts(); 
     }, []); 
       
    return (
       <Fragment>
         <Head>
          <title>My Products</title> 
         </Head>
         <SellerLayout>
           <Container className="mt-3 mb-3">
          <Nav tabs>
            <NavItem> <NavLink onClick={() => {toggle('1'); }} className={`${activeTab === '1'? 'active': ''}`}>My Products </NavLink></NavItem>
            <NavItem><NavLink  onClick={() => {toggle('2'); }}  className={`${activeTab === '2'? 'active': ''}`}>Add Product</NavLink></NavItem>
          </Nav>   
          
            <Card className="mt-2 mb-3">
               <CardBody>
            <TabContent activeTab={activeTab}>
              
            <TabPane tabId="1">
           
             <Row>
               <Col md="12" className="mt-3">
                    
              {loading ? <Loading /> :
              <Fragment> { filteredProduct && filteredProduct.length < 1 ? 
            (
             <>
              <h3>No product found</h3>
              <p><NavLink to="/seller/add-product">Click here to add product</NavLink></p>
              </>
            ) :
            (
              <Row>
              {filteredProduct && filteredProduct.map((product) =>
                <SellerCard key={product.id} product={product} /> 
              )}
          </Row>
            )
              }
              </Fragment>
              }
              
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="2">
            <AddProduct />
            </TabPane>
          </TabContent>
             </CardBody>
           </Card> 
           </Container>
           {/* <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle} close={closeBtn}>New Product</ModalHeader>
                            <ModalBody>
                               <AddProduct />
                            </ModalBody>
                        </Modal> */}
         </SellerLayout>
      </Fragment>
    )
} 
export default observer(ProductList);