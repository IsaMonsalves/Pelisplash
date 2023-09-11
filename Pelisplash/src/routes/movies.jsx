//import { useState } from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';
export function AllMovies() {
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'cc1cb0477f9d2721c417ef14368e4cb4';
  // endpoint para las imagenes
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';
  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
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
    setMovies(results);
    if (results.length) {
      await fetchMovie(results[0].id);
    }
  };
  // funcion para la peticion de un solo objeto y mostrar en reproductor de videos
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'videos',
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === 'Official Trailer'
      );
    }
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);
    window.scrollTo(0, 0);
  };
  // funcion para buscar peliculas
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  // Este es el equivalente al HTML
  return (
    <div>
      <div className="header">
        <a href="http://localhost:5173/allMovies" className="headerButtons">
          Películas
        </a>
        <a href="http://localhost:5173/movie" className="headerButtons">
          Populares
        </a>
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
      {/* contenedor para mostrar los posters y las peliculas en la peticion a la api */}
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
