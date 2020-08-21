import React, { Fragment, useState, useEffect } from 'react'
import { SellerLayout } from '../../templates'
import { Container, Row, Button, Col, Modal, ModalHeader, ModalBody } from 'reactstrap'
import Head from 'next/head'
import { useMobxStores } from '../../stores/stores'
import AddStaff from '../../components/user/AddStaff'
import StaffList from '../../components/user/StaffList'

const Staff = () => { 
   const {userStore} = useMobxStores();
   const { getStaff, staffs, close, toggleClose, loading } = userStore;
   const [modal, setModal] = useState(false); 
   const toggle = () => setModal(!modal);
   const closeBtn = <Button className="close" onClick={toggle}>&times;</Button>;
   useEffect(() => {
       getStaff
       return () => {
        toggleClose()
       }
   }, [])
    return (
        <Fragment>
            <Head>
                <title>Staff Management</title> 
            </Head>
            <SellerLayout>
                <Container className="mt-3">
                <Row>
                    <Col md="12" className="mt-3">
                        <Button color="primary" onClick={(e) => setModal(true)}>Add Staff</Button>
                       
                    </Col>
                    <Col md="12" className="mt-3">
                        <StaffList data={staffs} />
                    </Col>
                </Row>
                </Container>
                 <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle} close={closeBtn}>Staff Form</ModalHeader>
                            <ModalBody>
                                <AddStaff toggle={toggle} />
                            </ModalBody>
                        </Modal>
            </SellerLayout>
        </Fragment>
    )
}

export default Staff
