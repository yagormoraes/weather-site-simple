const API_KEY = "5baf9736450d63ec19e7c976c552cb91"

const weatherContainer = document.getElementById("weather-data")
const countryContainer = document.getElementById("country-data")

const cityInput = document.getElementById("city-input")
const searchBtn = document.getElementById("search")
const geoLocal = document.getElementById("geo-search")

const countryName = document.getElementById("country-name")
const countryFlag = document.getElementById("country-flag")

const weatherFlag = document.getElementById("weather-flag")
const temp = document.getElementById("temp")
const tempMin = document.getElementById("temp-min")
const tempMax = document.getElementById("temp-max")

const weather = document.getElementById("weather-condition")
const wind = document.getElementById("wind-condition")
const humidity = document.getElementById("humidity-condition")

const getWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`
    const res = await fetch(url)
    const data = await res.json()
    return data
}

async function timeHander() {
    
    setInterval(() => {
        let localDate = new Date()
    
        document.querySelector("span[ data-time=hours]").textContent = localDate.getHours().toString().padStart(2,"0")
        document.querySelector("span[ data-time=minutes]").textContent = localDate.getMinutes().toString().padStart(2,"0")
        document.querySelector("span[ data-time=seconds]").textContent = localDate.getSeconds().toString().padStart(2,"0")
        
    },1000)
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city)
    console.log(data)

    countryName.innerText = `${data.name}, ${data.sys.country}`
    weatherFlag.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    temp.innerText = `${Math.round(data.main.temp)} °C`
    tempMin.innerText = `${Math.round(data.main.temp_min)} °C`
    tempMax.innerText = `${Math.round(data.main.temp_max)} °C`
    weather.innerText = `${data.weather[0].description}`
    wind.innerText = `${data.wind.speed} m/s`
    humidity.innerText = `${data.main.humidity}%`

    weatherContainer.style.display = "flex"
    countryContainer.style.display = "flex"


    countryFlag.setAttribute("src",`https://flagsapi.com/${data.sys.country}/flat/64.png`)
}


searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const city = cityInput.value
    showWeatherData(city)
})

const sucess = async (pos) => {
    const geoValues = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
    }

    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${geoValues.lat}&lon=${geoValues.long}&limit=1&appid=${API_KEY}`
    const res = await fetch(url)
    const data = await res.json()
    const city = data[0].name
    showWeatherData(city)

}

const error = (e) => {
    console.log(e)
}

geoLocal.addEventListener("click", (e) => {
    e.preventDefault()
    navigator.geolocation.watchPosition(sucess,error)
})




timeHander()






