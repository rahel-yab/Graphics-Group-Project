import * as THREE from 'three';

export class ArtworkManager {
  constructor(scene) {
    this.scene = scene;
    this.artworks = [];
    this.sculptures = [];
    this.time = 0;
  }

  createArtworks() {
    this.createPaintings();
    this.createSculptures();
    this.createInteractiveArt();
  }

  createPaintings() {
    const paintingData = [
      {
        title: "Abstract Harmony",
        artist: "Elena Vasquez",
        description: "A vibrant exploration of color and form, representing the harmony between chaos and order in modern life.",
        color: 0x4a90e2,
        position: [-35, 2.5, -25]
      },
      {
        title: "Digital Dreams", 
        artist: "Marcus Chen",
        description: "This piece explores the intersection of technology and human consciousness in the digital age.",
        color: 0xe94b3c,
        position: [-35, 2.5, 0]
      },
      {
        title: "Ocean's Memory",
        artist: "Isabella Rossi", 
        description: "Inspired by childhood memories of the Mediterranean, this artwork captures the eternal dance of waves.",
        color: 0x2ecc71,
        position: [-35, 2.5, 25]
      },
      {
        title: "Urban Pulse",
        artist: "David Kim",
        description: "The rhythm and energy of city life translated into bold strokes and dynamic composition.",
        color: 0xf39c12,
        position: [35, 2.5, -25]
      },
      {
        title: "Quantum Fields",
        artist: "Dr. Sarah Williams",
        description: "A scientific visualization of quantum mechanics made beautiful through artistic interpretation.", 
        color: 0x9b59b6,
        position: [35, 2.5, 0]
      },
      {
        title: "Ancient Futures",
        artist: "Kofi Asante",
        description: "Bridging traditional African art with futuristic visions, exploring cultural continuity.",
        color: 0xe67e22,
        position: [35, 2.5, 25]
      }
    ];

    paintingData.forEach((data, index) => {
      const painting = this.createPainting(data.color, data.position);
      painting.userData = {
        title: data.title,
        artist: data.artist,
        description: data.description,
        type: 'painting'
      };
      this.artworks.push(painting);
    });

    // Wall-mounted paintings
    const wallPaintings = [
      { color: 0x3498db, position: [-25, 2.5, -35] },
      { color: 0xe74c3c, position: [0, 2.5, -35] },
      { color: 0x2ecc71, position: [25, 2.5, -35] },
      { color: 0xf1c40f, position: [-25, 2.5, 35] },
      { color: 0x9b59b6, position: [0, 2.5, 35] },
      { color: 0x1abc9c, position: [25, 2.5, 35] }
    ];

    wallPaintings.forEach((data, index) => {
      const painting = this.createPainting(data.color, data.position);
      painting.userData = {
        title: `Gallery Collection ${index + 7}`,
        artist: "Various Artists",
        description: "Part of our permanent collection showcasing contemporary artistic expression.",
        type: 'painting'
      };
      this.artworks.push(painting);
    });
  }

  createPainting(color, position) {
    // Frame
    const frameGeometry = new THREE.BoxGeometry(3, 2.2, 0.1);
    const frameMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8b4513,
      shininess: 30
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(...position);
    frame.castShadow = true;
    
    // Canvas
    const canvasGeometry = new THREE.PlaneGeometry(2.5, 1.8);
    const canvasMaterial = new THREE.MeshLambertMaterial({ color });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvas.position.set(position[0], position[1], position[2] + 0.06);
    
    // Add some texture to the canvas
    this.addCanvasTexture(canvas, color);
    
    this.scene.add(frame);
    this.scene.add(canvas);
    
    return frame;
  }

  addCanvasTexture(canvas, baseColor) {
    const canvasEl = document.createElement('canvas');
    canvasEl.width = 256;
    canvasEl.height = 256;
    const ctx = canvasEl.getContext('2d');
    
    // Create abstract art
    const r = (baseColor >> 16) & 255;
    const g = (baseColor >> 8) & 255;
    const b = baseColor & 255;
    
    // Background
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(0, 0, 256, 256);
    
    // Add some artistic elements
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 100, Math.random() * 100);
    }
    
    // Add some lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 256, Math.random() * 256);
      ctx.lineTo(Math.random() * 256, Math.random() * 256);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvasEl);
    canvas.material.map = texture;
  }

  createSculptures() {
    const sculptureData = [
      {
        title: "Twisted Reality",
        artist: "Alberto Mendez", 
        description: "A bronze sculpture exploring the malleability of perception and reality.",
        position: [-15, 0, -15],
        type: 'torus'
      },
      {
        title: "Crystalline Dreams",
        artist: "Yuki Tanaka",
        description: "Geometric forms that capture light and shadow in perpetual dance.",
        position: [15, 0, -15], 
        type: 'crystal'
      },
      {
        title: "Flowing Time",
        artist: "Marie Dubois",
        description: "An exploration of temporal flow through fluid sculptural forms.",
        position: [-15, 0, 15],
        type: 'sphere'
      },
      {
        title: "Digital Monolith", 
        artist: "Alex Rodriguez",
        description: "A commentary on our digital age rendered in physical form.",
        position: [15, 0, 15],
        type: 'cube'
      }
    ];

    sculptureData.forEach(data => {
      const sculpture = this.createSculpture(data.type, data.position);
      sculpture.userData = {
        title: data.title,
        artist: data.artist, 
        description: data.description,
        type: 'sculpture'
      };
      this.sculptures.push(sculpture);
      this.artworks.push(sculpture);
    });
  }

  createSculpture(type, position) {
    let geometry;
    let material;

    switch (type) {
      case 'torus':
        geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        material = new THREE.MeshPhongMaterial({ 
          color: 0xcd7f32,
          shininess: 100
        });
        break;
      case 'crystal':
        geometry = new THREE.OctahedronGeometry(1.5);
        material = new THREE.MeshPhongMaterial({ 
          color: 0x87ceeb,
          transparent: true,
          opacity: 0.8,
          shininess: 100
        });
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(1.2, 32, 32);
        material = new THREE.MeshPhongMaterial({ 
          color: 0xffffff,
          shininess: 100
        });
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(2, 2, 2);
        material = new THREE.MeshPhongMaterial({ 
          color: 0x333333,
          shininess: 50
        });
        break;
      default:
        geometry = new THREE.SphereGeometry(1);
        material = new THREE.MeshPhongMaterial({ color: 0x888888 });
    }

    const sculpture = new THREE.Mesh(geometry, material);
    sculpture.position.set(position[0], position[1] + 1.5, position[2]);
    sculpture.castShadow = true;

    // Create pedestal
    const pedestalGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5);
    const pedestalMaterial = new THREE.MeshLambertMaterial({ color: 0xf0f0f0 });
    const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.position.set(position[0], 0.25, position[2]);
    pedestal.receiveShadow = true;

    this.scene.add(sculpture);
    this.scene.add(pedestal);

    return sculpture;
  }

  createInteractiveArt() {
    // Create a central interactive installation
    const installationGeometry = new THREE.ConeGeometry(2, 4, 8);
    const installationMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff6b6b,
      shininess: 100
    });
    const installation = new THREE.Mesh(installationGeometry, installationMaterial);
    installation.position.set(0, 2, 0);
    installation.castShadow = true;
    installation.userData = {
      title: "Interactive Harmony",
      artist: "Virtual Gallery Collective", 
      description: "An interactive installation that responds to visitor presence. Watch as it changes color and form based on your position in the gallery.",
      type: 'interactive'
    };

    this.scene.add(installation);
    this.artworks.push(installation);
    this.sculptures.push(installation);
  }

  update(deltaTime) {
    this.time += deltaTime;

    // Animate sculptures
    this.sculptures.forEach((sculpture, index) => {
      if (sculpture.userData.type === 'sculpture' || sculpture.userData.type === 'interactive') {
        // Subtle rotation animation
        sculpture.rotation.y += deltaTime * 0.2 * (index % 2 === 0 ? 1 : -1);
        
        // Subtle floating animation for some pieces
        if (sculpture.userData.title === "Crystalline Dreams") {
          sculpture.position.y = 1.5 + Math.sin(this.time + index) * 0.1;
        }
        
        // Color change for interactive piece
        if (sculpture.userData.type === 'interactive') {
          const hue = (this.time * 0.1) % 1;
          sculpture.material.color.setHSL(hue, 0.7, 0.5);
        }
      }
    });
  }

  getArtworks() {
    return this.artworks;
  }
}