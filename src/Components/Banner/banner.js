import React, { useEffect, useState } from 'react';
import './banner.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import ReactPlayer from 'react-player';

function Banner() {
  const [movie, setMovie] = useState();
  const [showPoster, setShowPoster] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    axios.get(`trending/movie/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data.results[0])
      setMovie(response.data.results[0]);
    });
  }, []);

  useEffect(() => {
    if (movie) {
      axios.get(`movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
        const trailer = response.data.results.find((result) => result.type === 'Trailer');
        if (trailer) {
          setTimeout(() => {
            setShowPoster(false);
            setTrailerUrl(trailer.key);
          }, 10000); // Show poster for 2 seconds before showing trailer
        }
      });
    }
  }, [movie]);

  return (
    <div className='banner'>
      {showPoster ? (
        <div style={{ backgroundImage:`url(${movie?imageUrl+movie.backdrop_path:''})` }} className='banner-image' />
      ) : (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerUrl}`}
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      )}
      <div className='Content'>
        <h1 className='title'>{movie ? movie.title : ''}</h1>
        <div className='Banner_button'>
          <button className='button'>Play</button>
          <button className='button'>My List</button>
        </div>
        <h1 className='Description'>{movie ? movie.overview : ''}</h1>
      </div>
      <div className='fade_bottom'></div>
    </div>
  );
}

export default Banner;
