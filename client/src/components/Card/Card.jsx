import React from 'react';

export default function Card({name, image, temperaments, weight}) {
    return (
        
        <div>
            <h3>{name}</h3>            
            <img src={image} alt={`A ${name} dog`} width='400px' height='250px' /> 
            <h5>Weight: {weight === 'no info' ? `${weight}` :`${weight} Kg`}</h5>
            <h5>{temperaments}</h5>

        </div>
    );
};