import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies/Movies';
import HomePage from './components/HomePage/HomePage';
import MovieDetails from './components/MovieDetails/MovieDetails';
import AddMovie from './components/AddMovie/AddMovie';
import EditMovie from './components/EditMovie/EditMovie';
import axios from 'axios';
import { Switch, Route, Link } from "react-router-dom";
import { MoviesProvider } from './MoviesContext';
import {useHistory} from "react-router";

function App(props) {
  const hist = useHistory();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/movies').then(function (response) {
      setMovies(response.data);
      }).catch(function (error) {
      console.log(error);
      });
  }, []);


  const onDeleteMovie = (id) => {
        axios.delete(`http://localhost:3000/movies/${id}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
        .then(hist.push('/movies'));
  }
  
  return (
    <MoviesProvider value={movies}>

        <div className="App">
            <header>
            <Link to='/' ><h1>MoviesBoard</h1></Link>
            </header>
            <Switch>
                <Route exact path="/"><HomePage /></Route>
                <Route exact path="/movies"><Movies onDeleteMovie={onDeleteMovie} /></Route>
                <Route exact path="/movie/:id"><MovieDetails onDeleteMovie={onDeleteMovie}/></Route>
                <Route exact path="/add"><AddMovie /></Route>
                <Route exact path="/movie/edit/:id">{ movies.length > 0 ? <EditMovie movies={movies}/> : null}</Route>
            </Switch>;
        </div>

    </MoviesProvider>
  );
}

export default App;
