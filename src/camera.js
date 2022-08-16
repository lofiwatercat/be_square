import * as THREE from 'three';
import { Box3 } from 'three';

// Create multiple single multiple geometries
const towerGeo = new THREE.BoxBufferGeometry(3, 4, 3);

// Material for the blocks 
const material = new THREE.MeshStandardMaterial( {color: 0xe3d4c8});
const tower = new THREE.Mesh(towerGeo, material);

tower.geometry.computeBoundingBox();

const towerBBox = new Box3();

function updateTowerBBox() {
  towerBBox.setFromObject(tower);
}

updateTowerBBox();


export { tower, towerBBox, updateTowerBBox };

