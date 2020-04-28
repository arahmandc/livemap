function init() {

	var pointsURL = 'https://docs.google.com/spreadsheets/d/1EDXmzu9H6sd6Hn1Pf8Tvd9jLtr7HaHNWAdxOTsSylhM/edit?usp=sharing';

	Tabletop.init( { key: pointsURL,
    callback: addPoints,
    simpleSheet: true } ); 
}
window.addEventListener('DOMContentLoaded', init);

var map = L.map('map').setView([23.770, 88.857], 7);

var basemap = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
});
basemap.addTo(map);


var sidebar = L.control.sidebar({
  container: 'sidebar',
  closeButton: true,
  position: 'right'
}).addTo(map);



panelID = 'my-info-panel'
var panelContent = {
  id: panelID,
  tab: '<i class="fa fa-bars active"></i>',
  // pane: '<p id="sidebar-content"></p><a href="https://arahmandc.github.io/dump/img/1498800820242.jpg" target="_blank"><img src="https://arahmandc.github.io/dump/img/1498800820242.jpg" width="300px"></a> <p>details:</p><p id="sidebar-contentt"></p>',
  pane: '<p id="sidebar-content"></p><p id="sidebar-image"><p><h4>details:</h4></p><p id="sidebar-contentt"></p>',
  title: '<h2 id="sidebar-title">POI not selected</h2>',

};
sidebar.addPanel(panelContent);

map.on('click', function (feature, layer) {
  sidebar.close(panelID);
});



var pointGroupLayer;

var geojsonStates = {
    'type': 'FeatureCollection',
    'features': []
  };



function addPoints(data) {
  if (pointGroupLayer != null) {
    pointGroupLayer.remove();
  }
  pointGroupLayer = L.layerGroup().addTo(map);

  for(var row = 0; row < data.length; row++) {
    var marker = L.marker([data[row].lat, data[row].long]).addTo(pointGroupLayer);

     marker.feature = {
      properties: {
        location: data[row].location_name,
        category: data[row].category,
        level: data[row].level,
        imagepath: data[row].Image2,
      }
    };
    marker.on({
      click: function(e) {
        L.DomEvent.stopPropagation(e);
        document.getElementById('sidebar-title').innerHTML = e.target.feature.properties.location;
        document.getElementById('sidebar-content').innerHTML = e.target.feature.properties.category;
        document.getElementById('sidebar-contentt').innerHTML = e.target.feature.properties.level;
        document.getElementById('sidebar-image').innerHTML = e.target.feature.properties.imagepath;
        sidebar.open(panelID);
      }
    });

    var icon = L.AwesomeMarkers.icon({
      icon: 'info-sign',
      iconColor: 'white',
      markerColor: getColor(data[row].category),
      prefix: 'glyphicon',
      extraClasses: 'fa-rotate-0'
    });
    marker.setIcon(icon);
  }
}





function getColor(type) {
  switch (type) {
    case 'Coffee Shop':
      return 'green';
    case 'Restaurant':
      return 'blue';
    default:
      return 'green';
  }
}
