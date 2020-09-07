import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies/Movies';
import HomePage from './components/HomePage/HomePage';
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
    fetchMovies ();
  }, []);


  // Supprime un film du serveur REST 
  const onDeleteMovie = (id) => {
        axios.delete(`http://localhost:3000/movies/${id}`)
        .then(response => {
          console.log(response);
          if (response.status === 200){
            alert('Your movie has been deleted successfully');
            fetchMovies();
          }
        })
        .catch(error => {
          alert(error);
        })
        .then(hist.push('/movies'));
  }

  // const onAddMovieInfo = () => {
  //   fetchMovies();
  //   alert('Info');
  // }

  // Filtre les films par titre 
  const onFilterByTitle = (e) => {
    if ( e.keyCode === 13 && e.target.value !== '' ) {
        let moviesCopy = movies;
        let moviesToFilter = [];
        for (let i = 0; i < moviesCopy.length; i++) {
            if (moviesCopy[i].title.includes(e.target.value)){
                moviesToFilter.push(moviesCopy[i]);
            }
        }  
         setMovies(moviesToFilter); 
         setTitleFilter(!titleFilter);    
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
                <Route exact path="/"><HomePage /></Route>
                <Route exact path="/movies"> <Movies titleFilter={titleFilter} closeTitleFilter={closeTitleFilter} movies={movies} onDeleteMovie={onDeleteMovie} onFilterByTitle={onFilterByTitle}/></Route>
                <Route exact path="/movie/:id"><MovieDetails movies={movies} onDeleteMovie={onDeleteMovie}/></Route>
                <Route exact path="/add"><AddMovie /></Route>
                <Route exact path="/movie/edit/:id">{ movies.length > 0 ? <EditMovie movies={movies}/> : null}</Route>
            </Switch>;
        </div>


  );
}

export default App;
