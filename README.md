# Australian Animals Habitat Geojson Data API

## description
This APIs data comes from the [IUCN](https://www.iucnredlist.org/). The data was downloaded because the IUCN is refused to give us the API token of their services. 
## Data structure
The data format is Geojson, by the definition from [Geojson.Org](https://geojson.org/)
>GeoJSON is a format for encoding a variety of geographic data structures. GeoJSON supports the following geometry types: Point, LineString, Polygon, MultiPoint, MultiLineString, and MultiPolygon. Geometric objects with additional properties are Feature objects. Sets of features are contained by FeatureCollection objects.

The element in a Geojson data:  
![alt text](https://i.imgur.com/2iA2oj6.png "Geojson data")

## How to run this app
To running this app, call the command below: 
```
// install the packages
npm install
//running the server.js
npm start
```

## How to get data from this API
In this API you have two ways to get the data: use the animal's common name or Binomial. **Notice that the common name may not always equal but the Binomial is.** If you running this API on localhost, get the data from 
```
http://localhost:PORT/find/name?name=<"Common name"> 
http://localhost:PORT/find/binomial?binomial=<"binomial">  
```
Replace the <> content.

## How to implement
To implement the Geojson data into your map, there is two ways: 

To implement the data with map using Github script, for example:
```
<script
		src="https://embed.github.com/view/geojson/FaunaFication-737-780/geoDataApi/master/geojson/Agile%20Wallaby.geojson">
</script>
```

To implement this using [leaflet](https://leafletjs.com/examples/geojson/):
```
L.geoJSON(geojsonFeature).addTo(map);
``` 
## Reference
If you want to download the IUCN data and build on your own service. Because all the data is named "data0" from IUCN. Therefore, you can change the folder's name first then use the script './rename file.bat' to rename the files inside the folder.