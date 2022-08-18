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
import { cube, line, moveCube, cubeBBox, updateCubeBBox, moveCubeAlt, finished, stop } from './cube';
import { wallRight, wallRBBox } from './wallRight';
import { wallLeft, wallLBBox } from './wallLeft';
import { floor, floorBBox } from './floor'
import { ceiling, ceilingBBox} from './ceiling';
import { finish, finishBBox, updateFinishBBox } from './blocks';
import { tower, towerBBox, updateTowerBBox } from './blocks';
import { threeX3_1, threeX3_1BBox, updateThreeX3_1BBox } from './blocks';
import { threeX2_1, threeX2_1BBox, updateThreeX2_1BBox } from './blocks';
import { twoX3_1, twoX3_1BBox, updateTwoX3_1BBox } from './blocks';
import { threeX5_1, threeX5_1BBox, updateThreeX5_1BBox } from './blocks';
import { blk6, blk6BBox, updateBlk6BBox } from './blocks';
import * as LEVELS from './levels';

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7c8291);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
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
  
  
  // Helpers;
  // const gridHelper = new THREE.GridHelper( 200, 50);
  // scene.add(gridHelper);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.target = cube;
  spotLight.position.set( 5, -3, -5) ;
  spotLight.angle = 0.15;
  const spotLight2 = new THREE.SpotLight( 0x94e4ff )
  spotLight2.target = finish;
  spotLight2.position.set( 0, 10, 0);
  spotLight2.angle = 0.03;
  // spotLight2.castShadow = true;
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(5, 3, 5);
  const lightHelper = new THREE.PointLightHelper(pointLight);
  // scene.add(ambientLight);
  const spotLight2Helper = new THREE.SpotLightHelper(spotLight2)
  scene.add(pointLight, lightHelper);
  // scene.add(spotLight2);
  // spotLight2Helper.update();
  // scene.add(spotLight2Helper);
  // scene.add(spotLight);
  

  // Postprocessing
  let resolution = {
    x: window.innerWidth,
    y: window.innerHeight
  };


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
  



  // Wireframe for cube
  scene.add( line );
  

  // Testing
  window.cube = cube;
  window.line = line;
  window.finishBBox = finishBBox;
  window.camera = camera;
  // window.wallRight = wallRight;
  // window.a = new THREE.Vector3();
  // window.cubeBBoxHelper = cubeBBoxHelper;
  // 
  window.cubeBBox = cubeBBox;
  // window.wallRBBox = wallRBBox;
  
  // tower.position.set(0, -1, 0);
  // updateTowerBBox();

  let nonPlayer = [wallLBBox, wallRBBox, floorBBox, ceilingBBox, 
    towerBBox, threeX3_1BBox, threeX2_1BBox, twoX3_1BBox, finishBBox,
    threeX5_1BBox, blk6BBox];
  let moveMode = true;

  const white = new THREE.Color(0xffffff);
  const black = new THREE.Color(0x000000);

  document.addEventListener('keydown', (event) => {
    if (event.key === 't') {
      moveMode = !moveMode;
      stop();
    }
    swapColors();
  });

  function swapColors() {
    if (moveMode) {
      cube.material.color = white;
      line.material.color = black;
    } else {
      cube.material.color = black;
      line.material.color = white;
    }
  }
  
  const levels = [
    LEVELS.level1,
    LEVELS.level2,
    LEVELS.level3,
  ]


  let i = 0;
  levels[i](scene);
  // Testing
  // levels[1](scene);
  // levels[2](scene);

  
  function animate() {
		requestAnimationFrame( animate );

		if (cube.position.z < 0 && camera.position.z < 0) {
		  scene.add(spotLight);
		} else {
		  scene.remove(spotLight);
		}

		if (finished === true) {
		  if (i + 1 < levels.length) {
		    i++;
		  }
		  levels[i](scene);
		  moveMode = true;
		  swapColors();
		}
		
    if (moveMode) {
      moveCube(nonPlayer);
    } else {
      moveCubeAlt(nonPlayer);
    }

    finish.rotation.x += 0.03;
    finish.rotation.y += 0.03;
    finish.rotation.z += 0.03;
    updateFinishBBox();

		// renderer.render( scene, camera );
		composer.render();
	};

	animate();
	
  renderer.render(scene, camera);
})
