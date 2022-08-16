import * as THREE from 'three';
import { Box3 } from 'three';

// Create the ceiling 
const geometry = new THREE.BoxBufferGeometry(25, 0.1, 3);
const material = new THREE.MeshStandardMaterial( {color: 0x000000} );

const ceiling = new THREE.Mesh( geometry, material );
ceiling.position.set(0, 5, 0);

// Create the floor's bounding box
ceiling.geometry.computeBoundingBox();
const ceilingBBox = new Box3();

function updateCeilingBBox() {
  ceilingBBox.setFromObject(ceiling);
}

updateCeilingBBox();

export { ceiling, ceilingBBox, updateCeilingBBox };
