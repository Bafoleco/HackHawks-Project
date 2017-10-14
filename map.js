
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Legend",
  "esri/geometry/Point",
  "esri/geometry/Polygon",
  "esri/geometry/Circle",
  "esri/Graphic",
  "dojo/domReady!"
], function(
  Map, MapView, FeatureLayer, Legend, Point, Polygon, Graphic, Circle
) {
  var stencilPolygon;

  var map = new Map({
    basemap: "dark-gray-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-90, 0],
    zoom: 15
  });

  function sizeWindow(event) {
    var diameter = Math.floor(0.8 * Math.min(window.innerHeight, window.innerWidth));
    document.getElementById("canvas").height = window.innerHeight;
    document.getElementById("canvas").width =  window.innerWidth;
    drawCicle(diameter/2);
    view.center = [longitude, latitude];

  }
  window.onresize = sizeWindow;

  var latitude = 0;
  var longitude = 0;

  navigator.geolocation.getCurrentPosition(updateLocation);
  function updateLocation(position) {
     latitude = position.coords.latitude;
     longitude = position.coords.longitude;
     view.center = [longitude, latitude];
  }

  window.addEventListener("deviceorientation", deviceOrientationListener);
  function deviceOrientationListener(event) {
      var heading = event.webkitCompassHeading;
      view.rotation = heading;
  }
  sizeWindow();
});
