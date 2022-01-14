# leaflet-challenge
JavaScript project to practice more with Leaflet, GeoJSON, and other plug-ins

function earthquakeMarkers(): 
  call the API, retrieve needed data: latitude and longitude, depth, magnitude...
  create marker objects and store them in the array of earthquakeCoordinates.
  use those marker objects to create layers of the maps (show those markers on the map)
  passing as earthquakeLocations para in createMap
  
function createMap(earthquakeLocations):
  set up the baseMap
  para earthquakeLocations will be use to create all the markers
  set up legend (in-progress)

function circleRadius():
  return the radius of the circle markers
  used as para to demostrate the magnitude of the earthquakes.

function circleColor():
  return the color that would be used to demostrate the depth of the earthquakes
  color are set by range, jump by 10
