import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';

const ModalSessionDel = ({ session }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Supprimer</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une session de peche</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Voulez vous supprimer la session ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={handleClose}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSessionDel;