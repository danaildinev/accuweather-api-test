var currentCityId,
    queryApi = "http://api.openweathermap.org/data/2.5/weather?",
    queryApi5day = "http://api.openweathermap.org/data/2.5/weather?",
    paramCity = "&q=",
    paramApiKey = "apikey=21ff54b0caff47e8fdd0410c4293e650",
    paramMetric = "&units=metric",
    paramDetails = "&details=true",
    additionalLink = "https://openweathermap.org/city/";

function getCity(name) {
    $.ajax({
        method: "GET",
        url: queryApi + paramApiKey + paramCity + name + paramMetric,
        success: function(result) {
            console.log(result);
            prepareCard(result);
        }
    });
}

function prepareCard(result) {
    cityName = result.name;
    currentWeatherText = result.weather[0].main;
    currentTemperature = result.main.temp + "°C";
    currentLoHi =
        "Lo: " + result.main.temp_min + "°C/Hi: " + result.main.temp_max + "°C";
    windSpeed = result.wind.speed;
    icon = result.weather[0].icon;
    console.log(cityName);

    //create new card
    newCard(
        cityName,
        currentWeatherText,
        currentTemperature,
        currentLoHi,
        windSpeed,
        additionalLink,
        icon
    );

    rotateTheWheel(5);
}

function rotateTheWheel(windSpeed) {
    let inversed = 20 / windSpeed;
    $(".wind-icon").css("animation-duration", inversed + "s");
}

function newCard(
    cityName,
    currentWeatherText,
    currentTemperature,
    currentLoHi,
    windSpeed,
    additionalLink,
    icon
) {
    $("#cards-container").append(
        `<div class="col-md-5 card card-custom">
            <div class="content">
                <div class="left">
                    <div class="card-body">
                        <h2 class="title">${cityName}</h2>
                        <h3 class="curr">Current: ${currentTemperature}</h3>
                        <h4 class="temp">${currentLoHi}</h4>
                        <h5 class="text-muted w-text">${currentWeatherText}</h5>
                        <div class="info">
                            <p class="wind">Wind: ${windSpeed}m/s</p>
                            <p class="card-text"></p>
                            <p class="card-link">
                                <a class="additional-info" href="${additionalLink +
                                    cityName}">Additional info</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <img class="card-image" src="http://openweathermap.org/img/w/${
                        icon
                    }.png">
                    <i class="fa fa-star wind-icon" aria-hidden="true"></i>
                    <i class="fa fa-long-arrow-up wind-body" aria-hidden="true"></i>
                </div>
            </div>
            <div class="card-footer bg-transparent border-success">
                Footer
            </div>
        </div>`
    );
}

getCity("plovdiv");

/* events */
$("#searchButton").click(function() {
    selectedCity = $("#searchInput").val();
    getCity(selectedCity);
});
