import './App.css';
export function App() {
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
        {/* <p>Películas</p>
        <p>Géneros</p>
        <p>Populares</p> */}
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
      <div className="welcome">
        Bienvenido! <br></br>
        <br></br> Pelisplash te sumerge en el emocionante mundo del cine.
        <br></br>
        Explora una amplia variedad de películas de diferentes géneros y épocas,
        mientras accedes a reseñas completas y detalladas de críticos y usuarios
        apasionados.<br></br> Además, podrás expresar tus propias opiniones
        evaluando las películas con puntuaciones y comentarios personalizados.
        <br></br>¡Únete a la comunidad cinéfila y comparte tus perspectivas
        mientras descubres nuevas joyas cinematográficas!
      </div>
    </div>
  );
}
