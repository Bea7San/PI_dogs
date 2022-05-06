import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDoggy, dogDetail } from "../../actions";
import NavBar from "../NavBar/NavBar";

export default function Deatails(props) {
    const doggy = useSelector(state => state.doggy);
    const dispatch = useDispatch();
    const { dogId } = useParams()

    useEffect(() => {

        dispatch(dogDetail(dogId))
        return dispatch(clearDoggy())

    }, [dispatch, dogId])

    return (
        <div>
            {Object.keys(doggy).length ? 
            
                <div>
                    <NavBar />
                    <h2>{doggy.name}</h2>
                    <img src={doggy.image} alt={`A ${doggy.name} dog`} />
                    <p>Temperament: {doggy.temperaments}</p>
                    <p>Weight: {doggy.weight} Kg</p>
                    <p>Height: {doggy.height} cm</p>
                    {doggy.origin && <p>Origin: {doggy.origin}</p>}
                    {doggy.life_span && <p>Life span: {doggy.life_span} </p>}
                    {doggy.bred_for && <p>Bred for: {doggy.bred_for}</p>}
                </div>
                : null
            }
        </div>

    )

}