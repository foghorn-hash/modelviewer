import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function App() {

  const url = "spaceship.stl";
  const containerRef = useRef();

  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Load the STL file
    const loader = new STLLoader();
    loader.load(url, (geometry) => {
      // Create a wireframe material
      const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });

      // Create a mesh with wireframe material
      const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);

      // Add the wireframe mesh to the scene
      scene.add(wireframeMesh);
    });

    // Add OrbitControls for mouse interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;

    // Update the camera aspect ratio when the window is resized
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    });

    // Render function (no animation)
    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    // Call the render function
    render();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className='App-main'>
        <div ref={containerRef} id="App-3D-viewer"></div>
      </main>
      <footer className='App-footer'>
      </footer>
    </div>
  );
}

export default App;
