import React, { useRef, useState, type FormEvent } from 'react'
import { Input, Button, Loader } from '@mantine/core';
import { useNavigate } from 'react-router'
import axios from 'axios'
import "./style.css"

const url = import.meta.env.VITE_BASE_URL

export default function Register() {
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const confirmPassRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string>("")
  const [successRegister, setSuccessRegister] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
    return passwordRegex.test(password)
  }

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessRegister("")

    const email = emailRef.current?.value || ''
    const password = passRef.current?.value || ''
    const confirmPassword = confirmPassRef.current?.value || ''

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setError('Password must contain at least one lowercase letter, one uppercase letter, and one number')
      setIsLoading(false)
      return
    }

    try {
      const result = await axios.post(`${url}/api/register`, {
        email,
        password
      }, {
        withCredentials: true
      })

      if (result.status === 201) {
        setSuccessRegister("Registration successful! Redirecting to login...")
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      }

    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="register-page">
      <form className="submit-form" onSubmit={(e: FormEvent<HTMLFormElement>) => { handleRegistration(e) }}>
        <div className="container-form">
          <h1 className="form-title">Create Account</h1>
          <p className="form-subtitle">Join SmartTrip to plan your perfect journey</p>
          
          <Input 
            type="email" 
            required 
            ref={emailRef} 
            placeholder="Email address"
            size="lg"
            className="form-input"
          />
          <Input
            required
            type="password"
            ref={passRef}
            placeholder="Password"
            minLength={8}
            maxLength={30}
            size="lg"
            className="form-input"
          />
          <Input
            required
            type="password"
            ref={confirmPassRef}
            placeholder="Confirm Password"
            minLength={8}
            maxLength={30}
            size="lg"
            className="form-input"
          />
          
          {error && <div className="error-message">{error}</div>}
          {successRegister && <div className="success-message">{successRegister}</div>}
          
          <Button 
            type="submit" 
            size="lg" 
            disabled={isLoading}
            className="register-button"
          >
            {isLoading ? <Loader size="sm" color="white" /> : "Create Account"}
          </Button>
          
          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="login-link-text">
              Sign in here
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
