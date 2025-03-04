
import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'







function App() {
  


const API_KEY ="71c406cd0696048af1069afda7277927";



const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result);
        console.log(result);
      });
    }
    fetchWeatherData();
  }, [lat,long])

  
 

 return (

<div>
  
{weatherData && weatherData.main && weatherData.weather && (
  <>
    <div className="header">
      <h1 className="city">{weatherData.name}</h1>
      <p className="temperature">{weatherData.main.temp}°F</p>
      <p className="condition">{weatherData.weather[0].main}</p>
    </div>
    <div className="weather-details">
      <div >
        <p >Humidity</p>
        <p style={{fontWeight:"bold"}}>{Math.round(weatherData.main.humidity)}%</p>
      </div>
      <div>
        <p>Wind Speed</p>
        <p style={{fontWeight:"bold"}}>{Math.round(weatherData.wind.speed)} mph</p>
      </div>
    </div>
  </>
)}


</div>






  );










};


export default App;