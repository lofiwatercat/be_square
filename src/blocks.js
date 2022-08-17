import * as THREE from 'three';
import { Box3 } from 'three';

// Create multiple single multiple geometries
const towerGeo = new THREE.BoxBufferGeometry(3, 4, 3);
const threeX3ThinGeo = new THREE.BoxBufferGeometry(3, 3, 1);
const threeX2ThinGeo = new THREE.BoxBufferGeometry(3, 2, 1);
const twoX3ThinGeo = new THREE.BoxBufferGeometry(2, 3, 1);

// Material for the blocks 
const material = new THREE.MeshStandardMaterial( {color: 0xe3d4c8});

// The mesh
const tower = new THREE.Mesh(towerGeo, material);
const threeX3_1 = new THREE.Mesh(threeX3ThinGeo, material);
const threeX2_1 = new THREE.Mesh(threeX2ThinGeo, material);
const twoX3_1 = new THREE.Mesh(threeX2ThinGeo, material);

tower.geometry.computeBoundingBox();
threeX3_1.geometry.computeBoundingBox();
threeX2_1.geometry.computeBoundingBox();
twoX3_1.geometry.computeBoundingBox();

const towerBBox = new Box3();
const threeX3_1BBox = new Box3();
const threeX2_1BBox = new Box3();
const twoX3_1BBox = new Box3();

function updateTowerBBox() {
  towerBBox.setFromObject(tower);
}

function updateThreeX3_1BBox() {
  threeX3_1BBox.setFromObject(threeX3_1);
}

function updateThreeX2_1BBox() {
  threeX2_1BBox.setFromObject(threeX2_1);
}

function updateTwoX3_1BBox() {
  twoX3_1BBox.setFromObject(twoX3_1);
}

updateTowerBBox();
updateThreeX3_1BBox();
updateThreeX2_1BBox();
updateTwoX3_1BBox();

export { tower, towerBBox, updateTowerBBox  };
export { threeX3_1, threeX3_1BBox, updateThreeX3_1BBox };
export { threeX2_1, threeX2_1BBox, updateThreeX2_1BBox };
export { twoX3_1, twoX3_1BBox, updateTwoX3_1BBox };
