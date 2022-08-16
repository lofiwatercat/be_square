import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
// import { FilmPass} from 'three/examples/jsm/postprocessing/FilmPass';
// import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
// import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { cube, line, moveCube, cubeBBox, updateCubeBBox, moveCubeAlt } from './cube';
import { wallRight, wallRBBox } from './wallRight';
import { wallLeft, wallLBBox } from './wallLeft';
import { floor, floorBBox } from './floor'
import { ceiling, ceilingBBox} from './ceiling';
import { tower, towerBBox, updateTowerBBox } from './blocks';

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

  scene.add(cube);
  scene.add(wallRight);
  scene.add(wallLeft);
  scene.add(floor);
  scene.add(ceiling);
  scene.add(tower);
  
  // Helpers;
  // const gridHelper = new THREE.GridHelper( 200, 50);
  // scene.add(gridHelper);
  
  const controls = new OrbitControls(camera, renderer.domElement);
  
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const pointLight = new THREE.PointLight(0xffffff);
  // pointLight.position.set(5, 3, 5);
  // const lightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(ambientLight);
  // scene.add(lightHelper);

  // Postprocessing
  const composer = new EffectComposer( renderer );
  const renderPass = new RenderPass( scene, camera );
  composer.addPass( renderPass );

  // const selectedObjects = [cube];
  // const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight),
  // scene,
  // camera,
  // selectedObjects);
  // outlinePass.renderToSreen = true;
  // outlinePass.selectedObjects = selectedObjects;
  //
  // composer.addPass(outlinePass);
  //
  // const params = {
  //   edgeStrength: 2,
  //   edgeGlow: 0,
  //   edgeThickness: 9.0,
  //   pulsePeriod: 0,
  // };
  // // Allows for black outline
  // outlinePass.overlayMaterial.blending = THREE.SubtractiveBlending
  // outlinePass.edgeStrength = params.edgeStrength;
  // outlinePass.edgeGlow = params.edgeGlow;
  // outlinePass.pulsePeriod = params.pulsePeriod;
  // outlinePass.visibleEdgeColor.set(0xffffff);
  // outlinePass.hiddenEdgeColor.set(0xffffff);

  // const glitchPass = new GlitchPass();
  // composer.addPass( glitchPass );
  // const outlinePass = new OutlinePass();
  // composer.addPass( outlinePass );


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

  // Wireframe for cube
  scene.add( line );
  

  // Testing
  window.cube = cube;
  window.line = line;
  // window.wallRight = wallRight;
  // window.a = new THREE.Vector3();
  // window.cubeBBoxHelper = cubeBBoxHelper;
  // 
  // window.cubeBBox = cubeBBox;
  // window.wallRBBox = wallRBBox;


  let nonPlayer = [wallLBBox, wallRBBox, floorBBox, ceilingBBox, towerBBox];
  let moveMode = true;

  document.addEventListener('keydown', (event) => {
    if (event.key === 't') {
      moveMode = !moveMode;
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
