import React from 'react'
import Select from 'react-select';
import useStore from '../../store/store';

export default function TravelTypeSelector() {
  const { plan, setPlan, travelerTypes } = useStore()

  const travelerTypeOptions = travelerTypes.map(type => ({
    value: type,
    label: type
  }))

  const handleChange = (selectedOption: {value: string, label: string} | null) => {
    setPlan({
      ...plan,
      traveler_type: selectedOption?.value || ''
    })
  }

  return (
    <div className="select">
    <Select
      id="traveler-type-selector"
      instanceId="traveler-type-selector"
      value={travelerTypeOptions.find(option => option.value === plan.traveler_type)}
      onChange={handleChange}
      options={travelerTypeOptions}
      placeholder="Select traveler type..."
      className="basic-single"
      classNamePrefix="select"
    />
    </div>
  )
}
