$(document).ready(function(){

    
var getAllWeather = function(coordinates) {
  $.ajax({
      url: `https://api.darksky.net/forecast/fc740c29d3c79bcb985737e67a179005/${coordinates.lat},${coordinates.lng}`,
      
     jsonp:"callback",
      
     dataType: "jsonp",
      
     success: function(refer) {
      console.log('my weather data ', refer);
      showDailyWeather(refer.currently)
      appendWeather(refer)}     
});}

function appendLocation(refer){
    $('.location').text(refer.formatted_address)
}

function appendWeather(refer){
    $('.daily').text("Current Temp: " + Math.round(((refer.currently.temperature - 32) *5 /9))+ ' °c '  );
    $('.low').text("Low: " + Math.round((refer.daily.data[0].temperatureMin-32)*5 /9)+ ' °c '  );
    $('.high').text("High: " + Math.round((refer.daily.data[0].temperatureMax-32)*5 /9)+ ' °c '  );
    $('.rain').text("Chance of Rain : " + (refer.currently.precipProbability * 100)+ ' %'  );
    $('.humidity').text("Humidity: " + (refer.currently.humidity * 100)+ ' %'  );
    $('.wind').text("Wind Speed : " + Math.round(refer.currently.windSpeed *1.609344 )+ ' km/h'  );
    $('.visibility').text("Visibility : " + refer.currently.visibility+ ' '  );
    
    
    if(refer.currently.temperature >77){
        console.log('wrks');
        $("body").css('background-image',null);
        $('body').css('background-image','https://images.unsplash.com/photo-1446413407776-763bd743ae47?dpr=1&auto=compress,format&fit=crop&w=1920&h=1080&q=80&cs=tinysrgb&crop=&bg=')
    } else if(refer.currently.temperature < 77 && refer.currently.temperature>55 ){
        console.log('wrks');
        $("body").css('background-image',null);
        $('body').css('background-image','https://images.unsplash.com/photo-1428940253195-53483a1de2e6?dpr=1&auto=format&fit=crop&w=1920&h=1080&q=80&cs=tinysrgb&crop=&bg=')
    } else {
        console.log('wrks');
         $("body").css('background-image',null);
         $('body').css('background-image','https://images.unsplash.com/photo-1446470031315-c47a015f36f2?dpr=1&auto=compress,format&fit=crop&w=1920&h=1080&q=80&cs=tinysrgb&crop=&bg=')
        
    }
    
    if(refer.currently.temperature >77){
      $('.weekly').empty();
      $(".weekly").append('<i class="fa fa-sun-o"></i>');
        $(".weekly").append('<p class=log>its hot</p>');
    } else if(refer.currently.temperature<59){
        $('.weekly').empty();
       $(".weekly").append('<i class="fa fa-snowflake-o"></i>');
        $(".weekly").append('<p class=log>its cold</p>');
    } else {
        $('.weekly').empty();
        $(".weekly").append('<i class="fa fa-cloud"></i>');
        $(".weekly").append('<p class=log>its average</p>');
    }
    
}
var getSearchLocation = function(location) {
  $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCo-IVQ2yC6zdDl2GIlc1xtxT_V5_9YgkQ`,
      success: function(refer) {
          console.log('my location data ', refer);
          getAllWeather(refer.results[0].geometry.location)
            appendLocation(refer.results[0])}
})}


var showDailyWeather = function(currently){
   
    };

$('.clickr').click(function(){
    $(".title1").css('display','none');
    $('.weather-post').css('display','flex');
    var city_val=$('.weather-bar').val();
    getSearchLocation(city_val);   
})
 $('.clickr-post').click(function(){
    $(".title1").css('display','none');
    $('.weather-post').css('display','flex');
    var city_val=$('.weather-bar-post').val();
    getSearchLocation(city_val);   
})
})

