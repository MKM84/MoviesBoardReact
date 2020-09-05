import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../MovieForm/MovieForm.css';
import {useFormik} from 'formik';
import axios from 'axios';
// import MoviesContext from '../../MoviesContext';


const FormEdit = (props) => {


    return(

            <form onSubmit={props.onSubmit}>
                 <div className="input-movie-data">
                    <label htmlFor="id">Id</label>
                    <input 
                    type="number" 
                    name="id" 
                    id="id"  
                    defaultValue={props.values.id} 
                    onChange={props.onChange}/>
                </div>

                <div className="input-movie-data">
                    <label htmlFor="title">Title</label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    defaultValue={props.values.title} 
                    onChange={props.onChange}/>

                </div>

                <div className="input-movie-data">
                    <label htmlFor="release_date">Release_date</label>
                    <input 
                    type="text" 
                    name="release_date" 
                    id="release_date" 
                    defaultValue={props.values.release_date} 
                    onChange={props.onChange}/>

                </div>

                <div className="input-movie-data">
                    <label htmlFor="description">Description</label>
                    <textarea 
                    name="description" 
                    id="description" 
                    defaultValue={props.values.description} 
                    onChange={props.onChange}></textarea>
 
                </div>

                <div className="input-movie-data">
                    <label htmlFor="poster">Poster</label>
                    <input type="url" 
                    name="poster" 
                    id="poster" 
                    defaultValue={props.values.poster} 
                    onChange={props.onChange}/>

                </div>

                <div className="input-movie-data">
                    <label htmlFor="backdrop">Backdrop</label>
                    <input type="url" name="backdrop" id="backdrop"   
                    defaultValue={props.values.backdrop} 
                    onChange={props.onChange}/>

                </div>
 
                <div className="submit-movie-info">
                    <input type="submit" value="Send movie informations"/>
                </div>

            </form>

              

       
    )
}

export default FormEdit;