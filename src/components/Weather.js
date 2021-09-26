import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

class Weather extends Component {
  render() {
    return (
      <div>
        <Row
          xs={1}
          md={3}
          className="g-4"
          style={{
            position: "relative",
            margin: "90px",
            marginTop: "10px",
            left: "500px",
          }}
        >
          <Card
            border="primary"
            style={{
              width: "25rem",
              backgroundColor: "grey",
              color: "white",
            }}
          >
            <Card.Header style={{ fontWeight: "bold" }}>city</Card.Header>
            <Card.Body>
              <Card.Text style={{ fontFamily: "Times New Roman" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Times New Roman",
                  }}
                >
                  {" "}
                  description and date:{" "}
                </p>

                {this.props.weatherResult.description}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
        </Row>
      </div>
    );
  }
}

export default Weather;
