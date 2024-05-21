// Row_poster.js
import React, { useEffect, useState } from 'react';
import './row_poster.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import Youtube from 'react-youtube';

function Row_poster(Props) {
  const [movie, setmovie] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [hoveredMovie, setHoveredMovie] = useState({});

  useEffect(() => {
    axios.get(Props.url).then((response) => {
      setmovie(response.data.results);
    }).catch(err => {
      // Handle error
    });
  }, [Props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0]);
      } else {
        alert("No Trailer");
      }
    });
  };

  const handleMouseEnter = (obj) => {
    setHoveredMovie(obj);
  };

  const handleMouseLeave = () => {
    setHoveredMovie({});
  };

  return (
    <div className='row'>
      <h2>{Props.title}</h2>
      <div className='row_posters'>
        {movie.map((obj) => (
          <div className='movie-card' key={obj.id} onMouseEnter={() => handleMouseEnter(obj)} onMouseLeave={handleMouseLeave}>
            <div className="poster-wrapper">
              <img onClick={() => handleMovie(obj.id)} className={Props.isSmall ? 'small_poster' : 'posters'} alt='poster' src={`${imageUrl + obj.backdrop_path}`} />
              {hoveredMovie.id === obj.id && (
                <div className='card-content'>
                  <h3>{ Props.isSmall ? `${obj.original_title} ` : `${obj.original_name}`}</h3>
                  <p>{obj.overview}</p>
                  <button>Play</button>
                  <button>List</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {urlId && <Youtube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default Row_poster;
