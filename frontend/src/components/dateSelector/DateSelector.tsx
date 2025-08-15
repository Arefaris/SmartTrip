import React, { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import useStore from '../../store/store';

import type { DatesRangeValue } from '@mantine/dates';

export default function DateSelector() {
  const { plan, setPlan } = useStore();

  const [value, setValue] = useState<DatesRangeValue>([null, null]);

  const updatePlan = (dateRange: DatesRangeValue) => {
    
    setValue(dateRange);
    const [startDate, endDate] = dateRange;
    
    if (!startDate || !endDate) return;
    
    //Convert string dates to Date objects for calculations
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    //calculating days
    const days = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    setPlan({
      ...plan,
      days: days,
      start_date: startDate as string,
      end_date: endDate as string
    });
  };


  return (
    <DatePickerInput
      type="range"
      label="When are you traveling?"
      placeholder="Select your departure and return dates"
      value={value}
      onChange={updatePlan}
    />
  );

}