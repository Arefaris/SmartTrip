import React from 'react'
import { Select } from '@mantine/core';
import useStore from '../../store/store';

const budgetOptions = [
  "Economy / Good for travelers who want to save money or backpack." ,
 "Standard / 3-star hotels, casual restaurants, some paid attractions.",
 "Luxury / Luxury hotels or resorts, fine dining, private tours." 
];

export default function BudgetSelector() {
  const { plan, setPlan } = useStore()

  const handleChange = (value: string) => {
    setPlan({
      ...plan,
      budget: value
    })
  }

  return (
    <Select
      label="Budget"
      placeholder="Select your budget for a trip"
      data={budgetOptions}
      onOptionSubmit={handleChange}
    />
  )
}
