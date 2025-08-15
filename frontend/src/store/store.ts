import { create } from 'zustand'

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

const useStore = create<StoreState>((set) => ({
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
}))

export default useStore