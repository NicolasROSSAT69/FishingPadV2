import React from 'react';
import { Nav, Container, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
    return (
        <div className='navigation'>
            <Navbar bg="black" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand href="/"><img
                        alt=""
                        src="./logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}FishingPad</Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "nav-link-nav")}>Home</NavLink>
                        <NavLink to="/about" className={(nav) => (nav.isActive ? "nav-active" : "nav-link-nav")}>à propos</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;