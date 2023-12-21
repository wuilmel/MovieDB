import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import cookieParse from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';

const port = process.env.PORT || 6000;
 
const apiKey = process.env.MOVIE_API_KEY;

connectDB();

const app = express();

// app.use(cors());

// app.use(cors({
//   origin: 'https://seenima-n3v1.onrender.com',
//   // Add any other allowed origins as needed
// }));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(cookieParse());


const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/search/:text', (req, res) => {

    console.log(`Searching`);
  
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(req.params.text)}`)
        
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in response");
        }
        return response.json();
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data"});
      });
  });
  
  app.get('/top_rate', (req, res) => {
  
    console.log(`Displaying top rate movies`);
  
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in response");
        }
        return response.json();
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data"});
      });
  });
  
  app.get('/popular', (req, res) => {
  
    console.log(`Displaying popular movies`);
  
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in response");
        }
        return response.json();
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data"});
      });
  });
  
  app.get('/discover', (req, res) => {
  
    console.log(`Discovering a random movie`);
  
    const { rating, display, original} = req.query;
  
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=${display}&page=1&sort_by=popularity.desc&vote_average.gte=${rating}&with_original_language=${original}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error in response");
        }
        return response.json();
      })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data"});
      });
  });

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.get('/', (req,res) => res.send('Server is ready'));

app.use(notFound);

app.use(errorHandler);

app.listen(port, ()=> console.log(`Server started on port ${port}`));
