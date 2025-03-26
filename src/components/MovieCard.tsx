import React from 'react';
import { Movie } from '../types/Movie';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
    onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <div className="movie-image">
                <img src={movie.imageUrl} alt={movie.title} />
                <div className="movie-overlay">
                    <h3>{movie.title}</h3>
                    <p className="director">{movie.director}</p>
                    <p className="year">{movie.year}</p>
                    <p className="rating">★ {movie.rating}</p>
                </div>
            </div>
        </div>
    );
}; 