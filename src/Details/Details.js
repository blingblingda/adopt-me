import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "../tools/ErrorBoundary";
import Modal from "../Modal/Modal";
import { connect } from "react-redux";

class Details extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`
    );
    const json = await res.json();
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
          <button
            onClick={this.toggleModal}
            style={{ backgroundColor: this.props.theme }}
          >
            Adopt {name}
          </button>
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

const mapStateToProps = ({ theme }) => ({ theme });

const ReduxWrappedDetails = connect(mapStateToProps)(Details);

const WrappedDetails = () => {
  const params = useParams();
  return (
    <ErrorBoundary>
      <ReduxWrappedDetails params={params} />
    </ErrorBoundary>
  );
};
export default WrappedDetails;
