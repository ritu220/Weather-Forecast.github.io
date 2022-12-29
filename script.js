

const currentWeatherItemsE1=document.getElementById('current-weather');
const TodayE1=document.getElementById('Todays');
const timeZone=document.getElementById('places');

const p=Intl.DateTimeFormat().resolvedOptions().timeZone;


//-------------Code For Days and Date------------------
const TimeE1=document.getElementById('time');
const DateE1=document.getElementById('date');

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const Months=['January','February','March','April','May','June','July','August','September','October','November','December'];
setInterval(()=>{
const time=new Date();
const month=time.getMonth();  //0 to 11
const date=time.getDate(); // 0 to 6 
const day=time.getDay();
const hour=time.getHours();
const hoursIn12HrsFormat=hour>=13?hour%12:hour;
const minutes2=time.getMinutes();
const minutes3='0'+minutes2;
const minutes=minutes2<=9?minutes3:minutes2;
const ampm=hour>=12?'PM':'AM';
TimeE1.innerHTML=hoursIn12HrsFormat + ':' +minutes + ' ' + `<span id="AM-PM"> ${ampm}</span>`;
DateE1.innerHTML=days[day]+ ', ' + date + ' ' + Months[month];
},1000);

// -----------------------------------------------------


//-----------------------weatherData--------------------
const API_KEY='74e2da9412ceae1878eddf5f98122d74';

getWeatherData();

function getWeatherData()
{
    navigator.geolocation.getCurrentPosition((success) => {
                //console.log(success);
                let {latitude,longitude}=success.coords;
                
                

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
                  console.log(data);
                  showWeatherData(data);
                })
    })
}

function showWeatherData(data)
{
    let{temp}=data.main;
    let{description,main,icon}=data.weather[0];
    let{speed,gust}=data.wind;
    let{sunrise,sunset}=data.sys;

    currentWeatherItemsE1.innerHTML=  
    ` <div class="weather-item">
    <div class="description" id="items">
        <p id="item"><img class="image" src="http://openweathermap.org/img/w/${icon}.png"></p>
        <p id="item">${description}</p>
    </div>
</div>

<div class="weather-item">
    <div class="Wind gust" id="items">
        <p id="item">Wind Gust     </p>
        <p id="item">${gust} m/s</p>
        <br>
        <br>
    </div>
</div>

<div class="weather-item">
    <div class="Wind-Speed" id="items">
        <p id="item">Wind-Speed</p>
        <p id="item">${speed} m/s</p>
        <br>
        <br>
    </div>
</div>

<div class="weather-item">
    <div class="Sunrise" id="items">
        <p id="item">Sunrise</p>
        <p id="item">${window.moment(sunrise*1000).format('HH:mm a')}</p>
        <br>
        <br>
    </div>
</div>

<div class="weather-item">
    <div class="Sunset" id="items">
        <p id="item">Sunset</p>
        <p id="item">${window.moment(sunset*1000).format('HH:mm a')}</p>
    </div>
</div>
`

TodayE1.innerHTML=
`  <div class="to-day">
<img src="http://openweathermap.org/img/w/${icon}.png" alt="weather-icon" class="ws-icon">
<p class="day">Today</p>
<p class="tp">Temperature</p>
<p class="tp">${temp} celcius</p>
<p class="tp">${main}</p>
</div>
`
timeZone.innerHTML=`
<div class="Time-Zone">${p}</div>
<div class="country">India</div>`
}


