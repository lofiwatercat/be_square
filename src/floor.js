import * as THREE from 'three';
import { Box3 } from 'three';

// Create the floor
const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial();

const floor = new THREE.Mesh( geometry, material );
floor.position.set(0, -5, 0);

// Create the floor's bounding box
floor.geometry.computeBoundingBox();
const floorBBox = new Box3();

// Update position of the bounding box to the floor's position
function updateFloorBBox() {
  floorBBox.copy( floor.geometry.boundingBox ).applyMatrix4( floor.matrixWorld );
}

export { floor, floorBBox, updateFloorBBox };
