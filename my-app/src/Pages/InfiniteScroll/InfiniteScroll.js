    import "./App.css";
    import { useState, useEffect } from "react";
     import { MovieCard } from "./MovieCard";

    function App() {
      const [page, setPage] = useState(1); // for number of page in tmdb 
      const [data, setData] = useState([]); // storing the fetched data
      const [loading, setLoading] = useState(false); // for setting loading state

      // fetching and stroring the data in the state
      const fetchMovie = async () => {
        // const URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        // const data = await axios.get(URL, {
        //   headers: {
        //     Authorization:
        //       "Bearer API KEY",
        //     Accept: "application/json",
        //   },
        // });
        setData((prevData) => [...prevData, ...data.data.results]); // we are going to add the new data to current data.
        setLoading(false);
      };

      // useEffecte for invoking the function at the start
      useEffect(() => {
        fetchMovie();
      }, [page]);

      return (
        <div className="App">
          <header className="App-header">
            Popular movies according to Tmdb
            <div className="movieCardContainer">
              {data.length > 1 &&
                data.map((item) => {
                  return (
                     <span>{item}</span>
                  );
                })}
              {loading && <h1>Loading....</h1>}
            </div>
          </header>
        </div>
      );
    }

    export default App;