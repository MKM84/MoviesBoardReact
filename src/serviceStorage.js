
function StoreMovie (movie, movieToStore){
    
    if (!(JSON.parse(localStorage.getItem('movie')))){
         movie = [];
            movieToStore = JSON.stringify(movie);
            localStorage.setItem('movie', movieToStore);
    }

}

export default StoreMovie;

