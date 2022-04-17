import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Dropdown } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
const config = require('../config.json');

const ModalProfile = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nom, setnom] = useState(window.sessionStorage.getItem("nom"));
    const [prenom, setprenom] = useState(window.sessionStorage.getItem("prenom"));
    const [mail, setmail] = useState(window.sessionStorage.getItem("mail"));
    const [mdp, setmdp] = useState('');
    const [mdpc, setmdpc] = useState('');

    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") === null && window.sessionStorage.getItem("token") === null) {

            window.location.href = '/';

        }

    }, []);

    async function updProfile(e) {

        e.preventDefault();

        if (nom && prenom && mail) {

            if (mdp && mdpc) {

                if (mdp !== mdpc) {

                    NotificationManager.warning('Mot de passe différent', 'Attention', 3000);

                } else {

                    //get upd with mdp
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + window.sessionStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            nom: nom,
                            prenom: prenom,
                            mail: mail,
                            mdp: mdp,
                            idu: window.sessionStorage.getItem("idu"),
                        })
                    };
                    await fetch(config.api_url + 'users/update/withmdp', requestOptions)
                        .then(res => {
                            return res.json()
                        }).then(json => {

                            NotificationManager.success('Succès', 'Profile modifié', 3000);
                            setTimeout(() => {
                                window.location.href = '/session';
                            }, 1000);


                        })

                }

            } else {

                //get upd without mdp
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + window.sessionStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        nom: nom,
                        prenom: prenom,
                        mail: mail,
                        idu: window.sessionStorage.getItem("idu"),
                    })
                };
                await fetch(config.api_url + 'users/update', requestOptions)
                    .then(res => {
                        return res.json()
                    }).then(json => {

                        NotificationManager.success('Succès', 'Profile modifié', 3000);

                        window.sessionStorage.setItem("nom", nom);
                        window.sessionStorage.setItem("prenom", prenom);
                        window.sessionStorage.setItem("mail", mail);

                        setTimeout(() => {
                            window.location.href = '/session';
                        }, 1000);


                    })

            }


        } else {

            NotificationManager.warning('Champs incomplets', 'Attention', 3000);

        }

    }

    return (
        <>
            <Dropdown.Item onClick={handleShow}>Profile</Dropdown.Item>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control type="text" defaultValue={window.sessionStorage.getItem("nom")} onChange={(e) => setnom(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control type="text" defaultValue={window.sessionStorage.getItem("prenom")} onChange={(e) => setprenom(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" defaultValue={window.sessionStorage.getItem("mail")} onChange={(e) => setmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nouveau mot de passe</Form.Label>
                        <Form.Control type="password" onChange={(e) => setmdp(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirmation nouveau mot de passe</Form.Label>
                        <Form.Control type="password" onChange={(e) => setmdpc(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={updProfile}>
                        Modifier
                    </Button>
                </Modal.Footer>
            </Modal>
            <NotificationContainer />
        </>
    );
};

export default ModalProfile;