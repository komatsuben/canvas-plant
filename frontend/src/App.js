import React, { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Success from "./Pages/Success";
import SearchForm from "./Pages/Search";
import Footer from "./Components/Footer";

export default class App extends Component {
    render() {
        return (
            <div className="app-container">
                <Router>
                    <Navbar />
                    <main>
                        <Routes>
                            <Route exact path="/" Component={Home} />
                            <Route exact path="/success" Component={Success} />
                            <Route exact path="/search" Component={SearchForm} />
                        </Routes>
                    </main>
                    <Footer />
                </Router>
            </div>
        );
    }
}

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
