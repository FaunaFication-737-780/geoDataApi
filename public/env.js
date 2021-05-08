const getData = () => {
    var geoData;
    $.get('/find', {
        name: 'BlotchedBluetongue'
    }, function (data) {
        console.log(data);
        geoData = data.data
        var map = new L.map('mapid').setView([-27.833, 133.583], 4);
        var boundaryBox = data.data.features[0].geometry.bbox
        console.log('bbox is ' + boundaryBox);
        var fixedBox = [] 


        boundaryBox.forEach(element => {
            console.log('box' + element);
            
        });
        fixedBox = [[boundaryBox[1],boundaryBox[0]],[boundaryBox[3], boundaryBox[2]]]
        console.log('fixed box'+typeof fixedBox);

       
        

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
          map.fitBounds(fixedBox)
    })


}



$(document).ready(function () {



    getData()
})