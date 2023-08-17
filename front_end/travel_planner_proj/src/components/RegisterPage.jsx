import "./css/RegisterPage.css"
import { Link } from "react-router-dom"
import { api } from "./utilities/utilities"
import { useNavigate } from "react-router-dom"
import { useContext,useState } from "react";
import TravelContext from "../context/travelContext";

export default function RegisterPage(){
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {setUser} = useContext(TravelContext);

    const signUp = async (e) => {
        e.preventDefault();
        let response = await api.post("users/signup/", {
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


    
    return (
        <div className="signup-container">
        <h1>Create an Account</h1>
        <form className="signup-form" onSubmit={signUp}>           
            <input type="email" placeholder="Email" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value) } required />            
            <button type="submit">Sign Up</button>
        </form>        
        <Link to="/SignIn">Log In</Link>
    </div>
    )

}