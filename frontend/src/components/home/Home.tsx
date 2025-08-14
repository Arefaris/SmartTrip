import { useRef, useState } from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
import useStore from '../../store/store';
import CountrySelector from '../countrySelector/CountrySelector';
import axios from 'axios';
import InterestSelector from '../interests/InterestsSelector';


export default function Home() {
  const navigate = useNavigate()
  
  const { setPlan, selectedInterests, travelerTypes } = useStore()

  //date ref for calendar
  const startDate = useRef<HTMLInputElement>(null)
  const endDate = useRef<HTMLInputElement>(null)
  const budget = useRef<HTMLSelectElement>(null)
  const travelerType = useRef<HTMLSelectElement>(null)

  

  const plan = ()=> {
    if(!startDate.current?.value || !endDate.current?.value) return
    // if(!location.current?.value) return
    if(!budget.current?.value) return
    if(!travelerType.current?.value) return

    //calculating days based on user selection
    const enDate = endDate.current?.value
    const stDate = startDate.current?.value
    const days = (new Date(enDate).getTime() - new Date(stDate).getTime()) / (1000 * 60 * 60 * 24) + 1;
    
    setPlan({
    location:" location.current?.value",
    days: days,
    start_date: stDate,
    end_date: enDate,
    interests: selectedInterests.map(interest => interest.value),
    budget: budget.current?.value,
    traveler_type: travelerType.current?.value,
    })
  }

  return (<>
          <h1>SmartTrip</h1>
          
          <CountrySelector />
              
          <br />
          <label>Start Date:</label>
          <input type="date" ref={startDate}/>
          <br />
          <label>End Date:</label>
          <input type="date" ref={endDate}></input>
          <br />

          <InterestSelector />
           <select ref={budget}>
            <option>Economy / Good for travelers who want to save money or backpack.</option>
            <option>Standard / 3-star hotels, casual restaurants, some paid attractions. </option>
            <option>Luxury / Luxury hotels or resorts, fine dining, private tours.</option>
           </select><br/>

           <select ref={travelerType}>
            {travelerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
           </select>


          <button onClick={() => {plan()}}>Plan trip</button>
        </>
    
  )
}
