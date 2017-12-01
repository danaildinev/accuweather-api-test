let currentCityId,
    queryApi = "http://api.openweathermap.org/data/2.5/weather?",
    paramCity = "&q=",
    paramApiKey = "apikey=21ff54b0caff47e8fdd0410c4293e650",
    paramMetric = "&units=metric",
    paramDetails = "&details=true",

    additionalLink = "https://openweathermap.org/city/",

    windSpeed;

function getCity(name) {
    $.ajax({
        method: "GET",
        url: queryApi + paramApiKey + paramCity + name + paramMetric,
        success: function(result) {
            console.log(result);
            prepareFields(result);
        }
    });
}

function prepareFields(result) {
    $(".title").text(result.name);
    $(".w-text").text(result.weather[0].main);
    $(".curr").append(result.main.temp + "°C");
    $(".temp").text(
        "Min: " + result.main.temp_min +
        "°C/Max: " + result.main.temp_max + "°C"
    );
    $(".additional-info").attr("href", additionalLink + result.name);

    //windy things
    windSpeed = result.wind.speed;
    $(".wind").append(windSpeed + "m/s");
    rotateTheWheel();

    /*$(".card-text").text(result.Headline.Text);

    */
}

function rotateTheWheel() {
    let inversed = 50 / windSpeed;
    $(".wind-icon").css('animation-duration', inversed + 's');
}

getCity("plovdiv");
