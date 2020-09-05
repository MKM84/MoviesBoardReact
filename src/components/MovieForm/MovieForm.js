import React from 'react';
import './MovieForm.css';
import {useFormik} from 'formik';
import axios from 'axios';


const MovieForm = (props) => {

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
            similar_movies:[],
            id: props.movie.id  
        },

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
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        },

        validate: values => {
          const errors = {};
          if (!values.title) {
            errors.title = "Required";
          } else if (values.title.length < 1) {
            errors.title = "Invalid title";
          }

          if (!values.id) {
            errors.id = "Required";
          } else if (isNaN(values.id)) {
            errors.id = "Type of id must be integer";
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

            <form onSubmit={movieFormik.handleSubmit}>

                <div className="input-movie-data">
                    <label htmlFor="id">Id</label>
                    <input 
                    type="number" 
                    name="id" 
                    id="id"  
                    defaultValue={movieFormik.values.id} 
                    onChange={movieFormik.hanndleChange}/>
                </div>
                
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
                    value="Send movie informations"
                    
                    />
                </div>  

            </form>
            
        </section>
    )
}

export default MovieForm;