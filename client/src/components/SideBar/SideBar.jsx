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

                    <div>
                        {/* <input className='sideBotton' value='My Breeds' name='mine' type='button' onClick={e => this.props.handleBringMe(e)} /> */}
                        <button className={this.props.bringMe === 'mine' ? 'sideBotton pressed' : 'sideBotton'} name='mine'
                            onClick={e => this.props.handleBringMe(e)}>My Breeds</button>
                        <button className={this.props.bringMe === 'fromDb' ? 'sideBotton pressed' : 'sideBotton'} name='fromDb' onClick={e => this.props.handleBringMe(e)}>Predefined Breeds</button>
                        <button className={this.props.bringMe === 'all' ? 'sideBotton pressed' : 'sideBotton'} name='all'
                            onClick={e => this.props.handleBringMe(e)}>All Breeds</button>
                    </div>

                    <div className='bringMe'>Temperaments</div>

                    <div className='scrollingTsb'>
                        {this.props.showTemps.length ? this.props.showTemps.map(st =>
                            <button className='tempButtons' key={st} value={st} onClick={this.props.handleTempClick} >{st}</button>) : null
                        }
                    </div>

                    <div className='scrollingTside'>
                        {this.props.temperaments?.map(t =>
                                <TempsCheckBox key={t} name={t} handleTempsChange={this.props.handleTempsChange} showTemps={this.props.showTemps} />)
                        }
                    </div>


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
