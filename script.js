
// select the button 
const btn = document.querySelector(".search-btn");
const search_input = document.querySelector(".search-input");


btn.addEventListener("click", async function () {
    // console.log("I was clicked");  testing purpose

    //1. now extract the input value
    const location = search_input.value;
    if (location == "") {
        alert("Enter any location");
    }
    else {
        //console.log(location);
        // 2. fetch the data from the api
        const weather_data = await fetchData(location);
        //3 . updating the dom or html main section with the new values

        // now update dom only if the weatherdata is not null
        if (weather_data != null) {
            updateDom(weather_data);
        }
        // at last update the text area to empty

    }
    search_input.value = "";


})


async function fetchData(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=d6410a9911b748aeb00121449251105&q=${location}&aqi=no`;

    const response = await fetch(url);
    if (response.status == 400) {
        alert("Invalid Location!!! \n Please enter correct location!!!");
        return null;
    }
    else if (response.status == 200) {
        const response_json = await response.json();
        console.log(response_json);
        return response_json;
    }

}


function updateDom(weather_data) {
    // all dom elements which are to be updated
    const temp_elem = document.querySelector(".temperature");
    const loc_elem = document.querySelector(".location");
    const time_elem = document.querySelector(".time");
    const date_elem = document.querySelector(".date");
    const day_elem = document.querySelector(".day");
    const icon_elem = document.querySelector(".icon img");
    const weather_state_elem = document.querySelector(".state");


    // extracting the required data from the json document
    const temp = weather_data.current.temp_c;
    //   console.log(t);
    const location = weather_data.location.name;
    //console.log(l);

    const date_time = weather_data.location.localtime;  // it returns date and time together
    const [date, time] = date_time.split(" ");
    const icon_url = weather_data.current.condition.icon;
    //console.log(icon_url);
    const state = weather_data.current.condition.text;


    // now update the html dom
    temp_elem.innerText = temp;
    loc_elem.innerText = location;
    time_elem.innerText = time;
    date_elem.innerText = date;
    icon_elem.src = icon_url;
    weather_state_elem.innerText = state;
}



