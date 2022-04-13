import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button } from 'react-bootstrap';

const ModalSessionDel = ({ id, img }) => {

    const config = require('../config.json');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") === null && window.sessionStorage.getItem("token") === null) {

            window.location.href = '/';

        }

    }, []);

    async function delSession(e) {

        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                id: id,
                idutilisateur: window.sessionStorage.getItem("idu"),
                img: img
            })
        };
        await fetch(config.api_url + 'session/remove', requestOptions)
            .then(res => {
                return res.json()
            }).then(json => {

                window.location.href = '/session';

            })

    }

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
                    <Button variant="dark" onClick={delSession}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSessionDel;