import * as THREE from 'three';
const Cube = require('./cube');

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement)

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  // camera.position.set(0, 0, 100);
  // camera.lookAt(0, 0, 0);
  camera.position.z = 5;

  let cube = Cube.cube;
  
  function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

	animate();
	
  scene.add(cube);
  renderer.render(scene, camera);
})
