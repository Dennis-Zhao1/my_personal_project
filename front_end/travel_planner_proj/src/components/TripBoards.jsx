import { useContext, useEffect} from "react"
import { api } from "./utilities/utilities"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/esm/Container";
import "./css/TripBoards.css"
import TravelContext from "../context/travelContext";
import { useNavigate } from "react-router-dom";

export default function TripBoards(){
    const {plans,setPlans,a_plan_detail,setAPlanDetail} = useContext(TravelContext);
    const navigate = useNavigate();

    async function fetchPlans(){
        const response = await api.get("plans/");
        console.log("response.data: ",response.data)
        setPlans(response.data.plans)  
    }

    useEffect( ()=>{
        fetchPlans();
        console.log("plans: ",plans)
    },[])

    useEffect( ()=>{        
        console.log("plans: ",plans)
    },[plans])


    return (
        (plans.length !== 0)? 
        ( <>
        <Container className="TripBoard-container">
            {plans.map( (plan,index)=>(
                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`../../public/img/img${index+1}.jpg`} style={{ width: '287px', height: '180px' }}/>
                    <Card.Body>
                        <Card.Title>{plan.name}</Card.Title>                        
                        <Button onClick={() => {
                            navigate("/TripBoardDeatil");
                            setAPlanDetail(plan);
                            }} variant="primary">Deatil</Button>
                    </Card.Body>
                </Card>
            )
            )}
            
        </Container>
        </> 
        ) : (
            <>
            <h1 style={{ fontSize: '24px', fontFamily: 'Arial, sans-serif',textAlign: 'center', marginBottom: '20px' }}>You have no plan yet, go explore</h1>
            <img src="https://thumbs.dreamstime.com/z/explore-world-wooden-sign-forest-background-51325243.jpg?w=1200" alt="" style={{ width: '300px', height: '300px', display: 'block', margin: '0 auto' }} />
            <button style={{ display: 'block', margin: '20px auto', padding: '10px 20px', fontSize: '16px' }} onClick={() =>navigate("/")}>Explore</button>
            </>
        )
    


    )
       
        
    
    
 

       
    
}