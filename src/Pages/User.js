import { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import CarteResto from '../components/CarteResto';
import './User.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Slider from '@mui/material/Slider';
import { MultipleSelectPlaceholder, getFilteredGenres } from '../components/Dropdown';
import { Link } from 'react-router-dom';
import { setState, getState } from '../App.js';
import { useNavigate } from 'react-router-dom';
import UserLogo from '../UserCircle.png';


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


    const Visited = [{
        "opening_hours": { "sunday": "11:00-21:00", "monday": "11:30-22:00", "tuesday": "11:30-22:00", "wednesday": "11:30-22:00", "thursday": "11:30-22:00", "friday": "11:30-22:00", "saturday": "11:00-22:00" },
        "pictures": ["https://ufood.s3-us-west-2.amazonaws.com/pictures/121ad2e3-dffb-4a7b-82ef-3eea9c337750.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/5635dd10-ac44-4042-8a10-a551f716aff3.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/d5ee5ec5-c82c-4e38-be50-129295f05499.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/c7a8fea4-8b3c-42bd-bd66-5a8009233758.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/8bf92b33-66ed-4b61-b1c8-cc7e30fee54b.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/69cef28c-31d9-4e02-8295-86855cea5611.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/485ed792-6358-4ffe-baf4-623772b4dcb0.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/66cf7bd7-3aa8-4a86-bc14-ae2782879104.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/36b736ba-b98b-4cd3-8c6e-8f47d3854d53.jpg", "https://ufood.s3-us-west-2.amazonaws.com/pictures/3c207c0d-db68-4e24-a5f3-ed1fa919ccdd.jpg"],
        "name": "Queues de Castor",
        "place_id": "ChIJ-fDBsRWRuEwR04p9vegfIdo",
        "tel": "(418) 694-1444",
        "address": "28 Boulevard Champlain, Québec, QC G1K 4H7, Canada",
        "price_range": 1,
        "rating": 2.6287744017056416,
        "genres": ["desserts"],
        "location": {
            "coordinates": [-71.2034528, 46.8119889],
            "type": "Point"
        },
        "id": "5f31fc6155d7790550c08afe"
    }]

    const disconnect = () => {
        setState(false, "", getState()[2]);
        navigate('/');
    };

    return (
        <div className="appUser">
            <nav className="EnTete">

                <div className='Title'>
                    <h1>UFood</h1>
                </div>

                <div className='Reste'>

                    <input type="checkbox" id="checkbox" />
                    <label for="checkbox" id="icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmLns="http://www.w3.org/2000/svg"><path stroke-Linejoin="round" strokeLinecap="round" stroke-width="2" d="M4 6h12M4 12h16M4 18h16"></path></svg>
                    </label>

                    <div className="search">
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

                    <ul className='MenuUser'>
                        <li className='MenuUserItem'>
                            <Link to="/" style={{ margin: 15, textDecoration: 'inherit' }}>
                                Home
                            </Link>
                        </li>
                        <li className='MenuUserItem'><a href="#" className="active">{UserName}</a></li>
                    </ul>
                </div>
            </nav>

            <div className="Page">
                <div className='UserBanner'>
                    <img src={UserLogo} className='UserLogo' />
                    <ul className='UsrInfo'>
                        <li className='Profile'>Profile</li>
                        <li className='UsrName'>{UserName}</li>
                        <li className='UsrScore'>User Score : 420</li>
                    </ul>
                    <button className='UsrDisconnect' onClick={() => {
                        disconnect()
                    }}>Disconnect</button>
                </div>

            </div>
            <div className='RestOfPage'>
                <div className='ThreeDots'>...</div>
                <div className='RecentlyVisited'>Recently visited :</div>
                {Visited.length > 0 ? (
                    <div className='RestosVisited'>
                        {Visited[0].name}<br></br>
                        <br></br>
                        Number of visits : 5
                    </div>
                ) : (
                    <div className='NoRestos'>Nothing to see here...<br></br>It'd be wiser to return home.</div>
                )}
            </div>
        </div>
    )
}

export default User;