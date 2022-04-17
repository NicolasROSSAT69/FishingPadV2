import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import ModalSessionAdd from './ModalSessionAdd';
import axios from 'axios';
const config = require('../config.json');

const Session = () => {

    const [session, setsession] = useState([]);
    const [selectedRadio, setSelectedValue] = useState('');
    //const radio = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const [radio, setradio] = useState([]);

    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") === null && window.sessionStorage.getItem("token") === null) {

            window.location.href = '/';

        } else {

            let token = window.sessionStorage.getItem("token");
            let idu = window.sessionStorage.getItem("idu");
            let configu = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                }
            }
            axios.get(config.api_url + 'session/' + idu, configu).then((res) => {

                setsession(res.data);

                const arraytemp = res.data.map(lieu => lieu.lieu.toUpperCase());
                const arrayfin = arraytemp.filter((val, id, array) => array.indexOf(val) === id);
                setradio(arrayfin);

            });

        }

    }, []);
    return (
        <div className='container'>
            <ModalSessionAdd />
            {radio && (
                <div className='filtre'>
                    <ul className="radio-container">
                        {radio.map((lieu) => (
                            <li>
                                <input type="radio" id={lieu} name="lieuRadio" checked={lieu === selectedRadio} onChange={(e) => setSelectedValue(e.target.id)} />
                                <label htmlFor={lieu}>{lieu}</label>
                            </li>
                        ))}
                    </ul>
                    {selectedRadio && (
                        <button onClick={() => setSelectedValue("")}>Annuler le filtre</button>
                    )}
                </div>
            )}

            <div className='row row-cols-1 row-cols-md-4 g-4'>
                {session
                    .filter((session) => session.lieu.toUpperCase().includes(selectedRadio))
                    .map((session, index) => (
                        <Cards key={index} session={session} />
                    ))}
            </div>
        </div>
    );
};

export default Session;