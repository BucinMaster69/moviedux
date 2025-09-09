import React, { useState, useEffect } from "react";
import "../styles.css";
import MoviesCard from "./MoviesCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setSearchGenre] = useState("All Genre");
  const [rating, setSearchRating] = useState("All");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenre = (e) => {
    setSearchGenre(e.target.value);
  };

  const handleRating = (e) => {
    setSearchRating(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genre" || movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearch = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8;
      case "OK":
        return movie.rating < 8 && movie.rating >= 5;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const filterMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearch(movie, searchTerm)
  );

  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search movie..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenre}
          >
            <option>All Genre</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Action</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRating}
          >
            <option>All</option>
            <option>Good</option>
            <option>OK</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filterMovies.map((movie) => (
          <MoviesCard movie={movie} key={movie.id}></MoviesCard>
        ))}
      </div>
    </div>
  );
}
