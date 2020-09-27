import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies/Movies';
import MovieDetails from './components/MovieDetails/MovieDetails';
import AddMovie from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
import axios from 'axios';
import { Switch, Route, Link } from "react-router-dom";
import {useHistory} from "react-router";

function App(props) {

  const hist = useHistory();

  // Liste des films
  const [movies, setMovies] = useState([]);
  const [moviesIsApdated, setMoviesIsApdated] = useState(false);

  // Sert à afficher ou masquer l'encart qui indique que le filtrage par titre est active
  const [titleFilter, setTitleFilter] = useState(false);

  // Fetch les films du serveur REST et update le state de movies
  const fetchMovies = () => {
    axios.get('http://localhost:3000/movies').then(function (response) {
      setMovies(response.data);
      }).catch(function (error) {
      alert(error);
      });

  }
  
  useEffect(() => {
    setTimeout(() => {
      fetchMovies(); 
    }, 500);
      
  }, [ moviesIsApdated ]);



  // Supprime un film du serveur REST 
  const onDeleteMovie = (id) => {

    if (window.confirm('Are you sure you want to delete this movie from your library?')) {

      axios.delete(`http://localhost:3000/movies/${id}`)
      .then(response => {
        
        if (response.status === 200){
          setMoviesIsApdated(!moviesIsApdated);
          fetchMovies();
          console.log("Delete succes");
        }
      })
      .catch(error => {
        alert(error);
      })
      .then(hist.push('/'));
     }

  }


    // Mettre à jour le state après l'ajout d'un film 
    const onAddOrEditMovie = () => {
      fetchMovies(); 
      setMoviesIsApdated(!moviesIsApdated);
     
      
    }

  // Filtre les films par titre 
  const onFilterByTitle = (e) => {
    if ( e.keyCode === 13 && e.target.value !== '' ) {
        let moviesCopy = movies;
        const filteredMovies = moviesCopy.filter(m => m.title.includes(e.target.value));
        if(filteredMovies.length > 0 ) {
         setMovies(filteredMovies); 
         setTitleFilter(!titleFilter); 
        }   
    }  
  }

  // Annule le filtrage par titre 
  const closeTitleFilter = () => {
    fetchMovies();
    setTitleFilter(!titleFilter);  
  }
  
  return (

        <div className="App">
            <header>
            <Link to='/' ><h1>MoviesBoard</h1></Link>
            </header>
            <Switch>
                <Route exact path="/"> <Movies titleFilter={titleFilter} closeTitleFilter={closeTitleFilter} movies={movies} onDeleteMovie={onDeleteMovie} onFilterByTitle={onFilterByTitle}/></Route>
                <Route exact path="/movie/:id"><MovieDetails movies={movies} onDeleteMovie={onDeleteMovie}/></Route>
                <Route exact path="/add/movie"><AddMovie onAddOrEditMovie={onAddOrEditMovie}/></Route>
                <Route exact path="/movie/edit/:id">{ movies.length > 0 ? <EditMovie onAddOrEditMovie={onAddOrEditMovie} movies={movies}/> : null}</Route>
            </Switch>;
        </div>


  );
}

export default App;
