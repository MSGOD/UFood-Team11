import React from 'react';
import Home from './Pages/Home';
import User from './Pages/User';
import Restaurant_detail from './Pages/Restaurant_detail';
import Restaurant from './Pages/Restaurant';
import Connect from './Pages/Connect';
import {Route, Routes} from "react-router-dom";


let LoggedIn = false;
let UserName = "Nicolas";
let searchContent = "";

const getState = () => {
    return [LoggedIn, UserName, searchContent]
}

const setState = (Logged, Name, search="") => {
    LoggedIn = Logged;
    UserName = Name;
    searchContent = search;
}

function App() {
    return <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/User" element={<User />} />
        <Route path="/Connect" element={<Connect />} />
        <Route path="/Restaurant/:id" element={<Restaurant />} />

    </Routes>
}

export {App, getState, setState};