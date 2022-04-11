import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, InputGroup, Form } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import nextId from "react-id-generator";

const ModalInscription = () => {

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
                fetch('http://localhost:3000/users/signup', requestOptions)
                    .then(response => response.json())
                    .then(NotificationManager.success('Inscription réussi, vous pouvez vous connecter', 'Inscription', 3000));

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
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Nom</InputGroup.Text>
                        <Form.Control type="text" onChange={(e) => setnom(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Prénom</InputGroup.Text>
                        <Form.Control type="text" onChange={(e) => setprenom(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Mail</InputGroup.Text>
                        <Form.Control type="email" onChange={(e) => setmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Mot de passe</InputGroup.Text>
                        <Form.Control type="password" onChange={(e) => setmdp(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Confirmation mot de passe</InputGroup.Text>
                        <Form.Control type="password" onChange={(e) => setmdpc(e.target.value)} />
                    </InputGroup>
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