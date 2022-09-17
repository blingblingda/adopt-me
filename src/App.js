import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import SearchParams from "./Search/SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details/Details";
import ThemeContext from "./tools/ThemeContext";

const App = () => {
  const theme = useState("#ad343e");

  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <header>
            <Link to="/adopt-me">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/adopt-me/" element={<SearchParams />} />
            {/* here should use :id to wait for params */}
            <Route path="/adopt-me/details/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
