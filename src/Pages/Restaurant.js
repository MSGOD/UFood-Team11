import { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import '../App.css';
import 'simplebar/dist/simplebar.min.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

    const defaultResto = {
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
    }

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



    const { id } = useParams()
    const [searchTerm, setSearchTerm] = useState(getState()[2]);
    const navigate = useNavigate();
    const [resto, setResto] = useState(defaultResto);

    const searchRestos = (name) => {
        setState(getState()[0], getState()[1], name)
        navigate('/');
    };


    const getResto = async () => {
        const BetterData = await fetch(`${UFOOD_URL}/restaurants/${id}`);
        const dataH = await BetterData.json();

        setResto(dataH)
    }

    useEffect(() => {
        getResto()
    }, []);


    let LoggedIn = getState()[0]
    let UserName = getState()[1];




    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    function decimalAdjust(type, value, exp) {
        type = String(type);
        if (!["round", "floor", "ceil"].includes(type)) {
            throw new TypeError(
                "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
            );
        }
        exp = Number(exp);
        value = Number(value);
        if (exp % 1 !== 0 || Number.isNaN(value)) {
            return NaN;
        } else if (exp === 0) {
            return Math[type](value);
        }
        const [magnitude, exponent = 0] = value.toString().split("e");
        const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
        // Shift back
        const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
        return Number(`${newMagnitude}e${+newExponent + exp}`);
    }

    const round10 = (value, exp) => decimalAdjust("round", value, exp);

    let cout = ""
    let y = resto.price_range

    for (let i = 0; i < y; i++) {
        cout += "$"
    }


    let genresString = ""
    resto.genres.map((genre) => (
        genresString += genre + ", "
    ))
    let o = genresString.length - 2
    const lstgenres = genresString.substring(0, o)


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

                            <ul className='MenuUser'>
                                <li className='MenuUserItem'>
                                    <Link to="/" style={{ margin: 15, textDecoration: 'inherit' }}>
                                        Home
                                    </Link>
                                </li>
                                {LoggedIn === true ? (
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
                    </nav>



                    <div className='blocus'>
                        <ul className="nav-resto">
                            <li className="header">{resto.name} </li>
                            <li>Price range : <br></br>{cout} </li>
                            <li>Genre(s) : <br></br>{lstgenres}</li>
                            <li>Opening Hours :
                                <br></br>Mon : {resto.opening_hours.monday}
                                <br></br>Tue : {resto.opening_hours.tuesday}
                                <br></br>Wed : {resto.opening_hours.wednesday}
                                <br></br>Thu : {resto.opening_hours.thursday}
                                <br></br>Fri : {resto.opening_hours.friday}
                                <br></br>Sat : {resto.opening_hours.saturday}
                                <br></br>Sun : {resto.opening_hours.sunday}
                            </li>
                            <li>Rating : <br></br>&#9733;{round10(resto.rating, -1)}/5</li>
                            <li>Phone : <br></br>{resto.tel}</li>
                            <li className='last'>Adress : <br></br>{resto.address} </li>
                        </ul>
                        <div className="thumb" style={{}} >

                            <Carousel
                                data={data}
                                captionStyle={captionStyle}
                                time={3000}
                                width="700px"
                                height="300px"

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
                                <MapContainer center={[46.792991, -71.249422]} style={{ width: '100%', height: '490px' }} zoom={12} scrollWheelZoom={true}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[resto.location.coordinates[1], resto.location.coordinates[0]]}>
                                        <Popup>
                                            {resto.address}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>

                    </div>

                    <div className=''>

                    </div>

                </div>
            }

        </>
    )
}

export default Restaurant;