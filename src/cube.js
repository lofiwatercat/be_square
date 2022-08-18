import * as THREE from 'three';
import { Box3 } from 'three';

const geometry = new THREE.BoxBufferGeometry(1, 1, 1); 
const material = new THREE.MeshStandardMaterial( {color: 0xffffff} )
const cube = new THREE.Mesh(geometry, material);

const edges = new THREE.EdgesGeometry( geometry );
const lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
const line = new THREE.LineSegments( edges, lineMaterial );


const keys = [];

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
})

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
})

let finished = false;

// Cube movement
let xDiff = 0.13;
let velX = 0;
let yDiff = 0.13;
let velY = 0;
let grav = -0.03;
let rClock = 0;
let rCounterClock = 0;
let friction = 0.9;
let reverse = false;

function stop() {
  velX = 0;
  velY = 0;
  velZ = 0;
}

function moveCube(arr) {
  
}
// Bounding box stuff
cube.geometry.computeBoundingBox();
const cubeBBox = new Box3();
// cubeBBox.setFromObject(cube);
function updateCubeBBox() {
  cubeBBox.setFromObject(cube);
}


export { cube, line, keys, moveCube, cubeBBox, updateCubeBBox, finished, stop };
