import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./Pages/Login";
import Worker from "./Pages/Worker";
import Manager from "./Pages/Manager";
import Admin from "./Pages/Admin";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Admin />} />
            <Route path="/worker" element={<Worker />} />
            <Route path="/manager" element={<Manager />} />
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
