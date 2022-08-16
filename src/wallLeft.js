import * as THREE from 'three';
import { Box3 } from 'three';

const geometry = new THREE.BoxBufferGeometry( 0.1, 10, 3);
const material = new THREE.MeshStandardMaterial( {color: 0x151821})

const wallLeft = new THREE.Mesh(geometry, material);
wallLeft.position.set(-12.5, 0, 0);

wallLeft.geometry.computeBoundingBox();
const wallLBBox = new Box3();

function updateWallLBBox() {
  wallLBBox.setFromObject(wallLeft);
}

updateWallLBBox();

export { wallLeft, wallLBBox, updateWallLBBox };
