// Configuration settings for the Farm360 application
const CONFIG = {
  // API endpoints
  API_URL: 'https://farm360-backend.up.railway.app/api',
  
  // Local storage keys
  STORAGE_TOKEN_KEY: 'farm360_token',
  STORAGE_USER_KEY: 'farm360_user',
  
  // Default settings
  DEFAULT_PAGE_SIZE: 10,
  
  // Routes
  ROUTES: {
    LOGIN: 'login',
    REGISTER: 'register',
    DASHBOARD: 'dashboard',
    ANIMALS: 'animals',
    CROPS: 'crops',
    INVENTORY: 'inventory',
    SALES: 'sales',
    EXPENSES: 'expenses',
    REPORTS: 'reports',
    VETS: 'vets',
    SETTINGS: 'settings',
    PROFILE: 'profile'
  }
};