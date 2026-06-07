import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useAuth } from '../../features/auth/hooks/useAuth'
import './TopNav.scss'

const TopNav = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <nav className="top-nav">
            <div className="top-nav__left">
                <Link to="/" className="top-nav__logo">
                    ROUNDZERO
                </Link>
            </div>
            <div className="top-nav__right">
                <button 
                    className="top-nav__link" 
                    onClick={() => navigate('/')}
                    style={{ color: isHome ? '#e11d48' : '' }}
                >
                    Home
                </button>
                <button 
                    className="top-nav__link top-nav__link--logout" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <div className="top-nav__user">
                    {user?.name || user?.email?.split('@')[0] || 'User'}
                </div>
            </div>
        </nav>
    )
}

export default TopNav
