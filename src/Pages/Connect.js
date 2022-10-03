import { useEffect, useState } from 'react';
import SearchIcon from '../search.svg';
import './Connect.css';
import 'simplebar/dist/simplebar.min.css';
import { Link } from 'react-router-dom';
import { setState, getState } from '../App.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


const UFOOD_URL = "https://ufoodapi.herokuapp.com/unsecure"


const Connect = () => {
  const [searchTerm, setSearchTerm] = useState(getState()[2]);
  const [nameTerm, setnameTerm] = useState("");
  const navigate = useNavigate();

  const state = true;

  const connect = (name) => {
    if (name.length > 0){
      setState(state, name, getState()[2]);
      navigate('/');
    } else {
      alert("Please enter a UserName")
    }
  };

  const searchRestos = async (name) => {
    const response = await fetch(`${UFOOD_URL}/restaurants?q=${name}&limit=150`);
    const data = await response.json();

    setState(getState()[0], getState()[1], name)
    navigate('/');
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

          <ul className='MenuUser'>
            <li className='MenuUserItem'>
              <Link to="/" style={{ margin: 15, textDecoration: 'inherit' }}>
                Home
              </Link>
            </li>
            <li className='MenuUserItem'><a href="#" className="active">Login</a></li>
          </ul>
        </div>
      </nav>

      <div className="Page">
        <div className='test'>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: 'FitContents' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Username"
                defaultValue=""
                value={nameTerm}
                onChange={(e) => { setnameTerm(e.target.value) }}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText="Input décoratif, peut rester vide"
              />
            </div>
          </Box>
          <button className='btnLogin' onClick={() => {
            connect(nameTerm)
          }}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Connect;