import React, { useEffect, useState } from 'react';
import './navbar.css';

function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={isScrolling ? 'navbar' : 'navbar hidden'}>
      <img className='Logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png' alt='logo' />
      <div className='links'>
        <button className='home'>Home</button>
        <button className='tv'>TV shows</button>
        <button className='movies'>Movies</button>
        <button className='latest'>Latest</button>
        <button className='list'>My List</button>
      </div>
      <img className='avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117' alt='avatar' />
    </div>
  );
}

export default Navbar;
