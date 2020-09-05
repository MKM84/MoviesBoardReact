import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../MovieForm/MovieForm.css';
import {useFormik} from 'formik';
import axios from 'axios';
// import MoviesContext from '../../MoviesContext';


const EditMovie = (props) => {

    const slug_  = useParams();
    console.log(slug_);
    const id_integer = parseInt(slug_.id);
    console.log(id_integer);
    console.log(props);

    
    let movie_ = props.movies.filter((m) => m.id === id_integer)[0];
    console.log(movie_);
    const[movie, seMovie] = useState(movie_);

    useEffect(() => {
      seMovie(movie_);
    })

    const editMovieFormik = useFormik({
        initialValues: 
        { 
            title: movie.title,
            release_date: movie.release_date,
            categories: [],
            description: movie.description,
            poster : `https://image.tmdb.org/t/p/w342/${movie.poster}`,
            backdrop: `https://image.tmdb.org/t/p/w342/${movie.backdrop}`,
            actors:[],
            similar_movies:[],
            id: movie.id
        },
        onSubmit: values => {
          console.log(values);
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

            { typeof movie != 'undefined' ?  

            <form onSubmit={editMovieFormik.handleSubmit}>
                 <div className="input-movie-data">
                    <label htmlFor="id">Id</label>
                    <input 
                    type="number" 
                    name="id-1" 
                    id="id-1"  
                    defaultValue={editMovieFormik.values.id} 
                    onChange={editMovieFormik.hanndleChange}/>
                </div>

                <div className="input-movie-data">
                    <label htmlFor="title">Title</label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    defaultValue={editMovieFormik.values.title} 
                    onChange={editMovieFormik.handleChange}/>
                    {editMovieFormik.errors.title ? (
                    <div>{editMovieFormik.errors.title}</div>
                    ) : null}
                </div>

                <div className="input-movie-data">
                    <label htmlFor="release_date">Release_date</label>
                    <input 
                    type="text" 
                    name="release_date" 
                    id="release_date" 
                    defaultValue={editMovieFormik.values.release_date} 
                    onChange={editMovieFormik.handleChange}/>
                    {editMovieFormik.errors.release_date ? (
                    <div>{editMovieFormik.errors.release_date}</div>
                    ) : null}
                </div>

                <div className="input-movie-data">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    defaultValue={editMovieFormik.values.description} 
                    onChange={editMovieFormik.handleChange}></textarea>
                    {editMovieFormik.errors.description ? (
                    <div>{editMovieFormik.errors.description}</div>
                    ) : null}
                </div>

                <div className="input-movie-data">
                    <label htmlFor="poster">Poster</label>
                    <input type="url" 
                    name="poster" 
                    id="poster" 
                    defaultValue={editMovieFormik.values.poster} 
                    onChange={editMovieFormik.handleChange}/>
                    {editMovieFormik.errors.poster ? (
                    <div>{editMovieFormik.errors.poster}</div>
                    ) : null}
                </div>

                <div className="input-movie-data">
                    <label htmlFor="backdrop">Backdrop</label>
                    <input type="url" name="backdrop" id="backdrop"   
                    defaultValue={editMovieFormik.values.backdrop} 
                    onChange={editMovieFormik.handleChange}/>
                    {editMovieFormik.errors.backdrop ? (
                    <div>{editMovieFormik.errors.backdrop}</div>
                    ) : null}
                </div>
 
                <div className="submit-movie-info">
                    <input type="submit" value="Send movie informations"/>
                </div>

            </form>

                : null }  

        </section>
    )
}

export default EditMovie;