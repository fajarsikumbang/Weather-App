import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import './index.css';

import AddCity from './components/AddCity';
import Weather from './components/Weather';
import ShowWeather from './components/ShowWeather';


function App() {
  const [city, setCity] = useState(' ');//mengembalikan nilai dan merubah nilainya
  const [cities, setCities] = useState([]);//data yang sudah diset user di database
  //Fungsi untuk ketika klik submit
  const [weather, setWeather] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    addCity(city);
  }
  //Fungsi untuk menmbahkan city
  const addCity = async (city) => {
    await axios.post(`/api/cities`, { city:city }); //route dari server untuk menyimpan city yg diinput user kedalam database
    getCities();//agar data terupdate disisi frontend
    setCity('');//mengkosongkan form supaya user bisa menambahkan kota lagi
  }
  //query ke database
  const getCities = async () => {
    const { data } = await axios(`/api/cities`);
    const cities = data.cities.map((city) => city.city_name); //untuk mengambil namanya saja
    setCities(cities);
  }
  const getWeather = async (city) => {
    const { data } = await axios(`/api/weather/${city}`);
    setWeather(data);
  }

  useEffect(() => {
    getCities()//ketika react direfresch akan auto menjalankan getcities untuk mengambil data di database
  }, []); //ketika datanya belum ada, akan mereturn array kosong

  return (
    <div>
      <div className="bg-blue-500 p-4 text-white font-mono">
       Weather Application
     </div>
      <div className="container text-center mx-auto my-20 text-gray-700">
        <h1 className="my-3 font-mono text-4xl text-gray-500">Awesome Weather Dasboard</h1>
        <p>The current weather for your favorite cities!</p>
        <AddCity
          handleSubmit={handleSubmit}
          handleInputChange={(e) => setCity(e.target.value)}
          newCity={city}
        />
        <div>
        <Weather cities={cities} handleSelectCity={(e) => getWeather(e.target.value)}/>
        </div>
        <div className='mt-4'>
          {weather && <ShowWeather data={weather}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
