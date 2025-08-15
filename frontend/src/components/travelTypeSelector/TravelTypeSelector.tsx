import React from 'react'
import { Select } from '@mantine/core';
import useStore from '../../store/store';
import './style.css';

export default function TravelTypeSelector() {
  const { plan, setPlan, travelerTypes } = useStore()

  const handleChange = (value: string | null) => {
    setPlan({
      ...plan,
      traveler_type: value || ''
    })
  }

  return (
    <Select
      label="Who are you traveling with?"
      placeholder="Choose your travel style"
      data={travelerTypes}
      value={plan.traveler_type}
      onChange={handleChange}
      clearable
      className="travel-type-selector"
    />
  )
}
