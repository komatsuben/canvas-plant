import React, { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MAIN
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
// CANVASPLANT
import HomePlant from "./Pages/CANVASPLANT/HomePlant";
import Success from "./Pages/CANVASPLANT/Success";
import SearchForm from "./Pages/CANVASPLANT/Search";
import Donate from "./Pages/CANVASPLANT/Donate";
import Leaderboard from "./Pages/CANVASPLANT/Leaderboard";

export default class App extends Component {
    render() {
        return (
            <div className="app-container">
                <Router>
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePlant />} />
                        </Routes>
                    </main>
                    <Footer fillcolor={"#1C4643"} bgcolor={"#fff"} />
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
