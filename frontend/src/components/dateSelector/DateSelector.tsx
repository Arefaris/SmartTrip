import React, {useRef, type FormEvent} from 'react'
import useStore from '../../store/store';

export default function DateSelector() {
const { plan, setPlan } = useStore()
const startDate = useRef<HTMLInputElement>(null)
const endDate = useRef<HTMLInputElement>(null)

const handleChange = ()=>{
    if(!startDate.current?.value || !endDate.current?.value) return
    const enDate = endDate.current?.value
    const stDate = startDate.current?.value

    // calculating days
    const days = (new Date(enDate).getTime() - new Date(stDate).getTime()) / (1000 * 60 * 60 * 24) + 1;

    
    setPlan({
      ...plan,
      days: days,
      start_date: startDate.current?.value,
      end_date: endDate.current?.value
    })

}

  return (
    <form onChange={() => handleChange()}>
         <br />
                  <label>Start Date:</label>
                  <input id="start-date" type="date" ref={startDate}/>
                  <br />
                  <label>End Date:</label>
                  <input id="end-date" type="date" ref={endDate}></input>
        <br />
    </form>
  )
}
