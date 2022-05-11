import './NavBar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import glasses from '../../images/glasses.png'
import logopink from '../../images/Assetpink\ 1.png'

export default function NavBar() {
    return (
       
            <nav className='navBar'>
                
                    <NavLink to={'/'} className='link'>
                        <h1 className='title'><img className='logo' src={logopink} alt='' /> LeDoggy</h1>
                    </NavLink>
                    <div className='items'>
                        <div className='list-item'>
                            <NavLink to={'/home'} className='link' activeClassName='selected'>Home</NavLink>
                        </div>
                        <div className='list-item'>
                            <NavLink to={'/create'} className='link' activeClassName='selected'>Create</NavLink>
                        </div>
                        <div className='list-item'>
                            <NavLink to={'/about'} className='link' activeClassName='selected'>About</NavLink>
                        </div>
                    </div>
                



            </nav >

        

    )
}