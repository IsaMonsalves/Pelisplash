//import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
export function movie() {
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

      <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
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
