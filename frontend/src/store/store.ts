import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import axios from 'axios'
const url = import.meta.env.VITE_BASE_URL


type plan = {
  location: string,
  days: number,
  start_date: string,
  end_date: string,
  interests: string[],
  budget: string,
  traveler_type: string,
  
}

const interests = [
  "Adventure",
  "Culture & History",
  "Food & Culinary",
  "Nature & Outdoors",
  "Relaxation & Wellness",
  "Shopping",
  "Nightlife",
  "Photography",
  "Art & Museums",
  "Family-friendly",
  "Romantic",
  "Sports & Activities",
  "Beach & Water Sports",
  "Wildlife & Safari",
  "Local Experiences",
  "Festivals & Events"
]

const travelerTypes = [
  "Solo",
  "Couple",
  "Family",
  "Friends",
  "Business",
  "Adventure seeker",
  "Luxury traveler",
  "Budget traveler",
];

const popularDestinations = [
  {
    title: "Japan",
    img: "./images/popularDest/Japan.jpg"
  },
  {
    title: "Italy",
    img: "./images/popularDest/Italy.jpg"
  },
  {
    title: "France",
    img: "./images/popularDest/France.jpg"
  },
  {
    title: "Greece",
    img: "./images/popularDest/Greece.jpg"
  }
];



interface StoreState {
  plan: plan,
  interests: string[]
  travelerTypes: string[],
  popularDestinations: { title: string; img: string }[],
  user: any,
  token: string | null,
  isAuthenticated: boolean,
  setPlan: (plan: plan) => void,
  login: (user: any, token: string) => void,
  logout: () => Promise<void>,
  refreshToken: () => Promise<void>
}


const useStore = create<StoreState>()(
  // automatically saves state to localStorage and restores it on page reload
  persist(
    (set, get) => ({
      plan: {
        location: 'USA',
        days: 5,
        start_date: '2025-09-09',
        end_date: '2025-09-16',
        interests: ['Adventure'],
        budget: 'Economy / Good for travelers who want to save money or backpack.',
        traveler_type: 'Solo'
      },
      interests: interests,
      travelerTypes: travelerTypes,
      popularDestinations: popularDestinations,
      user: null,
      token: null,
      isAuthenticated: false,
      setPlan: (plan: plan) => set({ plan }),
      login: (user: any, token: string) => set({ 
        user, 
        token, 
        isAuthenticated: true 
      }),
      logout: async () => {
        try {
          // Call backend to clear HTTP-only cookies
          await axios.post(`${url}/api/logout`, {}, {
            withCredentials: true
          })
        } catch (error) {
          console.log('Logout error:', error)
        } finally {
          // Always clear local state regardless of backend response
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false 
          })
        }
      },
      refreshToken: async () => {
        try {
          const response = await axios.get(`${url}/api/verify-auth`, {
            withCredentials: true
          })
          
          const {user, token} = response.data
          get().login(user, token)
        } catch (error) {
          console.log(error)
          get().logout()
        }
      },
    }),
    {
      name: 'travel-plan-storage', // key name in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage as storage
      partialize: (state) => ({ plan: state.plan }), // only persist the plan object
    }
  )
)

export default useStore