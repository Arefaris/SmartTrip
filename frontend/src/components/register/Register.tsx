import React, { useRef, useState, type FormEvent } from 'react'
import axios from 'axios'

const url = import.meta.env.VITE_BASE_URL

export default function Register() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const [Error, setError] = useState<string>("")
  const [succesRegister, setSuccesRegister] = useState<string>("")

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
    return passwordRegex.test(password)
  }

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = emailRef.current?.value || ''
    const password = passRef.current?.value || ''

    //Validate password
    if (!validatePassword(password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, and one number')
      return
    }

    setError('')

    try {
      const result = await axios.post(`${url}/api/register`, {
        email,
        password
      }, {
        withCredentials: true
      })

       if (result.status === 201) {
        setSuccesRegister("Registration succefull, congrats")
      }

      } catch (error: any) {
        console.log(error)
        setSuccesRegister("")
        setError(error.response.data.message)
      }


   
  }


  return (
    <div>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => { handleRegistration(e) }}>
        <input type="email" ref={emailRef} placeholder="email" />
        <input
          type="password"
          ref={passRef}
          placeholder="password"
          minLength={8}
          maxLength={30}
          onChange={(e) => {
            if (e.target.value && !validatePassword(e.target.value)) {
              setError('Password must contain at least one lowercase letter, one uppercase letter, and one number')
            } else {
              setError('')
            }
          }}
        />
        {Error && <div style={{ color: 'red', fontSize: '14px' }}>{Error}</div>}
        {succesRegister}
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}
