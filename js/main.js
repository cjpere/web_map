var mymap = L.map('map', {
    center: [39.83, -98.58],
    zoom: 4,
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true});

// 2. Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);

var airports = null;
// Get GeoJSON and put on it on the map when it loads
airports = L.geoJson.ajax("assets/airports.geojson",{
  attribution: 'Airport Data &copy; Map Cruzin | US States &copy; | Base Map &copy; CartoDB | Made By Claire Perez'
});
// Add the cellTowers to the map.
airports.addTo(mymap);
