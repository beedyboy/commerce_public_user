import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Card, CardImg, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap'; 
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NoactionStar } from '../../Rating/NoactionStar';
import ReactHtmlParser from 'react-html-parser'; 
import styles from './Card.module.css';  
 import Link  from 'next/link'

const BuyerCard = props => {
    const { product }  = props;
    const getImages = JSON.parse(product.images);
    const linker = (data) => {     
      return  data.toLowerCase()
                .replace(/[^\w ]+/g, '')
                .replace(/ +/g, '-');  
    }
    return (
        <Fragment>
                <Card>                     
               <CardBody className={styles.cardBody}>
                   <div className="flip-card">
                   <div className="flip-content">
                <div className="flip-front">
               <CardImg top width="100%" style={{height: '280px', maxHeight: '280px', width: '100%'}} src={getImages[0]}
                alt={product.product_name} />  
                    {/* <CardTitle>{product.product_name}</CardTitle>  */}
                    {/* <p className={styles.price} style={{marginTop: '201px'}}>{product.price}</p> */}
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
                   <Link href={`/home/${linker(product.product_name)}/${product.id}-${linker(product.catName)}`} as={`/home/${product.product_name}/${product.id}-${product.catName}`} >
                  
                  <a className="link-bold">{product.product_name}</a>
               </Link>
                   
               </CardBody>
                </Card> 
        </Fragment>
    )
}

BuyerCard.propTypes = {
product: PropTypes.any.isRequired
}

export default BuyerCard
