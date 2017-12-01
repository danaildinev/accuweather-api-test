//TODO: getCity -> prepare data -> create new card with the data/rotate the wheel; events

let currentCityId,
    queryApi = "http://api.openweathermap.org/data/2.5/weather?",
    queryApiHourly = "http://api.openweathermap.org/data/2.5/forecast?",
    paramCity = "&q=",
    paramApiKey = "apikey=21ff54b0caff47e8fdd0410c4293e650",
    paramMetric = "&units=metric",
    paramDetails = "&details=true",
    additionalLink = "https://openweathermap.org/city/",
    tempSymbol = "°C",
    isGrid = true;

function getCity(name) {
    ajax1 = $.ajax({
        method: "GET",
        url: queryApi + paramApiKey + paramCity + name + paramMetric,
        success: function(result) {
            resultCurrent = result;
        }
    });

    ajax2 = $.ajax({
        method: "GET",
        url: queryApiHourly + paramApiKey + paramCity + name + paramMetric,
        success: function(result) {
            resultHourly = result;
        }
    });

    //stackoverflow.com/questions/33871061/wait-for-execution-of-two-ajax-requests-success-functions-in
    $.when(
        ajax1, ajax2
    )
    .done(function() {
        prepareCard(resultCurrent, resultHourly);
    })
    .fail(function() {
        console.log('api fail');
    });
}

function prepareCard(result, hourly) {
    cityName = result.name;
    currentWeatherText = result.weather[0].main;
    currentTemperature = result.main.temp + tempSymbol;
    currentLoHi = "Lo: " + result.main.temp_min + tempSymbol + "/Hi: " + result.main.temp_max + tempSymbol;
    windSpeed = result.wind.speed;
    icon = result.weather[0].icon;

    //create new card
    newCard(
        cityName,
        currentWeatherText,
        currentTemperature,
        currentLoHi,
        windSpeed,
        additionalLink,
        icon,
        hourly
    );
    rotateTheWheel(windSpeed);
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
    icon,
    hourly
) {
    //DETAILS
    var extra = "";
    if (extraInfo) {
        extra = `
            <div class="card-footer bg-transparent">
                <table class="table table-sm">
                  <tbody>
                    <tr><td>` + hourly.list[0].dt_txt + `</td><td>` + hourly.list[0].main.temp + tempSymbol + `</td>` +
                    `<td>` + hourly.list[0].weather[0].main + `</td><td><img src="http://openweathermap.org/img/w/` + hourly.list[0].weather[0].icon + `.png"></td></tr>` +
                    `<tr><td>` + hourly.list[1].dt_txt + `</td><td>` + hourly.list[1].main.temp + tempSymbol + `</td>` +
                    `<td>` + hourly.list[1].weather[0].main + `</td><td><img src="http://openweathermap.org/img/w/` + hourly.list[1].weather[0].icon + `.png"></td></tr>` +
                    `<tr><td>` + hourly.list[2].dt_txt + `</td><td>` + hourly.list[2].main.temp + tempSymbol + `</td>` +
                    `<td>` + hourly.list[2].weather[0].main + `</td><td><img src="http://openweathermap.org/img/w/` + hourly.list[2].weather[0].icon + `.png"></td></tr>` +
                    `<tr><td>` + hourly.list[3].dt_txt + `</td><td>` + hourly.list[3].main.temp + tempSymbol + `</td>` +
                    `<td>` + hourly.list[3].weather[0].main + `</td><td><img src="http://openweathermap.org/img/w/` + hourly.list[3].weather[0].icon + `.png"></td></tr>` +
                    `<tr><td>` + hourly.list[4].dt_txt + `</td><td>` + hourly.list[4].main.temp + tempSymbol + `</td>` +
                    `<td>` + hourly.list[4].weather[0].main + `</td><td><img src="http://openweathermap.org/img/w/` + hourly.list[4].weather[0].icon + `.png"></td></tr>` +
                  `</tbody>
                </table>
            </div>`;
    }
    //CARD DEFAULT
    $("#cards-container").append(
        `<div class="col-md-5 card card-custom ${(isGrid)?"":"list-view"}">
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
                                <a class="additional-info" href="${additionalLink + cityName}">Additional info</a>
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
            </div> ` + extra + `
        </div>`);
}

/* events */
$("#searchButton").click(function() {
    selectedCity = $("#searchInput").val();
    extraInfo = $("#extraInfo").is(":checked");
    getCity(selectedCity);
});

$('.removeCity').on('click', function() {
    alert($(this).closest("div.col-md-5"));
    $(this).closest("div.col-md-5").remove();
});

$('#gridRadio').click(function() {
    $("#cards-container>div").toggleClass("list-view");
    isGrid = true;
});

$('#listRadio').click(function() {
    $("#cards-container>div").toggleClass("list-view");
    isGrid = false;
});

getCity("plovdiv");
