import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/snippets")
      .then((res) => res.json())
      .then((data) => setSnippets(data.body))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      {snippets.map((snippet) => {
        return (
          <div key={snippet.id}>
            <h2>{snippet.title}</h2>
            <p>{snippet.code}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
