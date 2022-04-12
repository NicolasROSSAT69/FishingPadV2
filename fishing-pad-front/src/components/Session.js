import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import ModalSessionAdd from './ModalSessionAdd';
import axios from 'axios';

const Session = () => {

    const [session, setsession] = useState([]);

    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") === null && window.sessionStorage.getItem("token") === null) {

            window.location.href = '/';

        } else {

            let token = window.sessionStorage.getItem("token");
            let idu = window.sessionStorage.getItem("idu");
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                }
            }
            axios.get('http://localhost:3000/session/' + idu, config).then((res) => setsession(res.data));
        }

    }, []);
    return (
        <div className='container'>
            <ModalSessionAdd />
            <div className='row row-cols-1 row-cols-md-4 g-4'>
                {session
                    .map((session, index) => (
                        <Cards key={index} session={session} />
                    ))}
            </div>
        </div>
    );
};

export default Session;