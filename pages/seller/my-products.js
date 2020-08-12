import React, { useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'   
import Head from 'next/head';  
import { useMobxStores } from "../../stores/stores";
import ListCard from '../../components/Product/Card/ListCard';
import { Row, Card, CardHeader, CardBody, NavLink } from 'reactstrap';
import { SellerLayout } from '../../templates';


 const ProductList = () => {
     const { productStore } = useMobxStores();
     const { filteredProduct, loading, myProducts } = productStore;
     useEffect(() => {
         myProducts(); 
     }, []);
     if(loading) {
        return <h2>Loading...</h2>;
      }
       
    return (
       <Fragment>
         <Head>
          <title>My Products</title> 
         </Head>
         <SellerLayout>
           <Card className="mt-3 mb-3">
             <CardHeader>
               <h3>My Product(s) </h3>
             </CardHeader>
             <CardBody>
            { filteredProduct && filteredProduct.length < 1 ? 
            (
             <>
              <h3>No product found</h3>
              <p><NavLink to="/seller/add-product">Click here to add product</NavLink></p>
              </>
            ) :
            (
              <Row>
              {filteredProduct && filteredProduct.map((product) =>
                <ListCard key={product.id} product={product} /> 
              )}
          </Row>
            )
              }
             </CardBody>
           </Card> 

         </SellerLayout>
      </Fragment>
    )
} 
export default observer(ProductList);