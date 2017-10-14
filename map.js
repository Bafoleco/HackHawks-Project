function sizeWindow(event) {
  var diameter = Math.floor(0.8 * Math.min(window.innerHeight, window.innerWidth));
  document.getElementById("viewDiv").style.height = "" + diameter + "px";
  document.getElementById("viewDiv").style.width = "" + diameter + "px";
}

window.onresize = sizeWindow;

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/geometry/Point",
  "dojo/domReady!"
], function(
  Map, MapView, FeatureLayer, Legend, Point
) {

  var map = new Map({
    basemap: "dark-gray-vector",
  });

  // points to the states layer in a service storing U.S. census data
  // var fl = new FeatureLayer({
  //   url: "https://services.arcgis.com/YKJ5JtnaPQ2jDbX8/arcgis/rest/services/VDH_Health_Districts_WM/FeatureServer/0"
  // });
  // map.add(fl);
  // adds the layer to the map

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90, 0],
    zoom: 15
  });

  navigator.geolocation.getCurrentPosition(updateLocation);
  function updateLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    view.center = [longitude, latitude];
  }

  window.addEventListener("deviceorientation", deviceOrientationListener);
  function deviceOrientationListener(event) {
      var heading = event.webkitCompassHeading;
      view.rotation = heading;
  }
});
