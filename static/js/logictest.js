d3.json('/data', data  => {
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
  
    layer ={
        MAG_0: new L.layerGroup(),
        MAG_1: new L.layerGroup(),
        MAG_2: new L.layerGroup(),
        MAG_3: new L.layerGroup(),
        MAG_4: new L.layerGroup(),
    };

    var map = L.map("map", {
        center: [39.8283, -98.5795],
        zoom: 6,
        layers: [
            layer.MAG_0,
            layer.MAG_1,
            layer.MAG_2,
            layer.MAG_3,
            layer.MAG_4
        ]
      });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
      };

      data0 = [];
    for(i=0;i<=data.length;i++){

        console.log(data[i].Magnitude);
        // if(data[i].Magnitude == 0){
        //     data0.push = data[i];
        // }
    }

      console.log("data: "+data0);
      console.log("Length: "+data0.length);

  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Mobile Homes Heat Map": createheatlayer(response),
    //   "Tornadoes" : createTornadoMarkers(data),
      "Severity - F0": createTornadoMarkers(data0),
      "Severity - F1": createTornadoMarkers(data),
      "Severity - F2": createTornadoMarkers(data),
      "Severity - F3": createTornadoMarkers(data),
      "Severity - F4": createTornadoMarkers(data)
    };
  
    // Create the map object with options
    
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(null, overlayMaps, {
      collapsed: false
    }).addTo(map);
  

    var info = L.control({
      position: "bottomright"
    });

    info.onAdd = function (){
      var div = L.DomUtil.create("div","legend");
      return div;
    };

    info.addTo(map);

};

function createTornadoMarkers(tornadoes) {
  
    // Initialize an array to hold bike markers
    //console.log(tornadoes)

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
      }
      else if(tornado.Magnitude==1){
        tornadoMag = "MAG_1";
            var geojsonMarkerOptions = {
            radius: 3,
            fillColor: "#FFFF00",// "#28ea3f",//"#0163FF",
            color: "#000000", //"#0163FF",
            weight: 2,
            opacity: 10,
            fillOpacity: 10
          };
          lineColor = "#FFFF00";
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
     };

     tornado_Mag[tornadoMag]++;

      var line = [
        [tornado.Start_Lat, tornado.Start_Lon],
        [tornado.End_Lat , tornado.End_Lon]
      ];
  
      // For each station, create a marker and bind a popup with the station's name
      var tornadoMarker = L.circleMarker([tornado.Start_Lat, tornado.Start_Lon],geojsonMarkerOptions)
        .bindPopup("<h3>" + tornado.Date + "</h3><h3>Magnitude: " + tornado.Magnitude + "</h3><h3>Length: " + tornado.Length_Miles + " miles </h3>");
  
      var tornadoMarkerLine = L.polyline(line, {
        color: lineColor
      });

      
      // Add the marker to the bikeMarkers array
      tornadoMarkers.push(tornadoMarker);
      tornadoMarkers.push(tornadoMarkerLine);

    //   console.log(tornadoMarkers);

    //tornadoMarkers.addTo(layer[tornadoMag]);

    }

    console.log(tornado_Mag)
  
    tornadoLayer = L.layerGroup(tornadoMarkers)
    return tornadoLayer;
    
    // Create a layer group made from the bike markers array, pass it into the createMap function
    // createMap(tornadoLayer);
  };
  
  
  // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  // d3.json("/data",data => {
    
  //   createTornadoMarkers(data)
  // });
  
  // Heat Maps:
  
  // var myMap = L.map("map", {
  //   center: [38.563891, -94.878246],
  //   zoom: 5
  // });
  
  // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  //   maxZoom: 10,
  //   id: "mapbox.streets",
  //   accessToken: API_KEY
  // }).addTo(map);
  // d3.json('/mobile_homes', response  => {
  //   createheatlayer(response)
  // });
  
  
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
    });
    return heatlayer
    // createMap(heat)
  };
  