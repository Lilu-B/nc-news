import React from 'react';
import Navigation from '../components/Navigation';
import AllArticlesSlice from '../components/AllArticlesSlice';
import Topics from '../components/Topics'
import Header from '../components/Header';

function MainPage() {
  return (
    <Header>
      <Topics />
      <AllArticlesSlice />
    </Header>
  );
}
  
export default MainPage;
