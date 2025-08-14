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
  { value: "Adventure", label: "Adventure" },
  { value: "Culture & History", label: "Culture & History" },
  { value: "Food & Culinary", label: "Food & Culinary" },
  { value: "Nature & Outdoors", label: "Nature & Outdoors" },
  { value: "Relaxation & Wellness", label: "Relaxation & Wellness" },
  { value: "Shopping", label: "Shopping" },
  { value: "Nightlife", label: "Nightlife" },
  { value: "Photography", label: "Photography" },
  { value: "Art & Museums", label: "Art & Museums" },
  { value: "Family-friendly", label: "Family-friendly" },
  { value: "Romantic", label: "Romantic" },
  { value: "Sports & Activities", label: "Sports & Activities" },
  { value: "Beach & Water Sports", label: "Beach & Water Sports" },
  { value: "Wildlife & Safari", label: "Wildlife & Safari" },
  { value: "Local Experiences", label: "Local Experiences" },
  { value: "Festivals & Events", label: "Festivals & Events" }
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
  plan: plan | null,
  interests: {value: string, label: string}[]
  selectedInterests: {value: string, label: string}[]
  travelerTypes: string[],
  setPlan: (plan: plan) => void
  setSelectedInterests: (interests: {value: string, label: string}[]) => void
  clearPlan: () => void
}

const useStore = create<StoreState>((set) => ({
  plan: null,
  interests: interests,
  selectedInterests: [],
  travelerTypes: travelerTypes,
  setPlan: (plan: plan) => set({ plan }),
  setSelectedInterests: (selectedInterests) => set({ selectedInterests }),
  clearPlan: () => set({ plan: null }),
}))

export default useStore