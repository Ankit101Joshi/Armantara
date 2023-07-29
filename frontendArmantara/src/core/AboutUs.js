import React from "react";
import ceoImage from "../assets/ceo-image.jpg";
import ctoImage from "../assets/cto-image.jpg";
import Base from "./Base";

const AboutUs = () => {
  return (
    <Base showJumbotron={false}>
      <div className="container">
        <h2 className="text-center mb-4">About Us</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card text-white bg-dark border border-info">
              <img
                src={ceoImage}
                alt="CEO"
                className="card-img-top"
                style={{ height: "700px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Ankit Joshi</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum vitae tortor dolor. Fusce sed nisi vel nisi dictum
                  mollis. Proin sit amet nibh ullamcorper, pellentesque lacus
                  ut, consequat sem. Nunc auctor pharetra urna, eu posuere
                  lectus eleifend at. Cras tincidunt aliquet metus, a egestas
                  velit hendrerit ut. Sed dignissim neque ac nibh pellentesque
                  sollicitudin. Vivamus vel sem eget ligula lobortis
                  sollicitudin. Duis dapibus leo non dolor faucibus congue.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card text-white bg-dark border border-info">
              <img
                src={ctoImage}
                alt="CTO"
                className="card-img-top"
                style={{ height: "700px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">Ruhi</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vehicula lacinia ipsum, nec sollicitudin metus consequat eu.
                  Phasellus id elit tristique, finibus elit vel, pulvinar
                  turpis. Phasellus semper viverra tincidunt. Mauris id
                  efficitur ligula, ac varius velit. Quisque feugiat elit ac
                  lectus sagittis, id ullamcorper arcu viverra. Aliquam posuere,
                  justo sit amet rutrum hendrerit, mi nunc luctus lacus, at
                  vestibulum ex lorem id nunc. Integer vulputate ante id justo
                  cursus rhoncus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AboutUs;
