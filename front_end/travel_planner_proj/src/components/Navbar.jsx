import { Link, useNavigate } from "react-router-dom";
import "./css/navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from "react";
import TravelContext from "../context/travelContext";
import { api } from "./utilities/utilities";

export default function Narbar(){
    const {user,setUser} = useContext(TravelContext)
    const navigate = useNavigate()

    const logOut = async () => {
      let response = await api.post("users/logout/");
      if (response.status === 204){
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null)
        navigate("/SignIn");
      }
    }
  
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
                    {/* <Link className="nav-Link" to="TripBoards">My Trips</Link> */}
                    
                    <NavDropdown title="More" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">About</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Help
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">contact us</NavDropdown.Item>                    
                    </NavDropdown>

                    {user ? (
                        <>                        
                        <Link className="nav-Link" onClick={logOut}>Log out</Link>
                        </>
                    ) : (
                        <>
                        <Link className="nav-Link" to="/SignUp">Register</Link>
                        <Link className="nav-Link" id="signin" to="/SignIn">Log In</Link>
                        </>
                    )}

                    
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>


        </div>
    )
}