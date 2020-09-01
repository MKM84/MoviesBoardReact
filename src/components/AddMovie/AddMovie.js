import React,{ useState } from 'react';
import './AddMovie.css';
import axios from 'axios';


const AddMovie = () => {



    const [movieTitle, setMovieTitle] = useState(null);
    const [movieDate, setMovieDate] = useState(null);
    const [movieSearchResult, setMovieSearchResult] = useState([]);

    const onChangeTitle = (e) => {
        setMovieTitle(e.target.value);
    }

    const onChangeDate = (e) => {
        setMovieDate(e.target.value);
    }


    const baseUrl = "https://api.themoviedb.org/3/search/movie?";
    const apiKey = "e3a8676a948711d4475b4c1d59134da1";    


    const searchMovie = (e) => {
        e.preventDefault();
        axios.get(`${baseUrl}api_key=${apiKey}&query=${movieTitle}&primary_release_year=${movieDate}`)
        .then(response => {
            console.log(response);
            setMovieSearchResult(response.data.results);
        })
        .catch(error => {
            alert(error);
        })
    }
    

    return(
        <div>
        <section className="form-filters-sec">

            <div className="form-filters">

                <div className="form-filters-inputs">
                    <h5> Find movie</h5>
                    <form onSubmit={(e) => searchMovie(e)}>
                        <input type="text" placeholder=" Title" onChange={(e) => onChangeTitle(e)}/>
                        <input type="text" onChange={(e) => onChangeDate(e)}/>
                        <input type="submit" value="Find"/>
                     </form>
                </div>

            </div>

        </section>

        <section className="movie-result-form">
            <div>
                <form>                  
                    <input list="movies" name="movie" id="movies-list" placeholder=" Choose your movie"/>
                    <datalist id="movies">

                    {movieSearchResult.map(movie => <option key={movie.id} value={`${movie.title} / ${movie.release_date}`}/>)}

                      </datalist>
                    <input type="submit" value="Choose"/>
                  </form>
            </div>

        </section>
</div>

    )
}

export default AddMovie;