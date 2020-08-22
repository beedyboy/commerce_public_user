import React, { Fragment, useEffect, useState } from 'react'
import { Row, Container, Col, Badge, Button, Card, CardBody } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'; 
import { useRouter } from 'next/router';
import Head from 'next/head';  
import { observer } from 'mobx-react'   
import { useMobxStores } from '../../stores/stores';
import { MainLayout } from '../../templates'; 
import { Chatter } from "../../services/Chatter";
import shortId from 'short-id';
import Link from 'next/link';
import styles from './productview.module.css'
import { FaRainbow } from 'react-icons/fa';

const ProductView = ({view}) => {  const router = useRouter();
    const { productStore, stockStore, orderStore } = useMobxStores();
    const { product, getProductById } = productStore; 
    const { allProductStocks:stocks, productStock } = stockStore; 
     const { bidNow } = orderStore;
     const [currentId, setCurrentId] = useState(''); 
     const [currentItem, setCurrentItem] = useState(''); 
   const [data, setData] = useState({
           id: '', 
           category: '',
           latitude: '',
           longitude: '', 
           shopName: '',
           seller: '',
           images: [], 
           product_name: '', 
           description: ''
   }); 
    const [activeImage, setActiveImage] = useState('')
    useEffect(() => { 
        const second = view[1];
        const id = second.split("-")[0];
        getProductById(id);
        productStock(id); 
    }, [])
     
  useEffect(() => {
    const rp = product && product.product_name;  
    if(rp) { 
      setData(state => ({
        ...state, 
          id: product.id, 
          category: product.catName, 
          latitude: product.latitude,
          longitude: product.longitude, 
          available: product.available,
          shopName: product.shopName,
          seller: product.seller,
          images: JSON.parse(product.images), 
          product_name: product.product_name, 
          description: product.description
      })); 
    }    
  }, [product]); 

    
  useEffect(() => {
    const rp = stocks && stocks.length > 0;  
    if(rp) { 
      defaultStock(stocks);
    }    
  }, [stocks]); 

  const defaultStock = stockData => {
     const result = stockData.filter(d => d.featured === 'NO');
     console.log({result});
     if (result.length > 0) {
        pickStock(result.id);
     } else {
         pickStock(stockData[0].id);
     }
  }
  const pickStock =  (id) => {
    setCurrentId(id);
    setCurrentItem('stock'+id)
  }
  const slides = data.images.map((item) => {
    return (
        <img key={shortId.generate()} onClick={ e => change_image(e.target.src)} src={`${item}`} alt={item} width="50" />  
    );
  });
   const stockBtn = stocks && stocks.map((item, i) => {
    return ( 
    <label className={styles.radio} key={shortId.generate()}>
        <input type="radio" name="size" value={i} checked={currentItem === 'stock'+item.id ? true: false} onChange={e => pickStock(item.id)} /> 
        <span>Stock {i+ 1}</span>
 </label> 
    );
  });

  const stockList = stocks && stocks.map((item, i) => {
    return ( 
    <div key={shortId.generate()} className={`mt-5 mb-5 ${currentItem === 'stock'+item.id ? '': 'd-none'}`}>
     
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
             <Button className="btn0  text-uppercase mr-2 px-4" color="warning"  onClick={(e) => placeBid(item.id)}  type="button">Place Bid</Button> 
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
   
    const change_image =  e => {
        setActiveImage(e);
    } 

const placeBid = e => { 
    console.log('items', e);
    }
    const startChat = (seller) => { 
    Chatter(seller)
    }
    return (
        <Fragment>
            <Head>
                <title>
                    {data.product_name? data.product_name : 'Product details'}
                </title>
            </Head>
            <MainLayout> 
            <Container fluid={true} className="mt-5 mb-5">
               <Row className="d-flex justify-content-center">
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
                        <div className={`${styles.product} p-4`}>
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
                          
                             {/* stocklkist here */}
                                {stockList}
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
    </Row>

    <Row>
              <Col md="12">
             <section className="section sponsored" id="section-rooms">
            <Card>
                <CardBody> 
            <Row className="justify-content-center text-center mb-5">
            <Col md="12"> 
                <h3 className="heading pull-left" data-aos="fade-up" data-aos-delay="100">Sponsored products</h3>
               </Col>
            </Row>
            <Row>
            <Col md="6" lg="4" data-aos="fade-up">
                <Link href="/"> 
                    <a className="room">
                    <figure className="img-wrap">
                    <img src="/assets/images/img_1.jpg" alt="Free website template" className="img-fluid mb-3"/>
                    </figure>
                    <div className="p-3 text-center room-info">
                        <h2>Product one</h2>
                        <span className="text-uppercase letter-spacing-1">90$ / per kg</span>
                    </div>  
                    </a>
                </Link>
                </Col>  
                <Col md="6" lg="4" data-aos="fade-up">
                <Link href="/"> 
                    <a className="room">
                    <figure className="img-wrap">
                        <img src="/assets/images/img_1.jpg" alt="Free website template" className="img-fluid mb-3"/>
                    </figure>
                    <div className="p-3 text-center room-info">
                        <h2>Product Two</h2>
                        <span className="text-uppercase letter-spacing-1">120$ / per kg</span>
                    </div>  
                    </a>
                </Link>
                </Col>  

                <Col md="6" lg="4" data-aos="fade-up">
                <Link href="/"> 
                   <a className="room">
                   <figure className="img-wrap">
                        <img src="/assets/images/img_3.jpg" alt="Free website template" className="img-fluid mb-3"/>
                    </figure>
                    <div className="p-3 text-center room-info">
                        <h2>Product Three</h2>
                        <span className="text-uppercase letter-spacing-1">250$ / per kg</span>
                    </div>  
                   </a>
                </Link>
                </Col>  
            </Row>
            </CardBody>  
            </Card>
            </section>

              </Col>
            
            
            </Row>

        </Container>
            </MainLayout>
        </Fragment>
    )
}

ProductView.getInitialProps = async ({ query }) => {
    return {view: query.view}
  }

export default observer(ProductView);
