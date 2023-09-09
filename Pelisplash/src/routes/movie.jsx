//import { useState } from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
export function MovieInfo() {
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
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    // const data = await fetchMovie(movie.id)
    // console.log(data);
    // setSelectedMovie(movie)
    fetchMovie(movie.id);

    setMovie(movie);
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

      {/* esto es por prueba */}
      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              height={350}
              width={200}
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={'youtube-container amru'}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      'Sorry, no trailer available'
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
}

//  export default App;
