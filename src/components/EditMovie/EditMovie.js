import React from 'react';
import { useParams } from "react-router-dom";
import '../MovieForm/MovieForm.css';
import {useFormik} from 'formik';
import axios from 'axios';
import {useHistory} from "react-router";


const EditMovie = (props) => {

    const hist = useHistory();

    // Filtrage des films selon le paramètre de l'url
    const slug_  = useParams();
    const id_integer = parseInt(slug_.id);
    let movie = props.movies.filter((m) => m.id === id_integer)[0];


    // Formulaire d'édition d'un film
    const editMovieFormik = useFormik({
        initialValues: 
        { 
            title: movie.title,
            release_date: movie.release_date,
            categories: [],
            description: movie.description,
            poster : movie.poster,
            backdrop: movie.backdrop,
            actors:[],
            similar_movies:[]
        },
        // Update le film dans le serveur
        onSubmit: values => {

          axios.put('http://localhost:3000/movies/'+ movie.id, {  
            title: values.title,
            release_date: values.release_date,
            categories: values.categories,
            description: values.description,
            poster : values.poster,
            backdrop: values.backdrop,
            actors: values.actors,
            similar_movies: values.similar_movies
             
            })
            .then((response) => {
            console.log(response);
            props.onEditMovieInfo()
            if (response.status === 200){
              hist.push('/movies');
            }
            }, (error) => {
            alert(error);
            })
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
            
            {/* // Formulaire d'édition d'un film */}
            { typeof movie != 'undefined' ?  

            <form onSubmit={editMovieFormik.handleSubmit}>
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

                : <h3>Id does not exist...</h3> }  

        </section>
    )
}

export default EditMovie;