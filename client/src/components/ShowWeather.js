import React from "react";

const ShowWeather = ( {data} ) => {
    const weatherCondition = data.weather[0].main.toLowerCase(); //mengambil data cuaca dari index ke 0 lalu dijadikan lowercase

    const bgClass = {
        clear: 'bg-cyan-300',
        clouds: 'bg-sky-200',
        rain: 'bg-sky-700',
        drizzle: 'bg-sky-900',
        thunderstorm: 'bg-indigo-900',
        snow: 'bg-cyan-100',
        mist: 'bg-gray-300'
    }[weatherCondition] || 'bg-sky-300';
    
    return (
        <div className={`justify-self-center w-64 rounded overflow-hidden shadow-lg ${bgClass}`}>
            <img className="w-full justify-self-center"
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="weather icon"/>
                <div className="px-6 py-4">
                <h3 className="font-bold text-xl mb-2">{data.name}</h3>
                <div className="text-gray-700 text-base">
                     <span>{data.weather[0].main}</span> <br></br>
                     <span>{Math.floor(data.main.temp)}&deg;C</span>
                </div>
            </div>
        </div>
    )
}

export default ShowWeather;