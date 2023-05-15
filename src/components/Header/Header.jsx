import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
const Header = () => {

    const { user, logOut } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut(result => {

            console.log('log out successfully')
        })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                {/* a*4[href=$]{$} */}
                <Link to="/">Shop</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                {
                    user && <>
                        <span className='text-user'>Welcome {user.email}</span>
                        <button onClick={handleSignOut}>Log Out</button>
                    </>

                }
            </div>
        </nav>
    );
};

export default Header;