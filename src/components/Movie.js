import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
class Movie extends Component {
  render() {
    return (
      <div>
        <Row xs={2} md={3} className='g-4'>
          <CardGroup>
            <Card>
              <Card.Img
                variant='top'
                src={this.props.movieResult.poster_path}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    fontFamily: 'Times New Roman',
                  }}
                >
                  {this.props.movieResult.title}
                </Card.Title>
                <Card.Text style={{ fontFamily: 'Times New Roman' }}>
                  {this.props.movieResult.overview}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Row>

        {/* <p style={{fontWeight: 'bold',fontSize:'20px', fontFamily: 'Times New Roman'}}>
        {this.props.movieResult.title}
        </p>
        <br />
        <p style={{fontFamily: 'Times New Roman'}}>
        {this.props.movieResult.overview}
        </p>
        <br />
        <img
          style={{ width: '40%', height:'40%',display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          border: '8px ridge blue', 
          padding: '5px'  }}
          src={this.props.movieResult.poster_path}
          alt=''
        /> */}
      </div>
    );
  }
}

export default Movie;
