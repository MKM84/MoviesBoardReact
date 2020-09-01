import React from 'react';
import './Movies.css';


const Movie = (props) => {


    return(
        
        <div className="movie" id={props.movie.id}>
            <div>
                <img src={props.movie.poster} alt={props.movie.title}/>
            </div>
            <div className="movie-infos">
                <button className="delete fa fa-times-circle" onClick={(e) => props.onDeleteMovie(e, props.movie.id)}></button>
            <a href="#"> <h3>{props.movie.title}</h3></a>
                <p>{props.movie.description}</p>
                <p><time dateTime={props.movie.release_date}><b>{props.movie.release_date}</b></time></p>
                <button className="edit" onClick={(e) => props.onEditMovie(e, props.movie.id)}>Edit</button>
                
            </div>
        </div>
    
    )
}

export default Movie;