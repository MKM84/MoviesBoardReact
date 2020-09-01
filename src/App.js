import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies/Movies';
import MovieDetails from './components/MovieDetails/MovieDetails';
import AddMovie from './components/AddMovie/AddMovie';
import MovieForm from './components/MovieForm/MovieForm';

import axios from 'axios';
import { Switch, Route} from "react-router-dom";




function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setselectedMovie] = useState([{}]);
 
  useEffect(() => {

    axios.get('http://localhost:3000/movies').then(function (response) {
      setMovies(response.data);
      }).catch(function (error) {
      alert(error);
      });


  }, []);

    const onSelectMovie = (e, id_) => {
      e.preventDefault();
     let selectedMovie_ = movies.filter((movie) => movie.id === id_);
     setselectedMovie(selectedMovie_);
     console.log(selectedMovie_);

    }

  return (
    <div className="App">

      <header>
          <h1>MoviesBoard</h1>
      </header>
      <Switch>
        <Route exact path="/movies"><Movies movies={movies} onSelectMovie={onSelectMovie}/></Route>
        <Route exact path="/movie/:id"><MovieDetails movie={selectedMovie}/></Route>
        <Route exact path="/add/"><AddMovie /></Route>
        <Route exact path="/movie/edit/:id"><MovieForm /></Route>
      </Switch>;
      

      {/* <footer>
         <p>MoviesBoard</p>
      </footer> */}


    </div>
  );
}

export default App;
