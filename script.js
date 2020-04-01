var searchHistory = [];
var $todayBtn = $("<button>");

$(document).ready(function() {
  $("#search-button").on("click", function() {
    
    
    var searchValue = $("#search-value").val();
    

    // clear input box
    $("#search-value").val("");
    localStorage.getItem("#search-value");
     
    

    searchWeather(searchValue);
    forecast(searchValue)

  })



  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue +"&appid=465b2a017642764513ceeb56102d4f85",
      dataType: "json",
      success: function(data) {
        // create history link for this search
        console.log(history)
        if (searchHistory.indexOf(searchValue) === -1) {
          searchHistory.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(searchHistory));
    
          makeRow(searchValue);
        }
        
        // clear any old content
        $("#today").empty();
        $todayBtn.append($todayBtn);

        // create html content for current weather
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        // merge and add to page
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);

        // call follow-up api endpoints
        getForecast(searchValue);
        getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }
  
//Get Started 
function forecast (searchValue) {
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q="+ searchValue +"&appid=465b2a017642764513ceeb56102d4f85",
    dataType: "json",
   }).then (function(data){ 
      







   });
   var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

   makeRow()
}});
 






