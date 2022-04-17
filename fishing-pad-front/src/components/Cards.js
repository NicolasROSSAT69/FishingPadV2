import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ModalSessionDel from './ModalSessionDel';
import ModalSessionUpd from './ModalSessionUpd';

const Cards = ({ session }) => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const config = require('../config.json');

    return (
        <div className='pt-3 mb-3'>
            <Card>
                <Card.Img variant="top" src={config.api_url + "getFile/" + session.img} />
                <Card.Body>
                    <Card.Title>{new Date(session.date).toLocaleDateString('fr-FR', options)}</Card.Title>
                    <Card.Text>À {session.lieu}</Card.Text>
                    <Card.Text>
                        {session.description}
                    </Card.Text>

                    <ModalSessionDel id={session.idsession} img={session.img} />
                    <ModalSessionUpd session={session} />
                </Card.Body>
            </Card>
        </div>

    );
};

export default Cards;