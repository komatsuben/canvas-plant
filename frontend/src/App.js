import React, { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" Component={Home}/>
                </Routes>
            </Router>
        );
    }
}

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <Navbar />
        <App />
    </StrictMode>
);