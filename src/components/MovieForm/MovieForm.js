import React from 'react';
import './MovieForm.css';

const MovieForm = () => {

    return(

        <section className="add-movie-form">
            <h3>Movie informations</h3>
            <form>
                <div className="input-movie-data">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title"/>
                </div>
                <div className="input-movie-data">
                    <label htmlFor="release_date">Release_date</label>
                    <input type="text" name="release_date" id="release_date"/>
                </div>
                <div className="input-movie-categories">
                    <label htmlFor="categories">Categories</label>
                    <div>
                        <input type="text" name="categories" id="categories"/>
                        
                        <input type="text" name="categories-1" id="categories-1"/>
                        
                        <input type="text" name="categories-2" id="categories-2"/>
                        <input type="text" name="categories-3" id="categories-3"/>
                    </div>
                </div>
                <div className="input-movie-data">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description"></textarea>
                </div>
                <div className="input-movie-data">
                    <label htmlFor="poster">Poster</label>
                    <input type="url" name="poster" id="poster" pattern="https://.*" size="30"
                        />
                </div>
                <div className="input-movie-data">
                    <label htmlFor="backdrop">Backdrop</label>
                    <input type="url" name="backdrop" id="backdrop" pattern="https://.*" size="30" />
                </div>
                <div className="input-movie-categories">
                    <label htmlFor="categories">Actors</label>
                    <div>
                        <input type="text" name="actors" id="actors"/>
                        
                        <input type="text" name="actors-1" id="actors-1"/>
                        
                        <input type="text" name="actors-2" id="actors-2"/>
                        <input type="text" name="actors-3" id="actors-3"/>
                    </div>
                </div>

                <div className="input-movie-categories">
                    <label htmlFor="similar-movies">Similar movies</label>
                    <div>
                        <input type="text" name="similar-movies" id="similar-movies"/>
                        
                        <input type="text" name="similar-movies-1" id="similar-movies-1"/>
                        
                        <input type="text" name="similar-movies-2" id="similar-movies-2"/>
                        <input type="text" name="similar-movies-3" id="similar-movies-3"/>
                    </div>
                </div>
                <div className="submit-movie-info">
                    <input type="submit"/>
                </div>

                
            </form>



        </section>
    )
}

export default MovieForm;