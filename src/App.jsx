import axios from "axios"
import {useState} from "react"

function App() {

  const [data,setData] = useState({});
  const [location,setLocation] = useState('');
  const [error,setError] = useState('');
  

  const getBackground = () => {
    if (!data.weather) return "sunny.jpg"; 
    const weatherCondition = data.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case "clear":
        return "agriculture-blue-sky-clear-sky-518415.jpg"; 
      case "clouds":
        return "pexels-pixabay-414659.jpg";
      case "rain":
        return "pexels-braziltopno-751005.jpg";
      case "snow":
        return "pexels-jmleczek-801787.jpg";
      case "thunderstorm":
        return "thunderstorm.jpg";
      case "drizzle":
        return "drizzle.jpg";
      default:
        return "sunny.jpg"; 
    }
  };

  const searchLocation = (event) => {
    if(event.key === 'Enter'){

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6336806cb271a32e08b1b5b9b6554763`
   
      axios.get(url).then((response) => {
      setData(response.data);
      setError('');
      console.log(response.data)
     })
     .catch((err) => {
      setError('Location Not Found. Try Again.');
      setData({});
     });
     setLocation('');
   }
  }

  return (
    <><div className="app"
    style={{
      backgroundImage: `url(${getBackground()})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      color: "white",
    }}>
      <div className="container">
        <div className="top">
          <div className="search">
            <input onKeyPress={searchLocation}
                   value={location}
                   onChange={event => setLocation(event.target.value)} 
                   placeholder="Enter Location" 
                   type="text" />
          </div>
          {error && <div className="error-msg">{error}</div>}
          <div className="loaction">
            <span id="loc-span">{data.name}</span>
          </div>
          <div className="temp">
            {data.main ?  <span id="temp-span">{data.main.temp.toFixed()}°C</span> : null}
          </div>
          <div className="decription">
          {data.weather ?  <span>{data.weather[0].main}</span> : null}
          </div>
        </div>

        {data.name != undefined && 
        <div className="bottom">
        <div className="feels">
          {data.main ? <span>{data.main.feels_like.toFixed()}°C</span> : null}
          <span>Feels like</span>
        </div>
        <div className="humidity">
        {data.main ? <span>{data.main.humidity}%</span> : null}
           <span>Humidity</span>
        </div>
        <div className="wind">
          {data.wind ? <span>{data.wind.speed.toFixed()} Km/h</span> : null}
          <span>Wind Speed</span>
        </div>
      </div>}
        
      </div>
      </div>
      
    </>
  )
}

export default App

