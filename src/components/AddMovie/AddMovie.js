import React,{ useState } from 'react';
import './AddMovie.css';
import axios from 'axios';
import MovieForm from '../MovieForm/MovieForm';

const AddMovie = (props) => {
    
    // Valeurs des deux champs du formulaire d'ajout d'un film
    const [movieTitle, setMovieTitle] = useState(null);
    const [movieDate, setMovieDate] = useState(null);

    // Les données reçues de MDB
    const [movieSearchResult, setMovieSearchResult] = useState([]);
   
    // Affiche ou faire disparaitre le formulaire d'ajout
    const [movieForm, setShowMovieForm] = useState(false);

    // Le film à édité
    const [movieToAdd, setMovieToAdd] = useState([{}]);

    // Sert à afficher ou faire dîsparaitre le formulaire de recherche d'un film de MDB
    const [fetchDataForm, setFetchDataForm] = useState(true);


    // Set la valeur du champs title du formulaire de recherche
    const onChangeTitle = (e) => {
        setMovieTitle(e.target.value);
    }
     // Set la valeur du champs date du formulaire de recherche
    const onChangeDate = (e) => {
        setMovieDate(e.target.value);
    }

    
    // Afficher ou faire disparaître le formulaire d'ajout
    const showMovieForm = () => { 
        setShowMovieForm(!movieForm); 
    } 

    // Se déclenche au click sur un film qu'on souhaite rajouter dans AddMovie
    const onChooseMovie = (id) => {
        let id_ = parseInt(id);
        showMovieForm();
        let choosedMovie = movieSearchResult.filter((movie) => movie.id === id_);
        console.log(movieSearchResult);
        console.log(choosedMovie);
        setMovieToAdd(choosedMovie);
        console.log(movieToAdd);

        // Faire disparaitre le resultats de recherche
        setMovieSearchResult([]);
   
    }
        
    // Base url de MDB search movie
    const baseUrl = "https://api.themoviedb.org/3/search/movie?";
    const apiKey = "e3a8676a948711d4475b4c1d59134da1";    


    // Cherche les films de MDB 
    const searchMovie = (e) => {
        e.preventDefault();
        axios.get(`${baseUrl}api_key=${apiKey}&query=${movieTitle}&primary_release_year=${movieDate}`)
        .then(response => {
            console.log(response);
            setMovieSearchResult(response.data.results);
            setFetchDataForm(false);
        })
        .catch(error => {
            alert(error);
        })
    }
    

    return(
        <main>

        {/* Formulaire de recherche d'un film de MDB */}

                { fetchDataForm === true ? 
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
                : null }


           
             
                    {/* Resultas de recherche (movies) */}

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
             
                 { movieSearchResult.length === 0  && movieForm === false ?    

                    <div className="please-search">
                        <b><p>Please search your movie...</p></b>
                    </div>
                :
                null

                }   
       

                {/* Formulaire d'ajout d'un film */}

                {(movieForm === true ?  <MovieForm  movie={movieToAdd[0]}/>  
                : 
                null
                )}

        </main>

    )}

export default AddMovie;