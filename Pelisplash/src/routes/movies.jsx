//import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
export function movies() {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'cc1cb0477f9d2721c417ef14368e4cb4';
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';
  // endpoint para las imagenes
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  //const [selectedMovie, setSelectedMovie] = useState({})
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: 'Loading Movies' });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion get a la api
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? 'search' : 'discover';
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    //console.log('data',results);
    //setSelectedMovie(results[0])

    setMovies(results);
    setMovie(results[0]);

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };
  return (
    <div>
      <div className="header">
        <p>Películas</p>
        <p>Géneros</p>
        <p>Populares</p>
        {/* el buscador */}
        <form className="search" onSubmit={searchMovies}>
          <input
            className="searchInput"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
      <h2 className="popular" id="popular">
        Populares
      </h2>

      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="moviePoster"
              onClick={() => selectMovie(movie)}
            >
              <img
                className="movieImage"
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={350}
                width={200}
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
