import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "../tools/ErrorBoundary";
import ThemeContext from "../tools/ThemeContext";
import Modal from "../Modal/Modal";
import { Animal, PetAPIResponse } from "../tools/APIResponsesTypes";

const WrappedDetails = () => {
  const params = useParams<{ id: string }>();
  return (
    <ErrorBoundary>
      <Details params={params} />
    </ErrorBoundary>
  );
};
export default WrappedDetails;

interface IProps {
  params: {
    id?: string;
  };
}

class Details extends Component<IProps> {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }
  state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    images: [] as string[],
  };

  async componentDidMount() {
    if (!this.props.params.id) {
      return;
    }

    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json: PetAPIResponse = await res.json();
    this.setState({ loading: false });
    this.setState(json.pets[0]);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    // throw new Error("lmao you crashed");

    const { name, animal, breed, city, state, description, images, showModal } =
      this.state;
    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city},${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>

          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <a href="https://www.rspca.org.au/">Yes</a>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export { Details };
