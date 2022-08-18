import * as THREE from 'three';
import { Box3 } from 'three';

// Create the floor
const geometry = new THREE.BoxBufferGeometry(40.1, 0.1, 3);
const material = new THREE.MeshStandardMaterial( {color: 0x4c5563});

const floor = new THREE.Mesh( geometry, material );
floor.position.set(0, -10, 0);

// Create the floor's bounding box
floor.geometry.computeBoundingBox();
const floorBBox = new Box3();

// Update position of the bounding box to the floor's position
function updateFloorBBox() {
  floorBBox.setFromObject(floor);
}

updateFloorBBox();

export { floor, floorBBox, updateFloorBBox };
