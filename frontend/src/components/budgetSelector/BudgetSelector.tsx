import { Select } from '@mantine/core';
import useStore from '../../store/store';
import './style.css';
import { useEffect, useRef } from 'react';


const budgetOptions = [
 "Economy / Good for travelers who want to save money or backpack." ,
 "Standard / 3-star hotels, casual restaurants, some paid attractions.",
 "Luxury / Luxury hotels or resorts, fine dining, private tours." 
];

export default function BudgetSelector() {
  const { plan, setPlan } = useStore()
  const testRef = useRef(null)

  useEffect(()=>{
    console.log(testRef)
  }, [])
  const handleChange = (value: string) => {
    setPlan({
      ...plan,
      budget: value
    })
  }

  return (
    <Select
      ref={testRef}
      value={plan.budget}
      label="Budget"
      placeholder="Select your budget for a trip"
      data={budgetOptions}
      onOptionSubmit={handleChange}
      className="budget-selector"
    />
  )
}
