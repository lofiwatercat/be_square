import * as THREE from 'three';
import { Box3 } from 'three';

const geometry = new THREE.BoxBufferGeometry( 0.1, 10, 3);
const material = new THREE.MeshBasicMaterial( {color: 0x151821})

const wallRight = new THREE.Mesh(geometry, material);
wallRight.position.set(12.5, 0, 0);

wallRight.geometry.computeBoundingBox();
const wallRBBox = new Box3();

function updateWallRBBox() {
  // wallRBBox.copy( wallRight.geometry.boundingBox ).applyMatrix4( wallRight.matrixWorld );
  wallRBBox.setFromObject(wallRight);
}

updateWallRBBox();

export { wallRight, wallRBBox, updateWallRBBox };
