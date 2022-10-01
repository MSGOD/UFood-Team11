import { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import CarteResto from '../components/CarteResto';
import '../App.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Slider from '@mui/material/Slider';
import { MultipleSelectPlaceholder, getFilteredGenres } from '../components/Dropdown';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'


const UFOOD_URL = "https://ufoodapi.herokuapp.com/unsecure"


const Restaurant = () => {
    const { id } = useParams()
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
        });
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="app">
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

                    <ul>
                        <li>
                            <Link to="/" style={{ margin: 10, textDecoration: 'inherit' }}>
                                Home
                            </Link>
                        </li>
                        <li><a href="#" className="active">Username</a></li>
                    </ul>
                </div>
            </nav>

            <div className="Page">
                <div id='map'>
                    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default Restaurant;