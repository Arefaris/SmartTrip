import { useNavigate } from 'react-router'
import useStore from '../../store/store';
import CountrySelector from '../countrySelector/CountrySelector';
import DateSelector from '../dateSelector/DateSelector';
import InterestSelector from '../interests/InterestsSelector';
import BudgetSelector from '../budgetSelector/BudgetSelector';
import TravelTypeSelector from '../travelTypeSelector/TravelTypeSelector';
import "./style.css"
export default function Home() {
  const navigate = useNavigate()
  const { plan} = useStore()

  //validation to check if user provided everything
  const isFormValid = () => {
    return (
      plan.location && 
      plan.start_date && 
      plan.end_date && 
      plan.traveler_type && 
      plan.budget && 
      plan.interests && 
      plan.interests.length > 0
    )
  }

  const run = () => {
    if (isFormValid()) {
      navigate("/plan")
    }
  }

  return (

    <div className="home">
      <h1 className="app-logo">SmartTrip</h1>
      <div className="flex">
        <h2 className="hero-title">Create AI-powered travel plans</h2>
        <div className="country-date-travel">
          <CountrySelector />
          <DateSelector />
          <TravelTypeSelector />
          <button 
            className={`plan-btn ${!isFormValid() ? 'disabled' : ''}`}
            onClick={() => { run() }}
            disabled={!isFormValid()}
          >
            Plan trip
          </button>
        </div>
        <div className="budget-travel-cont">
          <BudgetSelector />
          <InterestSelector />
        </div>
      </div>
    </div>

  )
}
