import React,{ useState, useEffect } from 'react';
import './AddMovie.css';
import axios from 'axios';
import MovieForm from '../MovieForm/MovieForm';


const AddMovie = (props) => {

    const Img = "https://dummyimage.com/200x300/ece9f5/47478.jpg"
    
    // Valeurs des deux champs du formulaire d'ajout d'un film
    const [movieTitle, setMovieTitle] = useState(null);
    const [movieDate, setMovieDate] = useState(null);

    // Les données reçues de MDB
    const [movieSearchResult, setMovieSearchResult] = useState([]);
   
    // Affiche ou faire disparaitre le formulaire d'ajout
    const [formWithMovie, setFormWithMovie] = useState(false);
    const [form, setForm] = useState(false);
    const [formCondition, setFormCondition] = useState(false);

    // Le film à éditer ou à ajouter
    const [movieToAdd, setMovieToAdd] = useState({});
    const [actorsToAd, setActorsToAd] = useState([]);
    const [similarMoviesToAdd, setSimilarMoviesToAdd] = useState([]);
 



    // Set la valeur du champs title du formulaire de recherche
    const onChangeTitle = (e) => {
        setMovieTitle(e.target.value);
    }
     // Set la valeur du champs date du formulaire de recherche
    const onChangeDate = (e) => {
        setMovieDate(e.target.value);
    }


useEffect(() => {

    if(formWithMovie === true) {
        buildMovieToAdd(movieToAdd);
        setMovieToAdd(movieToAdd);     
    }
    setFormWithMovie(false);
    setForm(true);
    if(form === true ){
        setFormCondition(true)
    }


}, [formWithMovie]);



    // Base url de MDB search movie
    const baseUrl = "https://api.themoviedb.org/3/search/movie?";
    // MDB api key
    const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;  


    // Cherche les films de MDB 
    const searchMovie = (e) => {
        e.preventDefault();
        axios.get(`${baseUrl}api_key=${REACT_APP_TMDB_KEY}&query=${movieTitle}&primary_release_year=${movieDate}`)
        .then(response => {
            setMovieSearchResult(response.data.results);
            setMovieToAdd({});
        })
        .catch(error => {
            alert(error);
        })
    }


        // Se déclenche au click sur un film qu'on souhaite ajouter
        const onChooseMovie = (id_) => {
            let id = parseInt(id_); 
            setMovieSearchResult([])        
            let selectedMovie = movieSearchResult.filter((movie) => movie.id === id)[0];
            setFormWithMovie(true);
            setMovieToAdd(selectedMovie);
           
        }
            // Prépare le film à ajouter

            const buildMovieToAdd = (choosedMovie) => {

            const detailsBaseUrl = "https://api.themoviedb.org/3/movie/";
            const basUrlImg = `https://image.tmdb.org/t/p/w342`
    
            // Cherche les acteurs, films similaires, categories 
            const getActors = axios.get(`${detailsBaseUrl}${choosedMovie.id}/credits?api_key=${REACT_APP_TMDB_KEY}`);
            const getSimilarMovies = axios.get(`${detailsBaseUrl}${choosedMovie.id}/similar?api_key=${REACT_APP_TMDB_KEY}`);
            const getDetails = axios.get(`${detailsBaseUrl}${choosedMovie.id}?api_key=${REACT_APP_TMDB_KEY}`);
                
            axios.all([getActors, getSimilarMovies, getDetails]).then(axios.spread((...responses) => {
                const resActors= responses[0];
                const resSimilarMovies = responses[1];
                const resDetails = responses[2];
    
                const fetchedActors  = resActors.data.cast;
                const fetchedSimilarMovies = resSimilarMovies.data.results;
                const fetchedCategories = resDetails.data.genres.map(genre => genre.name);
    
    
                // Préparer la liste des acteurs
                const actors =[];
                fetchedActors.map((actor) => {       
                    return (actors.push(actor = {
                        name: actor.name,
                        character : actor.character,
                        photo : actor.profile_path !== undefined && actor.profile_path !== null ? basUrlImg + actor.profile_path : Img
                    }))
                   
                });
                setActorsToAd(actors.slice(0,10));
    
                 // Préparer la liste des films similaires
                 const similars =[];
                 fetchedSimilarMovies.map((similar) => {  
                    return (similars.push(similar = {
                        title: similar.title,
                        poster: similar.poster_path !== undefined  && similar.poster_path !== null? basUrlImg + similar.poster_path : Img,
                        release_date : similar.release_date
                    }))
                    
                });

                setSimilarMoviesToAdd(similars.slice(0,10));
                
                // Le film à ajouter
                const readyMovieToAdd = {
                    title: choosedMovie.title,
                    poster: choosedMovie.poster_path !== undefined && choosedMovie.poster_path !== null ? basUrlImg + choosedMovie.poster_path : Img,
                    backdrop : choosedMovie.backdrop_path !== undefined && choosedMovie.backdrop_path !== null? basUrlImg + choosedMovie.backdrop_path : Img,
                    categories: fetchedCategories,
                    release_date: choosedMovie.release_date,
                    description: choosedMovie.overview,
                    similar_movies: [],
                    actors: []
                }

                setMovieToAdd(readyMovieToAdd);
                
            }))
            
            .catch(errors => {
                alert(errors)
              }) 
            }



            
           
    return(
        <main>

        {/* Formulaire de recherche d'un film de MDB */}

                
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
            



             
                    {/* Resultas de recherche (movies) */}

                <section className="movie-result-form">
                    {movieSearchResult.map(movie => 
                        <div className="searchResult" key={movie.id}>
                        <div className="img-ctn"><img src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : "https://dummyimage.com/200x300/ece9f5/47478.jpg" } alt={movie.title}/></div>
                            <div>
                                <h4>{movie.title}</h4>
                                <p>{movie.release_date}</p>
                            </div>
                            <div>
                                <button onClick={() => onChooseMovie(movie.id)}><i className="fa fa-plus-circle"></i></button>
                            </div>
                        </div>
                    )}
                 </section>
             
                 {formCondition === false && movieSearchResult.length === 0  ?    

                    <div className="please-search">
                        <b><p>Please search your movie...</p></b>
                    </div>
                :
                null

                }   
       

                {/* Formulaire d'ajout d'un film */}

                {Object.keys(movieToAdd).length !== 0 && formCondition === true ?  
                 <MovieForm 
                 onAddOrEditMovie={props.onAddOrEditMovie} 
                 movie={movieToAdd} 
                 actors={actorsToAd} 
                 similarMovies={similarMoviesToAdd} 
                 formType="create"/>  
                
                : 
                null
                }

        </main>

    )}

export default AddMovie;