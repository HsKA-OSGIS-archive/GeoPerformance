import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import {fromLonLat} from 'ol/proj';
import OSM from 'ol/source/OSM';
import './style.css';
import {Map, View, Feature} from 'ol';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import {Voronoi} from './rhill-voronoi-core.js';
import Polygon from 'ol/geom/Polygon';
import {extend} from 'ol/extent';


var vectorSource;
var vector;

vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost:8082/geoserver/GeoPerformance/wfs?service=WFS&' +
      'version=2.0.0&request=GetFeature&typename=GeoPerformance:random2000_xy&' +
      'outputFormat=application/json&srsname=EPSG:3857&' +
      'bbox=' +
      extent.join(',') +
      ',EPSG:3857'
    );
  },
  strategy: bboxStrategy,
});



const myStyle = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({color: 'red'}),
        stroke: new Stroke({
          color: [255,255,255], width: 1
        })
      })
      
});

const polyStyle = new Style({
    stroke: new Stroke({
      color: 'red',
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.9)',
    }),
});

vector = new VectorLayer({
  source: vectorSource,
  style: myStyle,
});



const raster = new TileLayer({
  source: new OSM()
});

var map = new Map({
  layers: [raster, vector/**/],
  target: 'map',
  view: new View({
    center: fromLonLat([10, 51.2]),
    
    zoom: 5,
  }),
});

//var voronoi = new Voronoi();

var voronoiLayer;

$('#button4').click(function createVoronoi(){
	var coord = [];
	var olPolygonArray = [[[]]];
	var voronoi = new Voronoi();
	//var bbox = {xl: 0, xr: 800000000, yt: 0, yb: 600000000000}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
	var diagram;
	
    var features = vectorSource.getFeatures();
    var extent = features[0].getGeometry().getExtent().slice(0);
    features.forEach(function(feature){ extend(extent,feature.getGeometry().getExtent())});
    
    var bbox = {xl: extent[0], xr: extent[2], yt: extent[1], yb: extent[3]};
    //console.log(bbox);
    features.forEach((feature) => {
        var temp = feature.getGeometry().getCoordinates();
        coord.push({x: Math.trunc(temp[0]), y: Math.trunc(temp[1])});
    });
    
    diagram = voronoi.compute(coord, bbox);
	console.log(diagram);
	
	var edges = diagram.edges,
    iEdge = edges.length,
    edge, v;
    
    var temp = [[]];

	for(var i = 0; i < iEdge; i++)
	{
		edge = edges[i];
		v = edge.va;
		temp.push([v.x, v.y]);
		
		v = edge.vb;
		temp.push([v.x, v.y]);
		temp.shift();
		olPolygonArray.push(temp);
		temp = [[]];
		
	}
	olPolygonArray.shift();

	var polyFeature = new Feature({
    geometry: new Polygon(
        
            olPolygonArray
        
    	)
	});
	//polyFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
	voronoiLayer = new VectorLayer({
    	source: new VectorSource({
        	features: [
        	polyFeature]
    	}),
    	style: polyStyle
	});
	//console.log(vectorLayer);
	
	map.addLayer(voronoiLayer);
			
});




$('#button9').click(function clearPolygons(){
	 map.removeLayer(voronoiLayer)
	 map.removeLayer(vector)
	// voronoiLayer.getSource().clear();
	 vectorSource.clear();
	 vectorSource = new VectorSource({
  		format: new GeoJSON(),
  		url: function (extent) {
    		return (
      		'http://localhost:8082/geoserver/GeoPerformance/wfs?service=WFS&' +
      		'version=2.0.0&request=GetFeature&typename=GeoPerformance:random2000_xy&' +
      		'outputFormat=application/json&srsname=EPSG:3857&' +
      		'bbox=' +
      		extent.join(',') +
      		',EPSG:3857'
    		);
  		},
  		strategy: bboxStrategy,
	});
	
	vector = new VectorLayer({
  		source: vectorSource,
  		style: myStyle,
	});
	map.addLayer(vector)
});

$('#button2').click(function filter1000(){
	 map.removeLayer(voronoiLayer);
	 map.removeLayer(vector);
	 //voronoiLayer.getSource().clear();
	 vectorSource.clear();
	 vectorSource = new VectorSource({
  		format: new GeoJSON(),
  		url: function (extent) {
    		return (
      		'http://localhost:8082/geoserver/GeoPerformance/wfs?service=WFS&' +
      		'version=2.0.0&request=GetFeature&typename=GeoPerformance:random2000_xy&' +
      		'outputFormat=application/json&srsname=EPSG:3857&' +
      		'bbox=' +
      		extent.join(',') +
      		',EPSG:3857&'+
      		'startIndex=0&count=1000'
    		);
  		},
  		strategy: bboxStrategy,
	});
	
	vector = new VectorLayer({
  		source: vectorSource,
  		style: myStyle,
	});
	map.addLayer(vector)
});

$('#button3').click(function filter1000(){
	 map.removeLayer(voronoiLayer);
	 map.removeLayer(vector);
	 //voronoiLayer.getSource().clear();
	 vectorSource.clear();
	 vectorSource = new VectorSource({
  		format: new GeoJSON(),
  		url: function (extent) {
    		return (
      		'http://localhost:8082/geoserver/GeoPerformance/wfs?service=WFS&' +
      		'version=2.0.0&request=GetFeature&typename=GeoPerformance:random2000_xy&' +
      		'outputFormat=application/json&srsname=EPSG:3857&' +
      		'bbox=' +
      		extent.join(',') +
      		',EPSG:3857&'+
      		'startIndex=0&count=100'
    		);
  		},
  		strategy: bboxStrategy,
	});
	
	vector = new VectorLayer({
  		source: vectorSource,
  		style: myStyle,
	});
	map.addLayer(vector)
});

