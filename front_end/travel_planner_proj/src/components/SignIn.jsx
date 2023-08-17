import "./css/SignIn.css"
import { Link } from "react-router-dom"
import { api } from "./utilities/utilities"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import TravelContext from "../context/travelContext";
import axios from "axios";

export default function SignIn() {
    const navigate = useNavigate();

    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const {setUser} = useContext(TravelContext) 
    

    const logIn =  async (e) => {            
        e.preventDefault();
        try{
            let response = await api.post("users/login/", {
            email: userName,
            password: password
        })
        console.log(response);
        let token = response.data.token;
        let user = response.data.user;

        localStorage.setItem("token",token);
        api.defaults.headers.common["Authorization"] = `token ${token}`;
        setUser(user);
        navigate("/");

        }
        catch(e){
            console.log(e)
            alert("No such user or the password is wrong, please try again");
            setUserName("");
            setPassword("");
        }       
    }     
    

    return (
        <>
        <div className="signin-container">
            <h1>Welcome Back!</h1>
            <form className="login-form" onSubmit={logIn}>
                <input type="email" placeholder="Email" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Log In</button>
            </form>
            <Link to="/SignUp">Sign Up</Link>
        </div>
        </>  
      
    )
}