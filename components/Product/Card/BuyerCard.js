import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, CardImg, CardBody, CardTitle, CardFooter, CardText } from 'reactstrap';
import { serverUrl } from '../../../Config';
import styles from './Card.module.css';
 
const BuyerCard = props => {
    const { className, products, loading, ...rest } = props; 
    if(loading) {
        return <h2>Loading...</h2>;
      }

    return (
        <Fragment>
            {products.map((product) => {
                <Row>
                    <Col key={product.id} sm="12" md="3">
                        <Card>
                      {/*  <CardImg top width="100%" src={`${serverUrl}${product.main_image}`}
                        alt={product.product_name} /> */}
                        <CardBody className={styles.card-body}>
                            <CardTitle className={styles.card-title}>{product.product_name}</CardTitle>
                            <CardText>{product.description}</CardText>
                            <p className={styles.price}>{product.price}</p>
                            <ul className={`row ${styles.ul} ${styles.rating}`}>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                            </ul>
                        <CardFooter>
                          <p>Place Bid</p>
                        </CardFooter>
                        </CardBody>
                        </Card>
                    </Col>
                </Row>
            })}
        </Fragment>
    )
}

BuyerCard.propTypes = {
    products: PropTypes.any.isRequired 
}

export default BuyerCard
