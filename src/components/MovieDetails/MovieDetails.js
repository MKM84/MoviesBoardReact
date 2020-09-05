
import React, { useContext } from 'react';
import './MovieDetails.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MoviesContext from '../../MoviesContext';

const MovieDetails = (props) => {

    const movies = useContext(MoviesContext);
    const slug  = useParams();
    const id_integer = parseInt(slug.id);
    const movie = movies.filter((m) => m.id === id_integer)[0];


    return(
       
        <main>

            { typeof movie != 'undefined' ?  
             
                <section className="movie-details-sec">
    
                    <div className="movie-details" id={movie.id}>

                        <div>
                            <img className="poster" src={movie.poster} alt={movie.title}/>
                        </div>

                        <button 
                        className="movie-details-delete fa fa-trash fa-10x"
                        onClick={() => props.onDeleteMovie(movie.id)}>
                        </button>

                        <div className="movie-details-infos">
                            <h2>{movie.title}</h2>
                            <p>{movie.description}</p>
                            <p><time dateTime={movie.release_date}><b>Release date :</b> {movie.release_date}</time></p>
                            <p><b>Actors : </b></p>
                            <p><b>Categories : </b></p>
                            <p><b>Similar movies : </b></p>
                            <br/>
                            <p className="backdrop-ctn"><b>Backdrop : </b> <img className="backdrop" src={movie.backdrop} alt={movie.title}/></p>
                        </div>
        
                        
                        <div className="movie-details-edit" ><b><Link to={`/movie/edit/${movie.id}`}>Edit</Link></b></div> 

                    </div>

                </section> 
            
            : 
                <h3>This movie is not in your library or the movie id does not exist!</h3> }  
    
        </main> 
  
    )
}

export default MovieDetails;