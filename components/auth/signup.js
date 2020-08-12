import React, { useState, useEffect, Fragment } from "react";
import { Form, FormFeedback, Label, Input, Button, FormGroup, Container, Row, Col } from 'reactstrap';
import { observer } from 'mobx-react'; 
import dataHero from 'data-hero'; 
import { useMobxStores } from "../../stores/stores";

const schema = {
    email:  {
      email: true,
      isEmpty: false,
      min: 6,
      message: 'A valid email is required'
    },
    password: {
      min: 6,
      message: 'Password must be a minimum of 6 characters'
    }
  };
 const SignUp = () => {   
  const { authStore } = useMobxStores(); 
   
    const {  createBuyer, createSeller } = authStore;
    const [screen, setScreen] = useState(false);
    const [account, setAccount] = useState('Buyer');
    const [formState, setFormState] = useState({
        isValid: false,
      values: {
        referred: false,
        goto: '',
        email: '',
        password: ''
      },
      touched: {},
      errors: {} 
    });
    // useEffect(() => { 
    //     if(registered !== false) { 
    //        //send message
    //     }
    //     return () => {
    //         loginSuccessful();
    //     }
    // });
 

    useEffect(() => { 
        const errors = dataHero.validate(schema, formState.values); 
        setFormState(formState => ({
          ...formState,
          isValid: errors.email.error || errors.password.error ?  false: true,
          errors: errors || {}
        }));
      }, [formState.values]);

    
    const handleChange = event => {
        event.persist(); 
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: event.target.value
          },
          touched: {
            ...formState.touched,
            [event.target.name]: true
          }
        }));
      };
    
    const handleSubmit = e => {
        e.preventDefault();
        if (account === "Buyer") {
            createBuyer(formState.values);
        } else {
            createSeller(formState.values);
        }
       
    }
    const hasError = field =>  formState.touched[field] && formState.errors[field].error; 
    
    const accountLoader = (e, data) => {
        e.preventDefault();
        setScreen(true);
        setAccount(data);
    }
    const chooseAccount = e => {
        return  <Fragment>
            <Container>
                <h4>Choose account type</h4>
                <Row>
                    <Col md="6" sm="12">
                    <Button color="primary" onClick={(e) => accountLoader(e, "Seller")}>Seller Account</Button>
                    </Col>

                    <Col md="6" sm="12">
                    <Button color="primary" onClick={(e) => accountLoader(e, "Buyer")}>Buyer Account</Button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    }
   if(screen !== true) {
     {chooseAccount()}
   }
        return ( 
            <div>
                <Form onSubmit={handleSubmit} noValidate autoComplete="false">
                 <h3>Sign Up</h3>

                <FormGroup>
                <Label>Email address</Label>
                    <Input type="email" name="email" onChange={handleChange}
                     value={ formState.values.email || '' } 
                     invalid={ hasError('email') } className="form-control" placeholder="Enter email" />
                      <FormFeedback  invalid={ hasError('email') || false }>
            {
                  hasError('email') ? formState.errors.email && formState.errors.email.message : null
                } 
            </FormFeedback>
                </FormGroup>
                
                <FormGroup>
                <Label>Password</Label>
                    <Input type="password" name="password" onChange={handleChange}  
                            placeholder="********" value={ formState.values.password || '' }
                invalid={ hasError('password') } className="form-control" />
              <FormFeedback invalid={ hasError('password') }>
            {
                  hasError('password') ? formState.errors.password && formState.errors.password.message : null
                } 
            </FormFeedback>
                </FormGroup> 

                <Button type="submit" color="primary" disabled={!formState.isValid} className=" btn-block">Register</Button>
                
            </Form>
            </div>
            
        );

}
export default observer(SignUp);