import React from 'react';
import './Movies.css';

const Movies = () => {
    
    return(
        <main>

           <section className="filters-sec">

                <div className="filters">

                    <div className="filters-inputs">
                        <h5> <i className="fa fa-filter"></i> Choose filter(s) </h5>
                        <input type="text" placeholder=" Title"/>
                        <input type="date"/>
                        <select name="categories" id="categories-select">
                            <option value="">select a catogory</option>
                            <option value="dog"> Action</option>
                            <option value="cat">Adventure</option>
                            <option value="cat">Sciences-Fiction</option>
                        </select>
                    </div>

                </div>

                <div className="selected-filters-ctn">
                    <div>
                        <p className="selected-filter">Title </p>
                    </div>
                    <div>
                        <p className="selected-filter">Date </p>
                    </div>
                    <div>
                        <p className="selected-filter">Category </p>
                    </div>
                </div>

            </section>
        


            <section className="movies-sec">

                <div className="movies-list-ctn">

                    <div className="movie">
                        <div>
                            <img src="zrNKUa5SBUwue39coJArNdDgQJM.jpg" alt="Spider-Man: Far from Home"/>
                        </div>
                        <div className="movie-infos">
                            <button className="delete fa fa-times-circle"></button>
                        <a href="#"> <h3>Spider-Man: Far from Home</h3></a>
                            <p>Peter et ses amis passent leurs vacances d’été en Europe. Mais ils n’auront pas vraiment l’occasion de se reposer puisque Peter accepte d’aider Nick Fury pour débusquer les mystérieuses créatures qui sont la cause des catastrophes naturelles qui frappent le continent.</p>
                            <p><time datetime="2019-06-28">2019-06-28</time></p>
                            <button className="edit">Edit</button>
                            
                        </div>
                    </div>

                    <div className="movie">
                        <div>
                            <img src="zrNKUa5SBUwue39coJArNdDgQJM.jpg" alt="Spider-Man: Far from Home"/>
                        </div>
                        <div className="movie-infos">
                            <button className="delete fa fa-times-circle"></button>
                        <a href="#"> <h3>Spider-Man: Far from Home</h3></a>
                            <p>Peter et ses amis passent leurs vacances d’été en Europe. Mais ils n’auront pas vraiment l’occasion de se reposer puisque Peter accepte d’aider Nick Fury pour débusquer les mystérieuses créatures qui sont la cause des catastrophes naturelles qui frappent le continent.</p>
                            <p><time datetime="2019-06-28">2019-06-28</time></p>
                            <button className="edit">Edit</button>
                            
                        </div>
                    </div>

                    <div className="movie">
                        <div>
                            <img src="zrNKUa5SBUwue39coJArNdDgQJM.jpg" alt="Spider-Man: Far from Home"/>
                        </div>
                        <div className="movie-infos">
                            <button className="delete fa fa-times-circle"></button>
                        <a href="#"> <h3>Spider-Man: Far from Home</h3></a>
                            <p>Peter et ses amis passent leurs vacances d’été en Europe. Mais ils n’auront pas vraiment l’occasion de se reposer puisque Peter accepte d’aider Nick Fury pour débusquer les mystérieuses créatures qui sont la cause des catastrophes naturelles qui frappent le continent.</p>
                            <p><time datetime="2019-06-28">2019-06-28</time></p>
                            <button className="edit">Edit</button>
                            
                        </div>
                    </div>

                    <div className="movie">
                        <div>
                            <img src="zrNKUa5SBUwue39coJArNdDgQJM.jpg" alt="Spider-Man: Far from Home"/>
                        </div>
                        <div className="movie-infos">
                            <button className="delete fa fa-times-circle"></button>
                        <a href="#"> <h3>Spider-Man: Far from Home</h3></a>
                            <p>Peter et ses amis passent leurs vacances d’été en Europe. Mais ils n’auront pas vraiment l’occasion de se reposer puisque Peter accepte d’aider Nick Fury pour débusquer les mystérieuses créatures qui sont la cause des catastrophes naturelles qui frappent le continent.</p>
                            <p><time datetime="2019-06-28">2019-06-28</time></p>
                            <button className="edit">Edit</button>
                            
                        </div>
                    </div>
    
                </div>

            </section>




        </main>

  
    )
}

export default Movies