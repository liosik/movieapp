import {useEffect, useState} from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const [favorites, setFavorites] = useState([])
    const getMovieRequest = async (searchValue) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=14484f4f`

        const response = await fetch(url)
        const responseJson = await response.json()

        if (responseJson.Search) setMovies(responseJson.Search)


    }

    useEffect(() => {
        getMovieRequest(searchValue)
    }, [searchValue]);
    useEffect(()=>{
        const movieFavorites = JSON.parse(
            localStorage.getItem('react-movie-app-favorites')
        );

        setFavorites(movieFavorites);
    }, []);



    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
    }

    const addFavoriteMovie=(movie)=>{
        const newFavoriteList = [...favorites, movie];
        setFavorites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
    }

    const removeFavoriteMovie = (movie) =>{
        const newFavoriteList = favorites.filter((favorite)=>favorite.imdbID !== movie.imdbID)
        setFavorites(newFavoriteList)
        saveToLocalStorage(newFavoriteList)

    }

    return (
        <div className='container-fluid'>
            <div className="movieapp">
                <div className="row d-flex align-items-center mr-4 mb-4">
                    <MovieListHeading heading="Movies"/>
                    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
                </div>
                <div className="row">
                    <MovieList handleFavoritesClick={addFavoriteMovie} favoriteComponent={AddFavorites} movies={movies}/>
                </div>
                <div className="row d-flex align-items-center mr-4 mb-4">
                    <MovieListHeading heading="Favorites"/>
                </div>
                <div className="row">
                    <MovieList handleFavoritesClick={removeFavoriteMovie} favoriteComponent={RemoveFavorites} movies={favorites}/>
                </div>
            </div>


        </div>
    );
}

export default App;
