import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { useState } from "react";
import MainHome from "./pages/index";
// import pages from "./pages";
import Navbar from "./component/Navbar";
import Canvas from "./component/Canvas";
// import SubHero from './component/Sub-Hero';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainHome /> } />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </Router>
  );
}

export default App;
