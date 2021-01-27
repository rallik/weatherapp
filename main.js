// async function cityCodeImport() {
//     let jsonsource = './citylist.json'
//     let data = await fetch(jsonsource)
//         .then(response => response.json())
//         .catch(err => console.error(err));
//     console.log('code data', data);
//     return data;
//     // const cityCodeData =  cityCodeResponse.json()

// }

async function getWeather(cityname, statecode, countrycode, apikey) {
    let weatherurl;
    if (statecode == null){
        weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname},${countrycode}&appid=${apikey}&units=imperial`;
    } else {
        weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname},${statecode},${countrycode}&appid=${apikey}&units=imperial`;
    }
    let apiresponse = await fetch(weatherurl)
        .then(response => response.json())
        .catch(err => console.error(err));;
    return apiresponse
}



const searchbutton = document.getElementById("search");
const cityInput = document.getElementById("cityInput")
const stateInput = document.getElementById("stateInput")
const countryInput = document.getElementById("countryInput")


searchbutton.addEventListener("click", function(){
    let cityName = cityInput.value;
    let stateName = stateInput.value;
    let countryName = countryInput.value;
    console.log(cityName,stateName,countryName);
    let apikey = ;
    getWeather(cityName,stateName,countryName, apikey).then(data => console.log(data));
})

