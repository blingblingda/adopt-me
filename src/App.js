import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import SearchParams from "./Search/SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details/Details";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
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
      </Provider>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
