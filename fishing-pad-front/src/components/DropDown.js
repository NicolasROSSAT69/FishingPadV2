import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
const config = require('../config.json');

const DropDown = () => {

    function LogoutUser(e) {

        e.preventDefault();
        window.sessionStorage.clear();
        window.location.href = '/';

    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    {window.sessionStorage.getItem("prenom") + ' ' + window.sessionStorage.getItem("nom")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Profil</Dropdown.Item>
                    <Dropdown.Item onClick={LogoutUser}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default DropDown;