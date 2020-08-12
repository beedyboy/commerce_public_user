import React, { Fragment } from 'react'
import { Container, Row, Col, Card, Button, CardBody } from 'reactstrap'; 
import Head from 'next/head';  
import SellerLayout from '../../templates/Seller/components/Layout/SellerLayout';

const SellerBoard = () => {
    return (
        <Fragment>
           <Head>
      <title>Dashboard | Seller</title> 
    </Head> 
       
       <SellerLayout>
<Container className="mt-3 mb-3">
    <Row className="mt-2 mb-3">
        <Col  md={{ size: 3}} >
            <h3>Dashboard</h3>
        </Col>
        <Col md={{ size: 3, offset: 6}} >
            <Button style={{margin: '3px'}}> <i className="fa fa-envelope"></i> Email </Button>
            <Button style={{margin: '3px'}}> <i className="fa fa-print"></i> Print </Button>
        </Col>
    </Row>
        
        <Card>
            <CardBody>
                
            <Row>
                <Col md="4" xl="3">
                        <Card className="d-card bg-c-blue order-card">
                            <div className="card-block">
                                <h6 className="m-b-20">Total Product</h6>
                                <h2 className="text-right"><i className="fa fa-cart-plus f-left"></i>
                                <span>48 </span> </h2>
                                    <p className="m-b-0">Out of stock <span className="f-right">351</span></p>  
                            </div>
                        </Card>
                    </Col>

                    <Col md="4" xl="3">
                        <Card className="d-card bg-c-green order-card">
                            <div className="card-block">
                                <h6 className="m-b-20">Order Received</h6>
                                <h2 className="text-right"><i className="fa fa-cart-plus f-left"></i>
                                <span>48 </span> </h2>
                                    <p className="m-b-0">Completed Orders <span className="f-right">351</span></p>  
                            </div>
                        </Card>
                    </Col>


                    <Col md="4" xl="3">
                        <Card className="d-card bg-c-yellow order-card">
                            <div className="card-block">
                                <h6 className="m-b-20">Total Revenue</h6>
                                <h2 className="text-right"><i className="fa fa-line-chart f-left"></i>
                                <span>32, 000 </span> </h2> 
                                <p className="m-b-0"> keep earning  <span className="f-right">
                                    </span></p>  
                            </div>
                        </Card>
                    </Col>

                    <Col md="4" xl="3">
                        <Card className="d-card bg-c-pink order-card">
                            <div className="card-block">
                                <h6 className="m-b-20">Total Expenditure</h6>
                                <h2 className="text-right"><i className="fa fa-money f-left"></i>
                                <span>30, 000 </span> </h2> 
                                <p className="m-b-0">
                                        Last withdrawal
                                     <span className="f-right">21-06-2020</span></p>  
                            </div>
                        </Card>
                    </Col>
                    
                </Row>
           
            </CardBody>
        </Card>


     </Container>
       

       </SellerLayout>

        </Fragment>
    )
}

export default SellerBoard
