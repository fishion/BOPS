import 'ol/ol.css';
import {Map, View, Overlay} from 'ol';
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
// pull benches marker data from json
const benchesData = require('../data/benches.json');

// add popupcontainer element to source
document.getElementById('map').insertAdjacentHTML('afterend','<div class="popup-container" id="popup-container"></div>');

const popupContainer = document.getElementById('popup-container')
const popupOverlay = new Overlay({
  element: popupContainer,
  autoPan: true,
  autoPanAnimation: { duration: 250 },
  positioning: 'bottom-center',
  offset: [0, -20]
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSMSource()
    }),
    new VectorLayer({
      source: new VectorSource({
        features: benchesData.benches.map(bench => {
          return new Feature({
            geometry: new Point(fromLonLat(bench.latlong)),
            setPopupContent: () => {
              popupContainer.innerHTML = bench.name;
            } 
          })
        })
      }),
      style: new Style({
        image: new Icon({
          scale: 0.25,
          src: '../img/map-marker.png'
        })
      }) 
    })
  ],
  overlays : [popupOverlay],
  view: new View({
    center: fromLonLat(benchesData.view.center),
    zoom: benchesData.view.zoom
  })
});

map.on(['pointermove', 'singleclick'], function (e) {
  const feature = map.getFeaturesAtPixel(e.pixel)[0];
  document.body.style.cursor = feature ? 'pointer' : '';
  if (e.type == 'pointermove') return;
  if (feature) {
    feature.get('setPopupContent')()
    popupOverlay.setPosition(feature.getGeometry().getCoordinates());
  } else {
    popupOverlay.setPosition(undefined);
  }
});