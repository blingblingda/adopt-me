import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import SearchParams from "./Search/SearchParams";

const App = () => {
  return (
    <StrictMode>
      <div>
        <h1>Adopt Me!</h1>
        <SearchParams />
      </div>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
