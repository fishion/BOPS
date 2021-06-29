'use strict';

import {Overlay} from 'ol';

export default function(elID) {
  // initialise container
  document.getElementById(elID)
    .insertAdjacentHTML('afterend','<div class="popup-container" id="popup-container"></div>');
  this.container = document.getElementById('popup-container');

  // initialise overlay
  this.overlay = new Overlay({
    element: this.container,
    autoPan: true,
    autoPanAnimation: { duration: 250 },
    positioning: 'bottom-center',
    offset: [0, -20]
  });

  // methods
  
  this.setContent = function(bench) {
    let html = ""
    html += `<h2>${bench.name}</h2>`;
    html += `<img src="../img/benches/${bench.img}">`
    this.container.innerHTML = html;
  }

  return this;
}
