import React, { useContext } from 'react';
import './Movies.css';
import Movie from './Movie';
// import MoviesContext from '../../MoviesContext';


const Movies = (props) => {

    // const movies = useContext(MoviesContext);
    const movies = props.movies;

    return(
       
        <main>

           <section className="filters-sec">
                <div className="filters">
                    <div className="filters-inputs">
                        <h5> <i className="fa fa-filter"></i> Choose filter(s) </h5>
                        <input type="text" placeholder=" Title"/>
                        <input type="date"/>
                        <select name="categories" id="categories-select">
                            <option value="">select a catogory</option>
                            <option value="dog"> Action</option>
                            <option value="cat">Adventure</option>
                            <option value="cat">Sciences-Fiction</option>
                        </select>
                    </div>
                </div>

                <div className="selected-filters-ctn">
                    <div>
                        <p className="selected-filter">Title </p>
                    </div>
                    <div>
                        <p className="selected-filter">Date </p>
                    </div>
                    <div>
                        <p className="selected-filter">Category </p>
                    </div>
                </div>
            </section>
        


            <section className="movies-sec">
            <h2>My movies</h2>
                <div className="movies-list-ctn">
                    {movies.map((movie) => (
                    <Movie 
                    key={movie.id} 
                    movie={movie} 
                    onDeleteMovie={props.onDeleteMovie} 
                    onEditMovie={props.onEditMovie} />
                    ))}
                </div>
            </section>

        </main>
  
    )
}

export default Movies