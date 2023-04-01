import { useEffect, useState } from 'react';

import axios from 'axios';

const Notification = ({ message }) => {
    if (message === '') return null;
    return <div>{message}</div>
}

const CountryDetails = ({ country, weather }) => {
    if (country === null) {
        return null
    }
    return (
        <div><h1>{country.name.common}</h1>
            <div>capital {country.capital.map(capital => <span>{capital}</span>)}</div>
            <div>area {country.area}</div>

            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(language => <li>{language}</li>)}
            </ul>

            <img src={country.flags.svg} height="150" alt={country.flags.alt} />

            <h2>Weather in {country.capital[0]}</h2>
            <WeatherDetails weather={weather} />
        </div>
    );
}

const WeatherDetails = ({ weather }) => {

    if (weather === null) return null;
    return (
        <div>
            <div>temperature {weather.main.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <div>wind {weather.wind.speed} m/s</div>
        </div>
    )
}


function App() {
    // const [searchInput, setSearchInput] = useState('');
    const [countries, setCountries] = useState([]);
    const [message, setMessage] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const [country, setCountry] = useState(null)
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data)
            });
    }, [])
    const handleSearch = (event) => {
        console.log("handle search")
        // setSearchInput(event.target.value);

        let result = countries.filter(x => x.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
        console.log(result)
        setSearchResult([]);
        setMessage('');
        setCountry(null);
        // console.log(event.target.value.length)
        if (event.target.value === '') { console.log('search result empty'); return; }
        if (result.length === 0) {
            // setSearchResult(result)
            setMessage('No results');
            return;
        }
        if (result.length === 1) {
            console.log(result[0]);
            // setSearchResult([]);
            // setMessage('');
            // setCountry(result[0]);
            showCountryDetails(result[0].name.common)
            return;
        }
        if (result.length > 10) {
            // setCountry(null);
            // setSearchResult([]);
            setMessage("Too many matches, specify another filter")
            return;
        }
        // setCountry(null);
        // setMessage('');
        setSearchResult(result)
    }

    const showCountryDetails = (commonName) => {
        let result = countries.filter(x => x.name.common === commonName);
        setCountry(result[0]);

        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${result[0].capital[0]}&appid=${api_key}`)
            .then(response => {
                console.log(response.data)
                
                setWeather(response.data)
            })
        return;

    }
    return (
        <>
            find countries <input onChange={handleSearch} />
            <Notification message={message} />
            {searchResult.map((country, index) =>
                <div key={country.name.common}>{country.name.common}
                    <button onClick={() => showCountryDetails(country.name.common)}>show</button>
                </div>)}

            <CountryDetails country={country} weather={weather} />
        </>
    );
}

export default App;
