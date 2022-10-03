import { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import CarteResto from '../components/CarteResto';
import '../App.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Slider from '@mui/material/Slider';
import { MultipleSelectPlaceholder, getFilteredGenres } from '../components/Dropdown';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup, getLeafletElement } from 'react-leaflet';
import {setState, getState} from '../App.js';


const UFOOD_URL = "https://ufoodapi.herokuapp.com/unsecure";


const Home = () => {
    const [searchTerm, setSearchTerm] = useState(getState()[2]);
    const [restos, setRestos] = useState([]);
    const [value, setValue] = useState([1, 5]);

    let FilteredGenres = getFilteredGenres();

    const searchRestos = async (name) => {
        const response = await fetch(`${UFOOD_URL}/restaurants?q=${name}&limit=150`);
        const data = await response.json();
        setState(getState()[0], getState()[1], name)

        setRestos(data.items);
    };

    const searchByFilters = async (name, price = [], genres = []) => {
        let price_range = [];
        let max = price[1];
        let min = price[0];
        for (let i = min; i <= max; i++) {
            price_range.push(i)
        }

        if (genres?.length > 0) {
            const response = await fetch(`${UFOOD_URL}/restaurants?q=${name}&genres=${genres}&price_range=${price_range}&limit=155`);
            const data = await response.json();
            setRestos(data.items);
        } else {
            const response = await fetch(`${UFOOD_URL}/restaurants?q=${name}&price_range=${price_range}&limit=155`);
            const data = await response.json();
            setRestos(data.items);
        }
    };

    let lstGenres = [];
    let uniqueGenres = [];

    useEffect(() => {
        searchRestos(getState()[2]);
        {
            restos.map((resto) => (
                resto.genres.map((genre) => (
                    lstGenres.push(genre)
                ))
            ))
        }
        lstGenres.forEach((c) => {
            if (!uniqueGenres.includes(c)) {
                uniqueGenres.push(c);
            }
        })
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const marks = [
        {
            value: 1,
            label: '$',
        },
        {
            value: 2,
            label: '$$',
        },
        {
            value: 3,
            label: '$$$',
        },
        {
            value: 4,
            label: '$$$$',
        },
        {
            value: 5,
            label: '$$$$$',
        },
    ];

    let LoggedIn = getState()[0];
    let UserName = getState()[1];


    return (
        <>
            <div className="EnTete">

                <div className='Title'>
                    <h1>UFood</h1>
                </div>

                <div className='Reste'>

                    <input type="checkbox" id="checkbox" />
                    <label for="checkbox" id="icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmLns="http://www.w3.org/2000/svg"><path stroke-Linejoin="round" strokeLinecap="round" stroke-width="2" d="M4 6h12M4 12h16M4 18h16"></path></svg>
                    </label>

                    <ul className='MenuUser'>
                        <li className='MenuUserItem'><a href="#" className="active">Home</a></li>
                        {LoggedIn == true ? (
                            <li className='MenuUserItem'>
                                <Link to="/User" style={{ textDecoration: 'inherit' }}>
                                    {UserName}
                                </Link>
                            </li>
                        ) : (
                            <li className='MenuUserItem'>
                                <Link to="/Connect" style={{ textDecoration: 'inherit' }}>
                                    Login
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>
            </div>

            <div className="Page">
                <div className="searchH">
                    <input
                        placeholder="Search for a restaurant"
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value) }}
                    />
                    <img
                        src={SearchIcon}
                        alt="Search"
                        onClick={() => { searchRestos(searchTerm) }}
                    />
                </div>

                <div className="Container">
                    <div className="filter">
                        <div className="FilterTitle"><h2>Filters :</h2></div>
                        <div className='title-priceRange'>Price Range :</div>
                        <div className='r-slider'>
                            <Slider
                                getAriaLabel={() => 'Price range'}
                                value={value}
                                step={1}
                                min={1}
                                max={5}
                                marks={marks}
                                onChange={handleChange}
                                valueLabelDisplay="off"
                                sx={{
                                    color: 'white',
                                }}
                            />
                        </div>
                        <div className='title-dropdown'>Select genre(s) :</div>
                        <div className='dropdown'>
                            <MultipleSelectPlaceholder />
                        </div>
                        <button className='btnFiltrer' onClick={() => {
                            FilteredGenres = getFilteredGenres();
                            searchByFilters(searchTerm, value, FilteredGenres.FilteredGenres)
                        }}>Apply filter</button>
                    </div>
                    <div className="search-result">
                        <div className="ResultTitle"><h2> Results :</h2></div>
                        {restos?.length > 0 ? (
                            <SimpleBar style={{ maxHeight: 595 }}>
                                {restos.map((resto) => (
                                    <CarteResto restau={resto} />
                                ))}
                            </SimpleBar>
                        ) : (
                            <div className="empty">
                                <h2>No restaurants found</h2>
                            </div>
                        )}
                    </div>

                    <div id='mapH'>
                        <MapContainer center={[46.792991, -71.249422]} zoom={11} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {restos.map(resto => (
                                <Marker
                                    key={resto.id}
                                    position={[resto.location.coordinates[1], resto.location.coordinates[0]]}>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home;