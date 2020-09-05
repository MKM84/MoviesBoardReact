import React, { useState, useContext, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../MovieForm/MovieForm.css';
// import {useFormik} from 'formik';
import axios from 'axios';
import MoviesContext from '../../MoviesContext';


const EditMovie = (props) => {



    const movies = useContext(MoviesContext);
    const slug_  = useParams();
    console.log(slug_);
    const id_integer = parseInt(slug_.id);
    console.log(id_integer);

    const movie = movies.filter((m) => m.id === id_integer)[0];
    console.log(movie);
  
    // title: '' ,
    // release_date: '',
    // categories: [],
    // description: '',
    // poster : "",
    // backdrop: "",
    // actors: [],
    // similar_movies: [],
    // id : ''
    const [formData, setFormData] = useState({
            title: movie.title ,
            release_date: movie.release_date,
            categories: [],
            description: movie.description,
            poster : movie.poster,
            backdrop: movie.backdrop,
            actors: [],
            similar_movies: [],
            id : movie.id

    });
    
    

	const onUpdateData = (event) => {
		const target = event.target,
			name = target.name,
			value = target.value;

		const data = { ...formData };
		data[name] = value;
        setFormData(data);
           
	};


	const onSubmitForm = (event) => {
        event.preventDefault();
        setFormData(movie);
        console.log(formData);
        console.log(movie);

	};

    





    return(
        

        <section className="add-movie-form">
      
            <h3>Movie informations</h3>
            { typeof movie != 'undefined' ? 
            <form onSubmit={(e) => onSubmitForm(e)}>

                <div className="input-movie-data">
                        <label htmlFor="id">Id</label>
                        <input 
                        type="number" 
                        name="id" 
                        id="id-1" 
                        defaultValue={formData.id}
                        onChange={(e) =>onUpdateData(e)}
                        required
                        />
                </div>

                <div className="input-movie-data">
                    <label htmlFor="title">Title</label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    defaultValue={formData.title}
                    onChange={(e) =>onUpdateData(e)}
                    required
                    />
                </div>

                <div className="input-movie-data">
                    <label htmlFor="release_date">Release_date</label>
                    <input 
                    type="text"
                    name="release_date" 
                    id="release_date"
                    defaultValue={formData.release_date}
                    onChange={(e) =>onUpdateData(e)}
                    required
                    />
                </div>


              

                {/* <div className="input-movie-categories">
                    <label htmlFor="categories">Categories</label>
                    <div>
                        <input type="text" name="categories" id="categories" />
                        
                        <input type="text" name="categories-1" id="categories-1"/>
                        
                        <input type="text" name="categories-2" id="categories-2"/>
                        <input type="text" name="categories-3" id="categories-3"/>
                    </div>
                </div> */}



                <div className="input-movie-data">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    defaultValue={formData.description}
                    onChange={(e) =>onUpdateData(e)}
                    required>   
                    </textarea>
                </div>

                <div className="input-movie-data">
                    <label htmlFor="poster">Poster</label>
                    <input 
                    type="url" 
                    name="poster" 
                    id="poster"
                    defaultValue={`https://image.tmdb.org/t/p/w342/${movie.poster}`}
                    onChange={(e) =>onUpdateData(e)}
                    />
                </div>

                <div className="input-movie-data">
                    <label htmlFor="backdrop">Backdrop</label>
                    <input type="url"
                    name="backdrop"
                    id="backdrop" 
                    defaultValue={`https://image.tmdb.org/t/p/w342/${movie.backdrop}`}
                    onChange={(e) =>onUpdateData(e)}
                    />

                </div> 

                
                {/* <div className="input-movie-categories">
                    <label htmlFor="categories">Actors</label>
                    <div>
                        <input type="text" name="actors" id="actors"/>
                        
                        <input type="text" name="actors-1" id="actors-1"/>
                        
                        <input type="text" name="actors-2" id="actors-2"/>
                        <input type="text" name="actors-3" id="actors-3"/>
                    </div>
                </div> */}

                {/* <div className="input-movie-categories">
                    <label htmlFor="similar-movies">Similar movies</label>
                    <div>
                        <input type="text" name="similar-movies" id="similar-movies"/>
                        
                        <input type="text" name="similar-movies-1" id="similar-movies-1"/>
                        
                        <input type="text" name="similar-movies-2" id="similar-movies-2"/>
                        <input type="text" name="similar-movies-3" id="similar-movies-3"/>
                    </div>
                </div> */}

                <div className="submit-movie-info">
                    <input 
                    type="submit" 
                    value="Send movie informations"/>
                </div>

                
            </form>


            : null }  
        </section>
       
    )
}

export default EditMovie;