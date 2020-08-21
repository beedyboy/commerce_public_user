import React, { Fragment, useEffect } from 'react'
import { Card,  CardBody, Button, CardHeader, Container, Row, Col } from 'reactstrap';  
import { useMobxStores } from '../../stores/stores';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SellerLayout } from '../../templates';
import Loading from '../../components/Suspense/Loading';
import StockTable from '../../components/stock/StockTable';
import Link from 'next/link';

const ViewStock = ({details}) => {
    const { stockStore } = useMobxStores();
    const { stocks: data, productStock, loading } = stockStore; 
    const router = useRouter();
    const id = router.query.id;
    useEffect(() => {
        // var details = router.query.details; 
        // console.log({id})
        // const second = details[1];
        // const id = second.split("-");
        productStock(id);
    }, [])
 const toggle = (el, status, id) => {

 }
 
    return (
        <Fragment>
        <Head>
         <title>Product Stock</title> 
        </Head>
        <SellerLayout>
          <Container className="mt-3 mb-3">
            
          {/* <Card className="mt-3 mb-3">
            <CardHeader>
              <h3>My Product(s) </h3>
            </CardHeader>
            <CardBody>
            
          
            </CardBody>
          </Card>  */}
           <Row>
               <Col md="12">
                <Row>
                    <Col md="3">
                        <Link href="/seller/my-products">
                            <a>Back to Products</a>
                        </Link>
             
                    </Col>
                </Row>
               </Col>
               <Col md="12" className="mt-3">
               {loading ? <Loading /> :
                <Fragment>  
                    <StockTable data={data} toggle={toggle} />
                </Fragment>
             }

               </Col>
           </Row>
          </Container>
        </SellerLayout>
     </Fragment>
    )
}
 
ViewStock.getInitialProps = async ({ query }) => {
    return {details: query.details}
  }

export default observer(ViewStock);
