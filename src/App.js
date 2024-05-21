import './App.css';
import React from 'react';
import NavBar from './Components/Navbar/navbar';
import Banner from './Components/Banner/banner';
import RowPoster from './Components/Row_Poster/row_poster';
import {action,originals} from './urls'
import Footer from './Components/footer/footer';

function App() {
  return (
    <div className='body'>
    <NavBar/>
    <Banner/>
    <RowPoster url={originals} title='Netflix Orginals' />
    <RowPoster url={action} title='Action' isSmall />
    <Footer/>
    </div>
  );
}

export default App;
