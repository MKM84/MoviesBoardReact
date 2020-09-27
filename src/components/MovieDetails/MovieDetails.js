
import React from 'react';
import './MovieDetails.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const MovieDetails = (props) => {

      // Filtrage des films selon le paramètre de l'url
    const slug  = useParams();
    const id_integer = parseInt(slug.id);
    let movie = props.movies.filter((m) => m.id === id_integer)[0];


    return(
       
        <main>
            
            { typeof movie != 'undefined' ?  
             
                <section className="movie-details-sec" >

                <div className="hero-img" style={{ backgroundImage : `url(${movie.backdrop})` }}> 
    
                    <div className="movie-details">

                        <div>
                            <img className="poster" src={movie.poster} alt={movie.title}/>
                        </div>
                     
                        <button 
                        className="movie-details-delete "
                        onClick={() => props.onDeleteMovie(movie.id)}>
                        <i className="fa fa-trash fa-8x"></i>
                        </button>

                        <button 
                        className="movie-details-edit" >
                        <Link to={`/movie/edit/${movie.id}`}> <i className="fa fa-edit fa-8x"></i></Link>
                        </button> 
                       
                        <div className="movie-details-infos">
                            <h2>{movie.title}</h2>
                            <p>{movie.description}</p>
                            <p><time dateTime={movie.release_date}><b>Release date :</b> {movie.release_date}</time></p>
                          
                            <p><b>Categories : </b>{movie.categories.join(', ')}</p>
                            
 
                            
                        </div>
        
                        
                        

                    </div>
                    </div>

                    <h3>Actors</h3>
                    <div className="actors-ctn">
                        
                    {/* liste des acteurs */}
                        {movie.actors.length > 0 ? 
                            movie.actors.map((actor, index) => 

                            <figure key={index} className='actor'>
                                    <img src={actor.photo} alt={actor.name} />
                                    <figcaption>
                                        <p className="actor-name"><b>{actor.name}</b></p>
                                        <p>{actor.character}</p> 
                                    </figcaption>
                            </figure>
                            )
                            :
                            <p>There are no actors availables for this film</p>
                        }

                    </div>


                    <h3>Similar movies</h3>
                    <div className="similar-movies-ctn">
                        {/* liste des films similaires */}
                        {movie.similar_movies.length > 0 ? 
                            movie.similar_movies.map((similar, index) => 

                            <figure key={index} className='similar'>     
                                 <img alt={similar.title} src={similar.poster} />
                                <figcaption>
                                <p className="similar-title">{similar.title}</p>
                                <p>{similar.release_date}</p>
                                </figcaption>
                            </figure>
                            )
                            :
                           <p>There are no similar movies availables for this movie</p>
                        }
                    </div>

                </section> 
            
            : 
                <h3 className="no-id">Id does not exist!</h3> }  
    
        
        </main> 
  
    )
}

export default MovieDetails;