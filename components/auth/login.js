import React, { useState, useEffect } from "react";
import { Form, FormFeedback, Label, Input, Button, FormGroup } from 'reactstrap';
import { observer } from 'mobx-react'; 
import dataHero from 'data-hero';  
import Router  from "next/router";
import Storage from "../../services/Storage"; 
import { useMobxStores } from "../../stores/stores";
// import useEffect from "../../services/LayoutEffect";


const schema = {
    email:  {
      email: true,
      isEmpty: false,
      min: 6,
      message: 'A valid email is required'
    },
    password: {
      min: 6,
      message: 'password is required'
    }
  };
 
const Login = props => {  
    const { initial_data } = props; 
    const { authStore } = useMobxStores(); 
    const { isAuth, login, id, preferred, token: buyer_token, loginSuccessful } = authStore;
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
    useEffect(() => {  
        // console.log('auth', isAuth)
        if(isAuth === true) {  
          // console.log('logging in')
          
          if(formState.values.referred === true) {
            //goto page
            if (formState.values.goto === 'BUYERS' ) {
              Storage.save('token', buyer_token);
              Storage.save('id', id);
              Router.push('/buyer/dashboard'); 
            } else {
              Storage.save('id', id);
              Router.push('/seller/dashboard');
            }
          } else {
            //goto preferred 
            
            if (preferred === 'BUYER' ) {
              Storage.save('token', buyer_token);
              Storage.save('id', id);
              Router.push('/buyer/dashboard'); 
            } else {
              Storage.save('id', id);
              Router.push('/seller/dashboard');
            }
          
           
          }
          //loginSuccessful();
        }
        return () => {
            setTimeout( loginSuccessful(), 3000);
        }
    }, [isAuth]);
    useEffect(() => {  
        let setInitial =  typeof initial_data !== 'undefined' ? true : false; 
          if (setInitial) {  
          const data = initial_data && initial_data; 
          setFormState(state => ({
            ...state,
            values: { 
                ...state.values,
                referred: data.referred,
                goto: data.goto
              }          
          })); 
          }
        }, [initial_data]); 

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
        login(formState.values);
    }
    const hasError = field => formState.touched[field] && formState.errors[field].error; 
    
    return (
            <Form onSubmit={handleSubmit} noValidate autoComplete="false">
                 <h3>Sign In</h3>

                <FormGroup>
                <Label>Email address</Label>
                    <Input type="email" name="email" onChange={handleChange}
                     value={ formState.values.email || '' } 
                     invalid={ hasError('email') } className="form-control" placeholder="Enter email" />
                      <FormFeedback  invalid={ hasError('email')}>
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

                <Button type="submit" color="primary" disabled={!formState.isValid} className=" btn-block">Submit</Button>
                <p className="forgot-password text-right">
                    Forgot <span>password</span>
                </p>
            </Form>
            
        );
    }
    export default observer(Login);