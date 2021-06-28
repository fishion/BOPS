import 'ol/ol.css';
import {Map, View} from 'ol';
// Layers are map layers that can contain things
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
// Sources are sources of gfx for display in layers
import OSMSource from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
// Features - A vector object for geographic features with a geometry and other attribute
import Feature from 'ol/Feature';
// method for getting a projection from latlong
import {fromLonLat} from 'ol/proj';
// a geometry point object
import Point from 'ol/geom/Point';
// 
import {Style, Icon} from 'ol/style';

const benchesData = require('../data/benches.json');
const features = benchesData.map(bench => {
  return new Feature({
    geometry: new Point(fromLonLat(bench.latlong))
  })
})

const vecsource = new VectorSource()
vecsource.addFeatures(features);

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSMSource()
    }),
    new VectorLayer({
      source: vecsource,
      style: new Style({
        image: new Icon({
          scale: 0.25,
          src: '../img/map-marker.png'
        })
      }) 
    })
  ],
  view: new View({
    center: fromLonLat([-0.195,50.842487]),
    zoom: 13
  })
});