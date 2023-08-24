import "./css/HomePage.css"
import { useContext, useState } from "react"
import TravelContext from "../context/travelContext"
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage(){    
    const [cityOptions, setCityOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const {selectcity,setcity,setCountry,setStartDate,setEndDate,setResultPlan} = useContext(TravelContext);
    const [showWarning,setShowWarning] = useState(false);

    const navigate = useNavigate();

    useEffect( () => {
        if (inputValue.length >= 4) {
            fetchData(inputValue);
        }
        else{ // if the input letters are less than 4, do not use the API, just for save money, and set cityOptions to empty array
            setCityOptions([]);
        }
    },[inputValue]);

    const fetchData = async (query) =>{
        try {
            const response = await axios.get(`https://andruxnet-world-cities-v1.p.rapidapi.com/`, {
                headers : {
                    'X-RapidAPI-Key': 'ca5659c49cmsh5def56fdbeb1190p1e9012jsn5f2b35d7f484',
                    'X-RapidAPI-Host': 'andruxnet-world-cities-v1.p.rapidapi.com'
                },
                params: {
                    query: query,
                    searchby: 'city'
                  },
            })
            console.log("response data: ", response.data);

            // filter the cities start with the city name, for example, search paris, just show paris*, not the new paris or others
            const filteredCities = response.data.filter(cityData => cityData.city.toLowerCase().startsWith(query.toLowerCase())
            );
            console.log("filteredCities: ", filteredCities);

            // set cityOptions to the filteredCities 
            setCityOptions(filteredCities);
            console.log("setCityOptions: ",setCityOptions)
        }
        catch(error){
            console.error('Error fetching data:', error)
        }
    }
    
   
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setcity(null);
        setCountry("");
        setStartDate(null);
        setEndDate(null);
        setResultPlan([]);
    }
    
    const handleOptionClick = (city) => {
        setcity(city.city);
        setCountry(city.country)
        setInputValue(city.city + ", " + city.country);
        setCityOptions([])
    }

    const handleButtonClick = (e) => {
        if(!selectcity){
            setShowWarning(true);
        }
        else{
            setShowWarning(false);
            navigate('/ChooseDate')
        }

    }

    
    return (
        <div className="home-container">
            <div className="background-image"></div>
            
            <div className="where">
                <h1 >Where to?</h1> <br />            
            </div>

            <div className="warnning" id = "warnningContainer">
                {showWarning && (
                    <p id="warningText">Please select a location</p>
                )}

            </div>

            <div className="town">
                <p className="p">City/Town</p>
            </div>

            <div className="inputContainer">
                <input className="input" type="text" value={inputValue} onChange={handleInputChange} placeholder="Places to go" />
            </div>
                
            {cityOptions.length > 0 && (
                <ul className="dropdown">
                    {cityOptions.map( (a_city, index) => (
                        <li key={index} onClick={() => handleOptionClick(a_city)}>
                            {a_city.city}, {a_city.state}, {a_city.country} 
                        </li> )
                    )}
                </ul>
            )}

            <div className="buttonContainer">

                <button className="button" onClick={handleButtonClick}>Next</button>
            </div>           

        </div>        
    )
}