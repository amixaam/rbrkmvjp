import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import "./index.css";
import Login from "./Pages/Login";
import Worker from "./Pages/Worker";
import Manager from "./Pages/Manager";
import Admin from "./Pages/Admin";
import NavBlob from "./Reusable/NavBlob";

const App = () => {
    return (
        <>
            <NavBlob />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/worker" element={<Worker />} />
                <Route path="/manager" element={<Manager />} />
            </Routes>
        </>
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
