const API_KEY = "5baf9736450d63ec19e7c976c552cb91"

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search")

const countryName = document.getElementById("country-name")
const countryFlag = document.getElementById("country-flag")

const weatherFlag = document.getElementById("weather-flag")
const temp = document.getElementById("temp")
const tempMin = document.getElementById("temp-min")
const tempMax = document.getElementById("temp-max")

const weather = document.getElementById("weather-condition")
const wind = document.getElementById("wind-condition")
const humidity = document.getElementById("humidity-condition")

function timeHander() {
    setInterval(() => {
        let localDate = new Date()
    
        document.querySelector("span[ data-time=hours]").textContent = localDate.getHours().toString().padStart(2,"0")
        document.querySelector("span[ data-time=minutes]").textContent = localDate.getMinutes().toString().padStart(2,"0")
        document.querySelector("span[ data-time=seconds]").textContent = localDate.getSeconds().toString().padStart(2,"0")
        
    },1000)
}

const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    return data
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)
    countryName.innerText = data.name
    weatherFlag.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    temp.innerText = `Temperatura: ${Math.round(data.main.temp)} °C`
    tempMin.innerText = `Mínima: ${Math.round(data.main.temp_min)} °C`
    tempMax.innerText = `Máxima: ${Math.round(data.main.temp_max)} °C`
    const weatherCond = data.weather[0].description.split(" ")
    const editWeather = weatherCond.map((value) => {
        return value[0].toUpperCase() + value.substring(1)
    }).join(" ")
    console.log(editWeather)
    weather.innerText = `Condição do tempo: ${editWeather}`
    wind.innerText = `${data.wind.speed} m/s`
    humidity.innerTex = `${data.main.humidity}%`


    countryFlag.setAttribute("src",`https://flagsapi.com/${data.sys.country}/flat/64.png`)
}


searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const city = cityInput.value
    showWeatherData(city)
})

timeHander()






