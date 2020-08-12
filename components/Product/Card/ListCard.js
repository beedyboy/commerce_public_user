import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Card, CardImg, CardBody, CardTitle, CardText, CardHeader } from 'reactstrap'; 
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NoactionStar } from '../../Rating/NoactionStar';
import ReactHtmlParser from 'react-html-parser'; 
import styles from './Card.module.css'; 
import { serverUrl } from '../../../services/APIService';
 import Link  from 'next/link'

const ListCard = props => {
    const { product }  = props;
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
               {/* <CardImg top width="100%" style={{height: '200px'}}
                src={`${serverUrl}${product.main_image}`}
                alt={product.product_name} /> */}
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
                </Card>
            </Col>
        </Fragment>
    )
}

ListCard.propTypes = {
product: PropTypes.any.isRequired
}

export default ListCard
