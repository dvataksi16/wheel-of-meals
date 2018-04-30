const map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: getCurrentLocation()
  });
  const request = {
    location: getCurrentLocation(),
    radius: '23000',
    type: ['movie_theater']
  };
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

}
function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          createMarker(results);
        }
}
function createMarker(results){
  const markers = results.map(
    new google.maps.Marker({
      position: result.geometry.location,
      map:map,
      label: result.name
    })
  );
}

function getCurrentLocation() {
        const loc = {};
        const geocoder = new google.maps.Geocoder();
        console.log(geocoder);
        if(google.loader.ClientLocation) {
            loc.lat = google.loader.ClientLocation.latitude;
            loc.lng = google.loader.ClientLocation.longitude;
        }
        return loc;
    }
