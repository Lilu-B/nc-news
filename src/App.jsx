import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AllArticles from './pages/AllArticles';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/articles" element={<AllArticles />} />

      </Routes>
    </div>
  );
}

export default App
