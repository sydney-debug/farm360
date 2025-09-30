// Simple router for handling navigation in the SPA
const Router = {
  // Current route
  currentRoute: null,
  
  // Initialize router
  init() {
    // Handle initial route
    this.handleRouteChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRouteChange());
  },
  
  // Get current route from URL hash
  getRoute() {
    const hash = window.location.hash.substring(1) || CONFIG.ROUTES.LOGIN;
    return hash;
  },
  
  // Navigate to a specific route
  navigate(route) {
    window.location.hash = '#' + route;
  },
  
  // Handle route changes
  async handleRouteChange() {
    const route = this.getRoute();
    
    // Check if route requires authentication
    const publicRoutes = [CONFIG.ROUTES.LOGIN, CONFIG.ROUTES.REGISTER];
    const isPublicRoute = publicRoutes.includes(route);
    
    // If not authenticated and trying to access protected route, redirect to login
    if (!isPublicRoute && !Auth.isAuthenticated()) {
      this.navigate(CONFIG.ROUTES.LOGIN);
      return;
    }
    
    // If authenticated and trying to access login/register, redirect to dashboard
    if (isPublicRoute && Auth.isAuthenticated()) {
      this.navigate(CONFIG.ROUTES.DASHBOARD);
      return;
    }
    
    // Update current route
    this.currentRoute = route;
    
    // Render the appropriate view
    this.renderView(route);
  },
  
  // Render view based on route
  renderView(route) {
    const appElement = document.getElementById('app');
    
    // Clear loading indicator
    appElement.innerHTML = '';
    
    // Render appropriate template
    switch (route) {
      case CONFIG.ROUTES.LOGIN:
        this.renderTemplate('login-template', appElement);
        this.initLoginHandlers();
        break;
        
      case CONFIG.ROUTES.REGISTER:
        this.renderTemplate('register-template', appElement);
        this.initRegisterHandlers();
        break;
        
      case CONFIG.ROUTES.DASHBOARD:
      case CONFIG.ROUTES.ANIMALS:
      case CONFIG.ROUTES.CROPS:
      case CONFIG.ROUTES.INVENTORY:
      case CONFIG.ROUTES.SALES:
      case CONFIG.ROUTES.EXPENSES:
      case CONFIG.ROUTES.REPORTS:
      case CONFIG.ROUTES.VETS:
      case CONFIG.ROUTES.SETTINGS:
      case CONFIG.ROUTES.PROFILE:
        this.renderTemplate('dashboard-template', appElement);
        this.initDashboardHandlers();
        this.loadPageContent(route);
        break;
        
      default:
        // Handle 404 or redirect to dashboard
        this.navigate(CONFIG.ROUTES.DASHBOARD);
        break;
    }
  },
  
  // Render template
  renderTemplate(templateId, targetElement) {
    const template = document.getElementById(templateId);
    const clone = document.importNode(template.content, true);
    targetElement.appendChild(clone);
  },
  
  // Initialize login form handlers
  initLoginHandlers() {
    const loginForm = document.getElementById('login-form');
    const registerLink = document.getElementById('register-link');
    
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
          await Auth.login(email, password);
          this.navigate(CONFIG.ROUTES.DASHBOARD);
        } catch (error) {
          alert('Login failed: ' + error.message);
        }
      });
    }
    
    if (registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(CONFIG.ROUTES.REGISTER);
      });
    }
  },
  
  // Initialize register form handlers
  initRegisterHandlers() {
    const registerForm = document.getElementById('register-form');
    const loginLink = document.getElementById('login-link');
    
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const userData = {
          username: document.getElementById('username').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          phone: document.getElementById('phone').value,
          role: document.getElementById('role').value
        };
        
        // Validate password confirmation
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (userData.password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        
        try {
          await Auth.register(userData);
          this.navigate(CONFIG.ROUTES.DASHBOARD);
        } catch (error) {
          alert('Registration failed: ' + error.message);
        }
      });
    }
    
    if (loginLink) {
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(CONFIG.ROUTES.LOGIN);
      });
    }
  },
  
  // Initialize dashboard handlers
  initDashboardHandlers() {
    // Set user name in header
    const user = Auth.getCurrentUser();
    const userNameElement = document.getElementById('user-name');
    if (userNameElement && user) {
      userNameElement.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    // Handle sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logout-btn');
    const logoutLink = document.getElementById('logout-link');
    
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Auth.logout();
      });
    }
    
    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        Auth.logout();
      });
    }
    
    // Handle sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remove active class from all links
        sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
        // Add active class to clicked link
        link.parentElement.classList.add('active');
        
        // On mobile, close sidebar after navigation
        if (window.innerWidth < 992) {
          sidebar.classList.remove('active');
        }
      });
      
      // Set active link based on current route
      const linkRoute = link.getAttribute('href').substring(1);
      if (linkRoute === this.currentRoute) {
        link.parentElement.classList.add('active');
      }
    });
  },
  
  // Load page-specific content
  loadPageContent(route) {
    // Set page title
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
      pageTitle.textContent = this.getPageTitle(route);
    }
    
    // Load page-specific content
    switch (route) {
      case CONFIG.ROUTES.DASHBOARD:
        this.loadDashboardContent();
        break;
        
      case CONFIG.ROUTES.ANIMALS:
        // Load animals content
        break;
        
      case CONFIG.ROUTES.CROPS:
        // Load crops content
        break;
        
      // Add other routes as needed
    }
  },
  
  // Get page title based on route
  getPageTitle(route) {
    switch (route) {
      case CONFIG.ROUTES.DASHBOARD: return 'Dashboard';
      case CONFIG.ROUTES.ANIMALS: return 'Animals';
      case CONFIG.ROUTES.CROPS: return 'Crops';
      case CONFIG.ROUTES.INVENTORY: return 'Inventory';
      case CONFIG.ROUTES.SALES: return 'Sales';
      case CONFIG.ROUTES.EXPENSES: return 'Expenses';
      case CONFIG.ROUTES.REPORTS: return 'Reports';
      case CONFIG.ROUTES.VETS: return 'Veterinarians';
      case CONFIG.ROUTES.SETTINGS: return 'Settings';
      case CONFIG.ROUTES.PROFILE: return 'Profile';
      default: return 'Farm360';
    }
  },
  
  // Load dashboard content
  async loadDashboardContent() {
    try {
      // For demo purposes, set some sample data
      document.getElementById('animal-count').textContent = '4';
      document.getElementById('crop-count').textContent = '3';
      document.getElementById('revenue-amount').textContent = '$6,150.00';
      document.getElementById('expense-amount').textContent = '$2,476.75';
      
      // In a real implementation, we would fetch this data from the API
      // const stats = await API.dashboard.getStats();
      // document.getElementById('animal-count').textContent = stats.animalCount;
      // document.getElementById('crop-count').textContent = stats.cropCount;
      // document.getElementById('revenue-amount').textContent = formatCurrency(stats.revenue);
      // document.getElementById('expense-amount').textContent = formatCurrency(stats.expenses);
    } catch (error) {
      console.error('Error loading dashboard content:', error);
    }
  }
};