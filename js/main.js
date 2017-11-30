let currentCityId,
    queryCity = "http://dataservice.accuweather.com/locations/v1/cities/search",
    queryTemperature =
        "http://dataservice.accuweather.com/forecasts/v1/daily/1day/",
    queryCurrent = "http://dataservice.accuweather.com/currentconditions/v1/",
    paramQ = "&q=",
    paramApiKey = "?apikey=YN51uLqqABDTlu9BowlPMn4tFAYJm5sF",
    paramMetric = "&metric=true",
    paramDetails = "&details=true";

function getCity(name) {
    $.ajax({
        method: "GET",
        url: queryCity + paramApiKey + paramQ + name,
        success: function(result) {
            getCurrentTemp(result[0].Key);
        }
    });
}

function getCurrentTemp(id) {
    $.ajax({
        method: "GET",
        url: queryTemperature + id + paramApiKey + paramMetric,
        success: function(result) {
            console.log(result);
            $(".temp").text(
                "Min: " +
                    result.DailyForecasts[0].Temperature.Minimum.Value +
                    "°" +
                    result.DailyForecasts[0].Temperature.Minimum.Unit +
                    "/" +
                    "Max: " +
                    result.DailyForecasts[0].Temperature.Maximum.Value +
                    "°" +
                    result.DailyForecasts[0].Temperature.Maximum.Unit
            );
            $(".card-text").text(result.Headline.Text);
            $(".additional-info").attr("href", result.Headline.Link);
        }
    });
    $.ajax({
        method: "GET",
        url: queryCurrent + id + paramApiKey,
        success: function(result) {
            console.log(result);
            $(".curr").append(
                result[0].Temperature.Metric.Value +
                    "°" +
                    result[0].Temperature.Metric.Unit
            );
            $(".w-text").text(result[0].WeatherText);
        }
    });
}

getCity("plovdiv");
