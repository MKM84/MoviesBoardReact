import React from 'react';
import './HomePage.css';
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <main>
            <section className="home-page">
                <div className="welcome">
                    <h3>Welcome to the MoviesBoard</h3>
                    <p>Your movies library...</p>
                </div>
                <div className="ctn-navigation">
                <Link to="/movies">
                
                    <div className="btn-navigation">
                    <i className="fa fa-archive"></i>
                        <p><b>My Movies</b></p>
                    </div>
                </Link>
                <Link to="/add">
                    <div className="btn-navigation">
                    <i className="fa fa-plus-circle"></i>
                        <p><b>Add movie</b></p>
                    </div>
                </Link>
                </div>
            
            </section>
        </main>
    
    )
}

export default HomePage;