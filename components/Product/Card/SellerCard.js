import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Col, Card, CardImg, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, CardFooter } from 'reactstrap'; 
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NoactionStar } from '../../Rating/NoactionStar';
import ReactHtmlParser from 'react-html-parser'; 
import styles from './Card.module.css'; 
import { serverUrl } from '../../../services/APIService';
 import Link  from 'next/link'
import AddStock from '../../stock/add-stock';
import StockTable from '../../stock/StockTable';

const SellerCard = props => {
    const { product }  = props;
    const [modal, setModal] = useState(false);
    const [stockView, setStockView] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = <Button className="close" onClick={toggle}>&times;</Button>;
    const images = JSON.parse(product.images);
    const showStockView = () => setStockView(!stockView);
    const stockCloseBtn = <Button className="close" onClick={showStockView}>&times;</Button>;
    const linker = (data) => {
      return  data.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');  
    }
    return (
        <Fragment>
            <Col sm="12" md="3">
                <Card>                     
               <CardBody className={styles.cardBody}>
                   <div className="flip-card">
                   <div className="flip-content">
                <div className="flip-front">
              <CardImg top width="100%" style={{height: '200px'}}
                src={images[0]}
                alt={product.product_name} /> 
                    {/* <CardTitle>{product.product_name}</CardTitle>  */}
                    
                    <p className={styles.price}>{product.price}</p>
                    <div className={styles.rating}><NoactionStar total="4" /></div>
                     
                </div> 
                <div className="flip-back">  
                    <CardTitle className={styles.cardTitle}>{product.product_name}</CardTitle>
                    <div className="card-text">
                      
                    <PerfectScrollbar>
                    <> 
                    {ReactHtmlParser(product.description)} 
                    </> 
                    </PerfectScrollbar>
                        
                    </div>  
                </div>
               </div>
                   </div>
                   <Link href={`/product/${linker(product.product_name)}/${product.id}-${linker(product.catName)}`} as={`/product/${product.product_name}/${product.id}-${product.catName}`}>
                  
                     <a>{product.product_name}</a>
                  </Link>
                
               </CardBody>
               <CardFooter>
               <Button size="sm" color="warning" className="mt-1" onClick={toggle}>Add Stock</Button> {" "}
               {/* <Button size="sm" color="info" onClick={showStockView}>View Stocks</Button> */}
                <Link href="/seller/[id]" as={`/seller/${product.id}`}> 
                     <a className="btn btn-info btn-sm mt-1">View Stock</a>
                  </Link>
               </CardFooter>
                </Card>
            </Col>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Stock</ModalHeader>
                <ModalBody>
                    <AddStock toggle={toggle} product_id={product.id} />
                </ModalBody>
            </Modal>

            <Modal isOpen={stockView} toggle={showStockView}>
                <ModalHeader toggle={showStockView} close={stockCloseBtn}>Stock</ModalHeader>
                <ModalBody>
                    <StockTable details={product.id} />
                </ModalBody>
            </Modal>

            
        </Fragment>
    )
}

SellerCard.propTypes = {
product: PropTypes.any.isRequired
}

export default SellerCard
