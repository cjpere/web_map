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
var colors = chroma.scale('Dark2').mode('lch').colors(2);

// 5. dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 2; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

// Get GeoJSON and put on it on the map when it loads
airports= L.geoJson.ajax("assets/airports.geojson", {
    // assign a function to the onEachFeature parameter of the cellTowers object.
    // Then each (point) feature will bind a popup window.
    // The content of the popup window is the value of `feature.properties.company`
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.CNTL_TWR);
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.CNTL_TWR == "Y") { id = 0; }
        else { id = 1;} // "N"
        //<i class="fas fa-broadcast-tower"></i>
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
    },
    attribution: 'Airport Data &copy; Map Cruzin | US States &copy; | Base Map &copy; CartoDB | Made By Claire Perez'
}).addTo(mymap);


colors = chroma.scale('YlOrRd').colors(6); //colors = chroma.scale('OrRd').colors(5);

function setColor(count) {
    var id = 0;
    if (count > 50) { id = 5; }
    else if (count > 40 && count <= 50) { id = 4; }
    else if (count > 30 && count <= 40) { id = 3; }
    else if (count > 20 &&  count <= 30) { id = 2; }
    else if (count > 10 &&  count <= 20) { id = 1; }
    else  { id = 0; }
    return colors[id];
}


// 7. Set style function that sets fill color.md property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}

// 8. Add county polygons
// create counties variable, and assign null to it.
var states = null;
states = L.geoJson.ajax("assets/us-states.geojson", {
    style: style
}).addTo(mymap);
