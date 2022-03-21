mapboxgl.accessToken = '';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation(position) {
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

function createPOI(e) {
  e.preventDefault()

  const nombre = document.getElementById('nombre').value;
  const direccion = document.getElementById('direccion').value;
  const telefono = document.getElementById('telefono').value;
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
      `<div id="wasd">` + 
        `<h3>Nombre: ${nombre}</h3>` +
        `<h3>Dirección: ${direccion}</h3>` +
        `<h3>Teléfono: ${telefono}</h3>` +
        `<h3>X, Y: ${longitud}, ${latitud}</h3>` +
        `<h3>Categoría: ${categoria}</h3>` +
      `</div>`
    )
    .addTo(map);
  })
}
