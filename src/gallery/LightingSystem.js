import * as THREE from 'three';

export class LightingSystem {
  constructor(scene) {
    this.scene = scene;
    this.spotlights = [];
    this.time = 0;
  }

  setupLighting() {
    this.createAmbientLight();
    this.createMainLights();
    this.createSpotlights();
    this.createAccentLights();
  }

  createAmbientLight() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);
  }

  createMainLights() {
    // Main directional light (sunlight through ceiling)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -40;
    directionalLight.shadow.camera.right = 40;
    directionalLight.shadow.camera.top = 40;
    directionalLight.shadow.camera.bottom = -40;
    
    this.scene.add(directionalLight);
  }

  createSpotlights() {
    // Artwork spotlights
    const artworkPositions = [
      [-35, 0, -25], [-35, 0, 0], [-35, 0, 25],
      [35, 0, -25], [35, 0, 0], [35, 0, 25],
      [-25, 0, -35], [0, 0, -35], [25, 0, -35],
      [-25, 0, 35], [0, 0, 35], [25, 0, 35]
    ];

    artworkPositions.forEach((pos, index) => {
      const spotlight = new THREE.SpotLight(0xffffff, 1.5, 30, Math.PI / 6, 0.5, 2);
      spotlight.position.set(pos[0], 5, pos[2]);
      spotlight.target.position.set(pos[0], 2, pos[2]);
      spotlight.castShadow = true;
      spotlight.shadow.mapSize.width = 1024;
      spotlight.shadow.mapSize.height = 1024;
      
      this.scene.add(spotlight);
      this.scene.add(spotlight.target);
      this.spotlights.push({ light: spotlight, originalIntensity: 1.5, phase: index * 0.5 });
    });
  }

  createAccentLights() {
    // Column accent lights
    const columnPositions = [
      [-30, -30], [30, -30], [-30, 30], [30, 30],
      [-10, -10], [10, -10], [-10, 10], [10, 10]
    ];

    columnPositions.forEach(pos => {
      const pointLight = new THREE.PointLight(0xffd700, 0.5, 10, 2);
      pointLight.position.set(pos[0], 1, pos[1]);
      this.scene.add(pointLight);
    });
  }

  update(deltaTime) {
    this.time += deltaTime;
    
    // Subtle spotlight animation
    this.spotlights.forEach(spotlight => {
      const flickerIntensity = spotlight.originalIntensity + 
        Math.sin(this.time * 2 + spotlight.phase) * 0.1;
      spotlight.light.intensity = Math.max(0.5, flickerIntensity);
    });
  }
}