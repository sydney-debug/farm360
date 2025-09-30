// Main application entry point
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Show loading spinner
    const appElement = document.getElementById('app');
    appElement.innerHTML = '<div class="loading-spinner"></div>';
    
    // Initialize router
    Router.init();
    
    // Check authentication status
    if (Auth.isAuthenticated()) {
      await Auth.checkAuth();
    }
  } catch (error) {
    console.error('Application initialization error:', error);
    alert('Failed to initialize application. Please try again later.');
  }
});