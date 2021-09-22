import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: {},
      searchQuery: '',
      showLocInfo: false,
      showError: false,
    };
  }

  getLocFun = async (event) => {
    event.preventDefault();

    await this.setState({
      searchQuery: event.target.city.value,
    });
    console.log(this.state.searchQuery);
    // console.log('key', process.env.REACT_APP_LOCATIONIQ_KEY);

    try {
      let reqUrl = `${process.env.REACT_APP_SERVER_LINK}/getWeather?searchQuery=${this.state.searchQuery}`;
      console.log(reqUrl);
      let locResult = await axios.get(reqUrl);
      console.log('locResult', locResult);
      console.log('seclocResult', locResult.data);
      // console.log('seclocResult', locResult.data[0]);

      this.setState({
        locationResult: locResult.data,
        showLocInfo: true,
        showError: false,
      });
      console.log(this.state.locationResult);
    } catch {
      console.log('something went wrong');
      this.setState({
        showError: true,
        showLocInfo: false,
      });
    }
  };

  render() {
    return (
      <div>
        <h2
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '80px',
            position: 'relative',
            bottom: '20px',
            backgroundColor: 'grey',
          }}
        >
          City Explorer app
        </h2>

        {/* <form style ={{textAlign:'center'}} onSubmit={this.getLocFun}>
          <input type='text' name='city' />
          <input type='submit' value='get city info' />
        </form> */}
        <Form
          style={{
            textAlign: 'center',
            padding: '100px',
            width: '100%',
            backgroundColor: 'black',
            borderStyle: 'outset',
            borderColor: 'grey',
          }}
          onSubmit={this.getLocFun}
        >
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label style={{ fontWeight: 'bold', color: 'white' }}>
              city Explorer
            </Form.Label>
            <Form.Control type='text' name='city' placeholder='city' />
            <Form.Text className='text-muted'></Form.Text>
          </Form.Group>
          <Button
            style={{ color: 'white' }}
            variant='outline-dark'
            type='submit'
          >
            submit
          </Button>{' '}
          <Button as='input' type='reset' value='Reset' />
        </Form>

        {this.state.showLocInfo && (
          <>
            <p style={{ fontWeight: 'bold' }}>
              City name: {this.state.searchQuery}
            </p>
            {/* <p style={{ fontWeight: 'bold' }}>
              latitude: {this.state.locationResult.lat}
            </p>
            <p style={{ fontWeight: 'bold' }}>
              longitude: {this.state.locationResult.lon}{' '}
            </p> */}
            <p style={{ fontWeight: 'bold' }}>
              Description: {this.state.locationResult[0].description}
            </p>

            <p style={{ fontWeight: 'bold' }}>
              Description: {this.state.locationResult[1].description}{' '}
            </p>

            <p style={{ fontWeight: 'bold' }}>
              Description: {this.state.locationResult[2].description}{' '}
            </p>
{/* 
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`}
              alt='city'
            /> */}
          </>
        )}
        {this.state.showError && (
          <p> something wrong in getting location data</p>
        )}
      </div>
    );
  }
}

export default App;
