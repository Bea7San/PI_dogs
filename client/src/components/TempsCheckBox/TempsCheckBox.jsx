import './TempsCheckBox.css'
import React from "react";

const TempsCheckBox = (props) => {
    return (
        <li>

            <label className='labels'>
                <input type='checkbox' name='temperament' value={props.name} onChange={(e) => props.handleTempsChange(e)} />
                {props.name}</label>

        </li>
    )
}
export default TempsCheckBox;

