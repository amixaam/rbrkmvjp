import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./Pages/Login";
import Users from "./Pages/Users";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Users" element={<Users />} />
        </Routes>
    );
};

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
