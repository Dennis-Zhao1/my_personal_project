import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from "react";
import TravelContext from "./context/travelContext";
import { api } from "./components/utilities/utilities";


function App() { 
  const [selectcity,setcity] = useState("");
  const [selectcountry,setCountry] = useState("")
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [resultPlan,setResultPlan] = useState([])
  const [user,setUser] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();
  const lastVisited = useRef();

  useEffect( () =>{
    whoAmI();
  },[]);

  useEffect(() => {
    if (!user) {      
      lastVisited.current = location.pathname;
    }
  }, [location]);

  const whoAmI = async () => {
    let token = localStorage.getItem("token");
    if(token){
      api.defaults.headers.common["Authorization"] = `token ${token}`;
      let response = await api.get("users/info");
      console.log(response.data)
      if(response.data.email){
        setUser(response.data);
        if(lastVisited.current){
          console.log("lastVisited.current: ",lastVisited.current)
          navigate(lastVisited.current);
        }
        else{
          navigate('/')
        }
      }
    }
    else{
      navigate("/SignIn");
    }
  }


  return (
    <>
    <TravelContext.Provider
      value={
        {
          selectcity,setcity,
          selectcountry,setCountry,
          startDate,setStartDate,
          endDate,setEndDate,
          resultPlan,setResultPlan,
          user,setUser,
        }
      }
    >
      <Navbar />      
      <Outlet />

    </TravelContext.Provider>
    </>
  )
};

export default App;
