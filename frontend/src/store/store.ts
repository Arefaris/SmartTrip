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

interface StoreState {
  plan: plan | null
  setPlan: (plan: plan) => void
  clearPlan: () => void
}

const useStore = create<StoreState>((set) => ({
  plan: null,
  setPlan: (plan: plan) => set({ plan }),
  clearPlan: () => set({ plan: null }),
}))

export default useStore