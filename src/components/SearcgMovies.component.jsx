import React, {useState} from "react";
import '../components/searchMovies.css';

const SearchMovies = () => {

    const [query,setQuery ] = useState('');
    const [movies, setMovies] = useState([]);


    const searchMovies = async (e) => {

        e.preventDefault();
        console.log('submitting');

        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=bfedd885c230428274558a6ab6ed610e&language=en-US&query=
                     ${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results)
            setMovies(data.results)
        }catch (err){
            console.log(err);
        }
    }
    return(
        <div>
            <form action="" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
                <button>Search</button>
            </form>
            <div className='card-list'>
                {movies.filter(movie => movie.poster_path).map(movie => 
                    <div className="card" key={movie.id}>
                        <div className="movieImage"><img className="card-image" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt={movie.title + 'poster'} /></div>
                        <div className="card--content">
                            <h3 className="card--title" >{movie.title}</h3>
                            <p><small>REALEASE DATE: {movie.release_date}</small></p>
                            <p><small>RATING: {movie.vote_average}</small></p>
                            <p className='card-desc' >{movie.overview}</p>
                        </div>
                    </div>
                    )}
            </div>
        </div>
    )
}

export default SearchMovies;