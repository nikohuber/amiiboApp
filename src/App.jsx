import { useEffect, useState, useMemo } from "react";
import './App.css'
import { readFromLocalStorage, writeToLocalStorage } from "./storage";

const App = () => {

  const savedTerm = useMemo(() => readFromLocalStorage("term") || "", []);
  const [term, setTerm] = useState(savedTerm);
  const [results, setResults] = useState([]);

  useEffect(() => {
    writeToLocalStorage("term", term);
  }, [term]);

  // app "globals" and utils
  const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

  const findAmiibo = async (url, callback) => {
    const response = await fetch(url);
    const data = await response.json();
    setResults(data.amiibo);
  };

  const searchAmiibo = (name, callback) => {
    setTerm(name);
    findAmiibo( `${baseurl}${name}`, callback);
  };

  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>
    <hr />
    <main>
      <button onClick = {(e) => 
        searchAmiibo(document.querySelector("#name").value)
      }>Search</button>
      <label >
        Name: 
        <input id = "name" />
      </label>
    </main>
    <hr />

    {results.map(amiibo => (
        <span key={amiibo.head + amiibo.tail} style={{color:"green"}}>
          <h4>{amiibo.name}</h4>
          <img 
            width="100" 
            alt={amiibo.character}
            src={amiibo.image}
          />
        </span>
      ))}

    <footer>
      <p>&copy; 2024 Niko Huber</p>
    </footer>
  </>;
};

export default App;