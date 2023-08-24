import { useContext } from "react"
import TravelContext from "../context/travelContext"
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';

export default function TripBoardDetail(){
    const {a_plan_detail} = useContext(TravelContext)
    console.log("a_plan_detail: ",a_plan_detail)

    a_plan_detail.trips.map( (trip) => {
        console.log("trip: ",trip)
    }

    )

    return (
        <>
        <h1>this is details</h1>
        <Accordion defaultActiveKey="0">
            {a_plan_detail.trips.map((a_trip, outerIndex) => (
                
                <div className="accordion-item" key={outerIndex}>
                <Accordion.Item eventKey={`${outerIndex}item`}>
                    <Accordion.Header>a_trip {a_trip.name} start day: {a_trip.start_day} end day: {a_trip.end_day}</Accordion.Header>
                    <Accordion.Body>
                    {a_trip.day_detail.map((day, innerIndex) => (
                        <p key={`${outerIndex}-${innerIndex}`}>
                        day: {day.day} 
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