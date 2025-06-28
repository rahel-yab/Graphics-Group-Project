import * as THREE from 'three';
import { GalleryScene } from './GalleryScene.js';
import { CameraController } from './CameraController.js';
import { LightingSystem } from './LightingSystem.js';
import { ArtworkManager } from './ArtworkManager.js';
import { InteractionManager } from './InteractionManager.js';

export class VirtualGallery {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.galleryScene = null;
    this.cameraController = null;
    this.lightingSystem = null;
    this.artworkManager = null;
    this.interactionManager = null;
    this.clock = new THREE.Clock();
  }

  init() {
    this.setupRenderer();
    this.setupScene();
    this.setupCamera();
    this.setupComponents();
    this.setupEventListeners();
    this.animate();
    
    // Hide loading screen with smooth transition
    setTimeout(() => {
      const loading = document.getElementById('loading');
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1500);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x1a1a1a, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.9;
    
    // Improve rendering quality
    this.renderer.physicallyCorrectLights = true;
    
    document.getElementById('gallery-container').appendChild(this.renderer.domElement);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x1a1a1a, 60, 150);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.6, 10);
    this.camera.lookAt(0, 1.6, 0);
  }

  setupComponents() {
    this.galleryScene = new GalleryScene(this.scene);
    this.lightingSystem = new LightingSystem(this.scene);
    this.artworkManager = new ArtworkManager(this.scene);
    this.cameraController = new CameraController(this.camera, this.renderer.domElement);
    this.interactionManager = new InteractionManager(this.camera, this.scene, this.artworkManager);

    // Build the gallery
    this.galleryScene.createGallery();
    this.lightingSystem.setupLighting();
    this.artworkManager.createArtworks();
  }

  setupEventListeners() {
    // Reset camera with R key
    window.addEventListener('keydown', (event) => {
      if (event.code === 'KeyR') {
        this.resetCamera();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Close artwork info with ESC
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.interactionManager.closeArtworkInfo();
      }
    });
  }

  resetCamera() {
    this.camera.position.set(0, 1.6, 10);
    this.camera.lookAt(0, 1.6, 0);
    this.cameraController.reset();
    
    // Close any open artwork info
    this.interactionManager.closeArtworkInfo();
    
    // Update room display
    document.getElementById('current-room').textContent = 'Main Gallery';
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    const deltaTime = this.clock.getDelta();
    
    // Limit delta time to prevent large jumps
    const clampedDeltaTime = Math.min(deltaTime, 0.1);
    
    // Update components
    this.cameraController.update(clampedDeltaTime);
    this.artworkManager.update(clampedDeltaTime);
    this.lightingSystem.update(clampedDeltaTime);
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}