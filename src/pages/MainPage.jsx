import React from 'react';
import Navigation from '../components/Navigation';
import AllArticles from './AllArticles';


function MainPage() {
    return (
      <>
        <header>
          <Navigation />
          <h1>Welcome to NC News</h1>
        </header>
        <main>
          <AllArticles />
        </main>
      </>
    );
}
  
export default MainPage;
