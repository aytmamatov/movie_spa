import { useEffect, useState } from "react";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import Search from "./components/Navbar/Search/Search";
import "./sass/base.sass";

function App() {
  let api_key = "c81dbb52630c695069ceb9c73e137dc2";
  let userEmpty = {
    search: "",
    films: "",
    currentPage: "",
  };
  const [state, setState] = useState(userEmpty);
  let [results, setResults] = useState([]);
  const [resultsIsLoading, setResultsIsLoading] = useState(false);
  let inputHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let submitForm = (e) => {
    setResults([]);
    setResultsIsLoading(true);
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/4/search/movie?api_key=${api_key}&query=${state.search}`
    )
      .then((r) => r.json())
      .then((r) => {
        let data = r.results.map((item) => item);
        setResults(data);
        setState((prev) => ({ ...prev, films: r, currentPage: r.page }));
        setResultsIsLoading(false);
      });
  };

  let loadMore = () => {
    let currentPage = state.currentPage + 1;
    fetch(
      `https://api.themoviedb.org/4/search/movie?api_key=${api_key}&query=${state.search}&page=${currentPage}`
    )
      .then((r) => r.json())
      .then((r) => {
        r.results.map((item) => results.push(item));
        setState((prev) => ({ ...prev, films: r, currentPage: r.page }));
      });
  };
  return (
    <div className="App">
      <Header />
      <Search inputHandler={inputHandler} submitForm={submitForm} />
      <Content
        movieData={state.films}
        resultsIsLoading={resultsIsLoading}
        results={results}
        loadMore={loadMore}
      />
    </div>
  );
}

export default App;
