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
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { setState, getState } from '../App.js';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Carousel } from 'react-carousel-minimal';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const UFOOD_URL = "https://ufoodapi.herokuapp.com/unsecure"


const Restaurant = () => {

    const { id } = useParams()
    const [searchTerm, setSearchTerm] = useState(getState()[2]);
    const navigate = useNavigate();

    const searchRestos = async (name) => {
        const response = await fetch(`${UFOOD_URL}/restaurants?q=${name}&limit=155`);
        const data = await response.json();

        setState(getState()[0], getState()[1], name)
        navigate('/');
    };

    useEffect(() => {
        
    }, []);


    let LoggedIn = getState()[0];
    let UserName = getState()[1];

    const data = [
        {
            image: "https://media.istockphoto.com/photos/modern-restaurant-interior-design-picture-id1211547141?k=20&m=1211547141&s=612x612&w=0&h=KiZX3NBZVCK4MlSh4BJ8hZNSJcTIMbNSSV2yusw2NmM=",
            caption: ""
        },
        {
          image: "https://media.istockphoto.com/photos/modern-restaurant-interior-design-picture-id1211547141?k=20&m=1211547141&s=612x612&w=0&h=KiZX3NBZVCK4MlSh4BJ8hZNSJcTIMbNSSV2yusw2NmM=",
          caption: ""
        },
        ];

    const item  = [
        {
            "_id": "1",
            "Title": "Restaurant ELGADO",
            "src": [
                "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
                "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
                "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
                "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
              ],
            "Description": "....",
            "OpenHour" : "8AM - 10PM",
            "Type" : "Gastronomique",
            "Cote": 4,
            "Price": "23000$ - 100000$",
            "Numero": +4189876655,
            "Position":[51.505, -0.09],
            "Adress": "3455 Rue de l'université",
            "City" : "Quebec, Canada"
            

        }
    ]
      
      const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }

 
      
    return (
    
        <>
            {
                 <div className="details">
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
                                    <Link to="/" style={{ margin: 15, textDecoration: 'inherit' }}>
                                        Home
                                    </Link>
                                </li>
                                {LoggedIn == true ? (
                                    <li>
                                        <Link to="/User" style={{ textDecoration: 'inherit' }}>
                                            {UserName}
                                        </Link>
                                    </li>
                                ) : (
                                    <li>
                                        <Link to="/Connect" style={{ textDecoration: 'inherit' }}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>

                        
                    
                    <div className='blocus'>
                        <div className="thumb" style={{ }} >    

                            <Carousel
                            data={data}
                            time={2000}
                            width="700px"
                            height="300px"
                            captionStyle={captionStyle}
                            
                            slideNumber={true}
                            slideNumberStyle={slideNumberStyle}
                            captionPosition="bottom"
                            automatic={true}
                            dots={true}
                            pauseIconColor="white"
                            pauseIconSize="40px"
                            slideBackgroundColor="darkgrey"
                            slideImageFit="cover"
                            thumbnails={true}
                            thumbnailWidth="100px"
                            style={{

                            textAlign: "center",
                            maxWidth: "700px",
                            maxHeight: "400px",
                            margin: "10px auto",
                            }}
                            />
                        </div>
                    

                        <div className='box'>
                            <div className='btn-container'>
                                <button className='bouton'> DIRECTION</button> 
                            </div>
                            
                            <div className="">
                                <MapContainer center={[51.505, -0.09]} style={{width: '100%',height: '490px'}} zoom={12}scrollWheelZoom={false}>
                                    <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                        <Marker position={[51.505, -0.09]}>
                                        <Popup>
                                        {item.adress}. <br /> {item.city}.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                    
                    <div className=''>
                        <ul class="nav-resto">
                            <li class="header">{item.Title} TEST</li>
                            <li>Fourchettes : {item.Price} TEST</li>
                            <li>Type : {item.Type}TEST</li>
                            <li>Heures d'ouvertures : {item.OpenHour}TEST</li>
                            <li>Cote moyenne : {item.Cote}TEST</li>
                            <li>Numéro : {item.Numero}TEST</li>
                            <li>Adresse : {item.Adress}. {item.City} </li>
                        </ul>
                    </div>

                </div>
            }

        </>
    )
}

export default Restaurant;