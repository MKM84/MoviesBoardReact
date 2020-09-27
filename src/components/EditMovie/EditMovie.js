import React from 'react';
import { useParams } from "react-router-dom";
import '../MovieForm/MovieForm.css';
import MovieForm from '../MovieForm/MovieForm';


const EditMovie = (props) => {



    // Filtrage des films selon le paramètre de l'url
    const slug_  = useParams();
    const id_integer = parseInt(slug_.id);
    let movie = props.movies.filter((m) => m.id === id_integer)[0];



    return(

        <section>
  
            
            {/* // Formulaire d'édition d'un film */}

            {Object.keys(movie).length !== 0 ?  
                 <MovieForm 
                onAddOrEditMovie={props.onAddOrEditMovie} 
                movie={movie} 
                actors={movie.actors} 
                similarMovies={movie.similar_movies} 
                formType="update"
                movieId={movie.id}
                 />  
                
                : 
                <h3>Id does not exist...</h3>
                }

             

        </section>
    )
}

export default EditMovie;