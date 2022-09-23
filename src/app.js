/* eslint-disable require-jsdoc */

function outputElementsInCreation() {
  const main = document.querySelector('main');
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('hide');
  const iconContainer = document.createElement('div');
  iconContainer.id = 'iconContainer';
  const icon = document.createElement('img');
  iconContainer.append(icon);
  cardContainer.id = 'container';
  const cityNameInDOM = document.createElement('div');
  cityNameInDOM.id = 'cityName';
  const countryNameInDOM = document.createElement('div');
  countryNameInDOM.id = 'countryName';
  const temperatureInDOM = document.createElement('div');
  temperatureInDOM.id = 'temperature';
  const descriptionInDOM = document.createElement('div');
  descriptionInDOM.id = 'description';
  const humidityInDOM = document.createElement('div');
  humidityInDOM.id = 'humidity';
  const windSpeedInDOM = document.createElement('div');
  windSpeedInDOM.id = 'windSpeed';
  cardContainer.append(
      iconContainer,
      cityNameInDOM,
      countryNameInDOM,
      temperatureInDOM,
      descriptionInDOM,
      humidityInDOM,
      windSpeedInDOM,
  );
  main.append(cardContainer);
}

function showOutputInDOM(
    cityName,
    countryName,
    temperature,
    description,
    humidity,
    windSpeed,
    icon,
) {
  document.querySelector(
      '#iconContainer > img',
  ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById(`cityName`).textContent = `City Name: ${cityName}`;
  document.getElementById(
      `countryName`,
  ).textContent = `Country Code: ${countryName}`;
  document.getElementById(
      `temperature`,
  ).textContent = `Temperature: ${temperature} °C`;
  document.getElementById(
      `description`,
  ).textContent = `Weather Details: ${description}`;
  document.getElementById(`humidity`).textContent = `Humidity: ${humidity} %`;
  document.getElementById(
      `windSpeed`,
  ).textContent = `Wind Speed: ${windSpeed} km/hr`;
}

async function getInput() {
  const input = document.querySelector('#input');
  const apiKey = '9008b92ac49f2c50104972a45ff06e48';
  const string = input.value;
  string
      .replace(/(\s+$|^\s+)/g, '')
      .replace(/(,\s+)/g, ',')
      .replace(/(\s+,)/g, ',')
      .replace(/\s+/g, '+');
  const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${string}&appid=${apiKey}
      `,
      {mode: 'cors'},
  );
  const responseData = await response.json();
  const locationDataLat = responseData.coord.lat;
  const locationDataLon = responseData.coord.lon;
  const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationDataLat}&lon=${locationDataLon}&appid=${apiKey}&units=metric`,
  );
  const weatherResponseData = await weatherResponse.json();
  showOutputInDOM(
      responseData.name,
      responseData.sys.country,
      weatherResponseData.main.temp,
      weatherResponseData.weather[0].description,
      weatherResponseData.main.humidity,
      weatherResponseData.wind.speed,
      weatherResponseData.weather[0].icon,
  );
  changeBackground(weatherResponseData.weather[0].id);
}

function homePageCreation() {
  const body = document.querySelector('body');
  const main = document.createElement('main');
  main.id = 'content';
  const header = document.createElement('header');
  header.textContent = 'Weather App';
  const inputBox = document.createElement('input');
  inputBox.setAttribute('type', 'text');
  inputBox.setAttribute('placeholder', 'Ex: London');
  inputBox.id = 'input';
  const button = document.createElement('button');
  button.textContent = 'Search';
  button.addEventListener('click', () => {
    getInput();
    document.querySelector('#container').classList.remove('hide');
    document.querySelector('#container').classList.add('active');
  });
  inputBox.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
      getInput();
      document.querySelector('#container').classList.remove('hide');
      document.querySelector('#container').classList.add('active');
    }
  });
  main.append(header, inputBox, button);
  body.append(main);
}

function changeBackground(id) {
  const body = document.querySelector('body');
  if (id >= 200 && id < 300) {
    body.style.backgroundImage = `url(thunderstorm.jpg')`;
  } else if (id >= 300 && id < 350) {
    body.style.backgroundImage = `url('drizzle.jpg')`;
  } else if (id >= 500 && id < 600) {
    body.style.backgroundImage = `url('rain.jpg')`;
  } else if (id >= 600 && id < 700) {
    body.style.backgroundImage = `url('snow.jpg')`;
  } else if (id >= 700 && id < 800) {
    body.style.backgroundImage = `url('atmosphere.jpg')`;
  } else if (id == 800) {
    body.style.backgroundImage = `url('clearSky.jpg')`;
  } else if (id > 800) {
    body.style.backgroundImage = `url('clouds.jpg')`;
  } else {
    body.style.backgroundColor = `white`;
  }
}

export {homePageCreation, outputElementsInCreation, getInput};
