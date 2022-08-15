import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { cube, moveCube, cubeBBox, updateCubeBBox } from './cube';
import { wallRight, wallRBBox, updateWallRBBox } from './wallRight';
import { wallLeft, wallLBBox, updateWallLBBox } from './wallLeft';
import { floor, floorBBox, updateFloorBBox } from './floor'
import { ceiling, ceilingBBox, updateCeilingBBox } from './ceiling';

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  // camera.position.set(0, 0, 100);
  // camera.lookAt(0, 0, 0);
  camera.position.z = 25;
  
  // Resizes the game display whenever the size of the window changes
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })

  // Objects
  scene.add(cube);
  scene.add(wallRight);
  scene.add(wallLeft);
  scene.add(floor);
  scene.add(ceiling);
  
  // Helpers;
  const gridHelper = new THREE.GridHelper( 200, 50);
  scene.add(gridHelper);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  const lightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(pointLight);
  scene.add(lightHelper);

  // Bounding boxes;
  const cubeBBoxHelper = new THREE.Box3Helper( cubeBBox, 0xffff00);
  scene.add(cubeBBoxHelper);

  const floorBBoxHelper = new THREE.Box3Helper( floorBBox, 0xff000 );
  scene.add(floorBBoxHelper);

  const ceilingBBoxHelper = new THREE.Box3Helper( ceilingBBox, 0xfff00 );
  scene.add(ceilingBBoxHelper);

  const wallRBBoxHelper = new THREE.Box3Helper( wallRBBox, 0xff0000);
  scene.add(wallRBBoxHelper);

  const wallLBBoxHelper = new THREE.Box3Helper( wallLBBox, 0xff0000);
  scene.add(wallLBBoxHelper);

  // Testing
  window.cube = cube;
  window.wallRight = wallRight;
  window.a = new THREE.Vector3();
  
  window.cubeBBox = cubeBBox;
  window.wallRBBox = wallRBBox;


  let nonPlayer = [wallLBBox, wallRBBox, floorBBox, ceilingBBox];
  
  function animate() {
		requestAnimationFrame( animate );
    updateWallRBBox();
    updateWallLBBox();
    updateFloorBBox();
    updateCeilingBBox();



    moveCube(nonPlayer);
		renderer.render( scene, camera );
			};

	animate();
	
  renderer.render(scene, camera);
})
