import React, { useEffect, useState, useRef } from 'react';
import { Movie } from './types/Movie';
import './App.css';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API Ready');
    };

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

  const handleIframeLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    console.log('Iframe loaded successfully for:', selectedMovie?.title);
    
    // Get the iframe element
    const iframe = event.currentTarget;
    
    // Create new player
    if (window.YT && selectedMovie) {
      playerRef.current = new window.YT.Player(iframe, {
        events: {
          onReady: (event: any) => {
            console.log('Player ready');
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            // If video ends, restart it
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          }
        }
      });
    }
  };

  const handleMovieHover = (movie: Movie) => {
    setSelectedMovie(movie);
    // If we have an existing player, stop it
    if (playerRef.current) {
      playerRef.current.stopVideo();
    }
  };

  const handleMovieClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
            onMouseEnter={() => handleMovieHover(movie)}
            onClick={() => handleMovieClick()}
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
              border: 'none',
              background: '#000',
              transition: 'opacity 0.3s ease-in-out'
            }}
            onError={handleIframeError}
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      )}

      {showModal && selectedMovie && (
        <div className="movie-modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>×</button>
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