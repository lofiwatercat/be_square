import * as THREE from 'three';
import { Box3 } from 'three';

// Create the ceiling 
const geometry = new THREE.BoxBufferGeometry(10, 0.1, 10);
const material = new THREE.MeshBasicMaterial();

const ceiling = new THREE.Mesh( geometry, material );
ceiling.position.set(0, 5, 0);

// Create the floor's bounding box
ceiling.geometry.computeBoundingBox();
const ceilingBBox = new Box3();

// Update position of the bounding box to the floor's position
function updateCeilingBBox() {
  ceilingBBox.copy( ceiling.geometry.boundingBox ).applyMatrix4( ceiling.matrixWorld );
}

export { ceiling, ceilingBBox, updateCeilingBBox };
