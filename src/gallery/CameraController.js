import * as THREE from "three";

export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    // Movement state
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    // Mouse look
    this.isMouseLocked = false;
    this.euler = new THREE.Euler(0, 0, 0, "YXZ");
    this.vector = new THREE.Vector3();

    // Movement settings
    this.velocity = new THREE.Vector3();
    this.speed = 12.0;
    this.mouseSensitivity = 0.002;

    // Camera constraints
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;

    this.setupControls();
  }

  setupControls() {
    // Keyboard controls
    document.addEventListener("keydown", (event) => this.onKeyDown(event));
    document.addEventListener("keyup", (event) => this.onKeyUp(event));

    this.domElement.addEventListener("click", (event) => {
      // Only lock pointer if not clicking on UI elements
      if (
        !event.target.closest("#artwork-info") &&
        !event.target.closest("#info-panel") &&
        !event.target.closest("#controls")
      ) {
        this.lockPointer();
      }
    });

    document.addEventListener("pointerlockchange", () =>
      this.onPointerLockChange()
    );
    document.addEventListener("mousemove", (event) => this.onMouseMove(event));

    // ESC key to release mouse
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        document.exitPointerLock();
      }
    });
  }

  lockPointer() {
    this.domElement.requestPointerLock =
      this.domElement.requestPointerLock ||
      this.domElement.mozRequestPointerLock ||
      this.domElement.webkitRequestPointerLock;
    this.domElement.requestPointerLock();
  }

  onPointerLockChange() {
    this.isMouseLocked =
      document.pointerLockElement === this.domElement ||
      document.mozPointerLockElement === this.domElement ||
      document.webkitPointerLockElement === this.domElement;

    // Update cursor style
    if (this.isMouseLocked) {
      document.body.style.cursor = "none";
      document.getElementById("crosshair").style.display = "block";
    } else {
      document.body.style.cursor = "crosshair";
      document.getElementById("crosshair").style.display = "none";
    }
  }

  onMouseMove(event) {
    if (!this.isMouseLocked) return;

    const movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    this.euler.setFromQuaternion(this.camera.quaternion);
    this.euler.y -= movementX * this.mouseSensitivity;
    this.euler.x -= movementY * this.mouseSensitivity;

    // Constrain vertical look
    this.euler.x = Math.max(
      -Math.PI / 2 + 0.1,
      Math.min(Math.PI / 2 - 0.1, this.euler.x)
    );

    this.camera.quaternion.setFromEuler(this.euler);
  }

  onKeyDown(event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        this.moveForward = true;
        break;
      case "KeyS":
      case "ArrowDown":
        this.moveBackward = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.moveLeft = true;
        break;
      case "KeyD":
      case "ArrowRight":
        this.moveRight = true;
        break;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        this.moveForward = false;
        break;
      case "KeyS":
      case "ArrowDown":
        this.moveBackward = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.moveLeft = false;
        break;
      case "KeyD":
      case "ArrowRight":
        this.moveRight = false;
        break;
    }
  }

  update(deltaTime) {
    // Smooth movement
    const actualMoveSpeed = this.speed * deltaTime;

    // Get camera direction vectors
    this.camera.getWorldDirection(this.vector);
    const forward = this.vector.clone();
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, this.camera.up).normalize();

    // Apply movement
    if (this.moveForward) {
      this.camera.position.addScaledVector(forward, actualMoveSpeed);
    }

    if (this.moveBackward) {
      this.camera.position.addScaledVector(forward, -actualMoveSpeed);
    }

    if (this.moveLeft) {
      this.camera.position.addScaledVector(right, -actualMoveSpeed);
    }

    if (this.moveRight) {
      this.camera.position.addScaledVector(right, actualMoveSpeed);
    }

    // Keep camera at reasonable height
    this.camera.position.y = Math.max(
      1.6,
      Math.min(4.0, this.camera.position.y)
    );

    // Apply boundary constraints
    this.applyBoundaryConstraints();
  }

  applyBoundaryConstraints() {
    const boundary = 38;
    this.camera.position.x = Math.max(
      -boundary,
      Math.min(boundary, this.camera.position.x)
    );
    this.camera.position.z = Math.max(
      -boundary,
      Math.min(boundary, this.camera.position.z)
    );
  }

  reset() {
    // Reset to starting position with smooth transition
    this.camera.position.set(0, 1.6, 10);
    this.camera.lookAt(0, 1.6, 0);
    this.euler.set(0, 0, 0);
    this.velocity.set(0, 0, 0);

    // Release mouse lock
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }
}
