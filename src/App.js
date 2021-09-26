import React from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import Movie from './components/Movie';
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
      weatherInfo: false,
      movieInfo: false,
      weatherResult: [],
      movieResult: [],
    };
  }

  getLocFun = async (event) => {
    event.preventDefault();
    await this.setState({
      searchQuery: event.target.city.value,
    });

    console.log(this.state.searchQuery);
    console.log('key', process.env.REACT_APP_LOCATIONIQ_KEY);

    try {
      let reqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.searchQuery}&format=json`;
      console.log(reqUrl);
      let locResult = await axios.get(reqUrl);
      console.log('locResult', locResult);
      console.log('seclocResult', locResult.data);
      // console.log('seclocResult', locResult.data[0]);
      this.getWeather();
      this.getMovie();
      this.setState({
        locationResult: locResult.data[0],
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

  getWeather = async (event) => {
    //`${process.env.REACT_APP_SERVER_LINK}/getWeather?city=${this.state.searchQuery}&`;
    let reqWeatherUrl = `https://lab09-301d33.herokuapp.com/getWeather?city=${this.state.searchQuery}&days=4`
    //${process.env.REACT_APP_SERVER_LINK}/getWeather?city=${this.state.searchQuery}&
    let reqWeatherUrl = `https://lab03d33-lab08-backend.herokuapp.com/getWeather?city=${this.state.searchQuery}&days=4`;
    console.log(reqWeatherUrl);
    let weatherResult = await axios.get(reqWeatherUrl);
    console.log(weatherResult);
    this.setState({
      weatherResult: weatherResult.data,
      weatherInfo: true,
    });
  };

  getMovie = async (event) => {
    let reqMovieUrl = `https://lab09-301d33.herokuapp.com/getMovie?searchQuery=${this.state.searchQuery}`;
    //`${process.env.REACT_APP_SERVER_LINK}/getMovie?searchQuery=${this.state.searchQuery}`;
    let reqMovieUrl = `https://lab03d33-lab08-backend.herokuapp.com/getMovie?searchQuery=${this.state.searchQuery}`;
    console.log(reqMovieUrl);
    let movieResult = await axios.get(reqMovieUrl);
    console.log(movieResult);
    this.setState({
      movieResult: movieResult.data,
      movieInfo: true,
    });
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
            <p
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '30px',
                fontFamily: 'Times New Roman',
              }}
            >
              City name: {this.state.searchQuery}
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
              }}
            >
              latitude: {this.state.locationResult.lat}
            </p>
            <p
              style={{
                fontWeight: 'bold',
                fontFamily: 'Times New Roman',
                textAlign: 'center',
              }}
            >
              longitude: {this.state.locationResult.lon}{' '}
            </p>

            <img
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                border: '8px ridge black',
                padding: '5px',
              }}
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=10`}
              alt='city'
            />

                 {this.state.weatherResult.map((item) => {
                      return <Weather weatherResult={item} />;  
                 }
                 )}
            {this.state.movieResult.map((item) => {
              return <Movie movieResult={item} />;
            })}

            {/* 
            <p style={{ fontWeight: 'bold' }}>
              Description: {this.state.locationResult[0].description}
            </p>
            <p style={{ fontWeight: 'bold' }}>
              Description: {this.state.locationResult[1].description}{' '}
            </p>
            <p style={{ fontWeight: 'bold' }}>
              Description: {this.state.locationResult[2].description}{' '}
            </p> */}
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