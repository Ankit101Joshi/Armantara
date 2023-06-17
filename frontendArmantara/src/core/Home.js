
import React from 'react';
import "../style.css";
import { API } from "../backend";
import Base from './Base';

const Home = () => {
  return (
    <Base title="Home Page" description="Welcome to the Home Page">
      <div className="row">
      <div className="col-4">
        <button className="btn btn-success">TEST</button>
      </div>
      <div className="col-4">
      <button className="btn btn-success">TEST</button>
      </div>
      <div className="col-4">
      <button className="btn btn-success">TEST</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;
