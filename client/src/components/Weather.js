import React from "react";

const Weather = ( { cities, handleSelectCity } ) => {
    return (
        <div className="w-full mx-auto justify-center justify-items-center">
            <h2 className="my-3 w-full">Current Weather</h2>
            <select 
                onChange={handleSelectCity}
                className="justify-center appearence-none w-96 bg-slate-50 border border-gray-300 text-gray-600 px-4 pr-8 rounded leading-tight">
                {cities.length > 0 && cities.map((city) => <option key={city}>{city}</option>)}
            </select>
        </div>
    )
}

export default Weather;