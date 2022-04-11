import React from 'react';
import Navigation from '../components/Navigation';
import Session from '../components/Session';

const Home = () => {
    return (
        <div>
            <Navigation connected={true} />
            <Session />
        </div>
    );
};

export default Home;