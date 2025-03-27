import React, { useEffect, useState } from 'react';
import { Movie } from './types/Movie';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching movies from API...');
    fetch('http://localhost:5072/api/movies')
      .then(response => {
        console.log('API Response:', response.status, response.statusText);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => {
        console.log('Movies data received:', data);
        setMovies(data);
        setSelectedMovie(data[0]); // Select first movie by default
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
      });
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      console.log('Selected movie changed:', {
        title: selectedMovie.title,
        videoUrl: selectedMovie.videoUrl
      });
    }
  }, [selectedMovie]);

  const handleIframeError = () => {
    console.error('Iframe failed to load:', selectedMovie?.videoUrl);
  };

  const handleIframeLoad = () => {
    console.log('Iframe loaded successfully for:', selectedMovie?.title);
  };

  if (error) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>My Top 5 Movies</h1>
        </header>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Top 5 Movies</h1>
      </header>
      
      <div className="movies-grid">
        {movies.map(movie => (
          <h2
            key={movie.id}
            className={`movie-title ${movie.id === selectedMovie?.id ? 'active' : ''}`}
            onClick={() => setSelectedMovie(movie)}
          >
            {movie.title}
            <span className="movie-year">{movie.year}</span>
          </h2>
        ))}
      </div>

      {selectedMovie && (
        <div className="background-media">
          <iframe
            className="background-video"
            src={selectedMovie.videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={selectedMovie.title}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1.5)',
              pointerEvents: 'none',
              opacity: 0.8,
              border: 'none',
              background: '#000'
            }}
            onError={handleIframeError}
            onLoad={handleIframeLoad}
          ></iframe>
          <div style={{ position: 'fixed', bottom: 10, left: 10, background: 'rgba(0,0,0,0.8)', padding: '5px', zIndex: 1000 }}>
            Debug: {selectedMovie.videoUrl}
          </div>
        </div>
      )}

      {selectedMovie && (
        <div className="movie-modal" style={{ display: 'none' }}>
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedMovie(null)}>×</button>
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