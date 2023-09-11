//import { useState } from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';
export function AllMovies() {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'cc1cb0477f9d2721c417ef14368e4cb4';
  // Images endpoint
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  // getin Api
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
    setMovies(results);
    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };

  // Search function
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      <div className="header">
        <a href="http://localhost:5173/allMovies" className="headerButtons">
          Películas
        </a>
        <a href="http://localhost:5173/movie" className="headerButtons">
          Populares
        </a>
        {/* Search Input */}
        <form className="search" onSubmit={searchMovies}>
          <input
            className="searchInput"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
      {/* showing poster and title */}
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="moviesPoster"
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
