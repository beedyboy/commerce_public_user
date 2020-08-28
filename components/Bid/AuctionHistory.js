import React, { Fragment } from 'react';
import { Row, Container, Col, Form, Card, CardHeader, CardBody, FormGroup, Button } from "reactstrap"; 
 import PerfectScrollBar from 'react-perfect-scrollbar';
import styles from './bid.module.css';
export const AuctionHistory = ({user, history}) => {

    const acceptOffer= (item, responder) => {
        if (responder === 'buyer') {
            const data = {
                id: item,
                buyer: "Accepted"
            }
            buyerToggleBuyer(data)
        } else {
            const data = {
                id: item,
                seller: "Accepted"
            }
            sellerToggleSeller(data)
        }
    }
    const cancelOffer= (item, responder) => {
        if (responder === 'buyer') {
            const data = {
                id: item,
                buyer: "Buyer Canceled"
            }
            buyerToggleBuyer(data)
        } else {
            const data = {
                id: item,
                seller: "Seller Canceled"
            }
            sellerToggleSeller(data)
        }
    }
  const buyerHistory = history && history.map((item, i) => {
    return ( 
    <div key={shortId.generate()} className="mt-5 mb-5"> 
        <Row>
          <Col md="12">
              <Card>
                  <CardBody>
                      <Row>
                     
            <Col md="6">
            <span className="mr-2">   
              <p>Packed:  {item.packed === "PACKED" ? "Yes" : "NO"} </p> 
             </span> 
            </Col>

            <Col md="6">
            <span className="mr-2">   
              <Badge color="primary">{`Available ${item.quantity} `} </Badge>
             </span> 
            </Col>

            <Col md="12">  
            <div className="price d-flex flex-row align-items-center">
                  <span>Price</span>  
                   <span className={`"mr-2" ${styles.actPrice}`}><i className="fa fa-naira text-success"></i>&nbsp; {item.price}</span> 
              </div>
            </Col>

            <Col md="12">
            <div className={`${styles.cart} mt-4 align-items-center`}> 
             
             {(item.seller === "Accepted" || item.seller === "Counter") && item.buyer != "Accepted" ?
            <>   <Button className="btn0  text-uppercase mr-2 px-4" color="primary"  onClick={(e) => acceptOffer(item.id, 'buyer')}  type="button" disabled={sending}> Pay </Button> {" "} </>
               : '' }
          {item.seller === "Accepted" && item.buyer === "Accepted" && item.status === "Ongoing" ?
          <>   <Button className="btn0  text-uppercase mr-2 px-4" color="primary"  onClick={(e) => makePayment(item.id)}  type="button" disabled={sending}> Pay </Button> {" "}
           <Button className="btn0  text-uppercase mr-2 px-4" color="danger"  onClick={(e) => makePayment(item.id)}  type="button" disabled={sending}> Pay </Button>
          </>
          : ''}
            </div>
            </Col>
                      </Row>
                  </CardBody>
              </Card>
          </Col>

        <Col md="12" sm="12"> 
            <Card>
                <CardBody>
                    
            <div className="d-flex align-items-center mt-1 delivery"><i className="fa fa-map-marker"></i>
            <span className="ml-2">Delivery options</span>
            <br />        
            </div>
            <hr />
            {item.first_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Buyer will pick up</span>   <span className="ml-2 mr-2">|<br /></span><span className="ml-2 mr-2 text-success">FREE<br /></span>
                </div>
            )
              : null
            }

            {item.second_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i>
                <span className="ml-1 font-weight-bold">
                I will deliver to buyer within {item.within_distance} Meters
                </span>
                <span className="ml-1">for {item.within_charge}</span>
                <br />
                </div>
            )
              : null
            } 
            {item.third_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">I will deliver to buyer beyond {item.beyond_distance} Meters</span><span className="ml-1">for {item.beyond_charge}<br /></span>
                </div>
            )
              : null
            }
                </CardBody>
            </Card>
           
               </Col>
        </Row>
 </div> 
    );
  });
  
  const sellerHistory = history && history.map((item, i) => {
    return ( 
    <div key={shortId.generate()} className="mt-5 mb-5"> 
        <Row>
          <Col md="12">
              <Card>
                  <CardBody>
                      <Row> 
            <Col md="6">
            <span className="mr-2">   
              <p>Packed:  {item.packed === "PACKED" ? "Yes" : "NO"} </p> 
             </span> 
            </Col>

            <Col md="6">
            <span className="mr-2">   
              <Badge color="primary">{`Available ${item.quantity} `} </Badge>
             </span> 
            </Col>

            <Col md="12">  
            <div className="price d-flex flex-row align-items-center">
                  <span>Price</span>  
                   <span className={`"mr-2" ${styles.actPrice}`}><i className="fa fa-naira text-success"></i>&nbsp; {item.price}</span> 
              </div>
            </Col>

            <Col md="12">
            <div className={`${styles.cart} mt-4 align-items-center`}> 
             
             {(item.buyer === "Accepted") && item.seller != "Accepted" ?
            <>   <Button className="btn0  text-uppercase mr-2 px-4" color="primary"  onClick={(e) => cancelOffer(item.id, 'seller')}  type="button" disabled={sending}> Cancel </Button> {" "} </>
               : '' }

          {(item.buyer === "Counter" || item.buyer === "Others") && ( item.seller === "Others" || item.seller === "Counter" ) && item.status === "Ongoing" ?
          <>   <Button className="btn0  text-uppercase mr-2 px-4" color="primary"  onClick={(e) => acceptOffer(item.id, 'seller')}  type="button" disabled={sending}> Accept </Button> {" "}

         <Button className="btn0  text-uppercase mr-2 px-4" color="primary"  onClick={(e) => cancelOffer(item.id, 'seller')}  type="button" disabled={sending}> Cancel </Button> {" "}
          </>
          : ''}

            </div>
            </Col>
                      </Row>
                  </CardBody>
              </Card>
          </Col>

        <Col md="12" sm="12"> 
            <Card>
                <CardBody>
                    
            <div className="d-flex align-items-center mt-1 delivery"><i className="fa fa-map-marker"></i>
            <span className="ml-2">Delivery options</span>
            <br />        
            </div>
            <hr />
            {item.first_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Buyer will pick up</span>   <span className="ml-2 mr-2">|<br /></span><span className="ml-2 mr-2 text-success">FREE<br /></span>
                </div>
            )
              : null
            }

            {item.second_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i>
                <span className="ml-1 font-weight-bold">
                I will deliver to buyer within {item.within_distance} Meters
                </span>
                <span className="ml-1">for {item.within_charge}</span>
                <br />
                </div>
            )
              : null
            } 
            {item.third_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">I will deliver to buyer beyond {item.beyond_distance} Meters</span><span className="ml-1">for {item.beyond_charge}<br /></span>
                </div>
            )
              : null
            }
                </CardBody>
            </Card>
           
               </Col>
        </Row>
 </div> 
    );
  });
   
    return (
        <Fragment>
            <Container>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md="12">
                                <PerfectScrollBar>
                                    {user === "buyer" ? buyerHistory : sellerHistory}
                                </PerfectScrollBar>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>
        </Fragment>
    )
}
