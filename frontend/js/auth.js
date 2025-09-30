// Authentication service for managing user sessions
const Auth = {
  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem(CONFIG.STORAGE_TOKEN_KEY);
  },
  
  // Get current user data
  getCurrentUser() {
    const userData = localStorage.getItem(CONFIG.STORAGE_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  
  // Save authentication data
  setAuth(token, user) {
    localStorage.setItem(CONFIG.STORAGE_TOKEN_KEY, token);
    localStorage.setItem(CONFIG.STORAGE_USER_KEY, JSON.stringify(user));
  },
  
  // Clear authentication data
  clearAuth() {
    localStorage.removeItem(CONFIG.STORAGE_TOKEN_KEY);
    localStorage.removeItem(CONFIG.STORAGE_USER_KEY);
  },
  
  // Login user
  async login(email, password) {
    try {
      const response = await API.auth.login({ email, password });
      this.setAuth(response.token, response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  },
  
  // Register user
  async register(userData) {
    try {
      const response = await API.auth.register(userData);
      this.setAuth(response.token, response.user);
      return response.user;
    } catch (error) {
      throw error;
    }
  },
  
  // Logout user
  logout() {
    this.clearAuth();
    window.location.hash = '#' + CONFIG.ROUTES.LOGIN;
  },
  
  // Check and refresh user data
  async checkAuth() {
    if (!this.isAuthenticated()) {
      return false;
    }
    
    try {
      const response = await API.auth.getCurrentUser();
      // Update stored user data with latest from server
      const currentUser = this.getCurrentUser();
      this.setAuth(localStorage.getItem(CONFIG.STORAGE_TOKEN_KEY), {
        ...currentUser,
        ...response.user
      });
      return true;
    } catch (error) {
      console.error('Auth check failed:', error);
      // If token is invalid, clear auth data
      this.clearAuth();
      return false;
    }
  }
};