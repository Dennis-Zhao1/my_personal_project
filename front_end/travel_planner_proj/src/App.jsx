import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import TravelContext from "./context/travelContext";

function App() {
  const [selectcity,setcity] = useState("");
  const [selectcountry,setCountry] = useState("")
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [resultPlan,setResultPlan] = useState([])

 

  return (
    <>
    <TravelContext.Provider
      value={
        {
          selectcity,
          setcity,
          selectcountry,
          setCountry,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          resultPlan,
          setResultPlan,
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
