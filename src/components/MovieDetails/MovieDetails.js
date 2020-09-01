
import React from 'react';
import './Movies.css';

const MovieDetails = () => {
    return(

        <main>

        <section className="movie-details-sec">
    
                <div className="movie-details">
                    <div>
                        <img className="poster" src="zrNKUa5SBUwue39coJArNdDgQJM.jpg" alt="Spider-Man: Far from Home"/>
                    </div>
    
                    <button className="movie-details-delete fa fa-times-circle"></button>
    
                    <div className="movie-details-infos">
                        
                       <a href="#"> <h2>Spider-Man: Far from Home</h2></a>
                        <p>Peter et ses amis passent leurs vacances d’été en Europe. Mais ils n’auront pas vraiment l’occasion de se reposer puisque Peter accepte d’aider Nick Fury pour débusquer les mystérieuses créatures qui sont la cause des catastrophes naturelles qui frappent le continent.</p>
                        <p><time dateTime="2019-06-28"><b>Release date :</b> 2019-06-28</time></p>
                        <p><b>Actors : </b>Tom Holland, Samuel L. Jackson, Jake Gyllenhaal, Marisa Tomei, Jon Favreau, Zendaya, X-Men: Apocalypse, Captain Marvel, Superman Returns</p>
                        <p><b>Categories : </b>Action, Adventure, Sciences-Fiction</p>
                        <p><b>Similar movies : </b>X-Men: Apocalypse, Captain Marvel, Superman Returns</p>
                        <br/>
                        <p className="backdrop-ctn"><b>Backdrop : </b> <img className="backdrop" src="5myQbDzw3l8K9yofUXRJ4UTVgam.jpg" alt="Spider-Man: Far from Home"/></p>
             
                    </div>
                    
                    <button className="movie-details-edit">Edit</button>
                </div>
    
                
           
        </section>
    
    
  </main>

  


    )
}

export default MovieDetails;