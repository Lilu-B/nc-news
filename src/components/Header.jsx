import React from 'react';
import Navigation from './Navigation';

function Header ({ children }) {
  return (
    <>
      <header>
        <Navigation />
        <h1>Welcome to NC News</h1>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}

export default Header;
