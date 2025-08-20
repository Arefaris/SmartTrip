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
  const { plan, popularDestinations, setPlan } = useStore()

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

  const handlePopularDest = (index: number)=> {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 5);
    //calculating days
    const days = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    setPlan({
      ...plan,
      location: popularDestinations[index].title,
      start_date: today.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      days: days,
      traveler_type: "solo",
      budget: "Standard / 3-star hotels, casual restaurants, some paid attractions.",
      interests: ["Adventure", "Culture & History", "Food & Culinary"]
    })

    navigate("/plan")
    

  }
  return (

    <div className="home">
      
      <div className="flex">
        <h2 className="hero-title">Create AI-powered travel plans</h2>
        <div className="country-date-travel">
          <CountrySelector />
          <DateSelector />
          
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
          <TravelTypeSelector />
        </div>
        <InterestSelector />
      </div>

      <div className="destinations flex">
        <h1>Popular destinations</h1>
        <div className="dest-cont">
          {popularDestinations && popularDestinations.map((dest, index) => {
           return <div onClick={() => {handlePopularDest(index)}} key={index} className={`index-dest-${index}`}>
            
            <img className="popular-dest-img" src={dest.img}></img>
            <div className="popular-dest-title">{dest.title}</div>
            </div>
          })}
        </div>
      </div>
    </div>

  )
}
