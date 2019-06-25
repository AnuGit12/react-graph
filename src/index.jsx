import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

import PanelLayout from "./panelLayout.jsx";

import { Row, Col } from "reactstrap";
import Header from "./navbar.jsx";
import SliderProvider from "./context/sliderProvider.jsx";
import "font-awesome/css/font-awesome.min.css";


class App extends React.Component {
  render() {
    return (
      <Row>
        <Col md="12">
          <Header />
          <PanelLayout />
        </Col>
      </Row>
    );
  }
}

window.React = React;
window.ReactDOM = ReactDOM;

ReactDOM.render(<App />, document.getElementById("app"));
