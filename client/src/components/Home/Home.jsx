import './home.css'
import './loading.css'
import glasses from '../../images/glasses.png'
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, orderByFeature, filterTogether, loadingAgain } from '../../actions';
import { Link, NavLink } from 'react-router-dom';
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
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    // paginate
    const posOfLastDog = currentPage * dogsPerPage;
    const posOfFirstDog = posOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(posOfFirstDog, posOfLastDog);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        dispatch(getDogs());
        window.scrollTo(0, 0);

    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1)
    }, [allDogs]);

    useEffect(() => {
        return dispatch(loadingAgain())
    },[dispatch]);

    // handlers
    function handleClickRestart(e) {
        //e.preventDefault();
        dispatch(getDogs());
        setOrder('asc');
        setBringMe('all');
        setFeature('feature');
        setBreedName('');
        setDogsTemps([]);
        setCurrentPage(1);

    };

    function handleBringMe(e) {
        //e.preventDefault();
        setBringMe(e.target.name);
        let filterBreeds = e.target.name;
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

    function handleTempClick(e) {
        let showTemps = dogsTemps;
        showTemps = showTemps.filter(t => t !== e.target.value)

        setDogsTemps(showTemps)
        dispatch(filterTogether(showTemps, bringMe, breedName))
        dispatch(orderByFeature(feature, order))
        setCurrentPage(1);
    }

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
        <div className='backImg'>
            <NavBar />
            <div className='InARow'>
                <SideBar handleBringMe={handleBringMe} handleTempsChange={handleTempsChange}
                    handleTempClick={handleTempClick} showTemps={dogsTemps} bringMe={bringMe} />
                <div className='çontent'>
                    <div className='homeTop'>
                        <div><SearchBar breedName={breedName} handleSearch={handleSearch} /></div>

                        <select className='orderS' value={order} onChange={e => { handleOrder(e) }}>
                            <option className='optOrder' value='asc'>Ascending</option>
                            <option className='optOrder' value='desc'>Descending</option>
                        </select>
                        <select className='orderS' value={feature} onChange={e => { handleFeature(e) }}>
                            <option className='optOrder' value='feature' hidden>Feature...</option>
                            <option className='optOrder' value='breeds'>Breed Name</option>
                            <option className='optOrder' value='weight'>Weight</option>
                        </select>
                        <button className='orderS' onClick={e => { handleClickRestart(e) }}>Clear</button>
                    </div>
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
                        <div className='bigCards'>
                            {
                                currentDogs.length ? currentDogs.map((dog) => {
                                    return (
                                        <div className='card' key={dog.id}>
                                            <NavLink className='card' to={`/doggy/${dog.id}`}>
                                                <Card name={dog.name} image={dog.image} temperaments={dog.temperaments} weight={dog.weight} />
                                            </NavLink>

                                        </div>
                                    )
                                }) :
                                    <div className='notFound'>
                                        <div className='nftext'>Dog breeds not found</div>
                                        <img className='nfimg' src={glasses} alt='logo' />
                                    </div>
                            }
                        </div>
                    }

                    <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage} />

                </div>
            </div>


        </div>


    )

}