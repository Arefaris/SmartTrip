import React from 'react'
import Select from 'react-select';
import useStore from '../../store/store';

const budgetOptions = [
  { value: "Economy", label: "Economy / Good for travelers who want to save money or backpack." },
  { value: "Standard", label: "Standard / 3-star hotels, casual restaurants, some paid attractions." },
  { value: "Luxury", label: "Luxury / Luxury hotels or resorts, fine dining, private tours." }
];

export default function BudgetSelector() {
  const { plan, setPlan } = useStore()

  const handleChange = (selectedOption: {value: string, label: string} | null) => {
    setPlan({
      ...plan,
      budget: selectedOption?.value || ''
    })
  }

  return (
    <div className="select">
      <Select
        value={budgetOptions.find(option => option.value === plan.budget)}
        onChange={handleChange}
        options={budgetOptions}
        placeholder="Select budget range..."
      />
    </div>
  )
}
