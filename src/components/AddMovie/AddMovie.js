import React from 'react';
import './AddMovie.css';


const AddMovie = () => {

    return(
        <div>
        <section className="form-filters-sec">

            <div className="form-filters">

                <div className="form-filters-inputs">
                    <h5> Find movie</h5>
                    <form>
                        <input type="text" placeholder=" Title"/>
                        <input type="date"/>
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
                      <option value="Edge"/>
                      <option value="Firefox"/>
                      <option value="Chrome"/>
                      <option value="Opera"/>
                      <option value="Safari"/>
                      </datalist>
                    <input type="submit" value="Send"/>
                  </form>
            </div>

        </section>
</div>

    )
}

export default AddMovie;