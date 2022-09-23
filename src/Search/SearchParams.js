import React, { useState, useEffect } from "react";
import Results from "../Results/Results";
import useBreedList from "../hook/useBreedList";
import { useSelector } from "react-redux";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const location = useSelector((state) => state.location);
  const animal = useSelector((state) => state.animal);
  const breed = useSelector((state) => state.breed);
  const theme = useSelector(({ theme }) => theme);

  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  //after first render, get pets info
  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // animal in fetch is the latest one. Using closure.
  async function requestPets() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
            // anytime a change event happens on this particular input, the inside fn will be called, then setLocation will be called, then location in state will be updated to user's input value, then rendered with the new state.
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="#ad343e">Default</option>
            <option value="pink">Pink</option>
            <option value="skyblue">Sky Blue</option>
            <option value="orange">Orange</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
