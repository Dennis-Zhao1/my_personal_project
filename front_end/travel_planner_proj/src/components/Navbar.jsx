import { Link } from "react-router-dom";
import "./css/navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Narbar(){
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link to="/"><Navbar.Brand >Travel Planner</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-Link" to="/">Home</Link> 
                    <Link className="nav-Link" to="TripBoards">Trip Boards</Link> 
                    <Link className="nav-Link" to="TripBoards">My Trips</Link> 
                    


                    
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">About</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Help
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">contact us</NavDropdown.Item>                    
                    </NavDropdown>

                    <Link className="nav-Link" id="signin" to="SignIn">Sign In</Link> 
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>


        </div>
    )
}