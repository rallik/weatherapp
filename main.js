async function getWeather(cityname, statecode, countrycode, apikey) {
    let weatherurl;
    if (cityname === "") {
        console.log('No city')
        return;
    } else if (cityname != "" && statecode === ""){
        weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname},${countrycode}&appid=${apikey}&units=imperial`;
    } else {
        weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname},${statecode},${countrycode}&appid=${apikey}&units=imperial`;
    }
    let apiresponse = await fetch(weatherurl)
        .then(response => response.json())
        .catch(err => console.error(err));;
    return apiresponse;
}

function convertTime(unixInput) {
    let time = new Date(unixInput * 1000);
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let session = "am";

    if (hour > 12){
        hour = hour - 12;
        session = "pm";
    }

    hour = (hour == 0) ? 12 : hour;
    // hour = (hour < 10 ) ? "0" + hour : hour;
    minute = (minute < 10 ) ? "0" + minute : minute;
    second = (second < 10 ) ? "0" + second : second;
    
    let time_display = hour + ":" + minute + ":" + second + " " + session;
    return time_display;
}

function getDaylight(daylightdata) {
    console.log(daylightdata);
    console.log(daylightdata.sunrise);
    console.log(daylightdata.sunset);

    let sunrise_here = daylightdata.sunrise;
    let sunset_here = daylightdata.sunset;

    let sunrise_onPage = document.getElementById("sunrise");
    let sunset_onPage = document.getElementById("sunset");

    sunrise_onPage.innerHTML = convertTime(sunrise_here);
    sunset_onPage.innerHTML = convertTime(sunset_here)
}

function pressureConv(pressure_hpa) {
    pressure_in = pressure_hpa * 0.03;
    let pressure_round = Math.round((pressure_in + Number.EPSILON) * 100) / 100
    return pressure_round;
}

function getTempHumidPress(tempdata){
    console.log(tempdata)

    let temp_here = tempdata.temp + `&#176`;
    let humid_here = tempdata.humidity + `&#37`;
    let pressure_here = pressureConv(tempdata.pressure) + " inHg";
    let feelslike_here = tempdata.feels_like + `&#176`;

    let temp_onPage = document.getElementById("currenttemp");
    let humid_onPage = document.getElementById("humidity");
    let pressure_onPage = document.getElementById("pressure");
    let feelslike_onPage = document.getElementById("feelslike");

    temp_onPage.innerHTML = temp_here;
    humid_onPage.innerHTML = humid_here;
    pressure_onPage.innerHTML = pressure_here;
    feelslike_onPage.innerHTML = feelslike_here;
}

function degToCompass(degrees) {
    let calc = Math.floor((degrees / 22.5) + 0.5);
    let cardinal = new Array("N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW");
    return cardinal[(calc % 16)];
}

function getWind(winddata){
    console.log(winddata);
    let speed_here = winddata.speed;
    let direction_here = degToCompass(winddata.deg);

    let wind_onPage = document.getElementById("wind");

    wind_onPage.innerHTML = speed_here + " " + direction_here;
}

function displayWeather(weatherdata) {
    console.log(weatherdata);
    let current_w_icon = weatherdata.weather[0].icon;
    let w_icon = document.getElementById("w_icon");
    let w_data = document.getElementById("w_data")
    w_data.style.display = "block";
    w_icon.src = `http://openweathermap.org/img/wn/${current_w_icon}@4x.png`;
    getDaylight(weatherdata.sys)
    getTempHumidPress(weatherdata.main)
    getWind(weatherdata.wind)
}

let searchbutton = document.getElementById("search");
let cityInput = document.getElementById("cityInput")
let stateInput = document.getElementById("stateInput")
let countryInput = document.getElementById("countryInput")


searchbutton.addEventListener("click", function(){
    let cityName = cityInput.value;
    let stateName = stateInput.value;
    let countryName = countryInput.value;
    console.log(cityName,stateName,countryName);
    let apikey = 'API-KEY';
    getWeather(cityName,stateName,countryName, apikey).then(data => displayWeather(data));
})



