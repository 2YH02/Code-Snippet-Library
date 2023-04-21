import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { SnippetLists } from "./components/SnippetLists";
import Snippet from "./components/Snippet";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<SnippetLists />} />
        <Route path="/snippet" element={<SnippetLists />} />
        <Route path="/snippet/:id" element={<Snippet />} />
      </Routes>
    </div>
  );
}

export default App;
