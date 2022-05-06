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
    const [ tempsShow, setTempsShow ] = useState([]);
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
    },[dispatch])
    
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
            image: input.image || undefined,  
        };
        
        dispatch(createDog(fixedInput))
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
        <div>

            <NavBar />
            <h1>Create your very own dog breed!</h1>
            {created.length ?
                <div>
                    <h2>{created[0]}</h2>
                    <span>{created[0].name}</span>
                    <button onClick={handleBack}>Back</button>
                </div>
                :
                <form onSubmit={handleSubmit}>

                    <div><label>Breed Name* </label></div>
                    <input placeholder='Name' type='text' name='name' value={input.name}
                        onChange={handleInputChange} />
                    <div>{!errors.name ? null : <span>{errors.name}</span>}</div>

                    <div><label>Weight (Kg)* </label></div>
                    <input placeholder='Min-Max' type='text' name='weight' value={input.weight}
                        onChange={handleInputChange} />
                    <div>{!errors.weight ? null : <span>{errors.weight}</span>}</div>

                    <div><label>Height (cm)* </label></div>
                    <input placeholder='Min-Max' type='text' name='height' value={input.height}
                        onChange={handleInputChange} />
                    <div>{!errors.height ? null : <span>{errors.height}</span>}</div>

                    <div><label>Image URL </label></div>
                    <input placeholder='URL' type='text' name='image' value={input.image}
                        onChange={handleInputChange} />
                    <div>{!errors.image ? null : <span>{errors.image}</span>}</div>
                    {input.image && !errors.image && <img src={input.image} onError={(e) => setErrors({...errors, image:'URL not valid'})} />}

                    <div><label>Life Span </label></div>
                    <input placeholder='Min - Max' type='text' name='life_span' value={input.life_span}
                        onChange={handleInputChange} />
                    <div>{!errors.life_span ? null : <span>{errors.life_span}</span>}</div>

                    <div><label>Country of origin </label></div>
                    <input placeholder='Origin' type='text' name='origin' value={input.origin}
                        onChange={handleInputChange} />
                    <div>{!errors.origin ? null : <span>{errors.origin}</span>}</div>

                    <div><label>Bred for </label></div>
                    <input placeholder='Bred for' type='text' name='bred_for' value={input.bred_for}
                        onChange={handleInputChange} />
                    <div>{!errors.bred_for ? null : <span>{errors.bred_for}</span>}</div>

                    <div>
                        <button onClick={e => { handleTempButton(e) }} >Select Temperaments</button>
                    </div>

                    {tempButton === true &&
                        <div>
                            <div>                                
                                <input type='text' placeholder='Search temperament...' value={temp} onChange={handleSearchTemp}/>
                                <button onClick={handleClearTemp}>Clear selection</button>
                            </div>
                            <ul className='temps'>

                                {searchedTemps?.map(t => {
                                    return (
                                        < li key={t}>

                                            <label className='label'><input type='checkbox' name='temperaments'
                                                value={t} onChange={handleTempsChange} checked={input.temperaments.includes(t)?true:false}/>
                                                {t}</label>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                    }
                    <div><button disabled={errors.button} type='submit'>Create</button></div>

                </form>}
        </div >
    )

}

