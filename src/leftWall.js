import * as THREE from 'three';
import { Box3 } from 'three';

const geometry = new THREE.BoxBufferGeometry( 0.1, 5, 5);
const material = new THREE.MeshBasicMaterial( {color: 0xe6923e})

const wallRight = new THREE.Mesh(geometry, material);
wallRight.position.set(10, 0, 0);

wallRight.geometry.computeBoundingBox();
const wallRBBox = new Box3();

function updateWallRBBox() {
  wallRBBox.copy( wallRight.geometry.boundingBox ).applyMatrix4( wallRight.matrixWorld );
}

export { wallRight, wallRBBox, updateWallRBBox };
