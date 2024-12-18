import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AllArticles from './pages/AllArticles';
import ArticlePage from './pages/ArticlePage';
import ArticlesForTopic from './pages/ArticlesForTopic';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/articles" element={<AllArticles />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/topics/:topicSlug" element={<ArticlesForTopic />} />
      </Routes>
    </div>
  );
}

export default App
