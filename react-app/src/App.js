import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import { SnippetLists } from "./components/SnippetLists";
import Snippet from "./components/Snippet";
import Login from "./components/Login";
import PostPage from "./components/PostPage";

function App() {
  let user = useSelector((state) => {
    return state.user;
  });
  // console.log(user);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8123/snippets")
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
        <Route path="/login" element={<Login />} />
        <Route path="/post" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
