import { useRef, useState } from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
import useStore from '../../store/store';
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
  const { setPlan } = useStore()

  //date ref for calendar
  const startDate = useRef<HTMLInputElement>(null)
  const endDate = useRef<HTMLInputElement>(null)

  

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

  const plan = ()=> {
    if(!startDate.current?.value || !endDate.current?.value) return

    //calculating days based on user selection
    const enDate = endDate.current?.value
    const stDate = startDate.current?.value
    const days = (new Date(enDate).getTime() - new Date(stDate).getTime()) / (1000 * 60 * 60 * 24) + 1;

    
    setPlan({
    location: string,
    days: days,
    start_date: stDate,
    end_date: enDate,
    interests: string[],
    budget: string,
    traveler_type: string,
    })
  }

  return (<>
          <h1>SmartTrip</h1>
          <input
          type="text"
          placeholder="Enter city or country"
          onChange={(e) => fetchCityCountry(e.target.value)}
          ></input>
          {/* <button onClick={() => {navigate("/login")}}>Login</button>
          <button onClick={() => {navigate("/register")}}>Register</button> */}
          <select>
              {options.length > 0 && options.map((option: city_country)=> {
                return <option key={option.id}>{option.name}, {option.country_name}</option>
              })}
          </select>
              
          <br />
          <label>Start Date:</label>
          <input type="date" ref={startDate}/>
          <br />
          <label>End Date:</label>
          <input type="date" ref={endDate}></input>
          <br />

          <button onClick={() => {plan()}}>Plan trip</button>
        </>
    
  )
}
