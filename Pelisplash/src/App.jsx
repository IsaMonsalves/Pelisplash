//import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { Button } from 'bootstrap';
function App() {
  const API_URL = 'https://www.themoviedb.org/3';
  // api url es el endpoint
  const API_KEY = 'cc1cb0477f9d2721c417ef14368e4cb4';
  //ORIGINAL se refiere al tamaño, en la doc aparece cómo modificarlos
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original';

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: 'Loading movies' });
  const [playing, setPlaying] = useState(false);

  // petición de api
  const fetchMovies = async (searchKey) => {
    // en la sgte línea se averigua si se está busccando o no una peli
    const type = searchKey ? 'search' : 'discover';
    const {
      // desestructuración de data según los resultados
      data: { results },
      // este movie es de la api, no es la const definida anteriormente
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
    // se buscan todas las pelis relacionadas
    setMovies(results);
    // se selecciona una peli
    setMovie(results[0]);
  };
  //  const [count, setCount] = useState(0);
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <div>
        {/* contenedor de pelis actuales */}
        <div className="container mt-3">
          <div className="row">
            {movies.map((movie) => {
              <div key={movie.id} className="col-md-4 mb-3">
                {/* se concatena la dirección con la imagen */}
                <img
                  src="{`${URL_IMAGE + movie.poster_path}`}"
                  alt=""
                  height={600}
                  width={'100%'}
                />
                <h4 className="text_center">{movie.title}</h4>
              </div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
