import { useState } from "react";
import useStore from '../../store/store';
import React from 'react';
import "./style.css"
import Select, {type MultiValue } from 'react-select';


export default function InterestSelector() {
  const {plan, setPlan, interests } = useStore()
  
  const handleChange = (newValue: MultiValue<{value: string, label: string}>)=> {
    setPlan({
      ...plan,
      interests: newValue?.map((interest) => interest.value) || []
    })
  }
  return (
    <div className="select">
      <Select
        id="interests-selector"
        instanceId="interests-selector"
        value={interests.filter(interest => plan.interests.includes(interest.value))}
        onChange={(value) => handleChange(value)}
        isMulti
        name="interests"
        options={interests}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
}