import React from "react";
import { RingLoader } from 'react-spinners';
import Moment from 'react-moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from "./App.css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      result: [],
      isLoading: true
    };
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      this.getWeather(latitude, longitude);
    });
  };

  getWeather = async (latitude, longitude) => {
    let url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=1d01848926ea953429ba966319e5e4d9`

    // Check if url correct if not -> catch error
    try {
      let data = await fetch(url);
      let response = await data.json();

      this.setState({
        locationName: response.city.name,
        result: response.list,
        isLoading: false
      })

    } catch (error) {
      alert(error)
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="react-spinner" style={{ marginTop: 400 }}>
          <RingLoader color={'#123abc'} />
        </div>)
    }

    let myArr = this.state.result.map((value, idx) => {

      if (idx === 0) {
        return (<div className="row justify-content-center text-center weather-card">
          <h2 className="col-12 display-4 my-2 py-3 text-success"><Moment format="DD/MM/YYYY HH:mm">{value.dt_txt}</Moment></h2>
          <h3 className="col-12 text-danger">{Math.round(value.main.temp * 9 / 5 - 459.67)} &#186;F</h3>
          <h3 className="col-12 text-danger">{Math.round(value.main.temp - 273.15)} &#186;C</h3>
          <h3 className="col-12">Status: {value.weather[0].description}</h3>
        </div>)
      }
      return (<div class="weather-card">
        <h2 className="col-12 display-4 my-2 py-3 text-success"><Moment format="DD/MM/YYYY HH:mm">{value.dt_txt}</Moment></h2>
        <h3 className="col-12 text-danger">{Math.round(value.main.temp * 9 / 5 - 459.67)} &#186;F</h3>
        <h3 className="col-12 text-danger">{Math.round(value.main.temp - 273.15)} &#186;C</h3>
        <h3 className="col-12">Status: {value.weather[0].description}</h3>
      </div>)
    })

    return (<div className="container">
      <div className="row justify-content-center text-center">
        <h1 className="col-12 display-4 my-2 py-3 font-weight-bold">
          {this.state.locationName}
        </h1>
        {myArr}
      </div>
    </div>)
  }
}

export default App;
