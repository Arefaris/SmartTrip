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
  
  const url = import.meta.env.VITE_BASE_URL
  
  useEffect(() => {
    // const fetchPlan = async ()=>{
    //   const response = await axios.post(`${url}/api/plan`, plan, {
    //   withCredentials: true
    // })
    // console.log(response.data)
    // }
    // fetchPlan()
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

  return (
    <div className="plan-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Planning
      </button>
      
      <div className="plan-header">
        <h1 className="plan-title">Your Travel Plan</h1>
        <p className="plan-subtitle">{planData.plan.location}</p>
        <p className="plan-dates">
          {formatDate(planData.plan.start_date)} - {formatDate(planData.plan.end_date)}
        </p>
        <p className="plan-dates">{planData.plan.days} days of amazing experiences</p>
      </div>

      <div className="days-container">
        {planData.plan.plan.map((dayPlan: DayPlan) => (
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


 const planData = {
    plan: {
      days: 5,
      plan: [
        {
          day: 1,
          activities: [
            {
              time: "09:00",
              title: "Private Kyiv City Overview Tour",
              description: "Luxurious private car tour with a licensed guide to get a veteran's view of Kyiv's core: Khreshchatyk, Maidan Nezalezhnosti, and St. Sophia Cathedral."
            },
            {
              time: "13:00",
              title: "Lunch at Opanas",
              description: "Refined Ukrainian cuisine in a stylish setting featuring seasonal tasting dishes."       
            },
            {
              time: "15:30",
              notes: "Travel time approx. 20–30 minutes between sites.",
              title: "St. Michael's Golden-Domed Monastery & Kyiv Pechersk Lavra (Lavra)",
              description: "Explore two centuries of spiritual heritage; private entries for a deeper, quieter experience."
            },
            {
              time: "19:30",
              title: "Dinner at Kanapa Restaurant",
              description: "Innovative Ukrainian cuisine with a contemporary twist; elegant atmosphere and tasting menu."
            }
          ]
        },
        {
          day: 2,
          activities: [
            {
              time: "08:30",
              title: "Dnieper River Boat Tour (Private)",
              description: "Private yacht-style boat cruise along the Dnieper with skyline views and champagne service."
            },
            {
              time: "12:00",
              title: "Lunch at Casta",
              description: "Gourmet modern Ukrainian fare in a chic setting near the river."
            },
            {
              time: "14:00",
              notes: "Includes short walk between stops; about 15–20 minutes of walking.",
              title: "Andriyivskyy Descent & Museums",
              description: "Stroll the historic hill, boutique galleries, and the Art Nouveau charm; optional private guide for deeper context."
            },
            {
              time: "18:00",
              title: "Private Cooking Class: Ukrainian Cuisine",
              description: "Learn to craft classic dishes with a local chef and enjoy your creations for dinner."
            }
          ]
        },
        {
          day: 3,
          activities: [
            {
              time: "09:00",
              title: "Mezhyhirya Residence (Presidential Estate) Private Tour",
              description: "Opulent grounds and museum rooms with a personalized guided exploration."
            },
            {
              time: "12:30",
              title: "Lunch at SOSNA",
              description: "Seasonal, upscale farm-to-table dining with modern Ukrainian flavors."
            },
            {
              time: "15:00",
              notes: "Private guide can tailor focus to history and aesthetics.",
              title: "National Art Museum of Ukraine",
              description: "World-class collection spanning iconography to contemporary works; private gallery briefing."
            },
            {
              time: "19:30",
              title: "Evening at Kyiv Opera House (Performance or Behind-the-Scenes Tour)",
              description: "Immerse in Ukraine's musical culture with a premium experience; private seating options."
            }
          ]
        },
        {
          day: 4,
          activities: [
            {
              time: "08:30",
              title: "St. Volodymyr Hill & Park Run with Private Guide",
              description: "Gentle morning stroll through urban green spaces with scenic viewpoints."
            },
            {
              time: "11:00",
              notes: "Private driver ensures seamless transitions between stops.",
              title: "Visit to Kyiv's Emerald District: Local Markets & Galleries",
              description: "Explore upscale boutiques and artisan stalls; sample regional sweets."
            },
            {
              time: "14:00",
              title: "Lunch at Tocqueville",
              description: "Refined European-influenced cuisine with Kyiv flair."
            },
            {
              time: "16:00",
              title: "VIP Kyiv Fortress Tour (Pechersk Fortifications) & Folklore Atelier",
              description: "Exclusive access to lesser-seen fortifications and a hands-on folklore workshop."        
            },
            {
              time: "19:30",
              title: "Fine Dining: Ristorante Signorina",
              description: "Elegant Italian-inspired dinner with panoramic city views."
            }
          ]
        },
        {
          day: 5,
          activities: [
            {
              time: "09:30",
              notes: "Travel time ~40–60 minutes each way; arrange private vehicle.",
              title: "Private Day Trip to Pyrohiv Open-Air Museum",
              description: "Cultural immersion in traditional Ukrainian village life with guided demonstrations."
            },
            {
              time: "13:00",
              title: "Lunch at Puzata Hata (Premium Experience)",
              description: "Upscale take on traditional fare in a refined setting; chef-curated options."
            },
            {
              time: "15:30",
              title: "Private Teatime & Market Tour",
              description: "Luxurious tea service paired with a guided stroll through Kyiv's premium markets for last-minute gifts."
            },
            {
              time: "18:00",
              title: "Farewell Dinner at Chef's Table - Kyiv",
              description: "Intimate multi-course tasting menu by a renowned chef; private sommeliere pairing."      
            }
          ]
        }
      ],
      end_date: "2025-08-15",
      location: "Kyiv, Ukraine",
      start_date: "2025-08-11"
    }
  };