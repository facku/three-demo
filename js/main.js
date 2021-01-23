/** Imports  */
import * as THREE from "./libs/three.module.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";
import { OrbitControls } from "./libs/OrbitControls.js";

/** Scene */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

/** Camera (PerspectiveCamera)*/
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 6);

/** Renderer (WebGLRenderer)  */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.size = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
};
renderer.size();
document.body.append(renderer.domElement);

// /** Camera Controller  */
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0, 2);

/** AxesHelper*/
// const axes = new THREE.AxesHelper(2);
// scene.add(axes);

/** Colores */
const violet = new THREE.Color(0xea1889);
const pink = new THREE.Color(0xf977bc);

/** Lights */
const point1 = new THREE.PointLight(0x0000ff, 2, 4);
const point2 = new THREE.PointLight(0xff0000, 2, 4);
point1.position.set(0, 1.4, 2);
point2.position.set(0, 1.4, -2);

const pivot = new THREE.Object3D();
pivot.add(point1, point2);

const light = new THREE.DirectionalLight("white", 0.5);

scene.add(light, pivot);

//Load models with GLTFLoader
const loader = new GLTFLoader();
loader.load(
  "../models/bow_tie/scene.gltf",
  function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.geometry.center(); // center here
        child.castShadow = true;
        child.material.wireframe = true;
      }
    });
    gltf.scene.scale.set(20, 30, 30); // scale here
    gltf.scene.rotateX(Math.PI / 2);
    scene.add(gltf.scene);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

loader.load(
  "../models/mostache/scene.gltf",
  function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.color = pink;
      }
    });
    gltf.scene.scale.set(0.8, 1, 1);
    gltf.scene.position.y = 1;
    scene.add(gltf.scene);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

loader.load(
  "../models/coffee/scene.gltf",
  function (gltf) {
    gltf.scene.position.y = 1.5;
    gltf.scene.scale.set(0.014, 0.014, 0.014);
    gltf.scene.rotation.y = 1;
    scene.add(gltf.scene);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);

// Handle Window resize.
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.size();
});

// Call the Main Loop
mainLoop();

// The Main Loop
function mainLoop() {
  pivot.rotateY(-0.1);
  // scene.rotateY(0.0);

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}
