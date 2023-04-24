import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SnippetLists } from "./components/SnippetLists";
import Snippet from "./components/Snippet";

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
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<SnippetLists snippets={snippets} />} />
        <Route path="/snippet" element={<SnippetLists snippets={snippets} />} />
        <Route path="/snippet/:id" element={<Snippet snippets={snippets} />} />
      </Routes>
    </div>
  );
}

export default App;
