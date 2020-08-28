import React, { useState, Fragment, useEffect } from "react";   
import { Row, Container, Col, Form, Card, CardHeader, CardBody, FormGroup, Input, Label, CardFooter, FormText, CustomInput, Button } from "reactstrap"; 
import dataHero from "data-hero";    
import { observer } from "mobx-react";
const schema = { 
      price:  {
        min: 1,
        message: 'Price can not be empty'
      },
    quantity: {
      isEmpty: false,
      max: 50,
      message: 'Quantity is required'
    }
  }; 
 
//   bid_id, bid_token, shop_id, buyer, seller, user
const AuctionForm = ({toggle, data}) => {
    const { orderStore } = useMobxStores();
    const { buyerCreateAuction, sellerCreateAuction } = orderStore; 
    const [formState, setFormState] = useState({
        isValid: false, 
        values: {
          bid_token: '',
          shop_id: '',  bid_id: bid_id, quantity: '',  price: '',
          packed: '', first_delivery: false, second_delivery: false, third_delivery: false, within_distance: '', within_charge:'', beyond_distance: '', beyond_charge:''
        },
        touched: {},
        errors: {}
      });
    
    useEffect(() => {
         setFormState(state => ({
             ...state,
             values: {
                 ...state.values,
                bid_id: data.bid_id,
                bid_token: data.bid_token, 
                shop_id: data.shop_id, 
                buyer: data.buyer, 
                seller: data,seller
             }
         }) )
        return () => {
            handleReset();
        }
    }, [data])

    useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
        ...formState,
        isValid: errors.price.error || errors.quantity.error ?  false: true,
        errors: errors || {}
    }));
    }, [formState.values]);
       
       useEffect(() => {
          if (close === true) {
            handleReset(); 
            toggle();   
		  }
        return () => {
          toggleClose();
        }
       }, [close])
       
const handleChange = event => {
    event.persist(); 
    const field = event.target.name;
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    })); 
     
  }
 
  const handlePackedChange = e => {
    e.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        packed: e.target.id.toUpperCase()
      } 
    })); 
  }
 
  const createAuction = e => {
    e.preventDefault(); 
    // saveStock(formState.values); 
    if (data.user === "seller") {
        sellerCreateAuction(formState.values); 
    } else {
         buyerCreateAuction(formState.values);  
    }
   
  }
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleReset = () => {
         setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        bid_token: '', shop_id: '',  bid_id: '', quantity: '',  price: '', packed: '', first_delivery: false, second_delivery: false, third_delivery: false, within_distance: '', within_charge:'', beyond_distance: '', beyond_charge:''
      },
      touched:{
        ...formState.touched,
        bid_token: false,  bid_id: false, shop_id: false, quantity: false, price: false,
        packed: false, first_delivery: false, second_delivery: false, third_delivery: false, within_distance: false, within_charge:false, beyond_distance: false, beyond_charge:false
      },
      errors: { }
    }));
  }
          
    return (
        <Fragment> 
        <Container> 
          <Form onSubmit={createAuction}>
        <Row>
        <Col md="12" lg="12" sm="12">
          <Row>
            
          <Card>
            <CardBody> 
                <Row> 
                  <Col md="6">
                    <FormGroup className={
                          hasError('quantity') ? 'has-danger' : null} >
                      <label htmlFor="quantity">
                        Quantity
                      </label>
                      <Input onChange={handleChange}  name="quantity" value={formState.values.quantity} type="number" />
                      <FormText>
                        <p className="text-danger">{  hasError('quantity') ? formState.errors.quantity && formState.errors.quantity.message : null } </p>
                    </FormText>
                    </FormGroup>
                 </Col>  
                 
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="price">
                      Price
                    </label>
                    <Input onChange={handleChange}  name="price" value={formState.values.price} type="number" />
                  </FormGroup>
                </Col> 
                     
                  </Row>
                
                <Row> 
             <Col md="12">
             <FormGroup check>
                      <Label check> 
                      <Input value={formState.values.packed} type="radio" id="packed" onChange={handlePackedChange} name="packed" />{' '}
                      PACKED
                       </Label> 
                  </FormGroup>
  
                  <FormGroup check>
                      <Label check> 
                      <Input value={formState.values.packed} type="radio" id="unpacked" onChange={handlePackedChange} name="packed" />{' '}
                      UNPACKED
                       </Label> 
                  </FormGroup> 
                   
             </Col> 
                </Row>
             
             </CardBody>
          </Card>
        
          </Row>
        </Col>
  
        {/* second column */}
        <Col md="12" lg="12" sm="12">
           <Row className="mt-2"> 
          <Card>
            <CardHeader> 
            <h4>Delivery and location 
              <i className="fa fa-location"></i></h4>
            </CardHeader>
            <CardBody> 
                {/* Delivery */}
              <Row>
                <Col md="12">
                  <FormGroup>
                    <CustomInput type="checkbox" checked={formState.values.first_delivery} onChange={handleChange} value={formState.values.first_delivery} id="first_delivery" name="first_delivery" label="Buyer pick up" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <CustomInput type="checkbox" checked={formState.values.second_delivery}  onChange={handleChange} value={formState.values.second_delivery} id="second_delivery" name="second_delivery" label="Seller delivers within XX Meters" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Meters</Label>
                    <Input type="text" name="within_distance" value={formState.values.within_distance} onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Charges</Label>
                    <Input type="text" name="within_charge" value={formState.values.within_charge} onChange={handleChange} />
                  </FormGroup>
                </Col>
              </Row>
            
              <Row>
                <Col md="4">
                  <FormGroup>
                    <CustomInput type="checkbox" checked={formState.values.third_delivery}  onChange={handleChange} value={formState.values.third_delivery} id="third_delivery" name="third_delivery" label="Seller delivers beyond XX Meters" />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Meters</Label>
                    <Input type="text" name="beyond_distance" value={formState.values.beyond_distance} onChange={handleChange} />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Charges</Label>
                    <Input type="text" name="beyond_charge" value={formState.values.beyond_charge} onChange={handleChange} />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card> 
           </Row>
        </Col>
        </Row>
   
      <CardFooter>
      <Button color="primary" disabled={!formState.isValid || sending } 
          type="submit">
            {sending ? (
              <span> Saving data  <i className="fa fa-spinner"></i></span>
              ): 'Save changes'}
      </Button>
      
      </CardFooter>
            
          </Form>
         
          </Container> 
      </Fragment>
    )
}

export default observer(AuctionForm);