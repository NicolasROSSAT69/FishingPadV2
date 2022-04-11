import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';

const About = () => {
    useEffect(() => {

        if (window.sessionStorage.getItem("iscon") === null && window.sessionStorage.getItem("token") === null) {
            window.location.href = '/';
        }

    }, []);
    return (
        <div>
            <Navigation connected={true} />
        </div>
    );
};

export default About;