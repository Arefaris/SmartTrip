import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./style.css"
import { Loader } from '@mantine/core'
import type { PlanData, AllUserPlans } from '../../types'
import PlanDisplay from '../plan/PlanDisplay'

const url = import.meta.env.VITE_BASE_URL
export default function MyPlans() {
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = useState<string>("")
    const [allUserPlans, setAllUserPlans] = useState<AllUserPlans[]>([])
    const [displayIndex, setDisplayIndex] = useState(0)
  useEffect(()=>{
    const fetchAllPlans = async ()=> {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/api/user-plans`, {
                withCredentials: true
            })
            
            if (response.data && response.data.userPlans) {
                    setAllUserPlans(response.data.userPlans)
                    console.log(response.data.userPlans[0])
                    setLoading(false)
            }   

        }catch (error: any){
            setLoading(false)
            if (error.status === 401){
                console.log(error)
                setError("You have to be logged in to access this page")
            }
        }
         
    }
   fetchAllPlans()
  }, [])

  if (error){
    return (<>
        {<div className="error-message">{error}</div>}
        </>)}

  if (loading) {
      return (
        <div className="plan-container">
          <div className="plan-header">
            <h1 className="plan-title">Loading All of Your Travel Plans...</h1>
            <Loader size="lg" color="white" /> 
          </div>
        </div>
      )
    }
  

  return (
    <div className="my-plans-container">
      <div className="side-bar">
        <h1>Your plans</h1>
        {allUserPlans && allUserPlans.map((plan, index) => (
          <div 
            onClick={() => setDisplayIndex(index)} 
            key={index}
            className={`plan-item ${displayIndex === index ? 'active' : ''}`}
          >
            <div className="plan-location">{plan.generated_plan.location}</div>
            <div className="plan-meta">
              {plan.days} days • {plan.generated_plan.start_date}
            </div>
          </div>
        ))}
      </div>
      <div className="displayed-plan">
        <PlanDisplay displayData={allUserPlans[displayIndex].generated_plan} />
      </div> 
    </div>
  )
}
