import { useState, useContext,useEffect } from "react"
import TravelContext from "../context/travelContext"
import axios from "axios"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./css/ChooseDate.css"
import { useNavigate } from 'react-router-dom';
const {RangePicker} = DatePicker;

export default function ChooseDate(){
  const {startDate, setStartDate, endDate, setEndDate} = useContext(TravelContext);
  const navigate = useNavigate();

  useEffect( () => {
    if(endDate < startDate){
      setEndDate("") 
    }          
    console.log("startDate: " ,startDate)
    console.log("endDate: " ,endDate)
    console.log((endDate - startDate)/(24 * 60 * 60 * 1000))
  }
  ,[startDate,endDate])


  const handleButtonClick=() => {
    if(!startDate || !endDate){
      alert("Please choose start date and end date")
    }
    else{
      navigate("/OrderDetail")

    }
  }



  return (
    <div className="pageContainer">
    <div className="startDate">
        <label>Choose start date: <strong>{startDate? startDate.toLocaleDateString() : ''}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Choose end date: <strong>{endDate? endDate.toLocaleDateString() : ''}</strong></label>  
    </div>

      <div className="big-container">   
      <DatePicker className="custom-calendar"
        selected={startDate}
        onChange={(date) =>{
          setStartDate(date);
          if(endDate < startDate){
            setEndDate("") 
          }          
        } }
        minDate={new Date()}
        inline= {true}
        dateFormat="yyyy/MM/dd"


      />
      <div className="datepicker-spacing">  </div>

      <DatePicker className="custom-calendar"
        selected={endDate}
        onChange={date => setEndDate(date)}
        minDate={startDate}
        inline= {true}
        dateFormat="yyyy/MM/dd"

      />
         
    </div>

    <div className="buttonContainer">

      <button className="button" onClick={handleButtonClick} >Submit</button>
    </div>  
    </div>

      
  )
}