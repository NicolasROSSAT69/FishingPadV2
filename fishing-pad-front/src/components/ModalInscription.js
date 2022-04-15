import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import nextId from "react-id-generator";

const ModalInscription = () => {

    const config = require('../config.json');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nom, setnom] = useState('');
    const [prenom, setprenom] = useState('');
    const [mail, setmail] = useState('');
    const [mdp, setmdp] = useState('');
    const [mdpc, setmdpc] = useState('');

    function handleClick(e) {

        e.preventDefault();

        if (mdp !== mdpc) {

            NotificationManager.warning('Mot de passe différent', 'Attention', 3000);

        } else {

            if (nom && prenom && mail && mdp) {

                let id = nextId("usr-");
                //Simple POST request with a JSON body using fetch
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nom: nom,
                        prenom: prenom,
                        mail: mail,
                        motdepasse: mdp,
                        identifiant: id
                    })
                };
                fetch(config.api_url + 'users/signup', requestOptions)
                    .then(response => response.json())
                    .then(() => {
                        NotificationManager.success('Inscription réussi, vous pouvez vous connecter', 'Inscription', 3000);
                        setTimeout(() => {

                            handleClose();

                        }, 1000);
                    });
            }
            else {

                NotificationManager.warning('Champs incomplets', 'Attention', 3000);

            }

        }

    }

    return (
        <>
            <Button variant="dark" className='mx-3' onClick={handleShow}>Inscription</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>S'inscrire</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" onChange={(e) => setnom(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" onChange={(e) => setprenom(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" onChange={(e) => setmdp(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirmation mot de passe</Form.Label>
                        <Form.Control type="password" onChange={(e) => setmdpc(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={handleClick}>
                        S'inscrire
                    </Button>
                </Modal.Footer>
            </Modal>
            <NotificationContainer />
        </>
    );
};

export default ModalInscription;