const screen = document.querySelector('#screen');
const reporter = document.querySelector('.yapper');
const nextBtn = document.querySelector('#switchnext');
const bearReporter = document.querySelector('#bearReporter');
const comic = document.querySelector('.comic-bubble-below')
const overallBtn = document.querySelector('#overallBtn');
const header = document.querySelector('.container');
const backtoStart = document.querySelector('#backtostart');
const body = document.body;


document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

function getWeather(city) {
    const apiKey = '528b2cb1cc60bb6d0794475480274317'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                header.style.display = "none"
                overallDisplay(data);
                screenDisplay(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h1>${data.main.temp}°C</h1>
        <h2>WindSpeed : ${data.wind.speed}m/s</h2>
        
    `;

    // Weather description
    if (data.weather[0].description === "moderate rain" || data.weather[0].description === "light rain") {
        weatherInfo.style.background = "linear-gradient(to bottom, #a2c0f1, #3a497e);"
       // weatherInfo.innerHTML += `
       // <h1>${data.weather[0].description} ${data.main.temp}</h1>
       // <p>Humidity: ${data.main.humidity}%</p>  
   // `
    // }  else {
        // weatherInfo.innerHTML += `
        //<p>Weather: ${data.weather[0].description}</p>`;
    }

    else if (data.weather[0].description === "overcast cloud" || data.weather[0].description === "broken cloud") {
        weatherInfo.style.background = "linear-gradient(to bottom, #b0c4de, #778899);"

    }
    // Temperature
    if (data.main.temp < 25) {
        weatherInfo.innerHTML += `<div id="temperature">
        <p>Temperature: ${data.main.temp}°C</p>
        <img src="https://media.tenor.com/-b2iSY4zDjYAAAAi/snoopy.gif" alt="temperatureGif" style="width: 100px; height: 80px">
        <p>Such a lovely day! Let's enjoy the fresh air!</p>
        </div>`;
    } else if (data.main.temp >= 25 && data.main.temp < 32) { // Corrected the temperature range condition
        weatherInfo.innerHTML += `<div id="temperature">
        <p>Temperature: ${data.main.temp}°C</p>
        <img src="https://media.tenor.com/pUQGNMgYn1cAAAAi/tkthao219-bubududu.gif" alt="temperatureGif" style="width: 100px; height: 80px">
        <p>Perfect weather for a walk together!</p>
        </div>`;
    } else if (data.main.temp >= 32 && data.main.temp < 40) { // Corrected the temperature range condition
        weatherInfo.innerHTML += `<div id="temperature">
        <p>Temperature: ${data.main.temp}°C</p>
        <img src="https://media1.tenor.com/m/h3SeWBC7RqoAAAAC/dog-fridge.gif" alt="temperatureGif" style="width: 100px; height: 80px">
        <p>It's getting hot! Stay cool, my love!</p>
        </div>`;
    } else {
        weatherInfo.innerHTML += `<div id="temperature">
            <p>Temperature: ${data.main.temp}°C</p>
            <img src="https://media.tenor.com/4DpX1BfQ68cAAAAi/hot-melt.gif" alt="super hot weather" style="width: 100px; height: 80px">
            <p>Super hot out! Stay hydrated, darling!</p>
        </div>`;
    }
    
    // Wind speed
    if (data.wind.speed <= 2) { // Added missing condition for calm breeze
        weatherInfo.innerHTML += `
        <div id="windSpeed">
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <img src="https://i.gifer.com/fzmZ.gif" alt="windy" style="width: 130px; height: 80px;">
         <p>Such a calm breeze! Perfect for a romantic evening!</p>
        </div>`;
    } else if (data.wind.speed > 2 && data.wind.speed <= 10) {
        weatherInfo.innerHTML += `<div id="windSpeed">
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <img src="https://media1.tenor.com/m/NDQvfTri8zcAAAAC/windy-day-cat.gif" alt="moderate wind" style="width: 130px; height: 80px;">
            <p>Whoa, it's windy! Hold my hand tight!</p>
            </div>`;
    } else {
        weatherInfo.innerHTML += `<div id="windSpeed">
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <img src="https://media.tenor.com/0b2PK4cXB28AAAAi/bun-cute.gif" alt="moderate wind" style="width: 130px; height: 80px;">
        <p>Whoa, it's crazy out here stay at home safe my love!</p>
        </div>`; // Corrected the closing tag position
    }

    // Rain
    if (data.rain) {
        const rainAmount = data.rain['1h'] || data.rain['3h'] || data.rain;
        console.log(rainAmount);
        console.log(data.rain);
        if (rainAmount < 2) {
            weatherInfo.innerHTML += `<div id="rain">
                <p>Rain: ${rainAmount} mm</p>
                <img src="https://media.tenor.com/hmYv6-dCkGgAAAAi/bubu-dudu-bubu.gif" alt="light rain" style="width: 80px; height: 80px;">
                <p>Just a light drizzle! A perfect excuse to cuddle inside!</p>
                </div>`;
        } else if (rainAmount >= 2 && rainAmount < 10) {
            weatherInfo.innerHTML += `<div id="rain">
                <p>Rain: ${rainAmount} mm</p>
                <img src="https://media.tenor.com/-i5DxaW3J70AAAAi/tkthao219-bubududu.gif" alt="moderate rain" style="width: 80px; height: 80px;">
                <p>Moderate rain! How about a movie marathon?</p>
                </div>`;
        } else {
            weatherInfo.innerHTML += `<div id="rain">
                <p>Rain: ${rainAmount} mm</p>
                <img src="https://media1.tenor.com/m/SZo_-th-7KYAAAAC/tkthao219-bubududu.gif" alt="heavy rain" style="width: 80px; height: 80px;">
                <p>Heavy rain! Stay cozy at home with hot chocolate!</p>
            </div>`;
        }
    }

    // Snow and GIFs
    if (data.snow) {
        const snowAmount = data.snow['1h'] || data.snow['3h'] || data.snow;

        if (snowAmount < 2) {
            weatherInfo.innerHTML += `<div id="snow">
                <p>Snow: ${snowAmount} mm</p>
                <img src="https://media1.tenor.com/m/eOlpqEWf5_MAAAAC/bubududu-snow.gif" alt="light snow" style="width: 80px; height: 80px;">
                <p>Just a light snowfall! Let's build a snowman together!</p>
            </div>`;
        } else if (snowAmount >= 2 && snowAmount < 10) {
            weatherInfo.innerHTML += `<div id="snow">
                <p>Snow: ${snowAmount} mm</p>
                <img src="https://media.tenor.com/0H9_41QCZFAAAAAi/tkthao219-bubududu.gif" alt="moderate snow" style="width: 80px; height: 80px;">
                <p>Moderate snow! Time for a snowy adventure!</p>
            </div>`;
        } else {
            weatherInfo.innerHTML += `<div id="snow">
                <p>Snow: ${snowAmount} mm</p>
                <img src="https://media1.tenor.com/m/3bQdox1CD2QAAAAC/kristigocouple2024.gif" alt="heavy snow" style="width: 80px; height: 80px;">
                <p>Heavy snow! Let's snuggle up and stay warm!</p>
            </div>`;
        }
    }
}

function getWindDirection(deg) {
    if (deg > 337.5 || deg <= 22.5) return 'North';
    else if (deg > 22.5 && deg <= 67.5) return 'North-East';
    else if (deg > 67.5 && deg <= 112.5) return 'East';
    else if (deg > 112.5 && deg <= 157.5) return 'South-East';
    else if (deg > 157.5 && deg <= 202.5) return 'South';
    else if (deg > 202.5 && deg <= 247.5) return 'South-West';
    else if (deg > 247.5 && deg <= 292.5) return 'West';
    else if (deg > 292.5 && deg <= 337.5) return 'North-West';
    else return 'Unknown';
}

document.addEventListener('DOMContentLoaded', () => {
    const date = new Date()
    const screen = document.querySelector('#screen');
    
function Screen() {
    if (screen) {
        screen.innerHTML += `
        <p class="screenP">${date} Weather Report</p>
        `;
    }
}
Screen();
});

function screenDisplay(data) {
    const nextBtn = document.querySelector('#switchnext')
    
        
            nextBtn.style.display = 'block';
            screen.innerHTML = `
                <h2 class="screenP">${data.name}, ${data.sys.country}</h2>
                <img src="https://cdn-icons-png.flaticon.com/512/4907/4907228.png" alt="clouds" style="width: 80px; height: 80px;">
                <p class="screenP">Humidity: ${data.main.humidity}%</p>
            `;
            reporter.textContent = `Today's weather for ${data.name} is`;
        

nextBtn.addEventListener('click', () => {
    const lastPElement = screen.querySelector('p.screenP:last-of-type');
    const windDirection = getWindDirection(data.wind.deg);
    const weatherDescription = data.weather[0].description;
    console.log(weatherDescription)
    screen.innerHTML = `
             <h2 class="screenP">${data.name}</h2>
             <p class="screenP"><span id="R">RV</span> Channel</p>
             <p class="screenP">${weatherDescription}</p>`;
             reporter.textContent = `Today's weather for ${data.name} is`;
        console.log(lastPElement)


        if (lastPElement && lastPElement.textContent === `Humidity: ${data.main.humidity}%`)
    {   console.log(reporter.textContent)
        if (weatherDescription === 'clear sky') {
            nextBtn.style.display = "none";
            setTimeout(clearSky, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/sun.gif" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Today's weather is clear with blue skies and plenty of sunshine.",
                "Expect a bright and sunny day with clear skies all around."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'few clouds') {
            nextBtn.style.display = "none";
            setTimeout(fewClouds, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/mostly sunny.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "A few clouds in the sky, but mostly sunny throughout the day.",
                "Mostly clear skies with just a few scattered clouds."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'scattered clouds') {
            nextBtn.style.display = "none";
            setTimeout(scatteredClouds, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/scatteredcloud.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Scattered clouds today, allowing for occasional sunshine.",
                "Partly cloudy with intermittent periods of sun."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'broken clouds') {
            nextBtn.style.display = "none";
            setTimeout(brokenClouds, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/brokencloud.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Broken clouds today with some sun peeking through.",
                "Partly sunny with periods of broken clouds."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'shower rain') {
            nextBtn.style.display = "none";
            setTimeout(showerRain, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/lightrain.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Expect intermittent shower rain throughout the day.",
                "Light showers on and off with brief breaks in between."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'rain') {
            nextBtn.style.display = "none";
            setTimeout(rain, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/lightrain.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Steady rain expected for most of the day.",
                "A rainy day with consistent rainfall and cloudy skies."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'thunderstorm') {
            nextBtn.style.display = "none";
            setTimeout(thunderstorm, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f4d7f940327117.577b56e116a17.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Thunderstorms are likely today with occasional lightning.",
                "Stormy weather ahead with thunder, lightning, and heavy rain."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'snow') {
            nextBtn.style.display = "none";
            setTimeout(snow, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/snow.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Snowfall expected today, accumulating on the ground.",
                "A snowy day with flurries throughout the afternoon."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'mist') {
            nextBtn.style.display = "none";
            setTimeout(mist, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://st4.depositphotos.com/1000507/23538/v/380/depositphotos_235385972-stock-illustration-mist-cloud-fog-icon-simple.jpg" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Misty conditions with low visibility this morning.",
                "A misty day with a foggy start and reduced visibility."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'overcast clouds') {
            nextBtn.style.display = "none";
            setTimeout(overcastClouds, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/clouds.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Today’s weather is overcast with thick clouds covering the sky.",
                "Completely overcast skies with no sunshine expected."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'fog') {
            nextBtn.style.display = "none";
            setTimeout(fog, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://cdn-icons-png.flaticon.com/512/6642/6642957.png" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Dense fog reducing visibility, especially in the early morning.",
                "Foggy conditions throughout the day, clearing up by evening."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'drizzle') {
            nextBtn.style.display = "none";
            setTimeout(drizzle, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://cdn.dribbble.com/users/2120934/screenshots/6193445/media/e43cb75f691f9c1d5ad0e475411e8ec2.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Light drizzle falling intermittently today.",
                "Expect a day of light drizzle and overcast skies."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'heavy rain') {
            nextBtn.style.display = "none";
            setTimeout(heavyRain, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://i.pinimg.com/originals/dd/e5/f4/dde5f4d61ca1f8b611a5014286a1cb71.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Heavy rain showers expected, so keep your umbrellas handy.",
                "A day of heavy rain with potential flooding in low-lying areas."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (weatherDescription === 'light rain') {
            nextBtn.style.display = "none";
            setTimeout(lightRain, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/lightrain.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Light rain falling gently throughout the day.",
                "Periods of light rain mixed with cloudy intervals."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        }
        
        else if (weatherDescription === 'moderate rain') {
            nextBtn.style.display = "none";
            setTimeout(moderateRain, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image/lightrain.gif" alt="moderate rain" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `;
            const options = [
                "Steady moderate rain continuing through the day.",
                "Intermittent moderate rain showers expected."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        }
        else if (weatherDescription === 'haze') {
            nextBtn.style.display = "none";
            setTimeout(haze, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="image\hazy.gif" alt="clouds" style="width: 80px; height: 80px;">
            <p class="screenP">${weatherDescription}</p>
            `
            const options = [
                "Hazy conditions today, reducing air quality slightly.",
                "A hazy day with a fine mist hanging in the air."
            ];
            reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else {
            reporter.textContent = "Weather description not available.";
        }
    } else if (lastPElement && lastPElement.textContent === `${weatherDescription}`) 
        {
            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://png.pngtree.com/png-vector/20191111/ourmid/pngtree-thermometer-icon-vector--icon-design-png-image_1978811.jpg" alt="temperature" style="width: 80px; height: 80px;">
            `
            reporter.textContent = `Next Temperature For ${data.name} are`
            
            if (data.main.temp < 25) {
                nextBtn.style.display = "none";
                setTimeout(lowTemp, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media.tenor.com/-b2iSY4zDjYAAAAi/snoopy.gif" alt="cool weather" style="width: 80px; height: 80px;">
                <p class="screenP">Temperature: ${data.main.temp}°C</p>`;
                const options = [
                    "The weather is quite cool today, with temperatures below 25°C. A light jacket might be needed.",
                    "It's a chilly day with temperatures under 25°C. Perfect for a warm drink and cozy clothing."
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            } else if (data.main.temp >= 25 && data.main.temp <= 32) {
                nextBtn.style.display = "none";
                setTimeout(mediumTemp, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media.tenor.com/pUQGNMgYn1cAAAAi/tkthao219-bubududu.gif" alt="warm weather" style="width: 80px; height: 80px;">
                <p class="screenP">Temperature: ${data.main.temp}°C</p>`;
                const options = [
                    "It's a warm day today with temperatures ranging from 25°C to 32°C. Perfect weather for outdoor activities!",
                    "Expect a pleasant day with temperatures between 25°C and 32°C. Great weather for a walk in the park!"
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            } else if (data.main.temp > 32 && data.main.temp <= 40) {
                nextBtn.style.display = "none";
                setTimeout(highTemp, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media1.tenor.com/m/h3SeWBC7RqoAAAAC/dog-fridge.gif" alt="hot weather" style="width: 80px; height: 80px;">
                <p class="screenP">Temperature: ${data.main.temp}°C</p>`;
                const options = [
                    "It's getting quite hot out there, with temperatures climbing between 32°C and 40°C. Stay hydrated and avoid prolonged sun exposure.",
                    "Temperatures are soaring, ranging from 32°C to 40°C. Be sure to drink plenty of water and take breaks in the shade."
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            } else {
                nextBtn.style.display = "none";
                setTimeout(highTemp, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media.tenor.com/4DpX1BfQ68cAAAAi/hot-melt.gif" alt="extreme heat" style="width: 80px; height: 40px;">
                <p class="screenP">Temperature: ${data.main.temp}°C</p>`;
                const options = [
                    "The temperature is extremely high, above 40°C. It's advisable to stay indoors and keep cool.",
                    "With temperatures exceeding 40°C, extreme heat precautions are necessary. Stay inside and keep hydrated."
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            }
        }
        else if (lastPElement && lastPElement.textContent === `Temperature: ${data.main.temp}°C`) {
            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://i.pinimg.com/originals/dc/58/4d/dc584d08b22fe4b6459b9897c9f74a0e.gif" alt="gif wind speed" style="width: 80px; height: 80px;">
            `
            reporter.textContent = `Next Wind Speed For ${data.name} are`


            if (data.wind.speed <= 2) {
                nextBtn.style.display = "none";
                setTimeout(lowWindSpeed, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLdmscMdJnl0c3vGIDS3_E0Ypa9p7hbh9JGw&s" alt="calm weather" style="width: 80px; height: 80px;">
                <p class="screenP">Wind Direction: ${windDirection}</p>
                <p class="screenP">Wind Speed: ${data.wind.speed} m/s</p>`;
                const options = [
                    `The wind is calm today with speeds below 2 m/s. It's a great day for outdoor activities! Wind direction is ${windDirection}.`,
                    `Enjoy a calm day with light winds under 2 m/s. Perfect weather for a leisurely stroll. Wind direction is ${windDirection}.`
                ];
                              
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            }
            
            else if (data.wind.speed >= 2 && data.wind.speed <= 10) {
                nextBtn.style.display = "none";
                setTimeout(mediumWindSpeed, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyrSI99dFqTvavTEmdSyvUPyqt5FaVDQzIQ&s" alt="mild wind" style="width: 70px; height: 70px;">
                <p class="screenP">Wind Direction: ${windDirection}</p>
                <p class="screenP">Wind Speed: ${data.wind.speed} m/s</p>`;
                const options = [
                    `The wind is moderate today, with speeds between 2 and 10 m/s. A perfect day for flying a kite!. Wind direction is ${windDirection}`,
                    `Expect a gentle breeze today with wind speeds ranging from 2 to 10 m/s. It's a good day for a walk!. Wind direction is ${windDirection}`
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            }
    
              else  {
                nextBtn.style.display = "none";
                setTimeout(highWindSpeed, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media1.tenor.com/m/1uMJ1cpRelsAAAAC/windy-cat.gif" alt="super strong wind" style="width: 80px; height: 80px;">
                <p class="screenP">Wind Direction: ${windDirection}</p>
                <p class="screenP">Wind Speed: ${data.wind.speed} m/s</p>`;
                const options = [
                    `It's extremely windy today with speeds exceeding Stay indoors if possible!.  Wind direction is ${windDirection}`,
                    `Super strong winds today with speeds over ${data.wind.speed} Exercise caution if you're going outside!  Wind direction is ${windDirection}`
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            } 
        }   else if (data.rain && lastPElement.textContent === `Wind Speed: ${data.wind.speed} m/s`) {
            console.log(lastPElement)
            screen.innerHTML = `<h2 class="screenP">${data.name}</h2> 
            <img src="https://i.pinimg.com/originals/dc/58/4d/dc584d08b22fe4b6459b9897c9f74a0e.gif" alt="gif wind speed" style="width: 80px; height: 80px;">
            `
            reporter.textContent = `Next Wind Speed For ${data.name} are`

            const rainAmount = data.rain['1h'] || data.rain['3h'] || data.rain;

        if (rainAmount < 2) {
            nextBtn.style.display = "none";
            setTimeout(lowRainAmount, 5000);
            screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
            <img src="https://media.tenor.com/hmYv6-dCkGgAAAAi/bubu-dudu-bubu.gif" alt="light rain" style="width: 80px; height: 80px;">
            <p class="screenP">Rain Amount: ${rainAmount} mm</p>`;
    const options = [
        `There is light rain today with an amount below 2 mm. A light drizzle won't disrupt your plans.`,
        `Expect some light rain today with amounts under 2 mm. Just a bit of moisture in the air.`
    ];
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else if (rainAmount >= 2 && rainAmount < 10) {
            nextBtn.style.display = "none";
            setTimeout(mediumRainAmount, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
            <img src="https://media.tenor.com/-i5DxaW3J70AAAAi/tkthao219-bubududu.gif" alt="moderate rain" style="width: 80px; height: 80px;">
            <p class="screenP">Rain Amount: ${rainAmount} mm</p>`;
    const options = [
        `Moderate rain expected today, with amounts between 2 and 10 mm. Bring an umbrella!`,
        `There will be a moderate amount of rain today, ranging from 2 to 10 mm. Perfect weather for a cozy indoor day.`
    ];
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
        } else {
            nextBtn.style.display = "none";
            setTimeout(highRainAmount, 5000);

            screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
            <img src="https://media1.tenor.com/m/SZo_-th-7KYAAAAC/tkthao219-bubududu.gif" alt="heavy rain" style="width: 80px; height: 80px;">
            <p class="screenP">Rain Amount: ${rainAmount} mm</p>`;
    const options = [
        `Heavy rain expected today with amounts exceeding 10 mm. Stay indoors and stay dry!`,
        `Significant rainfall today with over ${rainAmount} mm. Exercise caution if you're heading out!`
    ];
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
        }
        
        }
        
        else if (data.snow && lastPElement.textContent === `Rain Amount: ${rainAmount} mm`) {
            const snowAmount = data.snow['1h'] || data.snow['3h'] || data.snow;

            if (snowAmount <= 2) {
                nextBtn.style.display = "none";
                setTimeout(lowSnowAmount, 5000);
                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media1.tenor.com/m/eOlpqEWf5_MAAAAC/bubududu-snow.gif" alt="light snow" style="width: 80px; height: 80px;">
                <p class="screenP">Snow Amount: ${snowAmount} cm</p>`;
                const options = [
                    `There is light snow today with an amount below 2 cm. A dusting of snow won't disrupt your plans.`,
                    `Expect some light snow today with amounts under 2 cm. Just a bit of snow to enjoy.`
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            } else if (snowAmount > 2 && snowAmount <= 10) {
                nextBtn.style.display = "none";
                setTimeout(mediumSnowAmount, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media.tenor.com/0H9_41QCZFAAAAAi/tkthao219-bubududu.gif" alt="moderate snow" style="width: 80px; height: 80px;">
                <p class="screenP">Snow Amount: ${snowAmount} cm</p>`;
                const options = [
                    `Moderate snow expected today, with amounts between 2 and 10 cm. It's a good day for building a snowman!`,
                    `There will be a moderate amount of snow today, ranging from 2 to 10 cm. Enjoy the winter wonderland!`
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            } else {
                nextBtn.style.display = "none";
                setTimeout(highSnowAmount, 5000);

                screen.innerHTML = `<h2 class="screenP">${data.name}</h2>
                <img src="https://media1.tenor.com/m/3bQdox1CD2QAAAAC/kristigocouple2024.gif" alt="heavy snow" style="width: 80px; height: 80px;">
                <p class="screenP">Snow Amount: ${snowAmount} cm</p>`;
                const options = [
                    `Heavy snow expected today with amounts exceeding 10 cm. Stay indoors and stay warm!`,
                    `Significant snowfall today with over ${snowAmount} cm. Exercise caution if you're heading out!`
                ];
                reporter.textContent = options[Math.floor(Math.random() * options.length)];
            }
            
        }

        else {
            setTimeout(closingMessage, 5000)
            nextBtn.style.display = "none"
            screen.innerHTML = `
         <p class="screenP"><span id="R">RV</span> Channel</p>
         <img src="https://cdn.dribbble.com/users/28455/screenshots/1389791/media/c5abb9d81320af5cedd449fdbc8d5408.gif" id="weathergif" alt="gif">
         <p class="screenP">Thank For Watching</p>`
         const options = [
             "That's all for today! Thank you for watching. Have a nice day.",
             "That's all for today! Thanks for tuning in. Have a wonderful day.",
             "That's all for today's weather update. Thank you for watching and have an amazing day.",
             "That's the weather for today! Thanks for watching. Have a lovely day",
             "That wraps up today's weather! Thank you for watching. Have a fantastic day."
         ];
         reporter.textContent = options[Math.floor(Math.random() * options.length)];
        }
        
    })
}

function overallDisplay(data){
    overallBtn.addEventListener('click', () => {
        body.style.backgroundImage = "linear-gradient(blue, rgb(72, 90, 192))";
        backtoStart.style.display = "block";
        overallBtn.style.display = "none";
        header.style.display = "none";
        screen.style.display = "none";
        reporter.style.display = "none";
        bearReporter.style.display = "none";
        comic.style.display = "none";
        displayWeather(data);
    })
}

backtoStart.addEventListener('click', () => {
    location.reload();
})

function clearSky() {
    nextBtn.style.display = "block";
    const options = [
        "The sky is clear and so is my love for you.",
        "A perfect clear sky to reflect your beautiful smile."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function fewClouds() {
    nextBtn.style.display = "block";
    const options = [
        "A few clouds in the sky, but my love for you is crystal clear.",
        "Just a few clouds today, like tiny reminders of my love for you.",
        "Just a few clouds, but my love for you is endless."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function scatteredClouds() {
    nextBtn.style.display = "block";
    const options = [
        "Scattered clouds in the sky, but my love for you is always here.",
        "Even with scattered clouds, my thoughts are only of you.",
        "Scattered clouds can't hide my love for you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function brokenClouds() {
    nextBtn.style.display = "block";
    const options = [
        "Broken clouds but never a broken heart when I think of you.",
        "Even with broken clouds, my love for you is whole.",
        "Broken clouds can't break my love for you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function showerRain() {
    nextBtn.style.display = "block";
    const options = [
        "Shower rain to refresh the world, just like your love refreshes my soul.",
        "Raindrops are falling, but my love for you is steady and strong.",
        "Shower rain reminds me of the refreshing love we share."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function rain() {
    nextBtn.style.display = "block";
    const options = [
        "Rain is falling, but my love for you keeps me warm.",
        "With every drop of rain, my love for you grows stronger.",
        "Rainy days are perfect for cozying up with you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function thunderstorm() {
    nextBtn.style.display = "block";
    const options = [
        "Thunderstorms are loud, but my love for you is louder.",
        "Even during a thunderstorm, my heart is calm thinking of you.",
        "Thunderstorms can't shake my love for you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function snow() {
    nextBtn.style.display = "block";
    const options = [
        "Snowflakes are falling, each one unique like my love for you.",
        "The world is covered in snow, but my heart is warm with love for you.",
        "Snowy days are perfect for snuggling up with you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function mist() {
    nextBtn.style.display = "block";
    const options = [
        "Misty mornings remind me of the mystery and beauty of our love.",
        "The mist is thick, but my love for you is clear.",
        "Mist makes everything look magical, just like our love."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function fog() {
    nextBtn.style.display = "block";
    const options = [
        "Foggy days remind me of how your love surrounds me.",
        "The fog is thick, but my love for you is clear.",
        "Foggy days make me want to hold you close."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function drizzle() {
    nextBtn.style.display = "block";
    const options = [
        "A light drizzle is like gentle kisses from the sky.",
        "Drizzle makes everything soft, like your touch.",
        "Drizzle makes me think of gentle kisses with you." 
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function heavyRain() {
    nextBtn.style.display = "block";
    const options = [
        "Heavy rain falls, but my love for you is even stronger.",
        "Even during heavy rain, my thoughts are filled with you.",
        "Heavy rain reminds me of how strong my love is for you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function lightRain() {
    nextBtn.style.display = "block";
    const options = [
        "Light rain is like a gentle reminder of my love for you.",
        "Each drop of light rain makes me think of you.",
        "Light rain makes me want to share an umbrella with you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function moderateRain() {
    nextBtn.style.display = "block";
    const options = [
        "Moderate rain makes me think of our moderate yet profound love.",
        "Rain falls moderately, just like my heart beats steadily for you.",
        "Moderate rain makes me want to hold your hand."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function haze() {
    nextBtn.style.display = "block";
    const options = [
        "Hazy days make me think of the sweet moments we've shared.",
        "Even in the haze, my love for you shines brightly.",
        "Hazy days make me want to get lost in your eyes."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function overcastClouds() {
    nextBtn.style.display = "block";
    const options = [     
        "Even on overcast days, your smile is my sunshine.",
        "No matter the weather, you always bring light to my life.",
        "Clouds may cover the sky, but they can never cover the love I have for you.",
        "Overcast skies remind me of how you make everything better.",
        "Even under the heaviest clouds, your love makes everything bright.",
        "The sky might be overcast, but my heart is always sunny with you."
    ];

    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function highTemp() {
    nextBtn.style.display = "block";
    const options = [
        "It's scorching outside, but you're the hottest thing around.",
        "The temperature isn't the only thing rising—my heart does every time I see you.",
        "It’s a hot day, but you’re the reason I’m really sweating.",
        "Even the sun is jealous of how hot you are.",
        "Is it just me, or did it get hotter when you walked in?",
        "You're so hot, even the sun needs sunglasses to look at you.",
        "The weather might be hot, but you’re absolutely sizzling.",
        "You're the reason the weather forecast says 'extremely hot'.",
        "It's blazing outside, but your smile is what really lights me up.",
        "The temperature isn't the only thing that's heating up—my feelings for you are too."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function mediumTemp() {
    nextBtn.style.display = "block";
    const options = [
        "The weather is just right today, just like you.",
        "Today’s weather is perfectly balanced, just like my feelings for you.",
        "The temperature might be mild, but my feelings for you are strong.",
        "A day like today is as perfect as you are.",
        "Just like today’s weather, you bring a perfect balance to my life.",
        "The weather is comfortably warm, just like your presence in my life.",
        "It’s a pleasant day, made even better by thinking of you.",
        "The weather is moderate, but my love for you is intense.",
        "A perfectly temperate day, just like the perfect way you make me feel.",
        "Today’s weather is perfectly comfortable, just like being with you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function lowTemp() {
    nextBtn.style.display = "block";
    const options = [
        "It might be freezing outside, but you warm my heart.",
        "The temperature is low, but my love for you is through the roof.",
        "It's cold out, but your smile warms me up.",
        "Even on the chilliest days, your love keeps me cozy.",
        "The weather is cold, but thinking of you makes me feel warm.",
        "It's frosty outside, but you melt my heart.",
        "The temperature may be low, but my affection for you is always high.",
        "I need you to warm me up on this cold day.",
        "It might be cold outside, but being with you feels like a warm hug.",
        "You're like a cozy blanket on a cold day—always making me feel safe and warm."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function highWindSpeed() {
    nextBtn.style.display = "block";
    const options = [
        "The wind might be strong today, but it’s nothing compared to the force of attraction I feel for you.",
        "Even in this strong wind, you’re the only thing that can take my breath away.",
        "The wind is wild, but it’s your charm that’s truly sweeping me off my feet.",
        "This strong wind is no match for the whirlwind of feelings I have for you.",
        "You must be the reason for the high winds, because you blow me away every time.",
        "The wind is fierce today, but it’s got nothing on the way you make my heart race.",
        "The wind may be howling, but all I hear is your name in the breeze.",
        "Strong winds or not, my feelings for you are unstoppable.",
        "The high winds are nothing compared to the storm of emotions you stir in me.",
        "Just like the wind, my feelings for you are strong and unstoppable."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function mediumWindSpeed() {
    nextBtn.style.display = "block";
    const options = [
        "With the way the wind is picking up, I think it’s trying to tell us we should be closer together.",
        "The wind is picking up, just like my feelings for you.",
        "A gentle breeze and thoughts of you make for a perfect day.",
        "The wind is just right today, just like my feelings for you.",
        "The wind may be moderate, but my feelings for you are strong.",
        "A perfect breeze for a perfect person—just like you.",
        "The wind is pleasant, and so is every moment I spend thinking of you.",
        "The wind is picking up, and so is my heart rate whenever I think of you.",
        "Just like the breeze, thoughts of you make everything feel lighter.",
        "The wind is moderate, but my affection for you is anything but."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function lowWindSpeed() {
    nextBtn.style.display = "block";
    const options = [
        "Is it just me, or did the gentle breeze bring you here? Because you just blew me away.",
        "A gentle breeze and thoughts of you make for a perfect day.",
        "The wind may be calm, but my feelings for you are anything but.",
        "Even a light breeze can remind me of how you sweep me off my feet.",
        "A gentle wind and a thought of you is all I need to feel great.",
        "This calm breeze is like a whisper, just like how thoughts of you softly enter my mind.",
        "The wind is gentle, but my feelings for you are strong.",
        "A light wind is pleasant, just like every moment I spend thinking of you.",
        "The breeze is mild, but my heart races just thinking of you.",
        "Even with a gentle breeze, you manage to take my breath away."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function highRainAmount() {
    nextBtn.style.display = "block";
    const options = [
        "Even in this heavy rain, you’re the only thing that can brighten my day.",
        "The rain might be pouring, but my love for you is flooding my heart.",
        "This heavy rain is nothing compared to the downpour of my feelings for you.",
        "You make my heart race faster than the raindrops falling outside.",
        "The rain is strong, but my love for you is even stronger.",
        "In this heavy rain, you’re the rainbow I’ve been looking for.",
        "The rain might be pouring, but your smile lights up my world.",
        "This storm has nothing on the whirlwind of emotions you stir in me.",
        "Even in the heaviest rain, thoughts of you keep me warm.",
        "The rain is intense, just like the way you make me feel."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function mediumRainAmount() {
    nextBtn.style.display = "block";
    const options = [
        "A steady rain and thoughts of you make for a perfect day.",
        "Just like this rain, my feelings for you are refreshing and steady.",
        "This rain is a reminder of how you pour joy into my life.",
        "The rain might be moderate, but my affection for you is immense.",
        "A pleasant rain is nothing compared to how pleasant it is to think of you.",
        "The rain is steady, just like my unwavering feelings for you.",
        "The raindrops fall softly, just like how thoughts of you enter my mind.",
        "A moderate rain and thoughts of you—both make my heart swell.",
        "The rain is comforting, much like your presence in my life.",
        "Even in the rain, you’re the sunshine that lights up my day."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function lowRainAmount() {
    nextBtn.style.display = "block";
    const options = [
        "Is it just me, or did the gentle rain bring you here? Because you make everything better.",
        "A light drizzle and thoughts of you make everything feel magical.",
        "Even a light rain can’t dampen my spirits when I’m thinking of you.",
        "The rain might be light, but my feelings for you are anything but.",
        "A gentle rain is like a whisper, much like how thoughts of you softly enter my mind.",
        "The drizzle is light, but my love for you is heavy.",
        "A light rain makes everything fresh, just like how you refresh my soul.",
        "Even in a drizzle, you manage to take my breath away.",
        "The rain is gentle, but my feelings for you are strong.",
        "A light rain and a thought of you is all I need to feel great."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function highSnowAmount() {
    nextBtn.style.display = "block";
    const options = [
        "The snow might be heavy, but my love for you is even stronger.",
        "In this heavy snow, you’re the warmth I need.",
        "This snowfall is intense, but it’s nothing compared to my feelings for you.",
        "Even in this snowstorm, you make my heart feel warm.",
        "The snow is piling up, just like my affection for you.",
        "This blizzard has nothing on the whirlwind of emotions you stir in me.",
        "The snow is deep, but my love for you is deeper.",
        "Even in the heaviest snow, thoughts of you keep me warm.",
        "The snow might be falling hard, but I’ve fallen harder for you.",
        "This heavy snow can’t compare to the avalanche of my feelings for you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function mediumSnowAmount() {
    nextBtn.style.display = "block";
    const options = [
        "A steady snowfall and thoughts of you make for a perfect day.",
        "Just like this snow, my feelings for you are pure and beautiful.",
        "The snow might be moderate, but my love for you is immense.",
        "A pleasant snowfall is nothing compared to how pleasant it is to think of you.",
        "The snow is steady, just like my unwavering feelings for you.",
        "The snowflakes fall softly, just like how thoughts of you enter my mind.",
        "A moderate snow and thoughts of you—both make my heart swell.",
        "The snow is comforting, much like your presence in my life.",
        "Even in the snow, you’re the warmth that lights up my day.",
        "This snow is enchanting, just like you."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function lowSnowAmount() {
    nextBtn.style.display = "block";
    const options = [
        "Is it just me, or did the gentle snow bring you here? Because you make everything better.",
        "A light snow and thoughts of you make everything feel magical.",
        "Even a light snow can’t dampen my spirits when I’m thinking of you.",
        "The snow might be light, but my feelings for you are anything but.",
        "A gentle snow is like a whisper, much like how thoughts of you softly enter my mind.",
        "The snowflakes are light, but my love for you is heavy.",
        "A light snow makes everything fresh, just like how you refresh my soul.",
        "Even in a light snowfall, you manage to take my breath away.",
        "The snow is gentle, but my feelings for you are strong.",
        "A light snowfall and a thought of you is all I need to feel great."
    ];
    
    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}

function closingMessage() {
    overallBtn.style.display = "block"
    const options = [
        "No matter what the weather is like, you always brighten my day. Stay cozy, stay safe, and know that I'm sending you all my love.",
        "Remember, you always make my heart feel warm. Stay safe and take care. Love you!",
        "No matter what the weather, My feelings for you stay constant. Stay warm, stay safe, and love you so much.",
        "No matter the weather, you’re always in my heart. Stay cozy and safe. Love you!",
        "You light up my life no matter the weather. Stay safe and warm, and remember that I love you."
    ];

    reporter.textContent = options[Math.floor(Math.random() * options.length)];
}
