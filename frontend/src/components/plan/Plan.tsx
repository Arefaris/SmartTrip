import React, { useEffect } from 'react'
import useStore from '../../store/store';
import axios from 'axios';
import './style.css';
import { Loader } from '@mantine/core';
import PlanDisplay from './PlanDisplay';
import type { PlanData } from '../../types';


export default function Plan() {
  const { plan } = useStore()
  const [apiPlanData, setApiPlanData] = React.useState<PlanData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  const url = import.meta.env.VITE_BASE_URL


  useEffect(() => {
    

    const fetchPlan = async () => {
      try {
        setLoading(true)
        const response = await axios.post(`${url}/api/plan`, plan, {
          withCredentials: true
        })
        console.log('API Response:', response.data)
        
        // Set the API data
        if (response.data && response.data.plan) {
          setApiPlanData(response.data.plan)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching plan:', err)
        setError('Failed to load travel plan')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPlan()
  }, [])
  
   

  // Show loading state
  if (loading) {
    return (
      <div className="plan-container">
        <div className="plan-header">
          <h1 className="plan-title">Creating Your Travel Plan...</h1>
          <p className="plan-subtitle">Please wait while we generate your personalized itinerary</p>
          <Loader size="lg" color="white" /> 
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="plan-container">
        <div className="plan-header">
          <h1 className="plan-title">Error Loading Plan</h1>
          <p className="plan-subtitle">{error}</p>
          <button 
            className="plan-btn" 
            onClick={() => window.location.reload()}
            style={{marginTop: '20px'}}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }


  if (!apiPlanData) {
    return (
      <div className="plan-container">
        <div className="plan-header">
          <h1 className="plan-title">No Plan Data</h1>
          <p className="plan-subtitle">Unable to load travel plan</p>
        </div>
      </div>
    )
  }

  const displayData = apiPlanData;

  return (
   <PlanDisplay displayData={displayData}></PlanDisplay>
  )
}

