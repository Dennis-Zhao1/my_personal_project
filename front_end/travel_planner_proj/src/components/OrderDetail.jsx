import { useContext, useEffect, useState } from "react"
import axios from "axios"
import TravelContext from "../context/travelContext"
import countryList from "./data/countries"
import Accordion from 'react-bootstrap/Accordion';
import "./css/OrderDetail.css"
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import { api } from "./utilities/utilities";


export default function OrderDetail(){
    const {startDate,endDate,selectedCountry,selectcity,resultPlan,setResultPlan} = useContext(TravelContext);
    const [filterCountry, setFilterCountry] = useState(''); 
    const days = Math.floor((endDate - startDate + 1)/(24 * 60 * 60 * 1000)); 
    const [isLoading, setIsLoading] = useState(true);
    const [newPlanName, setNewPlanName] = useState("");

    // fetch the database to get myPlans
    const [myPlans,setMyPlans] = useState([])

    // drop down choosed plan called selectedPlan
    const [selectedPlan,setSelectedPlan] = useState(null)
    
    function find_country_short(){
        if(!selectedCountry){
            if(selectedCountry in countryList){
                console.log("selectedCountry: ", selectedCountry)
                setFilterCountry(countryList[selectedCountry])
                console.log("filterCountry",filterCountry);
            }
        }
    } 

    async function create_a_plan(){
        if (!newPlanName){
            alert("Please enter a plan name.");
            return;
        }
        const response = await api.post("plans/",{
            name: newPlanName
        })
        setNewPlanName("")
        fetchMyPlans();
    }
    
    async function addToMyTrips(){
        // add the resultPlan to database
        if (!selectedPlan){
            alert("Please choose a plan, if you don't have a plan, please create one")
        }
        else{
            let start_day = new Date(startDate);
            let end_day = new Date(endDate);
            const formattedStartDate = start_day.toISOString().split('T')[0];
            const formattedEndDate = end_day.toISOString().split('T')[0];
            console.log(formattedStartDate)
            console.log(formattedEndDate)

            try{
                const response = await api.post(`plans/${selectedPlan.name}/trips/`,{
                    name:selectcity,
                    start_day:formattedStartDate,
                    end_day:formattedStartDate,
                    plans:selectedPlan
                })
            }
            catch(e){
                console.log("add trip error",e)

            }

            resultPlan.map( (trip) => {
                        console.log("trip",trip);
                        let day = trip.day;
                        try{
                            const response = api.post(`plans/${selectedPlan.name}/trips/${selectcity}/day_detail/`,{
                                day:day,
                                trip:trip                                
                            })
                        }
                        catch(e){
                            console.log("add day_detail error",e);
                        }
                        
                        const time_details = trip.activities;                        
                        time_details.map( (time_detail) =>{
                            let time = time_detail.time;
                            let description = time_detail.description;
                            try{
                                const response = api.post(`plans/${selectedPlan.name}/trips/${selectcity}/day_detail/${day}/`,{
                                    day:day,
                                    time:time,
                                    description:description                                
                                })
                            }
                            catch(e){
                                console.log("add time_detail error",e);
                            }                           
                        })
                    })
        }
        alert(`Your trips "${selectcity}" for ${days} has been added to plan: "${selectedPlan}"`)
    }

    useEffect( ()=>{
        find_country_short();
        fetchTravelPlan();
        fetchMyPlans();
        console.log("startDate: ",startDate)
        
    },[]);

    useEffect( ()=>{        
        fetchMyPlans();
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
            console.log("response.data.plan",response.data.plan);
            // const plan_copy = [...resultPlan];
            // response.data.plan.map( (a_plan) => {
            //     plan_copy.push(a_plan);                
            // })
            setResultPlan(response.data.plan);
          } 
          catch (error) {
            console.error(error);
          }
          finally {
            setIsLoading(false);
          }
    }
    
    async function fetchMyPlans() {
        const response = await api.get("plans/");
        console.log("myPlans: ",response.data.plans);
        setMyPlans(response.data.plans);
        console.log("MyPlans useState: ",myPlans)
    }




    if (isLoading) {
        return (
            <>
                <h1>Loading...</h1>
                <img src="https://cdn-aiiam.nitrocdn.com/AOloCrzhPaUrolPeVejnVujyrtjXSGYs/assets/images/optimized/rev-b6fb113/devrix.com/wp-content/uploads/2018/03/progress-bar.gif" alt="" />
            </>
        );
    }

    if (!resultPlan){
        return (
            <>
            <h1>No trip found it!</h1>
            </>
        )
    }

    return (
        <>
        <div className="trip-info">
            <h2>Your trip to {selectcity} {selectedCountry} for {days} days: </h2>
        </div>

        <Container className="choose-plan-container">
        <label id="plan-label" className="choose-plan">Add this trip to : </label>
        <Dropdown >
            <Dropdown.Toggle className="choose-plan" variant="success" id="dropdown-basic">
            {selectedPlan ? selectedPlan.name : "Choose a plan"} 
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {myPlans.map( (plan,index) => (
                    <Dropdown.Item key={index} onClick={()=> {
                        setSelectedPlan(plan);
                        console.log("selectedPlan: ",selectedPlan)
                    }}>{plan.name}</Dropdown.Item>
                    )                
                )}
                <input
                    type="text"
                    placeholder="Enter new plan name"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)} // Update newPlanName state
                />
                <Dropdown.Item onClick={create_a_plan}> + Create a new plan</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <button className="choose-plan" onClick={addToMyTrips} >Add</button>
     
        </Container>
        {/* here put the drop down, plan1, plan2, plan3 */}
        <Accordion defaultActiveKey="0">
            {resultPlan.map((a_plan, outerIndex) => (
                <div className="accordion-item" key={outerIndex}>
                <Accordion.Item eventKey={`${outerIndex}item`}>
                    <Accordion.Header>Day {a_plan.day}</Accordion.Header>
                    <Accordion.Body>
                    {a_plan.activities.map((acitvate, innerIndex) => (
                        <p key={`${outerIndex}-${innerIndex}`}>
                        time: {acitvate.time}, activity: {acitvate.description}
                        </p>
                    ))}
                    </Accordion.Body>
                </Accordion.Item>
                </div>
            ))}
        </Accordion>
        </>
    )
}