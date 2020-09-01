import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies/Movies'
import axios from 'axios';


function App() {

  const [movies, setmovies] = useState([]);
 
  useEffect(() => {

    axios.get('http://localhost:3000/movies').then(function (response) {
      setmovies(response.data);
      }).catch(function (error) {
      alert(error);
      });


  }, []);

  return (
    <div className="App">

      <header>
          <h1>MoviesBoard</h1>
      </header>

      <Movies movies={movies}/>

      <footer>
         <p>MoviesBoard</p>
      </footer>


    </div>
  );
}

export default App;
