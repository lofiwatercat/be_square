import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
// import { FilmPass} from 'three/examples/jsm/postprocessing/FilmPass';
// import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
// import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { cube, line, moveCube, cubeBBox, updateCubeBBox, moveCubeAlt } from './cube';
import { wallRight, wallRBBox } from './wallRight';
import { wallLeft, wallLBBox } from './wallLeft';
import { floor, floorBBox } from './floor'
import { ceiling, ceilingBBox} from './ceiling';
import { tower, towerBBox, updateTowerBBox } from './blocks';
import { threeX3_1, threeX3_1BBox, updateThreeX3_1BBox } from './blocks';

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7c8291);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.z = 30;
  
  // Resizes the game display whenever the size of the window changes
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })

  // Objects
  tower.position.set(0, -5, 0);
  threeX3_1.position.set(4, -3.5, -1);

  scene.add(cube);
  scene.add(wallRight);
  scene.add(wallLeft);
  scene.add(floor);
  scene.add(ceiling);
  
  scene.add(tower);
  scene.add(threeX3_1);
  
  // Helpers;
  // const gridHelper = new THREE.GridHelper( 200, 50);
  // scene.add(gridHelper);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(5, 3, 5);
  const lightHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(ambientLight);
  scene.add(pointLight, lightHelper);

  // Postprocessing
  let resolution = {
    x: window.innerWidth,
    y: window.innerHeight
  };

  const black = new THREE.Color( 0x000000 );

  window.resolution = resolution
  const composer = new EffectComposer( renderer );
  const renderPass = new RenderPass( scene, camera );
  // const taaPass = new TAARenderPass( scene, camera, black, 1)
  // taaPass.sampleLevel = 1;
  const pixelatedPass =  new RenderPixelatedPass(
    resolution, 1, scene, camera
  );
  composer.addPass( renderPass );
  // composer.addPass( taaPass );
  composer.addPass( pixelatedPass );

  // Bounding boxes;
  const cubeBBoxHelper = new THREE.Box3Helper( cubeBBox, 0x000000);
  // scene.add(cubeBBoxHelper);
  
  const floorBBoxHelper = new THREE.Box3Helper( floorBBox, 0xffffff );
  scene.add(floorBBoxHelper);

  const ceilingBBoxHelper = new THREE.Box3Helper( ceilingBBox, 0xffffff );
  scene.add(ceilingBBoxHelper);

  const wallRBBoxHelper = new THREE.Box3Helper( wallRBBox, 0xffffff );
  scene.add(wallRBBoxHelper);

  const wallLBBoxHelper = new THREE.Box3Helper( wallLBBox, 0xffffff);
  scene.add(wallLBBoxHelper);

  // Have to call update{Block} because we set the position in the index file
  const towerBBoxHelper = new THREE.Box3Helper( towerBBox, 0x000000 )
  updateTowerBBox();
  scene.add(towerBBoxHelper);

  const threeX3_1BBoxHelper = new THREE.Box3Helper( threeX3_1BBox, 0x000000 );
  updateThreeX3_1BBox();
  scene.add(threeX3_1BBoxHelper);

  // Wireframe for cube
  scene.add( line );
  

  // Testing
  window.cube = cube;
  window.line = line;
  // window.wallRight = wallRight;
  // window.a = new THREE.Vector3();
  // window.cubeBBoxHelper = cubeBBoxHelper;
  // 
  window.cubeBBox = cubeBBox;
  // window.wallRBBox = wallRBBox;
  
  // tower.position.set(0, -1, 0);
  // updateTowerBBox();

  let nonPlayer = [wallLBBox, wallRBBox, floorBBox, ceilingBBox, towerBBox, threeX3_1BBox];
  let moveMode = true;

  document.addEventListener('keydown', (event) => {
    if (event.key === 't') {
      moveMode = !moveMode;
      console.log(moveMode);
    }
  });
  
  function animate() {
		requestAnimationFrame( animate );
		
    if (moveMode) {
      moveCube(nonPlayer);
    } else {
      moveCubeAlt(nonPlayer);
    }
		// renderer.render( scene, camera );
		composer.render();
	};

	animate();
	
  renderer.render(scene, camera);
})
