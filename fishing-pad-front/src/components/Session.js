import React from 'react';
import Cards from './Cards';
import ModalSessionAdd from './ModalSessionAdd';

const Session = () => {
    return (
        <div className='container'>
            <ModalSessionAdd />
            <div className='row row-cols-1 row-cols-md-4 g-4'>
                <Cards session="infos de la session" />
                <Cards session="infos de la session" />
                <Cards session="infos de la session" />
                <Cards session="infos de la session" />
                <Cards session="infos de la session" />
                <Cards session="infos de la session" />
                <Cards session="infos de la session" />
            </div>
        </div>
    );
};

export default Session;