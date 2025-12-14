/**
 * Urban Morph Location Modal Fix
 * This script ensures the location modal works properly
 * Add this script before the closing </body> tag in your HTML files
 */

// Ensure Bootstrap JavaScript is loaded
if (typeof bootstrap === 'undefined') {
  console.error('Bootstrap JavaScript is not loaded. Please include it before this script.');
}

// Modal initialization and event handling
document.addEventListener('DOMContentLoaded', function() {
  
  // Get all "Locate us" links
  const locateLinks = document.querySelectorAll('a[data-bs-toggle="modal"][data-bs-target="#myModal"]');
  
  // Get the modal element
  const modalElement = document.getElementById('myModal');
  
  if (modalElement && locateLinks.length > 0) {
    
    // Initialize Bootstrap modal
    const locationModal = new bootstrap.Modal(modalElement);
    
    // Add click handlers to all locate links
    locateLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        locationModal.show();
      });
    });
    
    console.log('Location modal initialized successfully');
  } else {
    console.warn('Modal element or locate links not found');
  }
  
});

// Optional: Add Google Maps API error handling
window.addEventListener('error', function(e) {
  if (e.target.tagName === 'IFRAME') {
    console.warn('Map iframe failed to load. Check your internet connection or Google Maps embed URL.');
  }
}, true);
