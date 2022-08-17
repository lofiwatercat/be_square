import * as THREE from 'three';
import { Box3 } from 'three';

// Create multiple single multiple geometries
const towerGeo = new THREE.BoxBufferGeometry(3, 4, 3);
const threeX3ThinGeo = new THREE.BoxBufferGeometry(3, 3, 1);
const threeX2ThinGeo = new THREE.BoxBufferGeometry(9, 1, 1);
const twoX3ThinGeo = new THREE.BoxBufferGeometry(3, 1, 2);
const finishGeo = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
const threeX5Geo = new THREE.BoxBufferGeometry(5, 3, 1);
const fourFloorGeo = new THREE.BoxBufferGeometry(4, 1, 2);

// Material for the blocks 
const material = new THREE.MeshStandardMaterial( {color: 0xe3d4c8});
const finishMaterial = new THREE.MeshStandardMaterial( {color: 0x00d5ff})

// The mesh
const finish = new THREE.Mesh(finishGeo, finishMaterial);
const tower = new THREE.Mesh(towerGeo, material);
const threeX3_1 = new THREE.Mesh(threeX3ThinGeo, material);
const threeX2_1 = new THREE.Mesh(threeX2ThinGeo, material);
const twoX3_1 = new THREE.Mesh(twoX3ThinGeo, material);
const threeX5_1 = new THREE.Mesh(threeX5Geo, material);
const blk6 = new THREE.Mesh(fourFloorGeo, material);

finish.geometry.computeBoundingBox();
tower.geometry.computeBoundingBox();
threeX3_1.geometry.computeBoundingBox();
threeX2_1.geometry.computeBoundingBox();
twoX3_1.geometry.computeBoundingBox();
threeX5_1.geometry.computeBoundingBox();
blk6.geometry.computeBoundingBox();

const finishBBox = new Box3();
const towerBBox = new Box3();
const threeX3_1BBox = new Box3();
const threeX2_1BBox = new Box3();
const twoX3_1BBox = new Box3();
const threeX5_1BBox = new Box3();
const blk6BBox = new Box3();

function updateFinishBBox() {
  finishBBox.setFromObject(finish);
}

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

function updateThreeX5_1BBox() {
  threeX5_1BBox.setFromObject(threeX5_1);
}

function updateBlk6BBox() {
  blk6BBox.setFromObject(blk6);
}


updateFinishBBox();
updateTowerBBox();
updateThreeX3_1BBox();
updateThreeX2_1BBox();
updateTwoX3_1BBox();
updateThreeX5_1BBox();
updateBlk6BBox();

export { finish, finishBBox, updateFinishBBox };
export { tower, towerBBox, updateTowerBBox  };
export { threeX3_1, threeX3_1BBox, updateThreeX3_1BBox };
export { threeX2_1, threeX2_1BBox, updateThreeX2_1BBox };
export { twoX3_1, twoX3_1BBox, updateTwoX3_1BBox };
export { threeX5_1, threeX5_1BBox, updateThreeX5_1BBox };
export { blk6, blk6BBox, updateBlk6BBox };
