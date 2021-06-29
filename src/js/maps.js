'use strict';

import 'ol/ol.css';
import {Map, View}    from 'ol';
// Layers are map layers that can contain things
import TileLayer      from 'ol/layer/Tile';
import VectorLayer    from 'ol/layer/Vector';
// Sources are sources of gfx for display in layers
import OSMSource      from 'ol/source/OSM';
import VectorSource   from 'ol/source/Vector';
// Features - A vector object for geographic features with a geometry and other attribute
import Feature        from 'ol/Feature';
import {fromLonLat}   from 'ol/proj';
import Point          from 'ol/geom/Point';
import {Style, Icon}  from 'ol/style';

// import popup overlay html functions
import Popup from './lib/html.js';

// Get benches marker data from json
const benchesData = require('../data/benches.json');


// initialise Popup overlay
const popup = new Popup('map')

// initialise map
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
            setPopupContent: () => { popup.setContent(bench) } 
          })
        })
      }),
      style: new Style({
        image: new Icon({
          scale: 0.25,
          src: '../img/gfx/map-marker.png'
        })
      }) 
    })
  ],
  overlays : [popup.overlay],
  view: new View({
    center: fromLonLat(benchesData.view.center),
    zoom: benchesData.view.zoom
  })
});

// add pointer events
map.on(['pointermove', 'singleclick'], function (e) {
  const feature = map.getFeaturesAtPixel(e.pixel)[0];
  document.body.style.cursor = feature ? 'pointer' : '';
  if (e.type == 'pointermove') return;
  if (feature) {
    feature.get('setPopupContent')()
    popup.overlay.setPosition(feature.getGeometry().getCoordinates());
  } else {
    popup.overlay.setPosition(undefined);
  }
});