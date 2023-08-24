import { useContext } from "react"
import TravelContext from "../context/travelContext"
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from "react-router-dom";

export default function TripBoardDetail(){
    const {a_plan_detail} = useContext(TravelContext)
    console.log("a_plan_detail: ",a_plan_detail)
    const navigate = useNavigate()

    a_plan_detail.trips.map( (trip) => {
        console.log("trip: ",trip)
    }

    )

    return (
        <div className="plan-details">
        <h1 className="plan-title">"{a_plan_detail.name}" plan details:</h1>
        {a_plan_detail.trips.length !== 0?
        (<Accordion className="custom-accordion" defaultActiveKey="0">
            {a_plan_detail.trips.map((a_trip, outerIndex) => (
                
                <div className="accordion-item" key={outerIndex}>
                <Accordion.Item eventKey={`${outerIndex}item`}>
                    <Accordion.Header className="accordion-header">{a_trip.name} {a_trip.start_day} to {a_trip.end_day}</Accordion.Header>
                    <Accordion.Body>
                    {a_trip.day_detail.map((day, innerIndex) => (
                        <div className="day-details" key={`${outerIndex}-${innerIndex}`}> 
                            <p className="day-number">day: {day.day} </p>
                            {day.times.map( (time,timeIndex) => (
                                <div  className="time-details" key={timeIndex}>
                                    <p className="time">{time.time.slice(0, 5)} :</p>
                                    <p className="activity">{time.description}</p>
                                </div>                        
                            ))}
                        </div>    
                    ))}
                    </Accordion.Body>
                </Accordion.Item>
                </div>
            ))}
        </Accordion>)
        : (
            <>
            <h1 style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif',textAlign: 'center', marginBottom: '20px' }}>You have no plan yet, go explore</h1>
            <img src="https://thumbs.dreamstime.com/z/explore-world-wooden-sign-forest-background-51325243.jpg?w=1200" alt="" style={{ width: '300px', height: '300px', display: 'block', margin: '0 auto' }} />
            <button style={{ display: 'block', margin: '20px auto', padding: '10px 20px', fontSize: '16px' }} onClick={() =>navigate("/")}>Explore</button>
            </>
        )}
        </div>
    
    )
    
}