import { useState, useCallback } from 'react'
import axios from 'axios';
import type { city_country } from '../../types';
import useStore from '../../store/store';
import { Autocomplete } from '@mantine/core';
import './style.css';
import { Loader } from '@mantine/core';

const url = import.meta.env.VITE_BASE_URL

export default function CountrySelector() {
  const { plan, setPlan } = useStore()
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState(plan.location);
  const [fetching, setFetching] = useState(false)

  //fetching for auto-complete
  const fetchCityCountry = useCallback(async (query: string) => {
    if (query.length < 3) {
      setOptions([]);
      setFetching(false)
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
        setFetching(false)
      }

    } catch (error) {
      setFetching(false)
      console.log(error)
    }
  }, [])

  //setting location
  const handleChange = useCallback((value: string) => {
    setFetching(true)
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

  return (<div className="complete-loader-cont">
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
    {fetching && <Loader className='inpt-loader' size="sm" color="white" />}
  </div>
   
  )
}
