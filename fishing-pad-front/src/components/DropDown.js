import React from 'react';
import { Dropdown } from 'react-bootstrap';

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
                    <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={LogoutUser}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default DropDown;