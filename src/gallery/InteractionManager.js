import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, scene, artworkManager) {
    this.camera = camera;
    this.scene = scene;
    this.artworkManager = artworkManager;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;
    this.originalMaterials = new Map();
    this.interactionHint = document.getElementById('interaction-hint');
    
    // Increase raycaster precision
    this.raycaster.params.Points.threshold = 0.1;
    this.raycaster.params.Line.threshold = 0.1;
    
    this.setupHoverMaterial();
    this.setupEventListeners();
  }

  setupHoverMaterial() {
    this.hoverMaterial = new THREE.MeshPhongMaterial({
      color: 0xffff00,
      emissive: 0x444400,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
  }

  setupEventListeners() {
    // Use mousedown instead of click for better responsiveness
    document.addEventListener('mousedown', (event) => this.handleClick(event));
    document.addEventListener('mousemove', (event) => this.handleMouseMove(event));
  }

  handleClick(event) {
    // Don't handle clicks when mouse is locked (for camera control)
    if (document.pointerLockElement) return;
    
    // Don't handle clicks on UI elements
    if (event.target.closest('#artwork-info') || 
        event.target.closest('#info-panel') || 
        event.target.closest('#controls')) {
      return;
    }

    this.updateMousePosition(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const artworks = this.artworkManager.getArtworks();
    const intersects = this.raycaster.intersectObjects(artworks);
    
    if (intersects.length > 0) {
      const artwork = intersects[0].object;
      if (artwork.userData && artwork.userData.title) {
        this.displayArtworkInfo(artwork.userData);
        this.createClickEffect(intersects[0].point);
        this.updateCurrentRoom(artwork);
        
        // Prevent camera control activation
        event.stopPropagation();
      }
    } else {
      // Close artwork info if clicking elsewhere
      this.closeArtworkInfo();
    }
  }

  handleMouseMove(event) {
    // Don't handle mouse move when pointer is locked
    if (document.pointerLockElement) {
      this.hideInteractionHint();
      return;
    }
    
    this.updateMousePosition(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    const artworks = this.artworkManager.getArtworks();
    const intersects = this.raycaster.intersectObjects(artworks);
    
    // Reset previous hover
    if (this.hoveredObject && this.originalMaterials.has(this.hoveredObject)) {
      this.hoveredObject.material = this.originalMaterials.get(this.hoveredObject);
      this.hoveredObject = null;
    }
    
    // Apply hover effect
    if (intersects.length > 0) {
      const artwork = intersects[0].object;
      if (artwork.userData && artwork.userData.title) {
        if (!this.originalMaterials.has(artwork)) {
          this.originalMaterials.set(artwork, artwork.material.clone());
        }
        
        this.hoveredObject = artwork;
        artwork.material = this.hoverMaterial.clone();
        
        // Show interaction hint
        this.showInteractionHint(event.clientX, event.clientY, artwork.userData.title);
        
        // Change cursor
        document.body.style.cursor = 'pointer';
      }
    } else {
      document.body.style.cursor = 'crosshair';
      this.hideInteractionHint();
    }
  }

  updateMousePosition(event) {
    const rect = event.target.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  showInteractionHint(x, y, title) {
    this.interactionHint.style.left = x + 'px';
    this.interactionHint.style.top = y + 'px';
    this.interactionHint.textContent = `Click to view: ${title}`;
    this.interactionHint.classList.add('visible');
  }

  hideInteractionHint() {
    this.interactionHint.classList.remove('visible');
  }

  displayArtworkInfo(artworkData) {
    document.getElementById('art-title').textContent = artworkData.title;
    document.getElementById('art-artist').textContent = `By ${artworkData.artist}`;
    document.getElementById('art-description').textContent = artworkData.description;
    document.getElementById('artwork-info').classList.add('visible');
  }

  closeArtworkInfo() {
    document.getElementById('artwork-info').classList.remove('visible');
  }

  createClickEffect(position) {
    // Create a more visible particle effect
    const particleGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd700,
      transparent: true,
      opacity: 1
    });
    
    for (let i = 0; i < 15; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
      particle.position.copy(position);
      particle.position.add(new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      ));
      
      this.scene.add(particle);
      
      // Animate and remove particle
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / 1500; // 1.5 second animation
        
        if (progress < 1) {
          particle.material.opacity = 1 - progress;
          particle.scale.setScalar(1 + progress * 3);
          particle.position.y += 0.02;
          requestAnimationFrame(animate);
        } else {
          this.scene.remove(particle);
        }
      };
      animate();
    }
  }

  updateCurrentRoom(artwork) {
    const position = artwork.position;
    let roomName = "Main Gallery";
    
    if (position.x < -20) {
      roomName = "West Wing - Contemporary Art";
    } else if (position.x > 20) {
      roomName = "East Wing - Modern Masters";
    } else if (position.z < -20) {
      roomName = "North Gallery - Abstract Collection";
    } else if (position.z > 20) {
      roomName = "South Gallery - Classical Works";
    } else {
      roomName = "Central Hall - Featured Exhibitions";
    }
    
    document.getElementById('current-room').textContent = roomName;
  }
}