import * as THREE from 'three';
import { cube, line } from './cube';
import { finish, finishBBox, updateFinishBBox } from './blocks';
import { tower, towerBBox, updateTowerBBox } from './blocks';
import { threeX3_1, threeX3_1BBox, updateThreeX3_1BBox } from './blocks';
import { threeX2_1, threeX2_1BBox, updateThreeX2_1BBox } from './blocks';
import { twoX3_1, twoX3_1BBox, updateTwoX3_1BBox } from './blocks';
import { threeX5_1, threeX5_1BBox, updateThreeX5_1BBox } from './blocks';
import { blk6, blk6BBox, updateBlk6BBox } from './blocks';
// Each level is an object with each key being the name of the block, and the
// value being an array of its position

// Tower, threeX3, threeX2, twoX3

let div = document.createElement("div");
div.setAttribute('id', 'dialogue');
let startPos = [-15, -3, 0];

function level0(scene) {
  div.innerText = "Use a, d and space to move and jump"
  cube.position.set(...startPos);
  line.position.set(...startPos);
  
  
  twoX3_1.position.set(-3, -9.5, 0.5);
  const twoX3_1BBoxHelper = new THREE.Box3Helper( twoX3_1BBox, 0x000000 );
  updateTwoX3_1BBox();
  scene.add(twoX3_1);
  scene.add(twoX3_1BBoxHelper);

  finish.position.set(-3, -8.5, 0);
  updateFinishBBox();
  scene.add(finish);

}

function level1(scene) {
  div.innerText = "Use 'q' or 't' to change dimensions, w and s to move through it. 'r' to find your way back";
  cube.position.set(...startPos);
  line.position.set(...startPos);

  tower.position.set(5, -8, 0);
  const towerBBoxHelper = new THREE.Box3Helper( towerBBox, 0x000000 )
  updateTowerBBox();
  scene.add(tower);
  scene.add(towerBBoxHelper);

  threeX3_1.position.set(1, -8.5, 1);
  const threeX3_1BBoxHelper = new THREE.Box3Helper( threeX3_1BBox, 0x000000 );
  updateThreeX3_1BBox();
  scene.add(threeX3_1);
  scene.add(threeX3_1BBoxHelper);

  finish.position.set (5, -5, 0);
  updateFinishBBox();
  scene.add(finish);

}

function level2(scene) {
  div.innerText = "Drag the mouse to move the camera"
  let startPos = [-15, -3, 0];
  cube.position.set(...startPos);
  line.position.set(...startPos);


  threeX2_1.position.set(-2, -4.5, -1);
  const threeX2_1BBoxHelper = new THREE.Box3Helper( threeX2_1BBox, 0x000000 );
  updateThreeX2_1BBox();
  scene.add(threeX2_1);
  scene.add(threeX2_1BBoxHelper);

  finish.position.set (0, -3, -1);
  updateFinishBBox();
  scene.add(finish);
}

function level3(scene) {
  div.innerText = "Build up on previous knowledge";
  cube.position.set(...startPos);
  line.position.set(...startPos);

  threeX5_1.position.set(-1, -2.5, 0);
  const threeX5_1BBoxHelper = new THREE.Box3Helper( threeX5_1BBox, 0x000000 );
  updateThreeX5_1BBox();
  scene.add(threeX5_1);
  scene.add(threeX5_1BBoxHelper);

  blk6.position.set(-3, -4.5, 0.5);
  const blk6BBoxHelper = new THREE.Box3Helper( blk6BBox, 0x000000);
  updateBlk6BBox();
  scene.add(blk6);
  scene.add(blk6BBoxHelper);


  finish.position.set (-2, -3, 1);
  updateFinishBBox();
  scene.add(finish);
}

function level4(scene) {
  div.innerText = "But don't let it blind you";
  cube.position.set(...startPos);
  line.position.set(...startPos);

  finish.position.set(1, -9, -1);
  updateFinishBBox();
  scene.add(finish);
}

function level5(scene) {
  div.innerText = "But don't let it blind you";
  cube.position.set(...startPos);
  line.position.set(...startPos);


}

document.addEventListener("DOMContentLoaded", () => {
  let body = document.querySelector("body");
  body.appendChild(div);
})

export { level0, level1, level2, level3, level4, level5 };
