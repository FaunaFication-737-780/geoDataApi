const getData = ()=>{
    var geoData;
    $.get('/find', {name: 'koala'}, function(data){
        console.log(data);
        geoData = data.data
        var map = L.map('mapid').setView([-27.833, 133.583], 4);

    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);

    L.geoJson(geoData).addTo(map)
    })

    
}



$(document).ready(function () {
  
    

    getData()
})