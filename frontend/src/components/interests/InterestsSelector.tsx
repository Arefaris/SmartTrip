import { useState } from "react";
import useStore from '../../store/store';
import React from 'react';
import "./style.css"
import Select from 'react-select';


export default function InterestSelector() {
  const { interests, selectedInterests, setSelectedInterests } = useStore()
  
  return (
    <div className="select">
      <Select
        value={selectedInterests}
        onChange={(newValue) => setSelectedInterests([...newValue || []])}
        isMulti
        name="interests"
        options={interests}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
}