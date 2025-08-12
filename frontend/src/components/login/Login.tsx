import React, { useRef, useState, type FormEvent } from 'react'
import axios from 'axios'
const url = import.meta.env.VITE_BASE_URL

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const [successLogin, setSuccessLogin] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleLogin = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()

        try {
            const response = await axios.post(`${url}/api/login`, {
            email: emailRef.current?.value,
            password: passRef.current?.value
            }, {
                withCredentials: true
            })

            if(response.status === 200){
                setSuccessLogin("Login successful, redirecting...")
            }

        }catch(error: any){
            setError(error.response.data.message)
        }
        

    }

  return (
     <div>
          <form onSubmit={(e: FormEvent<HTMLFormElement>) => { handleLogin(e) }}>
            <input type="email" required ref={emailRef} placeholder="email" />
            <input
              required
              type="password"
              ref={passRef}
              placeholder="password"
              minLength={8}
              maxLength={30}
            />
            {error && <div style={{ color: 'red', fontSize: '14px' }}>{error}</div>}
            {successLogin}
            <input type="submit" value="Login" />
          </form>
        </div>
  )
}
