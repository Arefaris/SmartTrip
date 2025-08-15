import { useRef, useState } from 'react'
import axios from 'axios';
import type { city_country } from '../../types';
import useStore from '../../store/store';
import { Autocomplete } from '@mantine/core';


const url = import.meta.env.VITE_BASE_URL

export default function CountrySelector() {
  const [options, setOptions] = useState([]);
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
        const cityOptions = result.data.result.map((country: city_country) => `${country.name}, ${country.country_name}`)
        setOptions(cityOptions)
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
      className="select"
    />
  )
}
