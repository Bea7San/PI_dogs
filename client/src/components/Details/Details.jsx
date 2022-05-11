import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDoggy, deleteDog, dogDetail, loadingAgain } from "../../actions";
import NavBar from "../NavBar/NavBar";
import './details.css';
import glasses from '../../images/glasses.png';

export default function Deatails(props) {
    const doggy = useSelector(state => state.doggy);
    const loading = useSelector((state) => state.loading);
    const deleted = useSelector((state) => state.deleted);
    const dispatch = useDispatch();
    const { dogId } = useParams()

    useEffect(() => {
        dispatch(dogDetail(dogId))
        return dispatch(clearDoggy())

    }, [dispatch, dogId]);

    useEffect(() => {
        return dispatch(loadingAgain())
    }, [dispatch]);

    function handleDogDelete() {
        dispatch(deleteDog(dogId))
    };


    return (

        <div className='backImg'>
            <NavBar />
            {Object.keys(deleted).length ?
                <div>
                    <div className='nftext'>{deleted.msg}</div>
                    <img className='nfimg' src={glasses} alt='logo' />
                </div>
                :
                <div>
                    {loading === true ?
                        <div class="wrapper">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                        <div class="shadow"></div>
                        <span>Loading</span>
                    </div>
                        :
                        <div>
                            {Object.keys(doggy).length ?
                                <div>
                                    <div className='detailBig'>
                                        <div className='imgDtBox'><img className='detailImg' src={doggy.image} alt={`A ${doggy.name} dog`} /></div>
                                        <div className='infoBox'>
                                            <div className='smallIfBox'>
                                                <h2 className='nameDetail'>{doggy.name}</h2>
                                                <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Temperament: </b>{`${doggy.temperaments}.`}</span></div>
                                                <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Weight: </b>{doggy.weight} Kg</span></div>
                                                <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Height: </b>{doggy.height} cm</span></div>
                                                {doggy.origin && <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Origin: </b>{`${doggy.origin}.`}</span></div>}
                                                {doggy.life_span && <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Life span: </b>{doggy.life_span}</span></div>}
                                                {doggy.bred_for && <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Bred for: </b>{`${doggy.bred_for}.`}</span></div>}
                                            </div>

                                            {doggy.fromDb && <div className='dltBtnBox'><button className='deleteButton' onClick={handleDogDelete} >Delete</button></div>}
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    }
                </div>
            }

        </div>
    )
}