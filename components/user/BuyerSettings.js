import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'reactstrap'
import Switch from 'react-bootstrap-switch'
import { useMobxStores } from '../../stores/stores'

const BuyerSettings = ({details}) => {
    const { userStore } = useMobxStores();
    const { updateSettings } = userStore;
    
  const [data, setData] = useState({
    id: '', 
    user: 'Buyer',
    email: false,
    sms: false 
  }); 
  useEffect(() => {
    const val = details && details.id;   
      if(val) {
          setData(state => ({
              ...state,
              id: val.settingsId,
              email: val.buyer_email,
              sms: val.sms
          }))
      }
  }, [details]);
 const toggle = (e, value) => {
     e.persist()
    console.log(e)
    console.log(value)
 }
  const saveUpdate = e => {
      e.preventDefault();
    updateSettings(data)
  }
    return (
        <Fragment>
            <Row>
                <Col md="12">
                    Settings
                </Col>
                <Col md="12">
                    <Form onSubmit={saveUpdate}>
                        <Row>
                            <Col md="2">Email:</Col>
                            <Col md="10">
                                <Switch
                                    defaultValue={data.email || false }
                                    offColor="default"
                                    offText="No"
                                    onColor="success"
                                    onText="Yes" 
                                    onChange={(el) => toggle(el, data.email)}
                                    name='email'
                                     />
                            </Col>
                        </Row>

                        <Row>
                            <Col md="2">sms:</Col>
                            <Col md="10">
                                <Switch
                                    defaultValue={data.sms || false }
                                    offColor="default"
                                    offText="No"
                                    onColor="success"
                                    onText="Yes" 
                                    onChange={(el) => toggle(el, data.sms)}
                                    name='sms'
                                     />
                            </Col>
                        </Row>
                          <Row>
                            <Col md="2"></Col>
                            <Col md="10">
                                 <Button type="submit" color="primary">Save Changes</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>
        </Fragment>
    )
}

export default BuyerSettings
