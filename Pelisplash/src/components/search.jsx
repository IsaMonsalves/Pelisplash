import { useEffect, useState } from 'react';
import { fetchMovies } from './fetchMovies';

export const SearchInput = (e) => {
  const [searchKey, setSearchKey] = useState('');
  // averiguar si sirve el addventlistener
  e.preventDefault();
  fetchMovies(searchKey);
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div>
      <div className="header">
        <a href="http://localhost:5173/allMovies"> Películas </a>
        <a href="http://localhost:5173/movie"> Populares </a>
        <p>Películas</p>
        <p>Géneros</p>
        <p>Populares</p>
        {/* el buscador */}
        <form className="search">
          <input
            className="searchInput"
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="btn btn-primary">Search</button>
        </form>
      </div>
    </div>
  );
};
