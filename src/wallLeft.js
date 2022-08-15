import * as THREE from 'three';
import { Box3 } from 'three';

const geometry = new THREE.BoxBufferGeometry( 0.1, 10, 10);
const material = new THREE.MeshBasicMaterial( {color: 0xe6923e})

const wallLeft = new THREE.Mesh(geometry, material);
wallLeft.position.set(-5, 0, 0);

wallLeft.geometry.computeBoundingBox();
const wallLBBox = new Box3();

function updateWallLBBox() {
  // wallLBBox.copy( wallLeft.geometry.boundingBox ).applyMatrix4( wallLeft.matrixWorld );
  wallLBBox.setFromObject(wallLeft);
}

export { wallLeft, wallLBBox, updateWallLBBox };
