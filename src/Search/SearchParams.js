import React from "react";

const SearchParams = () => {
  const location = "Seattle, WA";
  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
