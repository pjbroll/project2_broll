var myMap = L.map("map", {
  center: [38.563891, -94.878246],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.json('/data', response => {
  console.log(response);

  var tornadoArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i];

    if (location) {
        tornadoArray.push({ lat: response[i].Start_Lat, lon: response[i].Start_Lon});
    }
  }

  var heat = L.heatLayer(tornadoArray, {
    radius: 15,
    blur: 25
  }).addTo(myMap);  

});