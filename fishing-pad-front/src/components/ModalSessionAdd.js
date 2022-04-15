import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';



const ModalSessionAdd = () => {

    const config = require('../config.json');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');
    const [description, setDescription] = useState('');
    let selectedFile = null;

    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") === null) {
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

    async function addSession(e) {

        e.preventDefault();

        if (date && lieu && description) {

            if (selectedFile === null) {

                selectedFile = "image_default.jpg";

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + window.sessionStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        date: date,
                        description: description,
                        img: selectedFile,
                        lieu: lieu,
                        idu: window.sessionStorage.getItem("idu")
                    })
                };
                await fetch(config.api_url + 'session/add', requestOptions)
                    .then(res => {
                        return res.json()
                    }).then(json => {

                        NotificationManager.success('Succès', 'Session ajouté', 3000);
                        setTimeout(() => {

                            handleClose();

                        }, 1000);
                        setTimeout(() => {

                            window.location.href = '/session';

                        }, 500);


                    })

            } else if (selectedFile !== null) {

                selectedFile = selectedFile.name;

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + window.sessionStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        date: date,
                        description: description,
                        img: selectedFile,
                        lieu: lieu,
                        idu: window.sessionStorage.getItem("idu")
                    })
                };
                await fetch(config.api_url + 'session/add', requestOptions)
                    .then(res => {
                        return res.json()
                    }).then(json => {

                        NotificationManager.success('Succès', 'Session ajouté', 3000);
                        setTimeout(() => {

                            handleClose();

                        }, 1000);
                        setTimeout(() => {

                            window.location.href = '/session';

                        }, 500);


                    })

            }

        } else {

            NotificationManager.warning('Champs incomplets', 'Attention', 3000);

        }

    }

    return (
        <>
            <Button variant="light" className='mt-3' onClick={handleShow}>Ajouter</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une session de peche</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Lieu</Form.Label>
                        <Form.Control type="text" onChange={(e) => setLieu(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="file" accept="image/*" onChange={(e) => onUploadFile(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <FormControl as="textarea" aria-label="With textarea" rows={5} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={addSession}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
            <NotificationContainer />
        </>
    );
};

export default ModalSessionAdd;