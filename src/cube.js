import * as THREE from 'three';

const geometry = new THREE.BoxBufferGeometry(1, 1, 1); 
const material = new THREE.MeshBasicMaterial( {color: 0x5d7499} )
export const cube = new THREE.Mesh(geometry, material);
