import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
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

    // Define resize function
    const onWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    // Add resize event listener
    window.addEventListener('resize', onWindowResize)

    // Render function (with animation)
    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    // Call the render function
    render();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      containerRef.current.removeChild(renderer.domElement);
    };

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
        <p>3D Model Viewer</p>
      </footer>
    </div>
  );
}

export default App;