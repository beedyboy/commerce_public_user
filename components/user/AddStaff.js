import React, { useState, Fragment, useEffect } from "react";   
import { Row, Container, Col, Form, Card, CardBody, FormGroup, Input, Label, CardFooter, FormText,  Button } from "reactstrap"; 
import dataHero from "data-hero";   
import { useMobxStores } from "../../stores/stores";  
import { observer } from "mobx-react";
const schema = {
    email:  {
        isEmpty: false,
        min: 1,
        message: 'A valid email is required'
      },
      password:  {
        min: 1,
        message: 'Password can not be empty'
      } 
  }; 
const AddStaff = ({toggle}) => {
  const { userStore } = useMobxStores(); 
  const { saveStaff, sending, close, toggleClose } = userStore;   

    const [formState, setFormState] = useState({
        isValid: false, 
        values: {
            id: '',
            email: '',
            password:'',
            account_type: 'Secondary'
        },
        touched: {},
        errors: {}
      }); 
      useEffect(() => {
        const errors = dataHero.validate(schema, formState.values);  
        setFormState(formState => ({
          ...formState,
          isValid: errors.email.error || errors.password.error ?  false: true,
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
   
  const createStaff = e => {
    e.preventDefault(); 
    saveStaff(formState.values); 
  }
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleReset = () => {
         setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        id: '',
        email: '',
        password:'',
        account_type: 'Secondary'
      },
      touched:{
        ...formState.touched,
        email: false,  password: false 
      },
      errors: { }
    }));
  }
     
    return (
    <Fragment>
        
      <Container>
           
        <Form onSubmit={createStaff}>  
        <Card>
          <CardBody>
            <Row>
              <Col md="12" sm="12">
              <FormGroup  className={
                    hasError('email') ? 'has-danger' : null} >
                  <Label>Email</Label>
                  <Input
                      type="text" 
                      value={formState.values.email || ''}
                      name="email" 
                      onChange={handleChange}
                      placeholder="Email"
                      />
                <FormText>
                  <p className="text-danger">{  hasError('email') ? formState.errors.name && formState.errors.email.message : null } </p>
               </FormText>
              </FormGroup>
              </Col>
              </Row> 

              <Row>
              <Col md="12" sm="12">
              <FormGroup  className={
                    hasError('password') ? 'has-danger' : null} >
                  <Label>Password</Label>
                  <Input
                      type="password" 
                      value={formState.values.password || ''}
                      name="password" 
                      onChange={handleChange}
                      placeholder="Password"
                      />
                <FormText>
                  <p className="text-danger">{  hasError('password') ? formState.errors.name && formState.errors.password.message : null } </p>
               </FormText>
              </FormGroup>
              </Col>
              </Row> 
           </CardBody>
        </Card>
       
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

export default observer(AddStaff)
