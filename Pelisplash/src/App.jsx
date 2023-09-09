//import { useState } from 'react';
import { useState } from 'react';
import './App.css';
export function App() {
  // Este es el equivalente al HTML
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
    </div>
  );
}
