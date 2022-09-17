import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "../tools/ErrorBoundary";
import ThemeContext from "../tools/ThemeContext";

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};
export default WrappedDetails;

class Details extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }
  state = { loading: true };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
    this.setState({ loading: false });
    this.setState(json.pets[0]);
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    // throw new Error("lmao you crashed");

    const { name, animal, breed, city, state, description, images } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city},${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export { Details };
