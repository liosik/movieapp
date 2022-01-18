import React from 'react';

const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent
    return (
        <div className=" col d-flex justify-content-start m-3">
            {props.movies.map((movie, index) => (
                <div className="image-container m-5" key={index}>
                    <img src={movie.Poster} alt="movie"/>
                    <div onClick={()=>props.handleFavoritesClick(movie)} className="overlay d-flex align-items-center justify-content-center" >
                        <FavoriteComponent/>
                    </div>
                </div>))}
        </div>
    );
};

export default MovieList;