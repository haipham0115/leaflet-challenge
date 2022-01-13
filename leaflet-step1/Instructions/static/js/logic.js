



// url to get the json
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
d3.json(url).then(earthquakeMarkers);

// =========================================================================

function earthquakeMarkers(response) {
    // retrieve the key "features" inside the response and store them into a variable
    var features = response.features

    // console.log(features[0].properties.mag)

    var earthquakeCordinates = [];

    // loop thru the whole object and get [lat, lon], then store them into the array
    for (i = 0; i < features.length; i++) {

        // retrieve the 'lat' and 'lon' from the api 
        var locationLatLon = features[i].geometry.coordinates;

        // retrieve the depth of the earthquake (using the third coordinate)
        var depth = locationLatLon[2];

        // retrive the magnitude of the earthquake
        var magnitude = features[i].properties.mag;

        // for each location (with their lat/lon), make a marker object for that location
        if (locationLatLon) {
            var marker = L.circle([locationLatLon[1], locationLatLon[0]], {
                // color will be use to demostrate the depth of the earthquake
                "color": circleColor(depth),
                "fillColor": circleColor(depth),
                // radius will be calculated with the magnitude
                "fillOpacity": 1.0,
                "radius": circleRadius(magnitude)
            })
        }

        // push that marker object into the array.
        // the array later on would be used to create the a layerGroup
        earthquakeCordinates.push(marker)
    }

    // passing the array of coordinates into the map making function `creatMap`
    createMap(L.layerGroup(earthquakeCordinates));
}

function createMap(earthquakeLocations) {
    // Create the tile layer that will be the background of our map.
    var tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    // Create a baseMaps object to hold the tile layer.
    var baseMaps = {
        "Map": tile
    };

    // Create an overlayMaps object to hold the earthquakeLocations layer.
    var overlayMaps = {
        "Earthquake Maps": earthquakeLocations
    };

    // Create the map object with options.
    var myMap = L.map("map", {
        center: [45.52, -122.67],
        zoom: 5,
        layer: [baseMaps, overlayMaps]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}


// create a function to demonstrate the magnitude of the earthquake (cicle's radius)
function circleRadius(magnitude) {
    return Math.pow(2 * magnitude, 2) * 500;
}

// create function to demonstrate the depth of the earthquake (circle color)
function circleColor(depth) {
    if (depth <= 15) {
        var color = "#209c05";
    }
    else if (depth > 15 && depth <= 30) {
        color = "#85e62c";
    }
    else if (depth > 30 && depth <= 45) {
        color = "#ebff05";
    }
    else if (depth > 45 && depth <= 60) {
        color = "#f2ce02";
    }
    else {
        color = "#ff0a0a";
    }
    return color;
}





// WHAT'S STILL NEED TO DO:
// POP-UP 