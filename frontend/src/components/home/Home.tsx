import { useState } from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
import axios from 'axios';

const url = import.meta.env.VITE_BASE_URL

type city_country = {
  id: number,
  name: string,
  country_name: string
}

export default function Home() {
  const navigate = useNavigate()
  const [options, setOptions] = useState([]);
  
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

  return (<>
          <h1>SmartTrip</h1>
          <input
          type="text"
          placeholder="Enter city or country"
          onChange={(e) => fetchCityCountry(e.target.value)}
          ></input>
          <button>Plan trip</button>
          <button onClick={() => {navigate("/login")}}>Login</button>
          <button onClick={() => {navigate("/register")}}>Register</button>
          <select>
              {options.length > 0 && options.map((option: city_country)=> {
                return <option key={option.id}>{option.name}, {option.country_name}</option>
              })}
          </select>
        </>
    
  )
}
