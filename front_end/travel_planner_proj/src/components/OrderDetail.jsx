import { useContext, useEffect, useState } from "react"
import axios from "axios"
import TravelContext from "../context/travelContext"
import countryList from "./data/countries"
import Accordion from 'react-bootstrap/Accordion';
import "./css/OrderDetail.css"

export default function OrderDetail(){
    const {startDate,endDate,selectedCountry,selectcity,resultPlan,setResultPlan} = useContext(TravelContext);
    const [filterCountry, setFilterCountry] = useState(''); 
    const days = Math.floor((endDate - startDate + 1)/(24 * 60 * 60 * 1000)); 
    const [isLoading, setIsLoading] = useState(true);
    
    function find_country_short(){
        if(!selectedCountry){
            if(selectedCountry in countryList){
                console.log("seleectedCountry: ", selectedCountry)
                setFilterCountry(countryList[selectedCountry])
                console.log(filterCountry);
            }
        }
    }  

    useEffect( ()=>{
        find_country_short();
        fetchTravelPlan();
    },[]);

    async function fetchTravelPlan() {
         
        const options = {
            method: 'GET',
            url: 'https://ai-trip-planner.p.rapidapi.com/',
            params: {
              days: days,
              destination: `${selectcity},${filterCountry}`
            },
            headers: {
              'X-RapidAPI-Key': 'ca5659c49cmsh5def56fdbeb1190p1e9012jsn5f2b35d7f484',
              'X-RapidAPI-Host': 'ai-trip-planner.p.rapidapi.com'
            }
          };
          
          try {
            const response = await axios.request(options);
            console.log(response.data);
            const plan_copy = [...resultPlan];
            response.data.plan.map( (a_plan) => {
                plan_copy.push(a_plan);                
            })
            setResultPlan(plan_copy);
          } 
          catch (error) {
            console.error(error);
          }
          finally {
            setIsLoading(false);
          }
    }

    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    if (!resultPlan){
        return (
            <>
            <h1>No plan found it!</h1>
            </>
        )
    }

    return (
        <>
        <div className="trip-info">
            <h2>Your trip to {selectcity} {selectedCountry} for {days} days: </h2>
        </div>

        <Accordion defaultActiveKey="0">
            { resultPlan.map( (a_plan,index) => (
                <>
                <div className="accordion-item" key={index}>
                    <Accordion.Item eventKey={index}>
                        <Accordion.Header>Day {a_plan.day}</Accordion.Header>
                        <Accordion.Body key={`${index}body`}>
                            {a_plan.activities.map( (acitvate,id) => (
                                <>
                                <p key={id}>
                                    time: {acitvate.time}, activity: {acitvate.description}
                                </p>
                                </>)
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                </div>
                </>)
            )}
        </Accordion>
        </>
    )
}