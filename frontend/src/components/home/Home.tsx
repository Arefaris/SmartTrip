import { useRef, useState } from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router'
import useStore from '../../store/store';
import CountrySelector from '../countrySelector/CountrySelector';
import DateSelector from '../dateSelector/DateSelector';
import InterestSelector from '../interests/InterestsSelector';
import BudgetSelector from '../budgetSelector/BudgetSelector';
import TravelTypeSelector from '../travelTypeSelector/TravelTypeSelector';
import "./style.css"
export default function Home() {
  const navigate = useNavigate()
  const { plan, setPlan, travelerTypes } = useStore()

  const run = () => {
    console.log(plan)
  }

  return (

    <div className="home">

      <div className="flex">
        <h1 className="app-logo">SmartTrip</h1>
        <h2 className="hero-title">Create AI-powered travel plans</h2>

        <div className="country-date-travel">
          <CountrySelector />

          <DateSelector />

          <TravelTypeSelector />
          <button className="plan-btn" onClick={() => { run() }}>Plan trip</button>
        </div>

        <div className="budget-travel-cont">
          <BudgetSelector />
          <InterestSelector />
        </div>

      </div>



    </div>

  )
}
