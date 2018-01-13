// import ymaps from 'ymaps'
var GoogleMapsLoader = require("google-maps"); // only for common js environments

module.exports = mapSelector => {
  //////////
  let el = document.querySelector("#" + mapSelector);
  if (el) {
    var ufa = {
      lat: 54.738762,
      lng: 55.972055
    };
    var zoomVal = 15;

    var screenWidth = document.body.clientWidth;
    if (screenWidth <= 1024) zoomVal = 14;
    if (screenWidth <= 480) zoomVal = 13;

    GoogleMapsLoader.KEY = "AIzaSyBESwPgs7bzboJ24WsUQpJC3zbaYxYbRn4";

    GoogleMapsLoader.load(function(google) {
      var map = new google.maps.Map(el, {
        zoom: zoomVal,
        center: ufa,
        mapTypeControl: false,
        disableDefaultUI: true,
        mapTypeId: "satellite"
      });
    });
  }
};
