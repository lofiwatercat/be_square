import * as THREE from 'three';
import { Box3 } from 'three';

const geometry = new THREE.BoxBufferGeometry(1, 1, 1); 
const material = new THREE.MeshNormalMaterial( {color: 0x5d7499} )
const cube = new THREE.Mesh(geometry, material);

const keys = [];

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
})

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
})

// Cube movement
let xDiff = 0.25;
let velX = 0;
let yDiff = 0.25;
let velY = 0;
let friction = 0.93;

function moveCube(arr) {
  if (keys['d']) {
    // cube.position.x += xDiff;
    if (velX < xDiff) {
      velX += 0.03;
    }
  }
  if (keys['a']) {
    // cube.position.x -= xDiff;
    if (velX > -xDiff) {
      velX -= 0.03;
    }
  }
  if (keys['w']) {
    // cube.position.y += yDiff;
    if (velY < yDiff) {
      velY += 0.03;
    }
  }
  if (keys['s']) {
    // cube.position.y -= yDiff;
    if (velY > -yDiff) {
      velY -= 0.03;
    }
  }
  if (keys[' ']) {
    cube.position.set(0, 0, 0);
    velX = 0;
    velY = 0;
  }

  // Collision detection
  const cubeWidth = cube.geometry.parameters['width'];
  const cubeHeight = cube.geometry.parameters['height'];
  const dispMulti = 0.23;
  arr.forEach(el => {
    // Collision on x axis
    let cubeCenter = new THREE.Vector3();
    cubeBBox.getCenter(cubeCenter);
    let elCenter = new THREE.Vector3();
    el.getCenter(elCenter);
    
    if (cubeBBox.intersectsBox(el)) {
      if (cubeCenter.y < el.max.y && cubeCenter.y > el.min.y) {
        if (cubeCenter.x < elCenter.x) {
          // cube.position.x = el.min.x - cubeWidth / 2;
          if (velX > 0) {
            velX = 0;
          }      
        } else if (cubeCenter.x > elCenter.x) {
          // cube.position.x = el.max.x + cubeWidth / 2;
          if (velX < 0) {
            velX = 0;
          }
        }
      }
    }
    // Collision on y axis
    if (cubeBBox.intersectsBox(el)) {
      if (cubeCenter.x < el.max.x && cubeCenter.x > el.min.x) { 
        if (cubeCenter.y < elCenter.y) {
          // cube.position.y = el.min.y - cubeHeight / 2;
          if (velY > 0) {
            velY = 0;
          } 
        } else if (cubeCenter.y > elCenter.y) {
          // cube.position.y = el.max.y + cubeWidth / 2;
          if (velY < 0) {
            velY = 0;
          }
        }
      }
    }

  })

  velX *= friction;
  if (Math.abs(velY) < 0.03) {
    velY = 0;
  }
  velY *= friction;
  
  cube.position.x += velX;
  cube.position.y += velY;
}

// Bounding box stuff
cube.geometry.computeBoundingBox();
const cubeBBox = new Box3();
// cubeBBox.setFromObject(cube);
function updateCubeBBox() {
  cubeBBox.copy( cube.geometry.boundingBox ).applyMatrix4( cube.matrixWorld );
}

export { cube, keys, moveCube, cubeBBox, updateCubeBBox };
