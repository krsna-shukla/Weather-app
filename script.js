// http://api.weatherapi.com/v1/current.json?key=f4504c8ef6604b7cbff142509260104&q=mumbai&aqi=no


let temperatureField = document.querySelector(".temp p");
let locationField = document.querySelector(".time_location h2");
let dateandTimeField = document.querySelector(".time_location p");
let conditionField = document.querySelector(".condition p");
let iconField = document.querySelector(".weather_icon");
let searchField = document.querySelector(".search_area");
let form = document.querySelector("form");

form.addEventListener('submit',searchForLocation)

let target = 'New Delhi';

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=f4504c8ef6604b7cbff142509260104&q=${targetLocation}&aqi=no`

    const res = await fetch(url)

    const data = await res.json();

    if(data.error){
    alert("City not found!");
    return;
}

    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let icon = data.current.condition.icon;

    updateDetails(temp,locationName,time,condition,icon);
}

function changeBackground(condition, temp){
    let body = document.body;
    let cond = condition.toLowerCase();

    
    if(cond.includes("rain")){
        body.style.background = "#57575d";
    }
    else if(cond.includes("cloud")){
        body.style.background = "#54717a";
    }
    else if(cond.includes("mist") || cond.includes("fog")){
        body.style.background = "#a3a3a3";
    }
    else {
        // 🌡 Temperature fallback
        if(temp <= 10){
            body.style.background = "#00b4d8";
        }
        else if(temp <= 25){
            body.style.background = "#90be6d";
        }
        else if(temp <= 35){
            body.style.background = "#f8961e";
        }
        else{
            body.style.background = "#f94144";
        }
    }
}

function updateDetails(temp, locationName, time, condition, icon){
    temperatureField.innerText = temp + "°C";
    locationField.innerText = locationName;
    let formattedTime = new Date(time).toLocaleString();
    dateandTimeField.innerText = formattedTime;
    conditionField.innerText = condition;

    iconField.src = "https:" + icon;

    changeBackground(condition, temp);
}

function searchForLocation(e){
    e.preventDefault()

    target = searchField.value;

    fetchResults(target);
}

fetchResults(target);