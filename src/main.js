import { VirtualGallery } from './gallery/VirtualGallery.js';

// Global variables
let gallery;

// Initialize the gallery when the page loads
window.addEventListener('load', () => {
  gallery = new VirtualGallery();
  gallery.init();
});

// Global functions for UI interaction
window.closeArtworkInfo = () => {
  const artworkInfo = document.getElementById('artwork-info');
  artworkInfo.classList.remove('visible');
};

window.showArtworkInfo = (title, artist, description) => {
  document.getElementById('art-title').textContent = title;
  document.getElementById('art-artist').textContent = `By ${artist}`;
  document.getElementById('art-description').textContent = description;
  document.getElementById('artwork-info').classList.add('visible');
};

// Handle window resize
window.addEventListener('resize', () => {
  if (gallery) {
    gallery.handleResize();
  }
});

// Add helpful instructions for first-time users
window.addEventListener('load', () => {
  setTimeout(() => {
    // Show a brief tutorial overlay
    const tutorial = document.createElement('div');
    tutorial.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      font-family: 'Segoe UI', sans-serif;
    `;
    
    tutorial.innerHTML = `
      <div style="text-align: center; max-width: 500px; padding: 40px;">
        <h2 style="color: #ffd700; margin-bottom: 20px;">Welcome to the Virtual Art Gallery!</h2>
        <p style="margin-bottom: 15px; line-height: 1.6;">• Move your mouse to look around</p>
        <p style="margin-bottom: 15px; line-height: 1.6;">• Use W,A,S,D or arrow keys to walk</p>
        <p style="margin-bottom: 15px; line-height: 1.6;">• Click on artworks to learn more about them</p>
        <p style="margin-bottom: 15px; line-height: 1.6;">• Press R to reset your position</p>
        <p style="margin-bottom: 25px; line-height: 1.6;">• Press ESC to release mouse control</p>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: #ffd700; color: #000; border: none; padding: 12px 24px; 
                       border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;">
          Start Exploring!
        </button>
      </div>
    `;
    
    document.body.appendChild(tutorial);
  }, 2000);
});