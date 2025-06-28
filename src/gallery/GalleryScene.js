import * as THREE from 'three';

export class GalleryScene {
  constructor(scene) {
    this.scene = scene;
    this.textureLoader = new THREE.TextureLoader();
  }

  createGallery() {
    this.createFloor();
    this.createWalls();
    this.createCeiling();
    this.createColumns();
    this.createDoorways();
  }

  createFloor() {
    // Create marble floor texture
    const floorGeometry = new THREE.PlaneGeometry(80, 80);
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xf5f5f5,
      transparent: true,
      opacity: 0.9
    });
    
    // Add procedural pattern
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create marble pattern
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, 512, 512);
    
    // Add marble veins
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 512, Math.random() * 512);
      ctx.lineTo(Math.random() * 512, Math.random() * 512);
      ctx.stroke();
    }
    
    const floorTexture = new THREE.CanvasTexture(canvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 8);
    
    floorMaterial.map = floorTexture;
    
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.position.y = 0;
    
    this.scene.add(floor);
  }

  createWalls() {
    const wallHeight = 6;
    const wallThickness = 0.2;
    
    // Create wall texture
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xfafafa
    });

    // Main gallery walls
    const walls = [
      // North wall
      { position: [0, wallHeight/2, -40], size: [80, wallHeight, wallThickness] },
      // South wall  
      { position: [0, wallHeight/2, 40], size: [80, wallHeight, wallThickness] },
      // East wall
      { position: [40, wallHeight/2, 0], size: [wallThickness, wallHeight, 80] },
      // West wall
      { position: [-40, wallHeight/2, 0], size: [wallThickness, wallHeight, 80] },
      
      // Inner walls for different rooms
      { position: [20, wallHeight/2, 0], size: [wallThickness, wallHeight, 40] },
      { position: [-20, wallHeight/2, 0], size: [wallThickness, wallHeight, 40] },
      { position: [0, wallHeight/2, 20], size: [40, wallHeight, wallThickness] },
      { position: [0, wallHeight/2, -20], size: [40, wallHeight, wallThickness] }
    ];

    walls.forEach(wall => {
      const geometry = new THREE.BoxGeometry(...wall.size);
      const mesh = new THREE.Mesh(geometry, wallMaterial);
      mesh.position.set(...wall.position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    });
  }

  createCeiling() {
    const ceilingGeometry = new THREE.PlaneGeometry(80, 80);
    const ceilingMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 6;
    ceiling.receiveShadow = true;
    
    this.scene.add(ceiling);
  }

  createColumns() {
    const columnGeometry = new THREE.CylinderGeometry(0.5, 0.6, 6, 8);
    const columnMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xe8e8e8,
      shininess: 30
    });

    const columnPositions = [
      [-30, 3, -30], [30, 3, -30],
      [-30, 3, 30], [30, 3, 30],
      [-10, 3, -10], [10, 3, -10],
      [-10, 3, 10], [10, 3, 10]
    ];

    columnPositions.forEach(pos => {
      const column = new THREE.Mesh(columnGeometry, columnMaterial);
      column.position.set(...pos);
      column.castShadow = true;
      column.receiveShadow = true;
      this.scene.add(column);
    });
  }

  createDoorways() {
    // Create decorative doorway arches
    const archGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 16, 1, false, 0, Math.PI);
    const archMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xd4af37,
      shininess: 100
    });

    const doorwayPositions = [
      { pos: [0, 3, -19.9], rot: [0, 0, 0] },
      { pos: [0, 3, 19.9], rot: [0, Math.PI, 0] },
      { pos: [19.9, 3, 0], rot: [0, Math.PI/2, 0] },
      { pos: [-19.9, 3, 0], rot: [0, -Math.PI/2, 0] }
    ];

    doorwayPositions.forEach(doorway => {
      const arch = new THREE.Mesh(archGeometry, archMaterial);
      arch.position.set(...doorway.pos);
      arch.rotation.set(...doorway.rot);
      arch.castShadow = true;
      this.scene.add(arch);
    });
  }
}