import React, { Fragment, useEffect, useState } from 'react'
import { Row, Container, Col, Badge, Button, Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser'; 
import { useRouter } from 'next/router';
import Head from 'next/head';  
import { observer } from 'mobx-react'   
import { useMobxStores } from '../../stores/stores';
import { MainLayout } from '../../templates';
import { serverUrl } from '../../services/APIService';
import { Chatter } from "../../services/Chatter";
import Link from 'next/link';

const ProductDetails = ({details}) => {
  const router = useRouter();
    const { productStore, orderStore } = useMobxStores();
    const { product, getProductById } = productStore; 
     const { bidNow } = orderStore;
     //console.log('msg',message);
    const [items, setItems] = useState([]); 
  const [data, setData] = useState({
          id: '',
          price: '',
          packed: '',
          category: '',
          location: '',
          locationName: '',
          available: '',
          shopName: '',
          seller: '',
          main_image: '',
          first_image: '',
          product_name: '',
          first_delivery: '',
          second_delivery: '',
          third_delivery: '',
          within_distance: '',
          within_charge: '',
          beyond_charge: '',
          beyond_distance: '',
          description: ''
  }); 
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
    useEffect(() => {
        var details = router.query.details; 
        const second = details[1];
        const id = second.split("-");
        getProductById(id);
    }, [])
    
  useEffect(() => {
    const rp = product && product.product_name;  
    if(rp) {
  //console.log('data', data, product);
      setData(state => ({
        ...state, 
          id: product.id,
          price: product.price,
          packed: product.packed,
          category: product.catName, 
          location: product.location,
          locationName: product.locationName, 
          available: product.available,
          shopName: product.shopName,
          seller: product.seller,
          main_image: product.main_image,
          first_image: product.first_image,
          product_name: product.product_name,
          first_delivery: product.first_delivery,
          second_delivery: product.second_delivery,
          third_delivery: product.third_delivery,
          within_distance: product.within_distance,
          within_charge: product.within_charge,
          beyond_charge: product.beyond_charge,
          beyond_distance: product.beyond_distance,
          description: product.description
      }));
      productImages(); 
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
  const productImages = () => {
    var d = [];
      if (data.main_image) {
      const m = {
        src: data.main_image,
        altText: 'Main Product Image'
      }
      d.push(m)
    }
          if (data.first_image) { 
      const f = {
        src: data.first_image,
        altText: 'First Product Image'
      }
      d.push(f)
    }
    setItems(d); 
    //setItems((state) => ({}))
  }
  
  const slides = items.map((item) => {
    return (
      <CarouselItem
       onExiting={() =>setAnimating(true)}
       onExited={() =>setAnimating(false)}
       key={item.src}
       >
       <img className="img-thumbnail w-100 d-block"  src={`${serverUrl}${item.src}`} alt={item.altText} />
      </CarouselItem>
    );
  });
   

  const placeBid = e => { 
    //console.log('items', d.split("-"));
  const startChat = (seller) => { 
    Chatter(seller)
  }
    return (
        <Fragment>

          <MainLayout>
            
        <Container fluid={true} className="mt-5">
            <Row>
             <Col md="4" sm="12">
             {items.length < 1 ?
              'Loading product images' :
              (
                <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              >
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={gotoIndex} /> 
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
              <Badge color="warning">{`Located at ${data.locationName} `} </Badge>
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
            <span className="mr-2">   
              <p>Packed:  {data.packed === "PACKED" ? "Yes" : "NO"} </p>
            
              <Badge color="primary">{`Available ${data.available} `} </Badge>
             </span>
           
            <hr />
            <div className="d-flex align-items-center mt-1 delivery"><i className="fa fa-info-circle"></i>
            <span className="ml-2">Product description <br /></span> 
            </div>
            <hr />
            {ReactHtmlParser(data.description)} 

            <div><span className="font-weight-bold">Seller:</span>
            <span className="ml-2"> {data.shopName} </span></div>
            <div className="mt-3">
                <Button className="btn0 mr-2" color="warning"  onClick={(e) => placeBid(e)}  type="button">BID NOW</Button>{" "}
               <Button className="btn btn-success" onClick={() => startChat(data.seller)} type="button">Chat Seller</Button>  
            </div>
             </Col>
            <Col md="4" sm="12">
               
                
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
export default observer(ProductDetails);
