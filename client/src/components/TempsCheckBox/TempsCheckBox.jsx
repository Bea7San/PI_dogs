import './TempsCheckBox.css'
import React from "react";

const TempsCheckBox = (props) => {
    return (
        <div className='tempsC'>

            <label className='labels'>
                
                <input className='tempsChecks' type='checkbox' name='temperament' value={props.name} onChange={(e) => props.handleTempsChange(e)}
                checked={props.showTemps.includes(props.name)?true:false} />
                {props.name}</label>

        </div>
    )
}
export default TempsCheckBox;

