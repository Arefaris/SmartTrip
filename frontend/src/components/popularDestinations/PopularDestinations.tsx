import useStore from '../../store/store';
import { useNavigate } from 'react-router'
import ResponsiveImage from '../common/ResponsiveImage'


export default function PopularDestinations() {


  const navigate = useNavigate()  
  const { plan, popularDestinations, setPlan } = useStore()

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
      <div className="destinations flex">
        <h1>Popular destinations</h1>
        <div className="dest-cont">
          {popularDestinations && popularDestinations.map((dest, index) => {
           return <div onClick={() => {handlePopularDest(index)}} key={index} className={`index-dest-${index}`}>
            
            <ResponsiveImage 
              className="popular-dest-img"
              src={dest.img}
              srcMobile={dest.imgMobile}
              fallback={dest.imgFallback}
              alt={`${dest.title} destination`}
            />
            <div className="popular-dest-title">{dest.title}</div>
            </div>
          })}
        </div>
      </div>
  )
}
