import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

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



interface StoreState {
  plan: plan,
  interests: string[]
  travelerTypes: string[],
  setPlan: (plan: plan) => void
}

const useStore = create<StoreState>()(
  // automatically saves state to localStorage and restores it on page reload
  persist(
    (set) => ({
      plan: {
        location: '',
        days: 0,
        start_date: '',
        end_date: '',
        interests: [],
        budget: '',
        traveler_type: ''
      },
      interests: interests,
      travelerTypes: travelerTypes,
      setPlan: (plan: plan) => set({ plan }),
    }),
    {
      name: 'travel-plan-storage', // key name in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage as storage
      partialize: (state) => ({ plan: state.plan }), // only persist the plan object, not interests/travelerTypes
    }
  )
)

export default useStore