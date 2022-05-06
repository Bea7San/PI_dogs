import './home.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, orderByFeature, filterTogether } from '../../actions';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Paginate from '../Paginate/Paginate';
import SideBar from '../SideBar/SideBar';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';


export default function Home() {
    //local states
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const [dogsTemps, setDogsTemps] = useState([]);
    const [order, setOrder] = useState('asc');
    const [bringMe, setBringMe] = useState('all');
    const [feature, setFeature] = useState('feature');
    const [breedName, setBreedName] = useState('');

    // react - redux
    const allDogs = useSelector((state) => state.dogs);
    const dispatch = useDispatch();

    // paginate
    const posOfLastDog = currentPage * dogsPerPage;
    const posOfFirstDog = posOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(posOfFirstDog, posOfLastDog);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };


    useEffect(() => {
        dispatch(getDogs());

    }, [dispatch]);

    // handlers
    function handleClickRestart(e) {
        //e.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1);
    };

    function handleBringMe(e) {
        //e.preventDefault();
        setBringMe(e.target.value);
        let filterBreeds = e.target.value;
        dispatch(filterTogether(dogsTemps, filterBreeds, breedName))

        setCurrentPage(1);
        dispatch(orderByFeature(feature, order))
    };

    function handleTempsChange(e) {
        let showTemps = dogsTemps;

        if (e.target.checked) showTemps.push(e.target.value);
        if (!e.target.checked) showTemps = showTemps.filter(temp => temp !== e.target.value);

        setDogsTemps(showTemps)

        dispatch(filterTogether(showTemps, bringMe, breedName))
        dispatch(orderByFeature(feature, order))
        setCurrentPage(1);

    };

    function handleOrder(e) {

        setOrder(e.target.value)
        dispatch(orderByFeature(feature, e.target.value))
        setCurrentPage(1)
    };

    function handleFeature(e) {
        setCurrentPage(1)
        setFeature(e.target.value)
        dispatch(orderByFeature(e.target.value, order))

    }
    function handleSearch(e) {
        let breed = e.target.value
        setBreedName(e.target.value)
        dispatch(filterTogether(dogsTemps, bringMe, breed))

    }

    return (
        <div >
            <NavBar />
            <div className='InARow'>
                <SideBar handleBringMe={handleBringMe} handleTempsChange={handleTempsChange} />
                <div className='çontent'>
                    <div className='homeTop'>
                        <SearchBar handleSearch={handleSearch} />

                        <select onChange={e => { handleOrder(e) }}>
                            <option value='asc'>Ascending</option>
                            <option value='desc'>Descending</option>
                        </select>
                        <select onChange={e => { handleFeature(e) }}>
                            <option value='feature' hidden>Feature...</option>
                            <option value='breeds'>Breed Name</option>
                            <option value='weight'>Weight</option>
                        </select>
                        <button onClick={e => { handleClickRestart(e) }}>Restart</button>
                    </div>

                    <div>
                        {
                            currentDogs.length ? currentDogs.map((dog) => {
                                return (
                                    <div className='card' key={dog.id}>
                                        <Link to={`/doggy/${dog.id}`}>
                                            <Card name={dog.name} image={dog.image} temperaments={dog.temperaments} weight={dog.weight} />
                                        </Link>

                                    </div>
                                )
                            }) :
                                <div>
                                    <p>Dogs Breeds not Found</p>
                                    <img src={'https://media1.thehungryjpeg.com/thumbs/800_3915572_krsc7sw05xypll4eekv3dg2fp2t7vwpacl56cxf6.jpg'}
                                        alt='dog pupping' />
                                </div>
                        }
                    </div>

                </div>
            </div>
            <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage} />

        </div>


    )

}