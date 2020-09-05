
import React, { useContext } from 'react';
import './MovieDetails.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MoviesContext from '../../MoviesContext';
import Movie from '.././Movies/Movie';

const MovieDetails = (props) => {

    // const movies = useContext(MoviesContext);
    const slug  = useParams();
    const id_integer = parseInt(slug.id);

    let movie = props.movies.filter((m) => m.id === id_integer)[0];


    return(
       
        <main>

            { typeof movie != 'undefined' ?  
             
            <Movie 
                    key={movie.id} 
                    movie={movie} 
                    onDeleteMovie={props.onDeleteMovie} 
                    onEditMovie={props.onEditMovie} />
            
            : 
                <h3>This movie is not in your library or the movie id does not exist!</h3> }  
    
        </main> 
  
    )
}

export default MovieDetails;