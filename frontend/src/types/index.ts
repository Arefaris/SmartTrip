export type city_country = {
  id: number,
  name: string,
  country_name: string
}

export interface Activity {
  time: string;
  title: string;
  photo?: Photo;
  description: string;
  notes?: string;
}

export interface Photo {
  url: string,
  photographer: string,
  photographer_url: string
}

export interface DayPlan {
  day: number;
  activities: Activity[];
}

export interface PlanData {
  days: number;
  plan: DayPlan[];
  end_date: string;
  location: string;
  start_date: string;
}

export interface AllUserPlans {
  days: number,
  generated_plan: PlanData,
  hash: string,
  location: string,
  plan_id: string, 
  saved_at: string
}