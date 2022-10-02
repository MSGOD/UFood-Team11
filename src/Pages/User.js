import { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import CarteResto from '../components/CarteResto';
import './User.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Slider from '@mui/material/Slider';
import {MultipleSelectPlaceholder, getFilteredGenres} from '../components/Dropdown';
import {Link} from 'react-router-dom';
import { setState, getState } from '../App.js';
import { useNavigate } from 'react-router-dom';


const UFOOD_URL = "https://ufoodapi.herokuapp.com/unsecure"


const User = () => {
    const [searchTerm, setSearchTerm] = useState(getState()[2]);
    const navigate = useNavigate();


    const searchRestos = async (name) => {
        const response = await fetch(`${UFOOD_URL}/restaurants?q=${name}&limit=155`);
        const data = await response.json();

        setState(getState()[0], getState()[1], name)
        navigate('/');
    };


    let lstGenres = [];
    let uniqueGenres = [];


    let LoggedIn = getState()[0];
    let UserName = getState()[1];

    useEffect(() => {
        
      }, []);
      

      

    return(
        <div className="app">
            <nav className="EnTete">

                <div className='Title'>
                    <h1>UFood</h1>
                </div>

                <div className='Reste'>

                    <input type="checkbox" id="checkbox"/>
                    <label for="checkbox" id="icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmLns="http://www.w3.org/2000/svg"><path stroke-Linejoin="round" strokeLinecap="round" stroke-width="2" d="M4 6h12M4 12h16M4 18h16"></path></svg>
                    </label>
                    
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

                    <ul>
                        <li>
                            <Link to="/" style={{ margin: 15, textDecoration: 'inherit'}}>
                                Home
                            </Link>
                        </li>
                        <li><a href="#" className="active">{UserName}</a></li>
                    </ul>
                </div>
            </nav>

            <div className="Page">
                    Hello world
            </div>
        </div>
    )
}

export default User;