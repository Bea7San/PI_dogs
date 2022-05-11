import './landingPage.css'
import Asset1 from '../../images/Asset 1.png'
import React from 'react';
import {Link} from 'react-router-dom';


export default function LandingPage(){
    return (
        <div className='landing'>
            <div className='landingtitle' ><h1 className='h1Title' >LeDoggy</h1></div>
            <Link to = {'/home'}>
                <img className='landhome' src={Asset1} />
            </Link>
        </div>
    )
}
