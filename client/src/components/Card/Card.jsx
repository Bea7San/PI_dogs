import React from 'react';
import './card.css'

export default function Card({name, image, temperaments, weight}) {
    return (
        
        <div className='cardIns'>
                       
            <div className='photosCont'><img className='doggysPhotos' src={image} alt={`A ${name} dog`} /> </div>
            <h3 className='cardName'>{name}</h3> 
            <h5 className='cardTemps'>{temperaments}</h5>
            <h5 className='cardWeight' >Weight: {weight === 'no info' ? `${weight}` :`${weight} Kg`}</h5>            

        </div>
    );
};