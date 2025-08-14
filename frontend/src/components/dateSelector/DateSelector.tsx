import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import useStore from '../../store/store';
import './style.css';

export default function DateSelector() {
  const { plan, setPlan } = useStore();
  
  const [startDate, setStartDate] = useState<Date | null>(
    plan.start_date ? new Date(plan.start_date) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    plan.end_date ? new Date(plan.end_date) : null
  );

  const updatePlan = (newStartDate: Date | null, newEndDate: Date | null) => {
    if (!newStartDate || !newEndDate) return;
    
    // calculating days
    const days = (newEndDate.getTime() - newStartDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

    setPlan({
      ...plan,
      days: days,
      start_date: newStartDate.toISOString().split('T')[0],
      end_date: newEndDate.toISOString().split('T')[0]
    });
  };

  const handleStartDateChange = (newValue: Date | null) => {
    setStartDate(newValue);
    updatePlan(newValue, endDate);
  };

  const handleEndDateChange = (newValue: Date | null) => {
    setEndDate(newValue);
    updatePlan(startDate, newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          className="date-picker"
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || undefined}
          className="date-picker"
        />
      
    </LocalizationProvider>
  );
}
