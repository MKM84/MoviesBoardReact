import React,{ useState } from 'react';
import './AddMovie.css';
import axios from 'axios';
import MovieForm from '../MovieForm/MovieForm';

const AddMovie = () => {

    const [movieTitle, setMovieTitle] = useState(null);
    const [movieDate, setMovieDate] = useState(null);

    const [movieSearchResult, setMovieSearchResult] = useState([]);

    const [resultMovies, setResultMovies] = useState(false);
    const [movieForm, setShowMovieForm] = useState(false);

    const [movieToAdd, setMovieToAdd] = useState([{}]);

    const onChangeTitle = (e) => {
        setMovieTitle(e.target.value);
    }

    const onChangeDate = (e) => {
        setMovieDate(e.target.value);
    }

    const showResults = () => { 
        setResultMovies(!resultMovies);
    } 

    const showMovieForm = () => { 
        setShowMovieForm(!movieForm); 
    } 

    const onChooseMovie = (id) => {
        let id_ = parseInt(id);
        showMovieForm();
        let choosedMovie = movieSearchResult.filter((movie) => movie.id === id_);
        console.log(movieSearchResult);
        console.log(choosedMovie);
        setMovieToAdd(choosedMovie);
        console.log(movieToAdd);
        showResults();
   
    }
        
    const baseUrl = "https://api.themoviedb.org/3/search/movie?";
    const apiKey = "e3a8676a948711d4475b4c1d59134da1";    

    const searchMovie = (e) => {
        e.preventDefault();
        axios.get(`${baseUrl}api_key=${apiKey}&query=${movieTitle}&primary_release_year=${movieDate}`)
        .then(response => {
            console.log(response);
            setMovieSearchResult(response.data.results);
            if (response.data.results.length > 0) {
                showResults();
                
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    

    return(
        <main>
            <section className="form-filters-sec">
                <div className="form-filters">
                    <div className="form-filters-inputs">
                        <h5> Find movie</h5>
                        <form onSubmit={(e) => searchMovie(e)}>
                        
                            <input type="text"
                            placeholder=" Title"
                            onChange={(e) => onChangeTitle(e)}/>

                            <input 
                            type="text" 
                            placeholder=" Date" 
                            onChange={(e) => onChangeDate(e)}/>

                            <input 
                            type="submit" 
                            value="Find"/>

                        </form>                       
                    </div>
                </div>
            </section>



            {(resultMovies === true ? 
            
                <section className="movie-result-form">
                    {movieSearchResult.map(movie => 
                        <div className="searchResult" key={movie.id}>
                            <div>
                                <h4>{movie.title}</h4>
                                <p>{movie.release_date}</p>
                            </div>
                            <div>
                                <button onClick={() => onChooseMovie(movie.id)}>Choose</button>
                            </div>
                        </div>
                    )}
                 </section>
             
            :    

                <div className="please-search">
                <b><p>Please search your movie...</p></b>
                </div>

            )}
       

                {(movieForm === true ?  <MovieForm movie={movieToAdd[0]}/>  
                : 
                null
                )}

        </main>

    )}

export default AddMovie;