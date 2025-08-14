import { useRef, useState } from 'react'
import axios from 'axios';
import type { city_country } from '../../types';
import useStore from '../../store/store';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './style.css';

const url = import.meta.env.VITE_BASE_URL


export default function CountrySelector() {
  const [options, setOptions] = useState<city_country[]>([]);
  const [inputValue, setInputValue] = useState('');
  const { plan, setPlan } = useStore()

  //fetching for auto-complete
  const fetchCityCountry = async (query: string)=> {
      if (query.length < 3) {
        setOptions([]);
        return;
      }

      try {
        const result = await axios.post(`${url}/api/county-list`, {query})

        if(result.status === 200){
          setOptions(result.data.result)
        }

      }catch(error){
        console.log(error)
      }
  }

  //setting location
  const handleChange = (event: any, value: city_country | null) => {
    if (value) {
      setPlan({
        ...plan,
        location: `${value.name}, ${value.country_name}`
      })
    }
  }

    return (
        <div>
        <Autocomplete
           id="country-autocomplete"
          options={options}
          getOptionLabel={(option) => `${option.name}, ${option.country_name}`}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            fetchCityCountry(newInputValue);
          }}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField {...params} label="Where to?" placeholder="Search..." className="country-textfield" />
          )}
          noOptionsText="Type at least 3 characters to search"
        />
        </div>
       
    )
}
