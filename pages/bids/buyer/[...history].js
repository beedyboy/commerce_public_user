import React, { Fragment, useEffect, useState } from 'react'
import { Row, Container, Col, Badge, Button, Card, CardBody,  Modal, ModalHeader, ModalBody } from 'reactstrap';
import Head from 'next/head';  
import { observer } from 'mobx-react'      
import shortId from 'short-id'; 
import { useMobxStores } from '../../../stores/stores'; 
import { AuctionHistory } from '../../../components/Bid/AuctionHistory';
import AuctionForm from '../../../components/Bid/AuctionForm'; 
import styles from './../bid.module.css';
import { BuyerLayout } from '../../../templates';
const BuyerBidHistory = ({view}) => {  
    const {  orderStore } = useMobxStores();  
     const { getBidById, bid, getBidAuction, auction } = orderStore;  
     const [modal, setModal] = useState(false);
   useEffect(() => { 
    const second = view[1];
    const id = second.split("-")[0];
    getBidById(id);
    getBidAuction(id); 
}, []);
   
const [buyerData, setBuyerData] = useState({ 
    bid_id: '', bid_token: '', shop_id: '', buyer: 'Others', seller: 'Others', user: 'Buyer'
});   
const [data, setData] = useState({
    stock_name: '',
    price: '',
    packed: '',
    weight: '', 
    quantity: '',
    shopName: '', 
    product_name: '',
    first_delivery: '',
    second_delivery: '',
    third_delivery: '',
    within_distance: '',
    within_charge: '',
    beyond_charge: '',
    beyond_distance: '' 
}); 
 
useEffect(() => {
    const rp = auction && auction.length > 0;  
    if(rp) { 
        setBuyerData(state => ({
        ...state, 
        bid_id: bid.bid_id, bid_token: bid.bid_token, shop_id: bid.shop_id, buyer: 'Counter', seller: 'Others', user: 'Buyer'
      })); 
    }    
  }, [auction]); 
useEffect(() => {
    const rp = bid && bid.product_name;  
    if(rp) { 
      setData(state => ({
        ...state, 
          stock_name: bid.stock_name,
          price: bid.price,
          packed: bid.packed,
          weight: bid.weight, 
          quantity: bid.quantity, 
          shopName: bid.shop_name, 
          product_name: bid.product_name,
          first_delivery: bid.first_delivery,
          second_delivery: bid.second_delivery,
          third_delivery: bid.third_delivery,
          within_distance: bid.within_distance,
          within_charge: bid.within_charge,
          beyond_charge: bid.beyond_charge,
          beyond_distance: bid.beyond_distance
      })); 
    }    
  }, [bid]); 
  
const stockDetails = () => {
    return ( 
    <div key={shortId.generate()} className="mt-5 mb-5"> 
        <Row>
          <Col md="12">
              <Card>
                  <CardBody>
              <Row> 
            <Col md="6">
            <span className="mr-2">   
              <p>Packed:  {data.packed === "PACKED" ? "Yes" : "NO"} </p> 
             </span> 
            </Col>

            <Col md="6">
            <span className="mr-2">   
              <Badge color="primary">{`Available ${data.quantity} `} </Badge>
             </span> 
            </Col>

            <Col md="12"> 
            <div className="price d-flex flex-row align-items-center">
                  <span>Price</span>  
                   <span className={`"mr-2" ${styles.actPrice}`}><i className="fa fa-naira text-success"></i>&nbsp; {data.price}</span>
                   
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
            {data.first_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Buyer will pick up</span>   <span className="ml-2 mr-2">|<br /></span><span className="ml-2 mr-2 text-success">FREE<br /></span>
                </div>
            )
              : null
            }

            {data.second_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i>
                <span className="ml-1 font-weight-bold">
                I will deliver to buyer within {data.within_distance} Meters
                </span>
                <span className="ml-1">for {data.within_charge}</span>
                <br />
                </div>
            )
              : null
            } 
            {data.third_delivery === 'true' ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">I will deliver to buyer beyond {data.beyond_distance} Meters</span><span className="ml-1">for {data.beyond_charge}<br /></span>
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
  };

  const startAuction = () => {
    setModal(true);
  }
  const toggle = () => setModal(!modal);
  const closeBtn = <Button className="close" onClick={toggle}>&times;</Button>;
    // console.log({props})
    return (
        <Fragment>
            <Head>
                <title>
                    {data.product_name? data.product_name : 'Bid details'}
                </title>
            </Head>
            <BuyerLayout> 
            <Container fluid={true} className="mt-5 mb-5">
             <Row className="d-flex justify-content-center">
                 <Col md="4">
                     {stockDetails}
                 </Col>
                 <Col md="8">
                     {/* conversation here */}
            {auction && auction.length  < 1 ? 
            <><Button type="button" color="secondary" onClick={startAuction}>Start</Button></>
            :
                <>
                <AuctionHistory history={auction} />
                </>
        }
                 </Col>
             </Row>
             <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Stock</ModalHeader>
                <ModalBody>
                    <AuctionForm toggle={toggle} data={buyerData} />
                </ModalBody>
            </Modal> 
               {/* <Row className="d-flex justify-content-center">
        <Col md="12">
            <div className={styles.card}>
                <Row>
                    <Col md="4">
                        <div className="images">
                            <div className="text-center">
                                <img id="main-image" src={`${activeImage !== ''? activeImage : data.images[0]}`} width="250" />
                            </div>
                            <div className={`${styles.thumbnail}  p-3 text-center`}>
                                {slides}
                                   </div>
                        </div>
                    </Col>
                    <Col md="5">
                        <div className={`${styles.bid} p-4`}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center"> <i className="fa fa-long-arrow-left"></i> <span className="ml-1">Back</span> </div> <i className="fa fa-shopping-cart text-muted"></i>
                                <i className="fa fa-heart text-muted"></i> <i className="fa fa-share-alt text-muted"></i>
                            </div>
                            <div className="mt-2 mb-1"> 
                                <h5 className="text-uppercase">{data.product_name}</h5>
                                 
                            </div>
                            <div className={styles.about}>
                                {ReactHtmlParser(data.description)} 
                            </div>
                            <div className="sizes mt-2">
                                 <h6 className="text-uppercase">Stock</h6>
                                 {stockBtn}
                                
                            </div>
                          
                             
                        </div>
                       
                    </Col>

                    <Col md="3">
                        <Row>
                            <Col md="12">
                            <div className="mt-4 mb-3">
                               <Card>
                                   <CardBody>
                                   <h5>Seller Information</h5>
                                <hr />
                                 <span className={`text-uppercase text-muted ${styles.brand}`}>{data.shopName ? data.shopName : ''}</span>
                                <Link href="/"><a>Visit Store</a></Link>
                            <Button className="btn btn-success" onClick={() => startChat(data.seller)} type="button">Contact Seller</Button>
                                   </CardBody>
                               </Card>
                            </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Col>
  
    </Row> */}
 
        </Container>
            </BuyerLayout>
        </Fragment>
    )
}

BuyerBidHistory.getInitialProps = async ({ query }) => {
    return {view: query.view}
  }

export default observer(BuyerBidHistory);
