// API service for making requests to the backend
const API = {
  // Base headers for all requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    // Add authorization token if available
    const token = localStorage.getItem(CONFIG.STORAGE_TOKEN_KEY);
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  },
  
  // Generic request method
  async request(endpoint, method = 'GET', data = null) {
    const url = `${CONFIG.API_URL}/${endpoint}`;
    const options = {
      method,
      headers: this.getHeaders()
    };
    
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }
      
      return result;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  },
  
  // Authentication endpoints
  auth: {
    login(credentials) {
      return API.request('auth/login', 'POST', credentials);
    },
    
    register(userData) {
      return API.request('auth/register', 'POST', userData);
    },
    
    getCurrentUser() {
      return API.request('auth/me');
    }
  },
  
  // Users endpoints
  users: {
    getAll() {
      return API.request('users');
    },
    
    getById(id) {
      return API.request(`users/${id}`);
    },
    
    update(id, userData) {
      return API.request(`users/${id}`, 'PUT', userData);
    }
  },
  
  // Animals endpoints
  animals: {
    getAll(params = {}) {
      const queryParams = new URLSearchParams(params).toString();
      return API.request(`animals${queryParams ? '?' + queryParams : ''}`);
    },
    
    getById(id) {
      return API.request(`animals/${id}`);
    },
    
    create(animalData) {
      return API.request('animals', 'POST', animalData);
    },
    
    update(id, animalData) {
      return API.request(`animals/${id}`, 'PUT', animalData);
    },
    
    delete(id) {
      return API.request(`animals/${id}`, 'DELETE');
    }
  },
  
  // Calves endpoints
  calves: {
    getAll(params = {}) {
      const queryParams = new URLSearchParams(params).toString();
      return API.request(`calves${queryParams ? '?' + queryParams : ''}`);
    },
    
    getById(id) {
      return API.request(`calves/${id}`);
    },
    
    create(calfData) {
      return API.request('calves', 'POST', calfData);
    },
    
    update(id, calfData) {
      return API.request(`calves/${id}`, 'PUT', calfData);
    },
    
    delete(id) {
      return API.request(`calves/${id}`, 'DELETE');
    }
  },
  
  // Veterinarians endpoints
  vets: {
    getAll(params = {}) {
      const queryParams = new URLSearchParams(params).toString();
      return API.request(`vets${queryParams ? '?' + queryParams : ''}`);
    },
    
    getById(id) {
      return API.request(`vets/${id}`);
    },
    
    getNearby(lat, lng, radius = 50) {
      return API.request(`vets/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    }
  },
  
  // Health records endpoints
  healthRecords: {
    getByAnimalId(animalId) {
      return API.request(`health-records?animalId=${animalId}`);
    },
    
    create(recordData) {
      return API.request('health-records', 'POST', recordData);
    },
    
    update(id, recordData) {
      return API.request(`health-records/${id}`, 'PUT', recordData);
    },
    
    delete(id) {
      return API.request(`health-records/${id}`, 'DELETE');
    },
    
    uploadAttachment(recordId, formData) {
      // Special case for file uploads
      return fetch(`${CONFIG.API_URL}/health-records/${recordId}/attachments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(CONFIG.STORAGE_TOKEN_KEY)}`
        },
        body: formData
      }).then(response => response.json());
    }
  },
  
  // Crops endpoints
  crops: {
    getAll(params = {}) {
      const queryParams = new URLSearchParams(params).toString();
      return API.request(`crops${queryParams ? '?' + queryParams : ''}`);
    },
    
    getById(id) {
      return API.request(`crops/${id}`);
    },
    
    create(cropData) {
      return API.request('crops', 'POST', cropData);
    },
    
    update(id, cropData) {
      return API.request(`crops/${id}`, 'PUT', cropData);
    },
    
    delete(id) {
      return API.request(`crops/${id}`, 'DELETE');
    }
  },
  
  // Inventory endpoints
  inventory: {
    getAll(params = {}) {
      const queryParams = new URLSearchParams(params).toString();
      return API.request(`inventory${queryParams ? '?' + queryParams : ''}`);
    },
    
    getById(id) {
      return API.request(`inventory/${id}`);
    },
    
    create(itemData) {
      return API.request('inventory', 'POST', itemData);
    },
    
    update(id, itemData) {
      return API.request(`inventory/${id}`, 'PUT', itemData);
    },
    
    delete(id) {
      return API.request(`inventory/${id}`, 'DELETE');
    },
    
    recordTransaction(transaction) {
      return API.request('inventory/transactions', 'POST', transaction);
    }
  },
  
  // Sales endpoints
  sales: {
    getAll(params = {}) {
      const queryParams = new URLSearchParams(params).toString();
      return API.request(`sales${queryParams ? '?' + queryParams : ''}`);
    },
    
    getById(id) {
      return API.request(`sales/${id}`);
    },
    
    create(saleData) {
      return API.request('sales', 'POST', saleData);
    },
    
    update(id, saleData) {
      return API.request(`sales/${id}`, 'PUT', saleData);
    },
    
    delete(id) {
      return API.request(`sales/${id}`, 'DELETE');
    }
  },
  
  // Expenses endpoints
  expenses: {
    getAll(params = {}) {
      const queryParams = new URLSearchParams(params).toString();
      return API.request(`expenses${queryParams ? '?' + queryParams : ''}`);
    },
    
    getById(id) {
      return API.request(`expenses/${id}`);
    },
    
    create(expenseData) {
      return API.request('expenses', 'POST', expenseData);
    },
    
    update(id, expenseData) {
      return API.request(`expenses/${id}`, 'PUT', expenseData);
    },
    
    delete(id) {
      return API.request(`expenses/${id}`, 'DELETE');
    },
    
    uploadReceipt(expenseId, formData) {
      // Special case for file uploads
      return fetch(`${CONFIG.API_URL}/expenses/${expenseId}/attachments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(CONFIG.STORAGE_TOKEN_KEY)}`
        },
        body: formData
      }).then(response => response.json());
    }
  },
  
  // Reports endpoints
  reports: {
    getProfitLoss(startDate, endDate, farmId) {
      return API.request(`reports/profit-loss?startDate=${startDate}&endDate=${endDate}&farmId=${farmId}`);
    },
    
    getInventoryStatus(farmId) {
      return API.request(`reports/inventory-status?farmId=${farmId}`);
    },
    
    getAnimalHealth(farmId, period) {
      return API.request(`reports/animal-health?farmId=${farmId}&period=${period}`);
    },
    
    getCropYield(farmId, year) {
      return API.request(`reports/crop-yield?farmId=${farmId}&year=${year}`);
    }
  }
};