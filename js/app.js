const form = document.querySelector('#form');

const result = document.querySelector('#result');

const element = document.querySelector('#body');




window.addEventListener('DOMContentLoaded', fillSelect)
window.addEventListener('load', () => {
  form.addEventListener('submit', searchWeather);
});



function fillSelect() {

  
  const url = 'https://restcountries.com/v2/all?fieldsname,capital,currencies,name,capital,callingcode';
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.forEach(country => {
        const {name, alpha2Code} = country;
      
        const selectCountry = document.querySelector('#country')

        const optionCountry = document.createElement('option')
        optionCountry.value = alpha2Code;
        optionCountry.textContent = name;

        selectCountry.appendChild(optionCountry);
      });

    });
  }

function searchWeather(e) {
  e.preventDefault();
  const country = document.querySelector('#country').value;
  const city = document.querySelector('#city').value;

  // display error message
  if (city === '' || country === '') {
   displayError('All fields are required');

    return;
  }
  //API
  askAPI(country, city);

  //reset form
  form.reset();
}

function displayError(mesage) {
  Swal.fire({
    icon: 'error',
    title: mesage,
  });
}

function askAPI(country, city) {
  const appID = '95771af0a8e5bd97be932267b166a30c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;

  //spinner
  spinnerEffect();

  setTimeout(() => {
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.cod === '404') {
        refreshHTML();
       displayError('City not found');
      } else {
        showWeather(data);
      }
    });
}, 1500);

  
}

function showWeather(data) {
    refreshHTML(); 
  const {
    name,
    weather: [{ id, main,  description,}],
    main: { temp, temp_max, temp_min },
  } = data;

  const degree = KelvinsToCelcius(temp);
  const min = KelvinsToCelcius(temp_max);
  const max = KelvinsToCelcius(temp_min);
  let newIcon = main;

  switch (newIcon) {
    case 'Thunderstorm':
      newIcon = 'thunder';
      break;
    case 'Drizzle':
        
      newIcon = 'rainy-2';
      break;
    case 'Rain':
        newIcon = 'rainy-7';
        break;
    case "Snow":
      newIcon = 'snow-6';
      break;
      case 'Clear':
        newIcon = 'day';
        break;
    case 'Atmosphere':
            newIcon = 'weather';
            break;
    case 'Clouds':
      newIcon = 'cloudy-day-1';
      break;
    

    default:
      break;
  }
  let html = '';

  html += `
    <div class="card">
    <div class="card_title">
        <h2>${name}</h2>   
    </div>
    <div class="card_info">
    <img src="amcharts_weather_icons_1.0.0/animated/${newIcon}.svg" alt="">
        <p>${degree}&#8451;</p>
      
    </div>
    <p class="card_description">${description}</p>

  
    <div class="card_temp">
        <div class="max">
            <p>Max: ${max}&#8451;</p>
        </div>
        <div class="min">
            <p>Min: ${min}&#8451;</p>
        </div>
    </div>

</div>
    
    `;

  result.innerHTML = html;

  //change backgroundColor
  backGroudColor(main);
}

const KelvinsToCelcius = (degree) => parseInt(degree - 273.15);

function backGroudColor(main_description) {
  
switch (main_description) {
    case 'Thunderstorm':
       
      
        element.classList.remove('drizzle');
        element.classList.remove('rain');
        element.classList.remove('snow');
        element.classList.remove('clear');
        element.classList.remove('cloud');
        element.classList.remove('snow')
        element.classList.add('thunderstorm');
        break;
      case 'Drizzle':
        element.classList.remove('thunderstorm');
        element.classList.remove('rain');
        element.classList.remove('snow');
        element.classList.remove('clear');
        element.classList.remove('cloud');
        element.classList.remove('snow')
        element.classList.add('drizzle');
        break;
      case 'Rain':
        element.classList.remove('thunderstorm');
        element.classList.remove('drizzle');
        element.classList.remove('snow');
        element.classList.remove('clear');
        element.classList.remove('cloud');
        element.classList.remove('snow')
          element.classList.add('rain');
          break;
      case "Snow":
        element.classList.remove('thunderstorm');
        element.classList.remove('drizzle');
        element.classList.remove('snow');
        element.classList.remove('clear');
        element.classList.remove('cloud');
        element.classList.remove('rain');
        element.classList.add('snow');
        break;
        case 'Clear':
          element.classList.remove('thunderstorm');
          element.classList.remove('drizzle');
          element.classList.remove('snow');
          element.classList.remove('clear');
          element.classList.remove('cloud');
          element.classList.remove('rain');
          element.classList.add('clear');
          break;
      case 'Atmosphere':
              newIcon = 'weather';
              element.classList.remove('thunderstorm');
              element.classList.remove('drizzle');
              element.classList.remove('snow');
              element.classList.remove('clear');
              element.classList.remove('cloud');
              element.classList.remove('rain');
              element.classList.add('clear');
              break;
      case 'Clouds':
            element.classList.remove('thunderstorm');
              element.classList.remove('drizzle');
              element.classList.remove('snow');
              element.classList.remove('clear');
              element.classList.remove('cloud');
              element.classList.remove('rain');
       
        element.classList.add('cloud');
        break;
      
  
      default:
        break;

}
}


function spinnerEffect() {

    refreshHTML()
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-cube-grid');
    divSpinner.innerHTML = `
    
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>

    `;
    result.appendChild(divSpinner);

  }


  function refreshHTML() {
    while(result.firstChild) {
        result.removeChild(result.firstChild);
    }
  }


 