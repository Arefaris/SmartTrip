import { useRef, useState } from 'react'
import axios from 'axios';
import type { city_country } from '../../types';
import useStore from '../../store/store';
const url = import.meta.env.VITE_BASE_URL


export default function CountrySelector() {
const [options, setOptions] = useState([]);
const location = useRef<HTMLSelectElement>(null)
const { plan, setPlan } = useStore()

//fetching for auto-complete
const fetchCityCountry = async (query: string)=> {
    if (query.length < 3) return; 

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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    setPlan({
      ...plan,
      location: e.target.value
    })
  }

    return (
        <>
            <input
                type="text"
                placeholder="Enter city or country"
                onChange={(e) => fetchCityCountry(e.target.value)}
            ></input>
            {/* <button onClick={() => {navigate("/login")}}>Login</button>
              <button onClick={() => {navigate("/register")}}>Register</button> */}
            <select ref={location} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}>
                {options.length > 0 && options.map((option: city_country) => {
                    return <option key={option.id}>{option.name}, {option.country_name}</option>
                })}
            </select>

        </>
    )
}
