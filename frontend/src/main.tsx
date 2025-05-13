import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Criptografar from "./pages/Criptografar";
import Decriptografar from "./pages/Decriptografar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criptografar" element={<Criptografar />} />
        <Route path="/decriptografar" element={<Decriptografar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
