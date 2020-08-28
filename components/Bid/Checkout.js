import React, { useState, Fragment, useEffect } from "react";   
import { Row, Container, Col, Form, Card, CardHeader, CardBody, FormGroup, Input, Label, CardFooter, FormText, CustomInput, Button } from "reactstrap"; 
const Checkout = () => {
    const publicKey = "pk_your_public_key_here"
  const amount = 1000000
  const [email, setEmail] = useState("boladebode@gmail.com")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  }
   
    return (
        <Fragment> 
        <Container> 
      <Row>
          <Col md="12">
          <PaystackButton {...componentProps} />
          </Col>
      </Row>
          </Container> 
      </Fragment>
    )
}
export default Checkout;