import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import ModalInscription from '../components/ModalInscription';
import Navigation from '../components/Navigation';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Identification = () => {

    const config = require('../config.json');
    const [mail, setmail] = useState('');
    const [mdp, setmdp] = useState('');

    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") !== null) {
            window.location.href = '/session';
        }

    }, []);

    function handleClick(e) {

        e.preventDefault();

        if (mail && mdp) {

            //Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mail: mail,
                    password: mdp
                })
            };
            fetch(config.api_url + 'users/login', requestOptions)
                .then(res => {

                    return res.json()

                }).then(json => {

                    if (json.error !== 'True') {

                        NotificationManager.warning(json.error, 'Connexion', 3000);

                    } else {

                        window.sessionStorage.setItem("token", json.token);
                        window.sessionStorage.setItem("iscon", true);
                        window.sessionStorage.setItem("idu", json.loged);
                        window.sessionStorage.setItem("nom", json.nom);
                        window.sessionStorage.setItem("prenom", json.prenom);
                        window.sessionStorage.setItem("mail", json.mail);
                        NotificationManager.success('Succès', 'Vous êtes connecté', 3000);
                        setTimeout(() => {
                            window.location.href = '/session';
                        }, 1000);

                    }

                }).catch(err => {
                    console.log(err)
                });

        }
        else {

            NotificationManager.warning('Champs incomplets', 'Attention', 3000);

        }



    }

    return (
        <div>
            <Navigation connected={false} />
            <Card className='m-4'>
                <Card.Body>
                    <Card.Title>Connexion</Card.Title>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={(e) => setmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" onChange={(e) => setmdp(e.target.value)} />
                    </Form.Group>
                    <Button variant="dark" onClick={handleClick}>
                        Se connecter
                    </Button>
                    <ModalInscription />
                </Card.Body>
            </Card>
            <NotificationContainer />
            {/* <Redirect to="/session" /> */}

        </div>
    );
};

export default Identification;