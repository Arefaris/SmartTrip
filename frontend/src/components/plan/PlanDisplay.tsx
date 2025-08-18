import type { PlanData, Activity, DayPlan } from '../../types';


export default function PlanDisplay({displayData} : {displayData: PlanData}) {

//Takes a date string (e.g., "2024-03-15")
  //and returns a formatted string like "Friday, March 15, 2024"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  return (
      <div className="plan-container">
          <div className="plan-header">
            <h1 className="plan-title">Travel Plan</h1>
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
                        {activity.photo.url && (
                        <div>
                          <img 
                            src={activity.photo.url} 
                            alt={activity.title}
                            className="activity-image"
                          />
                          <div className="photo-credits">
                            <div className="photographer-name">
                              Photo by {activity.photo.photographer}
                            </div>
                            <a 
                              href={activity.photo.photographer_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="photographer-link"
                            >
                              View photographer's profile
                            </a>
                          </div>
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
