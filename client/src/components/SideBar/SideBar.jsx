import './SideBar.css'
import React from "react";
import { connect } from "react-redux";
import { getTemperaments } from "../../actions";
import TempsCheckBox from "../TempsCheckBox/TempsCheckBox";


export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempers: [],
        }
    }
    componentDidMount() {
        this.props.getTemperaments();
        
    }


    render() {
        
        return (
            <nav className='allBar'>
                <div className='generalList'>
                    <div className='bringMe'>Bring me</div>
                    
                    <li><button className='sideBotton' value='mine' onClick={e => this.props.handleBringMe(e)}>My Breeds</button></li>
                    <li><button className='sideBotton sideBottonM' value='existing' onClick={e => this.props.handleBringMe(e)}>Predefined Breeds</button></li>
                    <li><button className='sideBotton' value='all'onClick={e => this.props.handleBringMe(e)}>All Breeds</button></li>

                    <div className='bringMe'>Show Temperaments</div>
                    <ul className='list'>
                        {
                            this.props.temperaments?.map(t => 
                                <TempsCheckBox key={t} name={t} handleTempsChange={this.props.handleTempsChange}/>
                            )
                        }
                    </ul>
                </div>
            </nav>
        )
    }
};

export const mapStateToProps = (state) => {
    return {
        temperaments: state.temperaments
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getTemperaments: () => dispatch(getTemperaments())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
