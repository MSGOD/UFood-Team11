import { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import CarteResto from '../components/CarteResto';
import '../App.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Slider from '@mui/material/Slider';
import {MultipleSelectPlaceholder, getFilteredGenres} from '../components/Dropdown';


const UFOOD_URL = "https://ufoodapi.herokuapp.com/unsecure"


const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [restos, setRestos] = useState([]);
    const [value, setValue] = useState([1, 5]);


    const searchRestos = async (name) => {
        const response = await fetch(`${UFOOD_URL}/restaurants?q=${name}&limit=155`);
        const data = await response.json();

        setRestos(data.items);
    };


    let lstGenres = [];
    let uniqueGenres = [];

    useEffect(() => {
        searchRestos("");
        {restos.map((resto) => (
            resto.genres.map((genre) => (
                lstGenres.push(genre)
            ))
        ))}
        lstGenres.forEach((c) => {
            if (!uniqueGenres.includes(c)) {
                uniqueGenres.push(c);
            }
        });
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


    let filteredGenres = getFilteredGenres();

    return(
        <>
            <div className="EnTete">

                <div className='Title'>
                    <h1>UFood</h1>
                </div>

                <div className='Reste'>

                    <input type="checkbox" id="checkbox"/>
                    <label for="checkbox" id="icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmLns="http://www.w3.org/2000/svg"><path stroke-Linejoin="round" strokeLinecap="round" stroke-width="2" d="M4 6h12M4 12h16M4 18h16"></path></svg>
                    </label>

                    <ul>
                        <li><a href="#" className="active">Home</a></li>
                        <li><a href="#">Username</a></li>
                    </ul>
                </div>
            </div>

            <div className="Page">
                <div className="search">
                    <input 
                        placeholder="Search for a restaurant"
                        value={searchTerm}
                        onChange={(e) => {setSearchTerm(e.target.value)}}
                    />
                    <img 
                        src = {SearchIcon}
                        alt = "Search"
                        onClick={() => {searchRestos(searchTerm)}}
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

                        <div className='dropdown'>
                            <MultipleSelectPlaceholder/>
                        </div>
                    </div>
                    <div className="search-result">
                        <div className="ResultTitle"><h2> Results :</h2></div>
                        {restos?.length > 0 ? (
                            <SimpleBar style={{ maxHeight: 595}}>
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
                </div>
            </div>
        </>
    )
}

export default Home;