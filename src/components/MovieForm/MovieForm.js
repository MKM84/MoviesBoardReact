import React from 'react';
import './MovieForm.css';
import {useFormik} from 'formik';
import axios from 'axios';
import {useHistory} from "react-router";


const MovieForm = (props) => {
  const hist = useHistory();

    const movieFormik = useFormik({
        initialValues: 
        {
            title: props.movie.title,
            release_date: props.movie.release_date,
            categories: [],
            description: props.movie.overview,
            poster : `https://image.tmdb.org/t/p/w342/${props.movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w342/${props.movie.backdrop_path}`,
            actors:[],
            similar_movies:[]
            
        },
        
        // Ajoute un film dans le serveur REST 
        onSubmit: values => {
          
          axios.post('http://localhost:3000/movies', {
            title: values.title,
            release_date: values.release_date,
            categories: values.categories,
            description: values.description,
            poster : values.poster,
            backdrop: values.backdrop,
            actors: values.actors,
            similar_movies: values.similar_movies, 
        })
          .then((response) => {
            props.onAddMovie();
            if (response.status === 201){
              hist.push('/movies');
            }
          }, (error) => {
            alert(error);
          });
        },

        validate: values => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          } else if (values.title.length < 1) {
            errors.title = "Invalid title";
          }
    
          if (!values.release_date) {
            errors.release_date = "Required";
          } 

          if (!values.description) {
            errors.description = "Required";
          } 
          return errors;
        }
      });

    return(

        <section className="add-movie-form">
          
            <h3>Movie informations</h3>

          {/* Formulaire d'ajout d'un film */}
            <form onSubmit={movieFormik.handleSubmit}>
                
                <div className="input-movie-data">
                    <label htmlFor="title">Title</label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    defaultValue={movieFormik.values.title} 
                    onChange={movieFormik.handleChange}/>
                    {movieFormik.errors.title ? (
                    <div>{movieFormik.errors.title}</div>
                    ) : null}
                </div>
                
                <div className="input-movie-data">
                    <label htmlFor="release_date">Release_date</label>
                    <input 
                    type="text" 
                    name="release_date" 
                    id="release_date" 
                    defaultValue={movieFormik.values.release_date} 
                    onChange={movieFormik.handleChange}/>
                    {movieFormik.errors.release_date ? (
                    <div>{movieFormik.errors.release_date}</div>
                    ) : null}
                </div>

                <div className="input-movie-data">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    defaultValue={movieFormik.values.description} 
                    onChange={movieFormik.handleChange}>  
                    </textarea>
                    {movieFormik.errors.description ? (
                    <div>{movieFormik.errors.description}</div>
                    ) : null}
                </div>

                <div className="input-movie-data">
                    <label htmlFor="poster">Poster</label>
                    <input 
                    type="url" 
                    name="poster" 
                    id="poster" 
                    defaultValue={movieFormik.values.poster} 
                    onChange={movieFormik.handleChange}/>
                    {movieFormik.errors.poster ? (
                    <div>{movieFormik.errors.poster}</div>
                    ) : null}
                </div>

                <div className="input-movie-data">
                    <label htmlFor="backdrop">Backdrop</label>
                    <input 
                    type="url" 
                    name="backdrop" 
                    id="backdrop"   
                    defaultValue={movieFormik.values.backdrop} 
                    onChange={movieFormik.handleChange}/>
                    {movieFormik.errors.backdrop ? (
                    <div>{movieFormik.errors.backdrop}</div>
                    ) : null}
                </div>

                <div className="submit-movie-info">
                    <input 
                    type="submit" 
                    value="Add movie"
                    
                    />
                </div>  

            </form>
            
        </section>
    )
}

export default MovieForm;