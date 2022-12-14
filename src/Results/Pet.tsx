import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
}

const Pet: FunctionComponent<IProps> = (props) => {
  const { id, name, animal, breed, images, location } = props;

  // no images comes back from the pet API,hero image is the default images, otherwise, hero images will be the first one
  let hero = "https://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/adopt-me/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
