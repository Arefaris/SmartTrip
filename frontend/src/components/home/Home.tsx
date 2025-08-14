import { useRef, useState } from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
import useStore from '../../store/store';
import CountrySelector from '../countrySelector/CountrySelector';
import DateSelector from '../dateSelector/DateSelector';
import InterestSelector from '../interests/InterestsSelector';
import BudgetSelector from '../budgetSelector/BudgetSelector';

export default function Home() {
  const navigate = useNavigate()
  
  const { plan, setPlan, travelerTypes } = useStore()

  
  const travelerType = useRef<HTMLSelectElement>(null)

  

  const run = ()=> {
    // 
    // 
    // if(!budget.current?.value) return
    // if(!travelerType.current?.value) return
    console.log(plan)
    //calculating days based on user selection
    
  }
  //   setPlan({
  //   location:" location.current?.value",

  //   interests: selectedInterests.map(interest => interest.value),
  //   budget: budget.current?.value,
  //   traveler_type: travelerType.current?.value,
  //   })
  // }

  return (<>
          <h1>SmartTrip</h1>
          
          <CountrySelector />
          
          <DateSelector />
        
          <InterestSelector />
          
          <BudgetSelector />
          
           <select ref={travelerType}>
            {travelerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
           </select>


          <button onClick={() => {run()}}>Plan trip</button>
        </>
    
  )
}
