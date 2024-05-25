import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// eslint-disable-next-line no-unused-vars
function MenuOption({ to, children, ...props }) {
    const path = window.location.pathname;
    return (
        <li className={path === to? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )    
}

// Navbar Component
export const Navbar = () => {
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

  return (
    <nav className='nav'>
        <ul>
            <div className='menu'>
                <MenuOption to='/home'>Home</MenuOption>
                <MenuOption to='/favorites'>Favorites</MenuOption>
            </div>
            <div className='logout'>
                <button className='logoutButton' onClick={handleLogout}>Logout</button>
            </div>
        </ul>
    </nav>
  )
}

export default Navbar;
