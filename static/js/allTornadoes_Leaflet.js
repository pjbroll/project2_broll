d3.json("/data",data => {
  d3.json('/mobile_homes', response  => {
  createMap(data, response)
  });
});

function createMap(data, response) {
  // console.log(data, response)
  // var heat = ;
  // var tornadoes = ;
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 12,
    id: "mapbox.street",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  // var baseMaps = {
  //   "Light Map": lightmap
  // };

  selectedYear = 2018;

  bothObj = createTornadoMarkers(data, selectedYear);

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Mobile Homes Heat Map": createheatlayer(response),
    "Tornadoes" : bothObj.torLayer
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [lightmap, bothObj.torLayer]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(null, overlayMaps, {
    collapsed: false
  }).addTo(map);

  // Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

  // When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

updateLegend(bothObj.count, selectedYear);
}

function createTornadoMarkers(tornadoes_data, year) {

  function filterYear(data){
    return data.Year == year;
  }

  tornadoes = tornadoes_data.filter(filterYear);
  console.log(tornadoes);


  // console.log(tornadoes.length)
  tornado_Mag={
    MAG_0:0,
    MAG_1:0,
    MAG_2:0,
    MAG_3:0,
    MAG_4:0
};

var tornadoMag;

var tornadoMarkers = [];

// Loop through the stations array
for (var index = 0; index < tornadoes.length; index++) {
  var tornado = tornadoes[index];

  if(tornado.Magnitude==0){
    tornadoMag = "MAG_0";
     var geojsonMarkerOptions = {
        radius: 1,
        fillColor: "#FFDEAD",// "#28ea3f",//"#0163FF",
        color: "#000000", //"#0163FF",
        weight: 2,
        opacity: 10,
        fillOpacity: 10
      };
      lineColor = "#FFFFFF";
      magnitude = "F0";
  }
  else if(tornado.Magnitude==1){
    tornadoMag = "MAG_1";
        var geojsonMarkerOptions = {
        radius: 3,
        fillColor: "#FFD700",// "#28ea3f",//"#0163FF",
        color: "#000000", //"#0163FF",
        weight: 2,
        opacity: 10,
        fillOpacity: 10
      };
      lineColor = "#FFFF00";
      magnitude = "F1";

    }
  else if(tornado.Magnitude==2){
    tornadoMag = "MAG_2";
        var geojsonMarkerOptions = {
        radius: 5,
        fillColor: "#FF7F50",// "#28ea3f",//"#0163FF",
        color: "#000000", //"#0163FF",
        weight: 2,
        opacity: 10,
        fillOpacity: 10
      };
      lineColor = "#FF4500";
      magnitude = "F2";
 }
 else if(tornado.Magnitude==3){
    tornadoMag = "MAG_3";
        var geojsonMarkerOptions = {
        radius: 7,
        fillColor: "#D2691E",// "#28ea3f",//"#0163FF",
        color: "#000000", //"#0163FF",
        weight: 2,
        opacity: 10,
        fillOpacity: 10
      };
      lineColor = "#A52A2A";
      magnitude = "F3";
 }
 else{
    tornadoMag = "MAG_4";
        var geojsonMarkerOptions = {
        radius: 9,
        fillColor: "#FF0000",// "#28ea3f",//"#0163FF",
        color: "#000000", //"#0163FF",
        weight: 2,
        opacity: 10,
        fillOpacity: 10
      };
      lineColor = "#FF0000";
      magnitude = "F4";
 };

 tornado_Mag[tornadoMag]++;

    var line = [
      [tornado.Start_Lat, tornado.Start_Lon],
      [tornado.End_Lat , tornado.End_Lon]
    ];

    // For each station, create a marker and bind a popup with the station's name
    var tornadoMarker = L.circleMarker([tornado.Start_Lat, tornado.Start_Lon],geojsonMarkerOptions)
      .bindPopup("<h3>" + tornado.Date + "</h3><h3>Magnitude: " + magnitude + "</h3><h3>Length: " + tornado.Length_Miles + " miles</h3>");

    var tornadoMarkerLen = L.polyline(line, {
      color: lineColor
    });

    
    // Add the marker to the bikeMarkers array
    tornadoMarkers.push(tornadoMarker);
    tornadoMarkers.push(tornadoMarkerLen);

    //console.log(tornadoMarkers);
  }

  tornadoLayer = L.layerGroup(tornadoMarkers)

  var bothObj = {
                  torLayer: tornadoLayer,
                  count: tornado_Mag
                };
  
  return bothObj  
};

function createheatlayer(response){

  var tornadoArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i];
    if (location) {
        tornadoArray.push({ lat: response[i].LATITUDE, lon: response[i].LONGITUDE});
    }
  }

  var heatlayer = L.heatLayer(tornadoArray, {
    radius: 15,
    blur: 25
  })
  return heatlayer
  // createMap(heat)
};

function updateLegend(tornado_Count, yr) {
  document.querySelector(".legend").innerHTML = [
    "<p class='Year'>Year: " +yr+"</p>",
    "<p class='Magnitude-f0'>Magnitude F0: " + tornado_Count.MAG_0 + "</p>",
    "<p class='Magnitude-f1'>Magnitude F1: " + tornado_Count.MAG_1 + "</p>",
    "<p class='Magnitude-f2'>Magnitude F2: " + tornado_Count.MAG_2 + "</p>",
    "<p class='Magnitude-f3'>Magnitude F3: " + tornado_Count.MAG_3 + "</p>",
    "<p class='Magnitude-f4'>Magnitude F4: " + tornado_Count.MAG_4 + "</p>",
  ].join("");
}
