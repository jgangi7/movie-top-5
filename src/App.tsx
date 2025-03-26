import React, { useEffect, useState } from 'react';
import { Movie } from './types/Movie';
import { MovieCard } from './components/MovieCard';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetch('http://localhost:5072/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Top 5 Movies</h1>
      </header>
      <main className="movies-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </main>
      {selectedMovie && (
        <div className="movie-modal" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedMovie(null)}>×</button>
            <img src={selectedMovie.imageUrl} alt={selectedMovie.title} />
            <div className="modal-info">
              <h2>{selectedMovie.title}</h2>
              <p className="director">Directed by {selectedMovie.director}</p>
              <p className="year">{selectedMovie.year}</p>
              <p className="rating">★ {selectedMovie.rating}</p>
              <p className="description">{selectedMovie.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 