import React, { useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'   
import Head from 'next/head';  
import { useMobxStores } from "../../stores/stores";
import ListCard from '../../components/Product/Card/ListCard';
import { Row, Card, CardHeader, CardBody, NavLink } from 'reactstrap';
import { SellerLayout, BuyerLayout } from '../../templates';
import BidList from '../../components/Bid/BidList';


 const SellerBids = () => {
     const { orderStore } = useMobxStores();
     const { sellerBidsById, sellerBids } = orderStore;
     useEffect(() => {
      sellerBidsById(); 
     }, []);
    
    return (
       <Fragment>
         <Head>
          <title>Bids | Seller</title> 
         </Head>
         <BuyerLayout>
           <Card className="mt-3 mb-3">
             <CardHeader>
               <h3>Bids </h3>
             </CardHeader>
             <CardBody>
          <BidList user="seller" data={sellerBids} />
          
             </CardBody>
           </Card> 

         </BuyerLayout>
      </Fragment>
    )
} 
export default observer(SellerBids);