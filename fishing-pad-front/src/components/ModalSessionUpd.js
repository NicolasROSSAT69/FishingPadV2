import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, InputGroup, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';



const ModalSessionUpd = ({ session }) => {

    const config = require('../config.json');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState(session.lieu);
    const [description, setDescription] = useState(session.description);
    let selectedFile = null;



    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") === null && window.sessionStorage.getItem("token") === null) {

            window.location.href = '/';

        }

    }, []);

    function onUploadFile(e) {

        selectedFile = e.target.files[0]; // accessing file      
        let formData = new FormData();
        formData.append("file", selectedFile);  // appending file
        // sending file to the backend
        axios.post(config.api_url + "uploadFile", formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

    }

    async function updSession(e) {

        e.preventDefault();

        if (date && lieu && description) {

            if (selectedFile === null) {
                console.log(date);
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + window.sessionStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        id: session.idsession,
                        date: date,
                        description: description,
                        img: session.img,
                        lieu: lieu,
                        idu: window.sessionStorage.getItem("idu"),
                    })
                };
                await fetch(config.api_url + 'session/update', requestOptions)
                    .then(res => {
                        return res.json()
                    }).then(json => {

                        NotificationManager.success('Succès', 'Session modifiée', 3000);
                        setTimeout(() => {
                            window.location.href = '/session';
                        }, 1000);


                    })

            } else {

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + window.sessionStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        id: session.idsession,
                        date: date,
                        description: description,
                        img: selectedFile.name,
                        lieu: lieu,
                        idu: window.sessionStorage.getItem("idu"),
                    })
                };
                await fetch(config.api_url + 'session/update', requestOptions)
                    .then(res => {
                        return res.json()
                    }).then(json => {

                        NotificationManager.success('Succès', 'Session modifiée', 3000);
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
            <Button variant="success" className='mx-3' onClick={handleShow}>Modifier</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une session de peche</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Date</InputGroup.Text>
                        <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Lieu</InputGroup.Text>
                        <Form.Control type="text" defaultValue={session.lieu} onChange={(e) => setLieu(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="file" accept="image/*" onChange={(e) => onUploadFile(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Description</InputGroup.Text>
                        <FormControl as="textarea" aria-label="With textarea" defaultValue={session.description} onChange={(e) => setDescription(e.target.value)} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={updSession}>
                        Modifier
                    </Button>
                </Modal.Footer>
            </Modal>
            <NotificationContainer />
        </>
    );
};

export default ModalSessionUpd;