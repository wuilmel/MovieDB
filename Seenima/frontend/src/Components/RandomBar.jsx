import { useState } from "react";
import RatingBar from "../Components/RatingBar";
import "../Styles/RandomBar.css";

const RandomBar = () => {
    
    const [ratingBarValue, setRatingBarValue] = useState(1);
    const [displayLanguage, setDisplayLanguage] = useState('');
    const [originalLanguage, setOriginalLanguage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [randomMovie, setrandomMovie] = useState(null);
    const [randomNumber, setRandomNumber] = useState('');

    const getRandomNumber = () => {
        const randomn = Math.floor(Math.random() * 10);
        setRandomNumber(randomn);
      };

    const handleRatingBarChange = (newValue) => {
        setRatingBarValue(newValue);
        console.log(newValue)
    };

    const handleDisplayLanguage = (event) => {
        setDisplayLanguage(event.target.value);
    };

    const handleOriginalLanguage = (event) => {
        setOriginalLanguage(event.target.value);
    };

    const randomMovieToBackend = () => {
        setLoading(true);
        setError(null);
    
        const sendData = {
            rating: ratingBarValue,
            display: displayLanguage,
            original: originalLanguage
        };
    
        console.log(sendData);
    
        const queryParams = new URLSearchParams(sendData);
    
        fetch(`http://localhost:8000/discover?${queryParams}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error in response");
            }
            return response.json();
        })
        .then((data) => {
            setTimeout(() => {
                setrandomMovie(data);
                setLoading(false);
            }, 2000);
            console.log(data);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    };

    //Direct Fetch (test)
    // const randomMovieToBackend = () => {
    //     setLoading(true);
    //     setError(null);

    //     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=${displayLanguage}&page=1&sort_by=popularity.desc&vote_average.gte=${ratingBarValue}&with_original_language=${originalLanguage}`)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error("Error in responde");
    //             }
    //             return response.json();
    //         })

    //         .then((data) => {
    //             setTimeout(() => {
    //                 setrandomMovie(data);
    //                 setLoading(false);
    //             }, 2000);
    //             console.log(data);
    //         })
            
    //         .catch((error) => {
    //             setError(error.message);
    //             setLoading(false);
    //         });
    // };
    
    return (
        <div className="display-random">
                <div className="title">
                    <label className="letters" htmlFor="display-language">Display Language</label>
                </div>
                <div>
                    <select name="language" 
                     id="display-language"  
                     value={displayLanguage} 
                     onChange={handleDisplayLanguage}>
                        <option value="">--Select a display language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="ja">Japanese</option>
                        <option value="fr">French</option>
                        <option value="ru">Russian</option>
                        <option value="ar">Arabic</option>
                        <option value="it">Italian</option>
                    </select>
                </div>
                <div className="title">
                    <label className="letters" htmlFor="original-language">Original Language</label> 
                </div>
                <div>                                   
                    <select name="with_original_language" 
                     id="original-language"
                     value={originalLanguage} 
                     onChange={handleOriginalLanguage}>
                        <option value="">--Select an original language</option>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="ja">Japanese</option>
                        <option value="fr">French</option>
                        <option value="ru">Russian</option>
                        <option value="ar">Arabic</option>
                        <option value="it">Italian</option>
                    </select>
                </div>
                <div>
                    <RatingBar onValueChange={handleRatingBarChange}/>
                
                    <button className="submit" onClick={()=>{randomMovieToBackend(); getRandomNumber();}}>Random</button>
                </div>
                    {loading && <div>Loading......</div>}
                    {error && <div>Error: {error.message}</div>}
                    {randomMovie && (
                        <div className="display-random">
                            <p className="infor"> {randomMovie.results[randomNumber].title}</p>
                            {/* <p className="infor"> {randomMovie.results[randomNumber].overview}</p> */}
                            <img className="poster" src={`https://image.tmdb.org/t/p/original${randomMovie.results[randomNumber].poster_path}`} alt={randomMovie.results[randomNumber].title} />
                            <p className="infor"> {randomMovie.results[randomNumber].overview}</p>
                        </div >
                    )}
        
        </div>
        
    );
}

export default RandomBar;
