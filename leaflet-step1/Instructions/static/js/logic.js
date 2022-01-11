// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
var myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 8
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);





// url to get the json
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(url).then(earthquakeMarkers);

function earthquakeMarkers(response) {
    // retrieve the key "features" inside the response and store them into a variable
    var features = response.features

    // console.log(features[0].geometry.coordinates)

    var earthquakeCordinates = [];

    // loop thru the whole object and get [lat, lon], then store them into the array
    for (i = 0; i < features.length; i++) {
        var locationLatLon = features[i].geometry.coordinates;

        if (locationLatLon) {
            earthquakeCordinates.push([locationLatLon[1], locationLatLon[0]])
        }
    }
    console.log(earthquakeCordinates)
}

