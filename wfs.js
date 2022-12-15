import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import {fromLonLat} from 'ol/proj';
import OSM from 'ol/source/OSM';
import './style.css';
import {Map, View} from 'ol';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import Point from 'ol/geom/Point';



const vectorSource = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost:8082/geoserver/GeoPerformance/wfs?service=WFS&' +
      'version=1.1.0&request=GetFeature&typename=GeoPerformance:random2000_xy&' +
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
        radius: 8,
        fill: new Fill({color: 'red'}),
        stroke: new Stroke({
          color: [255,255,255], width: 2
        })
      })
      
});

const vector = new VectorLayer({
  source: vectorSource,
  style: myStyle,
});



const raster = new TileLayer({
  source: new OSM()
});

const map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    center: fromLonLat([10, 51.2]),
    maxZoom: 19,
    zoom: 7,
  }),
});
