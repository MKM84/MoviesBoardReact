import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router";




  const MovieForm = (props) => {

    const hist = useHistory(); 
    
    // le type de la requete qui sera envoyée / POST ou PUT
    const requestType = props.formType;
    const movieId = props.movieId;


      const [movieFormValues, setMovieFormValues] = useState(props.movie);
      const [actors, setActors] = useState(props.actors);
      const [similars, setSimilars] = useState(props.similarMovies);
  

      useEffect(() => {
        if( props.movie !== undefined){  
        setMovieFormValues(props.movie)}  
        if( props.actors !== undefined){  
          setActors(props.actors)}  
          if( props.similarMovies !== undefined){  
            setSimilars(props.similarMovies)}      
      }, [props.movie, props.actors, props.similarMovies]);


// Controle le formulaire 
    const onUpdateData = (event) => {
      const target = event.target,
            name = target.name,
            value = target.value;
  
      const data = { ...movieFormValues };
      data[name] = value;
      setMovieFormValues(data);

    };


// controle le champ categories
    const onUpdateDataCategories = (event) => {
      const value = event.target.value;
      const dataCategories = value.split(",");

      const data = { ...movieFormValues };
      data.categories = dataCategories;
      setMovieFormValues(data);
    };


    // controle les champs du formulaire actors
    const onUpdateDataActor = (e, actorName) => {
      e.preventDefault();
      const target = e.target,
            name = target.name,
            value = target.value;

      const actorList = [ ...actors ]
      const foundActor = actorList.find(m => m.name === actorName);
      const dataActor = { ...foundActor }
      dataActor[name] = value;
      const indexActor = actorList.indexOf(foundActor);
      actorList[indexActor] = dataActor;

        setActors(actorList)
   
    };

    // Supprime un acteur
    const onRemoveActor = (index) => { 
      let actorList = [...actors];   
      actorList.splice(index, 1);     
       setActors(actorList);
  }

  // Ajoute un acteur
  const onAddActor = () => {
    let newActorsList = [ ...actors ];
    newActorsList.push(
      {
         name: "Name",
         character: "Character",
         photo : "https://dummyimage.com/200x300/ece9f5/47478.jpg"
      }
    )
    setActors(newActorsList);  
   }

  //  Controle les champs du formulaire similar movies 
    const onUpdateDataSimilarMovie = (e, index) => {
      e.preventDefault();
      const target = e.target,
            name = target.name,
            value = target.value;

      const similarList = [ ...similars ]
      const foundSimilar = similarList[index]
      const dataSimilar = { ...foundSimilar }
      dataSimilar[name] = value;
      similarList[index] = dataSimilar;

        setSimilars(similarList);
    };


    // supprime un film similaire 
    const onRemoveSimilar = (index) => { 
      let similarList = [...similars];   
      similarList.splice(index, 1);     
       setSimilars(similarList);
  }

  // Rajoute un film similaire 
  const onAddSimilar = () => {
   let newSimilarsList = [ ...similars ];
   newSimilarsList.push(
     {
        title: "Title",
        release_date: "0000-00-00",
        poster : "https://dummyimage.com/200x300/ece9f5/47478.jpg"
     }
   )
   setSimilars(newSimilarsList);
 
  }
  

// Envoie un requête soit POST soit PUT selon le props formType create ou update
    const onSubmitForm = (event) => {
      event.preventDefault();
      if(requestType === "create") {

        axios.post('http://localhost:3000/movies', {
          title: movieFormValues.title,
          release_date: movieFormValues.release_date,
          categories: [ ...movieFormValues.categories ],
          description: movieFormValues.description,
          poster : movieFormValues.poster,
          backdrop: movieFormValues.backdrop,
          actors: actors,
          similar_movies: similars, 
        })
        .then((response) => {
          if (response.status === 201){
                console.log('POST Succes');
          }
        }, 
        (error) => {
          alert(error);
        })
      }



      else if(requestType === "update") {

        axios.put('http://localhost:3000/movies/'+ movieId, {  
          title: movieFormValues.title,
          release_date: movieFormValues.release_date,
          categories: [ ...movieFormValues.categories ],
          description: movieFormValues.description,
          poster : movieFormValues.poster,
          backdrop: movieFormValues.backdrop,
          actors: actors,
          similar_movies: similars, 
           
          })
        .then((response) => {
          console.log(response);
                console.log('PUT succes');

        }, 
        (error) => {
          alert(error);
        })
      }

      // update les movies et retour à l'accueil 
      props.onAddOrEditMovie()
      hist.push('/');
    };







  



    return (
      <div className="movie-form">

          {movieFormValues !== undefined && 

                  <form onSubmit={onSubmitForm}>

                    <div className="">
                      <h3>Movie Informations</h3>
                    </div>

                    <div>

                      <input 
                      type="text" 
                      name="title" 
                      defaultValue={movieFormValues.title} 
                      onChange={(e) => onUpdateData(e)}  
                      className="input-60" 
                      required />
                    </div>

                    <div>
                      <input 
                      type="text" 
                      name="release_date" 
                      defaultValue={movieFormValues.release_date} 
                      onChange={(e) => onUpdateData(e)} 
                      className="input-30" 
                      required />

                      <input 
                      type="text" 
                      name="title" 
                      defaultValue={movieFormValues.categories} 
                      onChange={(e) => onUpdateDataCategories(e)} 
                      className="input-30" 
                      required />
                    </div>

                    <div>
                      <textarea 
                      name="description" 
                      defaultValue={movieFormValues.description} 
                      onChange={(e) => onUpdateData(e)} 
                      className="input-60" 
                      required>
                      </textarea>
                    </div>




                  {/* Liste des acteurs  */}

                    <div>
                    <h3>Actors</h3>
                    
                      {( actors !== undefined && actors.length > 0 )? 

                        actors.map((actor, index) => 

                          <div key={"key_" + index}>

                          <input 
                            type="text" 
                            name="name" 
                            onChange={(e) => onUpdateDataActor(e, actor.name)}  
                            defaultValue={actor.name}
                            className="input-10" 
                            required />
                          

                            <input 
                            type="text" 
                            name="character" 
                            onChange={(e) => onUpdateDataActor(e, actor.name)} 
                            defaultValue={actor.character}
                            className="input-10" 
                            required />

                            <input 
                            type="url" 
                            name="photo" 
                            onChange={(e) => onUpdateDataActor(e, actor.name)} 
                            defaultValue={actor.photo}
                            className="input-30" 
                            required />

                            <button 
                            type="button" 
                            name="Remove"
                            value ="Remove"
                            className="input-10 remove" 
                            onClick={() => onRemoveActor(index)}>
                            Remove this actor
                            </button>

                          </div>

                        )

                      :
                      <p>There are no actors availables for this movie</p>
                      }


                    </div>

                    <div>
                    <button 
                          type="button" 
                          name="Add Actors"
                          value ="Add Actors"
                          className="input-10" 
                          onClick={() => onAddActor()}>
                          
                          Add actors
                          </button>

                          </div>


                      {/* Liste des films similaires */}
                    <div>
                    <h3>Similar movies</h3>
                    
                    {( similars !== undefined && similars.length > 0)? 

                      similars.map((similar, index) => 

                        <div key={"key_" + index}>

                        <input 
                          type="text" 
                          name="title" 
                          onChange={(e) => onUpdateDataSimilarMovie(e, index)}  
                          defaultValue={similar.title}
                          className="input-10" 
                          required />
                        

                          <input 
                          type="url" 
                          name="poster" 
                          onChange={(e) => onUpdateDataSimilarMovie(e, index)} 
                          defaultValue={similar.poster}
                          className="input-30" 
                          required />

                          <input 
                          type="text" 
                          name="release_date" 
                          onChange={(e) => onUpdateDataSimilarMovie(e, index)} 
                          defaultValue={similar.release_date}
                          className="input-10" 
                          required />

                          <button 
                          type="button" 
                          name="Remove Similar"
                          value ="Remove Similar"
                          className="input-10 remove" 
                          onClick={() => onRemoveSimilar(index)}>
                          
                          Remove this movie
                          </button>

                        </div>

                      )

                    :
                    <p>There are no similar movies availables for this movie</p>
                    }

                    <div>
                    <button 
                          type="button" 
                          name="Add Similar"
                          value ="Add Similar"
                          className="input-10" 
                          onClick={() => onAddSimilar()}>
                          
                          Add similar movies
                          </button>

                          </div>


                    <div>
                    <button 
                    value="validate" 
                    name="submit" 
                    className="input-send" 
                    type="submit">
                    <b>Send movie information</b>
                    </button>
                    </div>

                  </div>
                  
                </form>
   
          }

      </div>
    );
  };
  
  export default MovieForm;
  