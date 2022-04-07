import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, InputGroup, Form, FormControl } from 'react-bootstrap';


const ModalSessionAdd = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="light" className='mt-3' onClick={handleShow}>Ajouter</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une session de peche</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Date</InputGroup.Text>
                        <Form.Control type="date" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Lieu</InputGroup.Text>
                        <Form.Control type="text" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="file" />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Description</InputGroup.Text>
                        <FormControl as="textarea" aria-label="With textarea" />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={handleClose}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSessionAdd;