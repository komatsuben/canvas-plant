import React, { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MAIN
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
// CANVASPLANT
import HomePlant from "./Pages/CANVASPLANT/HomePlant";

export default class App extends Component {
    render() {
        return (
            <div className="app-container">
                <Router>
                    <Navbar />
                    <main>
                        <Routes>
                            <Route exact path="/" Component={Home} />
                            <Route exact path="/plant" Component={HomePlant} />
                            <Route exact path="/plant/success" Component={Success} />
                            <Route exact path="/plant/search" Component={SearchForm} />
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
