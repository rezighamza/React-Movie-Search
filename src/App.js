import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import NO_IMG from './/assets//NO_IMG.png'

const API_URL = 'http://www.omdbapi.com/?apikey=6e034b5f'


const App = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_URL}&s=batman`)
            .then(response => response.json())
            .then(jsonResponse => {
                setMovies(jsonResponse.Search)
                setLoading(false)
            })
    }, [])

    const searchMovies = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch(`${API_URL}&s=${search}`)
            .then(response => response.json())
            .then(jsonResponse => {
                setMovies(jsonResponse.Search)
                setLoading(false)
            })
    }

  return (
    <div className="container">
        <h1 className="title">React Movie Search</h1>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="search">Movie Name</label>
            <div className="control">
                <input className="input" type="text" name="search" placeholder="i.e. Batman" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className="button" type="submit">Search</button>
            </div>
        </form>
        <div className="card-list"> 
            {movies === undefined ? (<span className='NoMovies'>no results</span>) : movies.map((movie, index) => (
                <div className="card" key={index}>
                    <img className="card--image" src={movie.Poster === 'N/A' ? movie.Poster = NO_IMG : movie.Poster = movie.Poster} alt={movie.Title + ' poster'} />
                    <div className="card--content">
                        <h3 className="card--title">{movie.Title}</h3>
                        <p><small>RELEASE DATE: {movie.Year}</small></p>
                        <p><small>imdbID: {movie.imdbID}</small></p>


                    </div>
                </div>
            ))}
        </div>
    </div>  )
}

export default App
