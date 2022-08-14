import * as THREE from 'three';
import { Box3 } from 'three';

const geometry = new THREE.BoxBufferGeometry(1, 1, 1); 
const material = new THREE.MeshBasicMaterial( {color: 0x5d7499} )
const cube = new THREE.Mesh(geometry, material);

const keys = [];

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
})

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
})

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

  const cubeWidth = cube.geometry.parameters['width'];
  arr.forEach(el => {
    if (cubeBBox.intersectsBox(el)) {
      if (velX > 0) {
        cube.position.x -= 0.2 * cubeWidth;
      } else if (velX < 0) {
        cube.position.x -=2 * velX;
      }
      velX = 0;
    }
  })

  velX *= friction;
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
