import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const PlaydatesNav = () => {
    return(
        <>
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <img src='/images/logo.jpg' alt="logo" className="logo"/>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/dogsitters">Dog Sitters</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
        <br />
        </>
    );
}

export default PlaydatesNav;
