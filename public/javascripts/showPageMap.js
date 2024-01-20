
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: event.geometry.coordinates,
    zoom: 10,
});

new mapboxgl.Marker()
    .setLngLat(event.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3 class="text-dark">${event.title}</h3><p class="text-dark">${event.location}</p>`
            )
    )
    .addTo(map)