import React, { useRef, useState, type FormEvent } from 'react'
import { Input, Button, Loader } from '@mantine/core';
import { useNavigate } from 'react-router'
import axios from 'axios'
import "./style.css"
const url = import.meta.env.VITE_BASE_URL

export default function Login() {
    const navigate = useNavigate()
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const [successLogin, setSuccessLogin] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = async (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setSuccessLogin("")

        try {
            const response = await axios.post(`${url}/api/login`, {
            email: emailRef.current?.value,
            password: passRef.current?.value
            }, {
                withCredentials: true
            })

            if(response.status === 200){
                setSuccessLogin("Login successful, redirecting...")
                setTimeout(() => {
                    navigate("/")
                }, 1500)
            }

        }catch(error: any){
            setError(error.response?.data?.message || "Login failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="login-page">
      <form className="submit-form" onSubmit={(e: FormEvent<HTMLFormElement>) => { handleLogin(e) }}>
        <div className="container-form">
          <h1 className="form-title">Welcome Back</h1>
          <p className="form-subtitle">Sign in to your account</p>
          
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
          
          {error && <div className="error-message">{error}</div>}
          {successLogin && <div className="success-message">{successLogin}</div>}
          
          <Button 
            type="submit" 
            size="lg" 
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? <Loader size="sm" color="white" /> : "Sign In"}
          </Button>
          
          <p className="register-link">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="register-link-text">
              Sign up here
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}
