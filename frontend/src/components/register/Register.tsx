import React, { type FormEvent } from 'react'
import axios from 'axios'

export default function Register() {

  const handleRegistration = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

  }
  return (
    <div>
        <form onSubmit={(e: FormEvent<HTMLFormElement>)=> {handleRegistration(e)}}>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input type="submit" placeholder="Register"/>
        </form>
    </div>
  )
}
