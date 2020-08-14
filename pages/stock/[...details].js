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

const StockList = ({details}) => {
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
          quantity: '',
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
          quantity: product.quantity, 
          product_id: product.product_id,
          stock_name: product.stock_name,
          weight: product.weight,
          featured: product.featured,
          first_delivery: product.first_delivery,
          second_delivery: product.second_delivery,
          third_delivery: product.third_delivery,
          within_distance: product.within_distance,
          within_charge: product.within_charge,
          beyond_charge: product.beyond_charge,
          beyond_distance: product.beyond_distance
      }));
      productImages(); 
    }    
  }, [product]); 
  
  
 
    return (
        <Fragment>

          <MainLayout>
            
        <Container fluid={true} className="mt-5">

          
        </Container>

          </MainLayout>

        </Fragment>
        
    )
}
StockList.getInitialProps = async ({ query }) => {
  return {details: query.details}
}
export default observer(StockList);
