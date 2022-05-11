import './form.css'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCreted, createDog, getTemperaments } from '../../actions';
import validate from './validate';
import NavBar from '../NavBar/NavBar';


export default function Form() {
    const [input, setInput] = useState({
        name: '', image: '', height: '', weight: '', temperaments: [], life_span: '', bred_for: '', origin: ''
    })
    const inputDefault = { name: '', image: '', height: '', weight: '', temperaments: [], life_span: '', bred_for: '', origin: '' };
    const [temp, setTemp] = useState('')
    const [tempsShow, setTempsShow] = useState([]);
    const [tempButton, setTempButton] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        weight: '',
        height: '',
        life_span: '',
        image: '',
        origin: '',
        bred_for: '',
        button: true,

    })

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)
    const created = useSelector(state => state.created)
    let searchedTemps = tempsShow.length ? tempsShow : temperaments

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearCreted())
        }
    }, [dispatch])

    // HANDLERS
    // Temps Handlers
    const handleTempButton = (e) => {
        e.preventDefault();
        setTempButton(tempButton === false ? true : false)
    }
    
    const handleTempsChange = (e) => {
        let addTemps = input.temperaments;
        if (e.target.checked) addTemps.push(e.target.value);
        if (!e.target.checked) addTemps = addTemps.filter(temp => temp !== e.target.value);

        setInput({
            ...input,
            temperaments: addTemps
        })
    };
    const handleClearTemp = (e) => {
        e.preventDefault(e);
        setInput({
            ...input,
            temperaments: [],
        })
        setTemp('');
        setTempsShow([])
    }
    const handleSearchTemp = (e) => {
        let showT = e.target.value;
        let tempsFilt = temperaments.filter(t => t.toLowerCase().includes(showT.toLowerCase()))

        setTempsShow(tempsFilt);
        setTemp(e.target.value)

    }
    // Inputs handlers
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let fixedInput = {
            ...input,
            weight: input.weight.split('-').join(' - '),
            height: input.height.split('-').join(' - '),
            life_span: `${input.life_span.split('-').join(' - ')} years`,
            image: input.image || undefined,
        };

        dispatch(createDog(fixedInput))
        window.scrollTo(0, 0);
    }

    const handleBack = (e) => {
        e.preventDefault();
        let res = created[0].split(' ');
        dispatch(clearCreted());

        if (res[2] === 'created') {
            setInput(inputDefault)
        }
    }

    return (
        <div className='backImg'>

            <NavBar />

            {created.length ?
                <div>
                    <h2 className='nftext'>{created[0]}</h2>
                    <button className='backButton' onClick={handleBack}>Back</button>
                    <div>
                        <div className='detailBig'>
                            <div className='imgDtBox'><img className='detailImg' src={created[1].image} alt={`A ${created[1].name} dog`} /></div>
                            <div className='infoBox'>
                                <div className='smallIfBox'>
                                    <h2 className='nameDetail'>{created[1].name}</h2>
                                    {created[0].split(' ')[2] === 'name' ? <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Temperament: </b>{`${created[1].temperaments}.`}</span></div>
                                        : created[2] && <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Temperament: </b>{`${created[2]}.`}</span></div>}
                                    <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Weight: </b>{created[1].weight} Kg</span></div>
                                    <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Height: </b>{created[1].height} cm</span></div>
                                    {created[1].origin && <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Origin: </b>{`${created[1].origin}.`}</span></div>}
                                    {created[1].life_span && <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Life span: </b>{created[1].life_span}</span></div>}
                                    {created[1].bred_for && <div className='infoDetails'><span className='infoInfo'><b className='infotitle'>Bred for: </b>{`${created[1].bred_for}.`}</span></div>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                :
                <div className='bigForm' >
                    <h1 className='createTitle' >Create your very own dog breed!</h1>
                    <form onSubmit={handleSubmit} autoComplete="off">

                        <div className='inputsBox'>
                            <div className='inputsLabels'>Breed Name* </div>
                            <input className={errors.name ? 'inputsForm danger' : 'inputsForm'} placeholder='Name' type='text'
                                name='name' value={input.name}
                                onChange={handleInputChange} />
                            <div className='errorbox'>{!errors.name ? null : <span>{errors.name}</span>}</div>
                        </div>

                        <div className='inputsBox'>
                            <div className='inputsLabels'>Weight (Kg)* </div>
                            <input className={errors.weight ? 'inputsForm danger' : 'inputsForm'} placeholder='Min-Max' type='text'
                                name='weight' value={input.weight}
                                onChange={handleInputChange} />
                            <div className='errorbox'>{!errors.weight ? null : <span>{errors.weight}</span>}</div>
                        </div>

                        <div className='inputsBox'>
                            <div className='inputsLabels'>Height (cm)* </div>
                            <input className={errors.height ? 'inputsForm danger' : 'inputsForm'} placeholder='Min-Max' type='text'
                                name='height' value={input.height}
                                onChange={handleInputChange} />
                            <div className='errorbox'>{!errors.height ? null : <span>{errors.height}</span>}</div>
                        </div>

                        <div className='inputsBox'>
                            <div className='inputsLabels'>Image URL </div>
                            <input className={errors.image ? 'inputsForm danger' : 'inputsForm'} placeholder='URL' type='text'
                                name='image' value={input.image}
                                onChange={handleInputChange} />
                            <div className='errorbox'>{!errors.image ? null : <span>{errors.image}</span>}</div>
                            {input.image && !errors.image && <div className='photosCont '><img className='doggysPhotos imgPreview' src={input.image}
                                onError={(e) => setErrors({ ...errors, image: 'URL not valid' })} /></div>}
                        </div>

                        <div className='inputsBox'>
                            <div className='inputsLabels'>Life Span </div>
                            <input className={errors.life_span ? 'inputsForm danger' : 'inputsForm'} placeholder='Min - Max' type='text'
                                name='life_span' value={input.life_span}
                                onChange={handleInputChange} />
                            <div className='errorbox'>{!errors.life_span ? null : <span>{errors.life_span}</span>}</div>
                        </div>

                        <div className='inputsBox'>
                            <div className='inputsLabels'>Country of origin</div>
                            <input className={errors.origin ? 'inputsForm danger' : 'inputsForm'} placeholder='Origin' type='text'
                                name='origin' value={input.origin}
                                onChange={handleInputChange} />
                            <div className='errorbox'>{!errors.origin ? null : <span>{errors.origin}</span>}</div>
                        </div>

                        <div className='inputsBox'>
                            <div className='inputsLabels'>Bred for</div>
                            <input className={errors.bred_for ? 'inputsForm danger' : 'inputsForm'} placeholder='Bred for' type='text'
                                name='bred_for' value={input.bred_for}
                                onChange={handleInputChange} />
                            <div className='errorbox'>{!errors.bred_for ? null : <span>{errors.bred_for}</span>}</div>
                        </div>

                        <div className='addtempsBox'>
                            <div className=' buttonBox'>
                                <button className='addTempsB' onClick={e => { handleTempButton(e) }} >Add Temperaments</button>
                            </div>

                            {tempButton === true &&
                                <div>
                                    <div className='buttonBox'>
                                        <input className='tempSearch' type='text' placeholder='Search temperament...' value={temp}
                                            onChange={handleSearchTemp} />
                                        <button className='clearTempB' onClick={handleClearTemp}>Clear</button>
                                    </div>
                                    <div className='temps'>

                                        {searchedTemps?.map(t => {
                                            return (


                                                <label key={t} className={input.temperaments.includes(t) ? 'labelFtem tempadded' : 'labelFtem'}>
                                                    <input type='checkbox' name='temperaments' value={t}
                                                        onChange={handleTempsChange} checked={input.temperaments.includes(t) ? true : false} />
                                                    {t}</label>

                                            )
                                        })}
                                    </div>
                                </div>

                            }
                        </div>
                        <div className='crteButtonBox'><button className='crteButton' disabled={errors.button}
                            type='submit'>Create</button></div>

                    </form>
                </div>}

            <div className='espacio' ></div>
        </div >
    )

}

