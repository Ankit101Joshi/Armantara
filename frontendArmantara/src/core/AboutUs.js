import React from "react";
import ceoImage from "../assets/ceo-image.jpg";
import Menu from "./Menu";

const AboutUs = () => {
  return ( 
  
  <div>

 <Menu />
    <div className="container">
      <h2 className="text-center mb-4">About Us</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card text-white bg-dark border border-info">
            <img
              src={ceoImage}
              alt="CEO"
              className="card-img-top"
              style={{ height: "600px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">CEO Name</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vitae tortor dolor. Fusce sed nisi vel nisi dictum
                mollis. Proin sit amet nibh ullamcorper, pellentesque lacus ut,
                consequat sem. Nunc auctor pharetra urna, eu posuere lectus
                eleifend at. Cras tincidunt aliquet metus, a egestas velit
                hendrerit ut. Sed dignissim neque ac nibh pellentesque
                sollicitudin. Vivamus vel sem eget ligula lobortis
                sollicitudin. Duis dapibus leo non dolor faucibus congue.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Armantara</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vehicula lacinia ipsum, nec sollicitudin metus consequat eu.
            Phasellus id elit tristique, finibus elit vel, pulvinar turpis.
            Phasellus semper viverra tincidunt. Mauris id efficitur ligula, ac
            varius velit. Quisque feugiat elit ac lectus sagittis, id
            ullamcorper arcu viverra. Aliquam posuere, justo sit amet rutrum
            hendrerit, mi nunc luctus lacus, at vestibulum ex lorem id nunc.
            Integer vulputate ante id justo cursus rhoncus.
          </p>
          <p>
            Vivamus lacinia est eu sem varius, vitae euismod dolor aliquet.
            Suspendisse finibus tortor id quam maximus, id fermentum ipsum
            facilisis. Sed consequat consectetur elementum. Sed quis tortor
            tempus, posuere orci at, iaculis elit. Sed cursus auctor risus non
            fermentum. In laoreet justo sit amet commodo scelerisque. Aliquam
            in nibh eu urna faucibus convallis. Cras eu gravida justo, et
            ullamcorper ante. Vestibulum malesuada suscipit lorem a pharetra.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
