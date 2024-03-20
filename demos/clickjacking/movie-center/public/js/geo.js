const el = document.getElementById("geo-location");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    el.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  el.innerHTML = "Latitude: " + position.coords.latitude + "- Longitude: " + position.coords.longitude;
}

getLocation();
