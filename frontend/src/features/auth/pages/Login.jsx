import React, { useState } from 'react'
import '../auth.form.scss'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { AuthInfoPanel } from '../components/AuthInfoPanel'

import { Loader } from '../../../components/Loader/Loader'

const Login = () => {

    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("")
        try {
            await handleLogin({email,password})
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.")
        }
    }

    if(loading){
        return <Loader message="Logging in..." />
    }
    return (
        <div className="auth-page-wrapper">
            <nav className="auth-simple-nav">
                <Link to="/" className="auth-logo-nav">ROUNDZERO</Link>
                <div className="auth-nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </div>
            </nav>

            <main className="auth-split-main">
                <AuthInfoPanel />

                <div className="form-container">
                    <h1>Account login</h1>
                    {error && <div style={{ color: '#ff4d4d', marginBottom: '1rem' }}>{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                            onChange={(e) =>{setEmail(e.target.value)}}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-wrapper">
                                <input 
                                onChange={(e) =>{setPassword(e.target.value)}}
                                type={showPassword ? "text" : "password"} id="password" name='password' placeholder='Enter password' />
                                <button 
                                    type="button" 
                                    className="password-toggle" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button className='button primary-button'>
                            Login
                        </button>
                    </form>
                    <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
                </div>
            </main>
        </div>
    )
}

export default Login