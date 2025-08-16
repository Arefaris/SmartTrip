import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useStore from '../../store/store';
import axios from 'axios';
import './style.css';

interface Activity {
  time: string;
  title: string;
  description: string;
  notes?: string;
}

interface DayPlan {
  day: number;
  activities: Activity[];
}

interface PlanData {
  days: number;
  plan: DayPlan[];
  end_date: string;
  location: string;
  start_date: string;
}

export default function Plan() {
  const { plan } = useStore()
  const navigate = useNavigate()
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // Show loading state
  if (loading) {
    return (
      <div className="plan-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Planning
        </button>
        <div className="plan-header">
          <h1 className="plan-title">Creating Your Travel Plan...</h1>
          <p className="plan-subtitle">Please wait while we generate your personalized itinerary</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="plan-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Planning
        </button>
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
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Planning
        </button>
        <div className="plan-header">
          <h1 className="plan-title">No Plan Data</h1>
          <p className="plan-subtitle">Unable to load travel plan</p>
        </div>
      </div>
    )
  }

  const displayData = apiPlanData;

  return (
    <div className="plan-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Planning
      </button>
      
      <div className="plan-header">
        <h1 className="plan-title">Your Travel Plan</h1>
        <p className="plan-subtitle">{displayData.location}</p>
        <p className="plan-dates">
          {formatDate(displayData.start_date)} - {formatDate(displayData.end_date)}
        </p>
        <p className="plan-dates">{displayData.days} days of amazing experiences</p>
      </div>

      <div className="days-container">
        {displayData.plan.map((dayPlan: DayPlan) => (
          <div key={dayPlan.day} className="day-card">
            <div className="day-header">
              <div className="day-number">{dayPlan.day}</div>
              <h2 className="day-title">Day {dayPlan.day}</h2>
            </div>
            
            <div className="activities-list">
              {dayPlan.activities.map((activity: Activity, index: number) => (
                <div key={index} className="activity-item">
                  <div className="activity-time">{activity.time}</div>
                  <div className="activity-content">
                    <h3 className="activity-title">{activity.title}</h3>
                    <p className="activity-description">{activity.description}</p>
                    {activity.notes && (
                      <div className="activity-notes">
                        💡 {activity.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

