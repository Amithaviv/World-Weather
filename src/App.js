import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const locations = [
  { name: 'Tokyo', coords: '35.6762,139.6503', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1058360160-1-1624796189.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*'},
  { name: 'London', coords: '51.507222,-0.127758' ,image: 'https://www.kaplaninternational.com/files/styles/hero_banner_md/public/school/gallery/kaplan-english-school-in-London-4.jpg?itok=RhkxxF50'},
  { name: 'New York', coords: '40.712776,-74.005974' ,image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/NYC_Downtown_Manhattan_Skyline_seen_from_Paulus_Hook_2019-12-20_IMG_7347_FRD_%28cropped%29.jpg/1200px-NYC_Downtown_Manhattan_Skyline_seen_from_Paulus_Hook_2019-12-20_IMG_7347_FRD_%28cropped%29.jpg'},
  { name: 'Paris', coords: '48.856613,2.352222', image: 'https://cdn.mos.cms.futurecdn.net/pD3bsKPrjsqNiFDGRL5oq6.jpg'},
  { name: 'Munich', coords: '48.137154,11.576124' ,image: 'https://res.klook.com/image/upload/Mobile/City/xxm5eghz6vaayblixclj.jpg'},
  { name: 'Sydney', coords: '-33.865143,151.2099', image: 'https://a.cdn-hotels.com/gdcs/production90/d515/39e765a9-77d3-40e7-bdaf-94f6731a5b27.jpg'},
  { name: 'Rio de Janeiro', coords: '-22.9068,-43.1729', image: 'https://a.cdn-hotels.com/gdcs/production143/d357/42fb6908-dcd5-4edb-9f8c-76208494af80.jpg'},
  { name: 'Barcelona', coords: '41.3851,2.1734', image: 'https://images.interactives.dk/barcelona-woman-dk-9nkzVTX41BTkR5_t3aYL2Q.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&ixjsv=2.2.4&q=38&rect=0%2C0%2C0%2C0&w=430'},
  { name: 'Cape Town', coords: '-33.9249,18.4241', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2e/1e/cape-town.jpg?w=700&h=-1&s=1'},
];

const API_KEY = 'Write here your OpenWeather API KEY';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const requests = locations.map(location =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.split(',')[0]}&lon=${location.coords.split(',')[1]}&units=metric&appid=${API_KEY}`)
          .then(response => ({ name: location.name, data: response.data ,image:location.image}))
          .catch(error => ({ name: location.name, error: error }))
      );
      const results = await Promise.all(requests);
      setWeatherData(results);
      console.log(results)
    }
    fetchData();
    
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(intervalId); 
    }, []);

  return (
    <div>
    <h1 id="title">World Weather</h1>
    <div className="container">
      {weatherData.map(item => (
        <div key={item.name} className="country">
          <h2>{item.name}</h2>
          <img className="image" src={item.image} alt={item.name} />
          {item.error && <p>Failed to load weather data</p>}
          {item.data && (
            <div id='weather'>
              <h3>Current temperature: {item.data.main.temp} degrees Celsius</h3>
              <h3>Current weather: {item.data.weather[0].description}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
