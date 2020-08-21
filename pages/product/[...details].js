import React, { Fragment, useEffect, useState } from 'react'
import { Row, Container, Col, Badge, Button, Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'; 
import { useRouter } from 'next/router';
import Head from 'next/head';  
import { observer } from 'mobx-react'   
import { useMobxStores } from '../../stores/stores';
import { MainLayout } from '../../templates'; 
import { Chatter } from "../../services/Chatter";
import shortId from 'short-id';
import Link from 'next/link';

const ProductDetails = ({details}) => {
  const router = useRouter();
    const { productStore, stockStore, orderStore } = useMobxStores();
    const { product, getProductById } = productStore; 
    const { allProductStocks:stocks, productStock } = stockStore; 
     const { bidNow } = orderStore;
     //console.log('msg',message);
    const [items, setItems] = useState([]); 
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
    useEffect(() => {
        var details = router.query.details; 
        const second = details[1];
        const id = second.split("-");
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
  
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ?  items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }
  const gotoIndex = (newIndex) => {
     if (animating) return; 
    setActiveIndex(newIndex);
  }
  
  
  const slides = data.images.map((item) => {
    return (
      <CarouselItem
       onExiting={() =>setAnimating(true)}
       onExited={() =>setAnimating(false)}
       key={shortId.generate()} 
       >
       <img className="img-thumbnail w-100 d-block"  src={`${item}`} alt={item} />
      </CarouselItem>
    );
  });
   
   const stockBtn = stocks && stocks.map((item, i) => {
    return (
     <span>
        <Button color="primary" size="sm">Stock {i+ 1}</Button>{" "}
     </span>
    );
  });
   

  const placeBid = e => { 
    //console.log('items', d.split("-"));
  }
  const startChat = (seller) => { 
    Chatter(seller)
  }
    console.log({stocks});
    return (
        <Fragment>

          <MainLayout>
            
        <Container fluid={true} className="mt-5">
            <Row>
             <Col md="4" sm="12">
             {data.images.length < 1 ?
              'Loading product images' :
              (
                <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              >
              <CarouselIndicators items={data.images} activeIndex={activeIndex} onClickHandler={gotoIndex} /> 
             {slides}
             <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} /> 
             <CarouselControl direction="next" directionText="Next" onClickHandler={next} /> 
             </Carousel> 
              )
             }
               
               <div className="carousel slide" data-ride="carousel" id="carousel-1">
                <div className="carousel-inner" role="listbox"> 
                </div> 
           
                <div>
                  <a className="carousel-control-prev" href="#carousel-1" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a>
                  <a className="carousel-control-next" href="#carousel-1" role="button" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                    <span className="sr-only">Next</span></a>
                </div>
                <ol className="carousel-indicators">
                    <li data-target="#carousel-1" data-slide-to="0" className="active"></li>
                    {data.first_image ?  <li data-target="#carousel-1" data-slide-to="1"></li> : null}
                    {/* <li data-target="#carousel-1" data-slide-to="2"></li> */}
                </ol>
            </div>
             </Col>
             <Col md="4" sm="12">
              {/* <Badge color="warning">{`Located at ${data.locationName} `} </Badge> */}
               <h4>{ data.product_name }</h4>
               <p>{ data.category }</p>
               <div className="d-flex flex-row">  
               <div className="icons mr-2"><i className="fa fa-star"></i><i className="fa fa-star"></i>
                <i className="fa fa-star"></i><i className="fa fa-star-half-o"></i><i className="fa fa-star-o"></i>
                </div>
                <span> (1200 ratings) &amp; 564 reviews</span>
            </div>
            <div className="price">
            <span className="mr-2"> <i className="fa fa-naira text-success"></i>&nbsp;{ data.price }</span>
                {/* <span className="mr-2 cut">65,000</span>
                <span className="text-success">25% OFF</span> */}
            </div>
            {/* <span className="mr-2">   
              <p>Packed:  {data.packed === "PACKED" ? "Yes" : "NO"} </p>
            
              <Badge color="primary">{`Available ${data.available} `} </Badge>
             </span>
            */}
            <hr />
            <div className="d-flex align-items-center mt-1 delivery"><i className="fa fa-info-circle"></i>
            <span className="ml-2">Product description <br /></span> 
            </div>
            <hr />
            {ReactHtmlParser(data.description)} 

            <div><span className="font-weight-bold">Seller:</span>
            <span className="ml-2"> {data.shopName} </span></div>
            <span>stocks {stocks.length}</span>
            {/* <div className="mt-3">
                <Button className="btn0 mr-2" color="warning"  onClick={(e) => placeBid(e)}  type="button">BID NOW</Button>{" "}
               <Button className="btn btn-success" onClick={() => startChat(data.seller)} type="button">Chat Seller</Button>  
            </div> */}
             </Col>
            {/* <Col md="4" sm="12"> 
            <div className="d-flex align-items-center mt-1 delivery"><i className="fa fa-map-marker"></i>
            <span className="ml-2">Delivery options</span>
            <br />        
            </div>
            <hr />
            {data.first_delivery ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">Buyer will pick up</span>   <span className="ml-2 mr-2">|<br /></span><span className="ml-2 mr-2 text-success">FREE<br /></span>
                </div>
            )
              : null
            }

            {data.second_delivery ?
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
            {data.third_delivery ?
            (
                <div className="d-flex align-items-center mt-2 offers mb-1"><i className="fa fa-check-square-o mt-1"></i><span className="ml-1 font-weight-bold">I will deliver to buyer beyond {data.beyond_distance} Meters</span><span className="ml-1">for {data.beyond_charge}<br /></span>
                </div>
            )
              : null
            }
           
               </Col> */}
            </Row>
            {/* do stocks here */}
            <Row>
              <Col md="12">
                <h6>Available Stocks</h6>
                {/* create buttons */}
                {stockBtn}
              </Col>
            </Row>
            <Row>
              <Col md="12">
             <section className="section sponsored" id="section-rooms">
            <Container>
            <Row className="justify-content-center text-center mb-5">
            <Col md="7"> 
                <h3 className="heading" data-aos="fade-up">Sponsored &amp; Products</h3>
                <p data-aos="fade-up" data-aos-delay="100">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
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
            </Container>  
            </section>

              </Col>
            
            
            </Row>
        </Container>

          </MainLayout>

        </Fragment>
        
    )
}
ProductDetails.getInitialProps = async ({ query }) => {
  return {details: query.details}
}
export default observer(ProductDetails)
