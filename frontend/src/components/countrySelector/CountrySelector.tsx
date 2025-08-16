import { useRef, useState, useCallback } from 'react'
import axios from 'axios';
import type { city_country } from '../../types';
import useStore from '../../store/store';
import { Autocomplete } from '@mantine/core';
import './style.css';


const url = import.meta.env.VITE_BASE_URL

export default function CountrySelector() {
  const { plan, setPlan } = useStore()
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(plan.location);
 

  //fetching for auto-complete
  const fetchCityCountry = useCallback(async (query: string) => {
    if (query.length < 3) {
      setOptions([]);
      return;
    }

    try {
      const result = await axios.post(`${url}/api/county-list`, { query })

      if (result.status === 200) {
        //Transform API data into "City, Country" format strings
        const cityOptions = result.data.result.map((country: city_country) => `${country.name}, ${country.country_name}`) as string[]
        
        //Extract unique countries from the results
        const countries = result.data.result.map((country: city_country) => country.country_name) as string[]
        const uniqueCountries = [...new Set(countries)]
        
        //Combine city options with country-only options
        const allOptions = [...uniqueCountries, ...cityOptions]
        
        //Remove duplicates using Set
        const uniqueOptions = [...new Set(allOptions)]
        setOptions(uniqueOptions)
      }

    } catch (error) {
      console.log(error)
    }
  }, [])

  //setting location
  const handleChange = useCallback((value: string) => {
    setInputValue(value);
    fetchCityCountry(value);
  }, [fetchCityCountry])

  const handleOptionSubmit = useCallback((value: string) => {
    if (value) {
      setPlan({
        ...plan,
        location: value
      })
      setInputValue(value);
    }
  }, [plan, setPlan])

  return (
    <Autocomplete
      label="Where to?"
      placeholder="Enter country or city"
      data={options}
      value={inputValue}
      selectFirstOptionOnChange
      onChange={handleChange}
      onOptionSubmit={handleOptionSubmit}
      className="country-selector"
    />
  )
}
