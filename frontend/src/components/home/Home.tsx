import { useRef, useState } from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
import useStore from '../../store/store';
import CountrySelector from '../countrySelector/CountrySelector';
import DateSelector from '../dateSelector/DateSelector';
import InterestSelector from '../interests/InterestsSelector';
import BudgetSelector from '../budgetSelector/BudgetSelector';
import TravelTypeSelector from '../travelTypeSelector/TravelTypeSelector';
import "./style.css"
export default function Home() {
  const navigate = useNavigate()
   const { plan, setPlan, travelerTypes } = useStore()
  
  const run = ()=> {
    console.log(plan)
  }
  return (<div className="home">
          <h1>SmartTrip</h1>
          
         <CountrySelector /> 
          
          <DateSelector />
        
          <InterestSelector /> 
          
          <BudgetSelector />
          
          <TravelTypeSelector /> 


          <button onClick={() => {run()}}>Plan trip</button>
        </div>
    
  )
}
