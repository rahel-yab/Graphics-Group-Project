## Group Members

| Name              | ID Number     | Section |
|-------------------|---------------|---------|
| Betel Mekasha     | UGR/1984/15   | 1       |
| Dagmawit Sisay    | UGR/2038/15   | 2       |
| Naomi Meseret     | UGR/5048/15   | 2       |
| Newal Nesredin    | UGR/1550/15   | 2       |
| Rahel Yabebal     | UGR/6200/15   | 1       |

# Virtual Art Gallery Tour

An interactive 3D web-based art gallery built with Three.js, allowing users to explore a virtual museum space with realistic lighting, animated artworks, and immersive first-person navigation.

## 🎯 Project Overview

This project demonstrates advanced 3D web development concepts including scene graph management, custom camera controls, dynamic lighting systems, procedural textures, and real-time user interaction. Built as a collaborative effort showcasing object-oriented programming in JavaScript and modern web technologies.

## ✨ Features

### 🏛️ 3D Gallery Environment

- **Realistic Gallery Space**: Multi-room layout with walls, floors, ceilings, columns, and decorative arches
- **Procedural Textures**: Marble floor with realistic veining patterns
- **Modular Architecture**: Easy to expand and modify gallery layout

### 🎮 Interactive Navigation

- **First-Person Controls**: WASD/Arrow keys for movement, mouse for looking around
- **Pointer Lock**: Immersive mouse control for realistic camera movement

### 💡 Dynamic Lighting System

- **Multiple Light Types**: Ambient, directional, spot, and point lights
- **Animated Spotlights**: Subtle flickering effects for realism
- **Shadow Mapping**: Realistic shadows cast by all objects

### 🎨 Artwork Collection

- **Digital Paintings**: Framed artworks with procedurally generated textures
- **3D Sculptures**: Unique geometric forms (torus, crystal, sphere, cube)
- **Animated Elements**: Rotating sculptures and floating art pieces

### 🖱️ User Interaction

- **Raycasting**: Click on artworks to view detailed information
- **Hover Effects**: Visual feedback when hovering over interactive elements
- **Room Detection**: Dynamic display showing current gallery section

### 🎬 Animation & Effects

- **Continuous Animation**: Rotating sculptures and floating elements
- **Interactive Animation**: Color-changing installation based on time
- **Lighting Animation**: Subtle spotlight flickering
- **Particle Systems**: Click effects with animated particles

## 🛠️ Technical Implementation

### Architecture

The project follows a modular, object-oriented architecture with clear separation of concerns:

```
src/
├── gallery/
│   ├── VirtualGallery.js      # Main orchestrator
│   ├── GalleryScene.js        # 3D environment builder
│   ├── CameraController.js    # First-person navigation
│   ├── LightingSystem.js      # Dynamic lighting
│   ├── ArtworkManager.js      # Artwork creation & animation
│   └── InteractionManager.js  # User interaction & UI
├── main.js                    # Entry point & UI integration
├── App.tsx                    # React component
└── main.tsx                   # React entry point
```

### Key Technical Features

#### 1. **Morethan 5 Unique 3D Objects** 

#### 2. **Camera Controls** 

#### 3. **Lighting System** 

#### 4. **User Interaction** 

#### 5. **Texture Mapping & Procedural Materials** 

#### 6. **Animation** ✅

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/virtual-art-gallery.git
cd virtual-art-gallery
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```
4. Open your browser and navigate to `http://localhost:5173`
