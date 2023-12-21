import { useState, useEffect } from 'react';
import "../Styles/Popular.css";

const PopularSection = () => {

    const [popularMovie, setpopularMovie] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);
        setError(null);

        // fetch(`http://localhost:8000/popular`)
        const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000'
        : 'https://seenima-n3v1.onrender.com';


        fetch(`${baseUrl}/popular`)

            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error in response");
                }
                return response.json();
            })

            .then((data) => {
                setTimeout(() => {
                setpopularMovie(data);
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
                {popularMovie && popularMovie.results && (
                    <div className='posters-section'>
                        <div className='section-0'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${popularMovie.results[0].poster_path}`} alt={popularMovie.results[0].title} />
                            <p className='movie-title'>{popularMovie.results[0].title}</p>
                        </div>

                        <div className='section-1'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${popularMovie.results[1].poster_path}`} alt={popularMovie.results[1].title} />
                            <p className='movie-title'>{popularMovie.results[1].title}</p>
                        </div>

                        <div className='section-2'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${popularMovie.results[2].poster_path}`} alt={popularMovie.results[2].title} />
                            <p className='movie-title'>{popularMovie.results[2].title}</p>
                        </div>

                        <div className='section-3'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${popularMovie.results[3].poster_path}`} alt={popularMovie.results[3].title} />
                            <p className='movie-title'>{popularMovie.results[3].title}</p>
                        </div>

                        <div className='section-4'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${popularMovie.results[4].poster_path}`} alt={popularMovie.results[4].title} />
                            <p className='movie-title'>{popularMovie.results[4].title}</p>
                        </div>

                        <div className='section-5'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${popularMovie.results[5].poster_path}`} alt={popularMovie.results[5].title} />
                            <p className='movie-title'>{popularMovie.results[5].title}</p>
                        </div>

                        <div className='section-6'>
                            <img className="posters-images" src={`https://image.tmdb.org/t/p/original${popularMovie.results[6].poster_path}`} alt={popularMovie.results[6].title} />
                            <p className='movie-title'>{popularMovie.results[6].title}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PopularSection;
