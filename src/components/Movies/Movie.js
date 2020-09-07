import React from 'react';
import './Movies.css';
import { Link } from "react-router-dom";


const Movie = (props) => {



    return(
        
        <div className="movie" id={props.movie.id}>
            <div className="movie-img-ctn">
                <img src={props.movie.poster} alt={props.movie.title}/>
            </div>
            <button className="delete fa fa-trash fa-7x" onClick={(e) => props.onDeleteMovie(props.movie.id)}></button>
            <div className="movie-infos">
                <h3><Link to={`/movie/${props.movie.id}`}>{props.movie.title}</Link></h3>
                {/* Tronquer la description */}
                <p>{`${props.movie.description.substr(0, 150)}...`}</p>
                <p><time dateTime={props.movie.release_date}><b>{props.movie.release_date}</b></time></p>  
            </div>
            <div className="edit" ><b><Link to={`/movie/edit/${props.movie.id}`}>Edit</Link></b></div> 
        </div>
    
    )
}

export default Movie;