let citySearch = "";
let showCelsius = true;

const cityName = document.querySelector("#cityName");
const temp = document.querySelector("#temp");
const conditions = document.querySelector("#conditions");

let form = document.querySelector("#cityForm");
form.addEventListener("submit", function (event) {
	event.preventDefault();
	citySearch = document.querySelector("#citySearch").value.toLowerCase();
	showData();
	document.querySelector("#citySearch").value = "";
});

function createObject(address, mintemp, maxtemp, temp, feelsLike, conditions) {
	dataObject = {
		address,
		mintemp,
		maxtemp,
		temp,
		feelsLike,
		conditions,
	};
	return dataObject;
}

function changeUnit() {
	showCelsius = !showCelsius;
	showData();
}

function clearData() {
	cityName.textContent = "";
	temp.textContent = "Temperature: ";
    conditions.textContent = "Conditions: ";
}

function convert(fahrenheit) {
	return Math.round((((fahrenheit - 32) * 5) / 9) * 10) / 10;
}

async function getData() {
	clearData();
	const response = await fetch(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${citySearch}?key=73XF5R5ES98BM9EGGE5AUGQLK`,
		{ mode: "cors" }
	);
	const weatherInformation = await response.json();
	const weatherObject = createObject(
		weatherInformation.address,
		weatherInformation.days[0].tempmin,
		weatherInformation.days[0].tempmax,
		weatherInformation.days[0].temp,
		weatherInformation.days[0].feelslike,
		weatherInformation.days[0].conditions
	);
	console.log(weatherObject);
	return weatherObject;
}

async function showData() {
	const weather = await getData();
	cityName.textContent +=
		weather.address[0].toUpperCase() + weather.address.slice(1);
	if (showCelsius) {
		temp.textContent += `The temperature in ${
			weather.address[0].toUpperCase() + weather.address.slice(1)
		} today will range between ${convert(weather.mintemp)}°C and  ${convert(
			weather.maxtemp
		)}°C, averaging out at about ${convert(
			weather.temp
		)}°C which will feel like ${convert(weather.feelsLike)}°C`;
	} else {
		temp.textContent += `The temperature in ${weather.address} today will range between ${weather.mintemp}°F and  ${weather.maxtemp}°F, averaging out at about ${weather.temp}°F, which will feel like ${weather.feelsLike}°F`;
	}
	conditions.textContent += weather.conditions;
}

//what data is needed? temperature, feels like temperature, description (for the day), address, conditions
