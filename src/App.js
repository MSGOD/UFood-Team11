import React from 'react';
import Home from './Pages/Home';
import User from './Pages/User';
import Restaurant from './Pages/Restaurant';
import {Route, Routes} from "react-router-dom";

function App() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User" element={<User />} />
        <Route path="/Restaurant/:id" element={<Restaurant />} />
    </Routes>
}

export default App;