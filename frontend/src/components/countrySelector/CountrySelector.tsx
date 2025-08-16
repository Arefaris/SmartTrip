import { useRef, useState } from 'react'
import axios from 'axios';
import type { city_country } from '../../types';
import useStore from '../../store/store';
import { Autocomplete } from '@mantine/core';
import './style.css';


const url = import.meta.env.VITE_BASE_URL

export default function CountrySelector() {
  const [options, setOptions] = useState<string[]>([]);
  const { plan, setPlan } = useStore()

  //fetching for auto-complete
  const fetchCityCountry = async (query: string) => {
    if (query.length < 3) {
      console.log(query)
      setOptions([]);
      return;
    }

    try {
      const result = await axios.post(`${url}/api/county-list`, { query })

      if (result.status === 200) {
        //Transform API data into "City, Country" format strings
        const cityOptions = result.data.result.map((country: city_country) => `${country.name}, ${country.country_name}`) as string[]
        
        //Remove duplicates using Set:
        //1. new Set(cityOptions) creates a Set which only stores unique values
        //2. [...new Set(cityOptions)] spreads the Set back into an array
        //This eliminates duplicate entries like "Odessa, United States" appearing twice
        const uniqueOptions = [...new Set(cityOptions)]
        setOptions(uniqueOptions)

        setPlan({
        ...plan,
        location: query
      })
      
      }

    } catch (error) {
      console.log(error)
    }
  }

  //setting location
  const handleChange = (value: string) => {

    if (value) {
      setPlan({
        ...plan,
        location: value
      })
    }
  }

  return (
    <Autocomplete
      label="Where to?"
      placeholder="Enter country or city"
      data={options}
      selectFirstOptionOnChange
      onChange={fetchCityCountry}
      onOptionSubmit={handleChange}
      className="country-selector"
    />
  )
}
