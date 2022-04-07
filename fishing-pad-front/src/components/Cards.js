import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ModalSessionDel from './ModalSessionDel';
import ModalSessionUpd from './ModalSessionUpd';

const Cards = ({ session }) => {
    return (

        <div className='pt-3 mb-3'>
            <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Date de la session</Card.Title>
                    <Card.Text>Lieu de la session</Card.Text>
                    <Card.Text>
                        Description de la session Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>

                    <ModalSessionDel session={session} />
                    <ModalSessionUpd session={session} />
                </Card.Body>
            </Card>
        </div>

    );
};

export default Cards;