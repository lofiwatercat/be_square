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
let xDiff = 0.15;
let velX = 0;
let yDiff = 0.15;
let velY = 0;
let grav = -0.03;
let friction = 0.93;

function moveCube(arr) {
  velY += grav;
  
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
  if (keys['r']) {
    cube.position.set(0, 0, 0);
    velX = 0;
    velY = 0;
  }

  // Collision detection
  // const cubeWidth = cube.geometry.parameters['width'];
  // const cubeHeight = cube.geometry.parameters['height'];
  // const dispMulti = 0.23;
  arr.forEach(el => {
    // Collision on x axis
    let cubeCenter = new THREE.Vector3();
    cubeBBox.getCenter(cubeCenter);
    let elCenter = new THREE.Vector3();
    el.getCenter(elCenter);
    
    // Still problem where half of the box can clip through edges, and
    // tunneling can also occur
    if (cubeBBox.intersectsBox(el)) {
      let interPoint1 = cubeCenter.clone();
      let interPoint2 = cubeCenter.clone();
      let interPoint3 = cubeCenter.clone();
      let interPoint4 = cubeCenter.clone();
      interPoint1.y = cubeBBox.max.y;
      interPoint2.y = cubeBBox.min.y;
      interPoint3.y = cubeBBox.min.y;
      interPoint3.y = cubeBBox.max.y;
      if (cubeCenter.y > elCenter.y) {
        interPoint2.y = el.max.y;
        interPoint3.y = el.max.y;
      } else {
        interPoint1.y = el.min.y;
        interPoint4.y = el.min.y;
      }

      if (cubeCenter.x > elCenter.x) {
        interPoint1.x = el.min.x;
        interPoint2.x = el.min.x;
      } else {
        interPoint3.x = el.max.x;
        interPoint4.x = el.max.x;
      }
      if (cubeCenter.x < elCenter.x ) {
        if (velX > 0
        && !(el.containsPoint(interPoint1) || el.containsPoint(interPoint2))) {
          velX = 0;
        }      
      } else if (cubeCenter.x > elCenter.x
      && !(el.containsPoint(interPoint3) || el.containsPoint(interPoint4))) {
        if (velX < 0) {
          velX = 0;
        }
      }
      if (cubeCenter.y > elCenter.y
      && !(el.containsPoint(interPoint1) || el.containsPoint(interPoint4))) {
        if (velY < 0) {
          velY = 0;
        } 
      } else if (cubeCenter.y < elCenter.y
      && !(el.containsPoint(interPoint2) || el.containsPoint(interPoint3))) {
        if (velY > 0) {
          velY = 0;
        }
      }
      // Jump if we are touching the ground
      if (keys[' '] && (el.containsPoint(interPoint2) || el.containsPoint(interPoint3))) {
        velY = 0.7;
      }
    }

  })

  if (Math.abs(velY) < 0.03) {
    velY = 0;
  }
  if (Math.abs(velX) < 0.03) {
    velX = 0;
  }
  velX *= friction;
  velY *= friction;
  
  cube.position.x += velX;
  cube.position.y += velY;
  updateCubeBBox();
}

// Bounding box stuff
cube.geometry.computeBoundingBox();
const cubeBBox = new Box3();
// cubeBBox.setFromObject(cube);
function updateCubeBBox() {
  cubeBBox.setFromObject(cube);
}

export { cube, keys, moveCube, cubeBBox, updateCubeBBox };
