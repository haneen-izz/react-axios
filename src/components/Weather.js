import React, { Component } from "react";

class Weather extends Component {
  render() {
    return <div><p style={{fontFamily: "Times New Roman"}}>{this.props.weatherResult.description}</p></div>;
  }
}

export default Weather;
