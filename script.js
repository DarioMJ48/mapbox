mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyaW9tajQ4IiwiYSI6ImNsMHg2ZzRvbzBzcm8zZnA1cDR4cDd4d3kifQ.grUHSbKwXiWFwqQI1d_7dQ';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}

var map;

function setupMap(center) {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 15
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  })
  map.addControl(directions, 'top-left')
}

const formularioPOI = document.getElementById('formularioPOI')

formularioPOI.addEventListener('submit', (e) => {
  e.preventDefault()
})

function createPOI() {
  const nombre = document.getElementById('nombre').value;
  const direccion = document.getElementById('direccion').value;
  var telefono = document.getElementById('telefono').value
  telefono ? telefono = telefono : telefono = 'N/A'
  const longitud = document.getElementById('longitud').value;
  const latitud = document.getElementById('latitud').value;
  const categoria = document.getElementById('categoria').value;

  let element = document.createElement('div')
  element.className = 'marker'

  let marker = new mapboxgl.Marker(element)
  .setLngLat({
    lng: longitud,
    lat: latitud
  })
  .addTo(map)

  element.addEventListener('click', () => {
    const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([longitud, latitud])
    .setHTML(
      `<div>` + 
        `<p><strong>Nombre:</strong> ${nombre}</p>` +
        `<p><strong>Dirección:</strong> ${direccion}</p>` +
        `<p><strong>Teléfono:</strong> ${telefono}</p>` +
        `<p><strong>X, Y:</strong> ${longitud}, ${latitud}</p>` +
        `<p><strong>Categoría:</strong> ${categoria}</p>` +
      `</div>`
    )
    .addTo(map);
  })
}

//-34.7071127
//-58.7847472