//style.css
.App {
  font-family: sans-serif;
  text-align: center;
}

.search-input {
  width: 300px;
  padding: 10px;
}

.results-container {
  max-height: 300px;
  width: 320px;
  margin: auto;
  border: 1px solid black;
  overflow: auto;
  text-align: left;
}

.result {
  display: block;
  padding: 5px;
}

.result:hover {
  background-color: beige;
}



import { useEffect, useState } from "react";
import "./styles.css";

// API to use - https://dummyjson.com/recipes/search?q=Margherita
// fetch data from api and show it on page
// give hover effect on each result
//on focus show results and on blur hide results
//debounce api call
//cacheing search results
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [cache, setCache] = useState({});
  const fetchData = async () => {
    if (cache[searchQuery]) {
      setResults(cache[searchQuery]);
      return;
    }
    const res = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchQuery}`
    );
    const json = await res.json();
    setResults(json?.recipes);
    setCache((prev) => {
      //we need to append in oject instead of replacing it
      return { ...prev, [searchQuery]: json?.recipes };
    });
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="App">
      <h1>Autocomplete search bar</h1>
      <div>
        <input
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {isFocused && (
        <div className="results-container">
          {results.map((r) => (
            <span key={r.id} className="result">
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
