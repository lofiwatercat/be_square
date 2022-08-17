import * as THREE from 'three';
import { cube } from './cube';
import { finish, finishBBox, updateFinishBBox } from './blocks';
import { tower, towerBBox, updateTowerBBox } from './blocks';
import { threeX3_1, threeX3_1BBox, updateThreeX3_1BBox } from './blocks';
import { threeX2_1, threeX2_1BBox, updateThreeX2_1BBox } from './blocks';
import { twoX3_1, twoX3_1BBox, updateTwoX3_1BBox } from './blocks';
// Each level is an object with each key being the name of the block, and the
// value being an array of its position

// Tower, threeX3, threeX2, twoX3

function level1(scene) {
  cube.position.set(-15, -3, 0);

  tower.position.set(5, -8, 0);
  const towerBBoxHelper = new THREE.Box3Helper( towerBBox, 0x000000 )
  updateTowerBBox();
  scene.add(tower);
  scene.add(towerBBoxHelper);

  threeX3_1.position.set(1, -9, -1);
  const threeX3_1BBoxHelper = new THREE.Box3Helper( threeX3_1BBox, 0x000000 );
  updateThreeX3_1BBox();
  scene.add(threeX3_1);
  scene.add(threeX3_1BBoxHelper);

  twoX3_1.position.set(-3, -9, 0);
  const twoX3_1BBoxHelper = new THREE.Box3Helper( twoX3_1BBox, 0x000000 );
  updateTwoX3_1BBox();
  scene.add(twoX3_1);
  scene.add(twoX3_1BBoxHelper);
}

function level2(scene) {
  cube.position.set(-15, -3, 0);

  tower.position.set(5, -8, 0);
  const towerBBoxHelper = new THREE.Box3Helper( towerBBox, 0x000000 )
  updateTowerBBox();
  scene.add(tower);
  scene.add(towerBBoxHelper);

  threeX3_1.position.set(1, -9, -1);
  const threeX3_1BBoxHelper = new THREE.Box3Helper( threeX3_1BBox, 0x000000 );
  updateThreeX3_1BBox();
  scene.add(threeX3_1);
  scene.add(threeX3_1BBoxHelper);

  twoX3_1.position.set(-3, -9, -1);
  const twoX3_1BBoxHelper = new THREE.Box3Helper( twoX3_1BBox, 0x000000 );
  updateTwoX3_1BBox();
  scene.add(twoX3_1);
  scene.add(twoX3_1BBoxHelper);

  threeX2_1.position.set(1, -5, 1);
  const threeX2_1BBoxHelper = new THREE.Box3Helper( threeX2_1BBox, 0x000000 );
  updateThreeX2_1BBox();
  scene.add(threeX2_1);
  scene.add(threeX2_1BBoxHelper);

  finish.position.set (0, -3, 1);
  const finishBBoxHelper = new THREE.Box3Helper( finishBBox, 0x000000 );
  updateFinishBBox();
  scene.add(finish);
  scene.add(finishBBoxHelper);
}

export { level1, level2 };
