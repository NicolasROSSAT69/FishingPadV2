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

            // axios.post('http://localhost:3000/session', {
            //     'headers': {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Token ' + window.sessionStorage.getItem("token")
            //     },
            //     'body': {
            //         'idu': window.sessionStorage.getItem("idu")
            //     }

            // }).then((res) => setsession(res));

            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Token ' + window.sessionStorage.getItem("token") + ' '
            //     },
            //     body: JSON.stringify({
            //         iduser: window.sessionStorage.getItem("idu")
            //     })
            // };



            // fetch('http://localhost:3000/session', requestOptions).then(json => { setsession(json.json()) });



            // const fetchData = async () => {
            //     const requestOptions = {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': 'Token ' + window.sessionStorage.getItem("token") + ' '
            //         },
            //         body: JSON.stringify({
            //             iduser: window.sessionStorage.getItem("idu")
            //         })
            //     };

            //     const data = await fetch('http://localhost:3000/session', requestOptions);
            //     // convert data to json
            //     const json = await data.json();
            //     return json;
            // }

            // const result = fetchData()
            //     // make sure to catch any error
            //     .catch(console.error);;

            // console.log(result);
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

        console.log(session);

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