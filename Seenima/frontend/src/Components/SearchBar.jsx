import { useState } from 'react';
import '../Styles/SearchBar.css';

const SearchBar = () => {

    const [movieInfo, setmovieInfo] = useState("");
    const [movieData, setmovieData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetch = () => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:8000/search/${encodeURIComponent(movieInfo)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in responde");
                }
                return response.json();
            })

            .then((data) => {
                setTimeout(() => {
                    setmovieData(data);
                    setLoading(false);
                }, 2000);
                console.log(data);
            })
            
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return (
        <div className="searchBar">
            <div className='search-section'>
                    <input className='input'
                        type="text"
                        value={movieInfo}
                        onChange={(e) => setmovieInfo(e.target.value)}
                        placeholder="Search for a movie...">
                    </input>
                    <button 
                        onClick={handleFetch}
                        className="search-button">Search
                    </button>
                </div>
            <div className='display-section'>
                {loading && <div>Loading......</div>}
                {error && <div>Error: {error.message}</div>}
                {movieData && (
                    <div className='display-section'>
                        <p>{movieData.results[0].title}</p>
                        <p>{movieData.results[0].overview}</p>
                        <img className="poster" src={`https://image.tmdb.org/t/p/original${movieData.results[0].poster_path}`} alt={movieData.results[0].title} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;