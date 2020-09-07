import React from 'react';
import './Movies.css';
import Movie from './Movie';
import { Link } from "react-router-dom";



const Movies = (props) => {


    const movies = props.movies;
    const titleFilter = props.titleFilter;

    return(
       
        <main>

         
            {/* Section des filtres  */}
           <section className="filters-sec">
                <div className="filters">
                    <div className="filters-inputs">
                        <h5> <i className="fa fa-filter"></i> Choose filter(s) </h5>
                        <input type="text" placeholder=" Title" onKeyDown={(e) => props.onFilterByTitle(e)}/>
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

                    { titleFilter === true ? 

                    <div onClick={props.closeTitleFilter}>
                        <p className="selected-filter">Title </p>
                    </div>

                    : null }
                    {/* <div>
                        <p className="selected-filter">Date </p>
                    </div>
                    <div>
                        <p className="selected-filter">Category </p>
                    </div> */}
                </div>
            </section>
        
            {/* Liste des films */}
            { movies.length > 0 ? 

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

            : 
            <div className="empty">
            <h3> No movie found in your library!</h3> 
            <p><Link to="/add">Click here to add a movie</Link></p>
            </div>
            
            }
        </main>
  
    )
}

export default Movies