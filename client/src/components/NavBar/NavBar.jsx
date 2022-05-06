import './NavBar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import corgi from '../../images/corgi.png'

export default function NavBar() {
    return (
       
            <nav className='navBar'>
                
                    <NavLink to={'/'} className='link'>
                        <h1 className='title'><img className='logo' src={corgi} alt='' /> Ledoggy</h1>
                    </NavLink>
                    <ul className='items'>
                        <li className='list-item'>
                            <NavLink to={'/home'} className='link' activeClassName='selected'>Home</NavLink>
                        </li>
                        <li className='list-item'>
                            <NavLink to={'/create'} className='link' activeClassName='selected'>Create</NavLink>
                        </li>
                        <li className='list-item'>
                            <NavLink to={'/about'} className='link' activeClassName='selected'>About</NavLink>
                        </li>
                    </ul>
                



            </nav >

        

    )
}