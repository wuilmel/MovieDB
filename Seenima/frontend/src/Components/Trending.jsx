import { useState, useEffect } from 'react';
import "../Styles/Trending.css";

const TrendingSection = () => {

    const [topMovie, settopMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = 'b514d4ba698a1e25bb051f8f5008b4fb';

    useEffect(() => {

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8000/top_rate`)

            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in response");
                }
                return response.json();
            })

            .then((data) => {
                setTimeout(() => {
                settopMovie(data);
                setLoading(false);
            }, 0);
                console.log(data);
            })

            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })
    }, [apiKey]);

    return (
        <div className="trending-contents">
            <div className='trending-section'>
                {loading && <div>Loading......</div>}
                {error && <div>Error: No responde</div>}
                {topMovie && topMovie.results && (
                    <div className='posters-section'>
                        <div className='section-0'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${topMovie.results[0].poster_path}`} alt={topMovie.results[0].title} />
                            <p className='movie-title'>{topMovie.results[0].title}</p>
                        </div>

                        <div className='section-1'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${topMovie.results[1].poster_path}`} alt={topMovie.results[1].title} />
                            <p className='movie-title'>{topMovie.results[1].title}</p>
                        </div>

                        <div className='section-2'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${topMovie.results[2].poster_path}`} alt={topMovie.results[2].title} />
                            <p className='movie-title'>{topMovie.results[2].title}</p>
                        </div>

                        <div className='section-3'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${topMovie.results[3].poster_path}`} alt={topMovie.results[3].title} />
                            <p className='movie-title'>{topMovie.results[3].title}</p>
                        </div>

                        <div className='section-4'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${topMovie.results[4].poster_path}`} alt={topMovie.results[4].title} />
                            <p className='movie-title'>{topMovie.results[4].title}</p>
                        </div>

                        <div className='section-5'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${topMovie.results[5].poster_path}`} alt={topMovie.results[5].title} />
                            <p className='movie-title'>{topMovie.results[5].title}</p>
                        </div>

                        <div className='section-6'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${topMovie.results[6].poster_path}`} alt={topMovie.results[6].title} />
                            <p className='movie-title'>{topMovie.results[6].title}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TrendingSection;