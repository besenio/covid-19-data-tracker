import React, { useState, useEffect } from 'react'
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import StatsCard from './components/StatsCard';
import Map from './components/Map';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2
            }));

            setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
  };

  console.log("COUNTRY INFO >>>>>", countryInfo)

  return (
    <div className="app">
      <div className="app-left">
        <div className="app-header">
          <h1>COVID-19 Data Tracker</h1>
          <FormControl className="app-dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              { countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        <div className="app-stats">
          <StatsCard
            title="Coronavirus Cases"
            cases={countryInfo.todayCases} 
            total={countryInfo.cases}/>
          <StatsCard
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}/>
          <StatsCard
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}/>
        </div>

        <div className="app-map">
          <Map />
        </div>
      </div>

      <Card className="app-right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;