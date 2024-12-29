import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import History from './components/History';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </Router>
    );
};

export default App;