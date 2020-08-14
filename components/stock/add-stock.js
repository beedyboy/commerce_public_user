import React, { useState, Fragment, useEffect } from "react";   
import { Row, Container, Col, Form, Card, CardHeader, CardBody, FormGroup, Input, Label, CardFooter, FormText, CustomInput, Button } from "reactstrap"; 
import dataHero from "data-hero";   
import { useMobxStores } from "../../stores/stores";  
const schema = {
    name:  {
        isEmpty: false,
        min: 1,
        message: 'A valid stock name is required'
      },
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
const AddStock = () => {
  const { stockStore } = useMobxStores(); 
  const { saveStock, sending, saved, refreshForm } = stockStore;   

    const [formState, setFormState] = useState({
        isValid: false, 
        values: {
          id: '',
          name: '', weight: '',  product_id: '', quantity: '',  price: '',
          packed: '', first_delivery: false, second_delivery: false, third_delivery: false, within_distance: '', within_charge:'', beyond_distance: '', beyond_charge:''
        },
        touched: {},
        errors: {}
      }); 
      useEffect(() => {
        const errors = dataHero.validate(schema, formState.values);  
        setFormState(formState => ({
          ...formState,
          isValid: errors.name.error || errors.quantity.error ?  false: true,
          errors: errors || {}
        }));
      }, [formState.values]);
       
       useEffect(() => {
          if (saved === true) {
            handleReset();      
		  }
        return () => {
          refreshForm();
        }
       }, [saved])
     
      
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
 
  const createStock = e => {
    e.preventDefault();
    const fd = new FormData();   
    fd.append('stock_name', formState.values.name);
    fd.append('product_id', formState.values.product_id);
    fd.append('quantity', formState.values.quantity); 
    fd.append('weight', formState.values.weight); 
    fd.append('price', formState.values.price); 
    fd.append('packed', formState.values.packed); 
    fd.append('first_delivery', formState.values.first_delivery); 
    fd.append('second_delivery', formState.values.second_delivery); 
    fd.append('third_delivery', formState.values.third_delivery); 
    fd.append('within_distance', formState.values.within_distance); 
    fd.append('within_charge', formState.values.within_charge); 
    fd.append('beyond_distance', formState.values.beyond_distance); 
    fd.append('beyond_charge', formState.values.beyond_charge);  
    saveStock(fd); 
  }
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleReset = () => {
         setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
         id: '',
          name: '',  product_id: '', weight: '', quantity: '', price: '',
          packed: '', first_delivery: false, second_delivery: false, third_delivery: false, within_distance: '', within_charge:'', beyond_distance: '', beyond_charge:''
       
      } 
    }));
  }
     
    return (
    <Fragment>
        
      <Container>
           
        <Form onSubmit={createStock}>
      <Row>
      <Col md="12" lg="12" sm="12">
        <Row>
          
        <Card>
          <CardBody>
            <Row>
              <Col md="12" sm="12">
              <FormGroup  className={
                    hasError('name') ? 'has-danger' : null} >
                  <Label>Stock Name</Label>
                  <Input
                      type="text" 
                      value={formState.values.name || ''}
                      name="name" 
                      onChange={handleChange}
                      placeholder="Stock Name"
                      />
                <FormText>
                  <p className="text-danger">{  hasError('name') ? formState.errors.name && formState.errors.name.message : null } </p>
               </FormText>
              </FormGroup>
              </Col>
              </Row>
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
          <h4>Delivery and location</h4>
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
            Save changes
    </Button>
    
    </CardFooter>
          
        </Form>
       
        </Container>
      
    </Fragment>
     
    )
}

export default AddStock
