-- Create users table with role-based access
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('farmer', 'manager', 'vet')),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create farms table
CREATE TABLE farms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  country VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create farm_users junction table
CREATE TABLE farm_users (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  is_owner BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(farm_id, user_id)
);

-- Create animals table
CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
  tag_number VARCHAR(50) NOT NULL,
  name VARCHAR(100),
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(50),
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'unknown')),
  date_of_birth DATE,
  weight_kg DECIMAL(8, 2),
  status VARCHAR(20) CHECK (status IN ('active', 'sold', 'deceased')),
  mother_id INTEGER REFERENCES animals(id),
  father_id INTEGER REFERENCES animals(id),
  purchase_date DATE,
  purchase_price DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create calves table (specialized for tracking young animals)
CREATE TABLE calves (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
  birth_weight_kg DECIMAL(6, 2),
  weaning_date DATE,
  weaning_weight_kg DECIMAL(6, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create veterinarians table
CREATE TABLE veterinarians (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(100),
  license_number VARCHAR(50),
  practice_name VARCHAR(100),
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  zip_code VARCHAR(20),
  country VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  available_for_emergency BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create health_records table
CREATE TABLE health_records (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id) ON DELETE CASCADE,
  record_date DATE NOT NULL,
  record_type VARCHAR(50) CHECK (record_type IN ('vaccination', 'treatment', 'examination', 'surgery', 'other')),
  description TEXT,
  diagnosis TEXT,
  treatment TEXT,
  medication VARCHAR(100),
  dosage VARCHAR(50),
  administered_by INTEGER REFERENCES users(id),
  veterinarian_id INTEGER REFERENCES veterinarians(id),
  cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create attachments table for health records
CREATE TABLE attachments (
  id SERIAL PRIMARY KEY,
  health_record_id INTEGER REFERENCES health_records(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create crops table
CREATE TABLE crops (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  variety VARCHAR(100),
  field_location VARCHAR(100),
  area_hectares DECIMAL(10, 2),
  planting_date DATE,
  expected_harvest_date DATE,
  actual_harvest_date DATE,
  yield_amount DECIMAL(10, 2),
  yield_unit VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create crop_health_records table
CREATE TABLE crop_health_records (
  id SERIAL PRIMARY KEY,
  crop_id INTEGER REFERENCES crops(id) ON DELETE CASCADE,
  record_date DATE NOT NULL,
  record_type VARCHAR(50) CHECK (record_type IN ('inspection', 'treatment', 'fertilization', 'irrigation', 'other')),
  description TEXT,
  treatment TEXT,
  product_used VARCHAR(100),
  application_rate VARCHAR(50),
  applied_by INTEGER REFERENCES users(id),
  cost DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create crop_attachments table
CREATE TABLE crop_attachments (
  id SERIAL PRIMARY KEY,
  crop_health_record_id INTEGER REFERENCES crop_health_records(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_categories table
CREATE TABLE inventory_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_items table
CREATE TABLE inventory_items (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES inventory_categories(id),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  quantity DECIMAL(10, 2),
  unit VARCHAR(20),
  unit_price DECIMAL(10, 2),
  reorder_level DECIMAL(10, 2),
  location VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create inventory_transactions table
CREATE TABLE inventory_transactions (
  id SERIAL PRIMARY KEY,
  inventory_item_id INTEGER REFERENCES inventory_items(id) ON DELETE CASCADE,
  transaction_type VARCHAR(20) CHECK (transaction_type IN ('purchase', 'use', 'adjustment', 'transfer')),
  quantity DECIMAL(10, 2),
  transaction_date DATE NOT NULL,
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  supplier VARCHAR(100),
  invoice_number VARCHAR(50),
  notes TEXT,
  recorded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sales table
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
  sale_date DATE NOT NULL,
  customer_name VARCHAR(100),
  sale_type VARCHAR(50) CHECK (sale_type IN ('animal', 'crop', 'product', 'other')),
  description TEXT,
  quantity DECIMAL(10, 2),
  unit VARCHAR(20),
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) CHECK (payment_status IN ('paid', 'pending', 'partial', 'cancelled')),
  notes TEXT,
  recorded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create animal_sales junction table
CREATE TABLE animal_sales (
  id SERIAL PRIMARY KEY,
  sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
  animal_id INTEGER REFERENCES animals(id),
  sale_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create crop_sales junction table
CREATE TABLE crop_sales (
  id SERIAL PRIMARY KEY,
  sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
  crop_id INTEGER REFERENCES crops(id),
  quantity DECIMAL(10, 2),
  unit VARCHAR(20),
  sale_price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create expenses table
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
  expense_date DATE NOT NULL,
  category VARCHAR(50) NOT NULL,
  vendor VARCHAR(100),
  description TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50),
  reference_number VARCHAR(50),
  notes TEXT,
  recorded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create expense_attachments table
CREATE TABLE expense_attachments (
  id SERIAL PRIMARY KEY,
  expense_id INTEGER REFERENCES expenses(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_size INTEGER,
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create financial_reports table
CREATE TABLE financial_reports (
  id SERIAL PRIMARY KEY,
  farm_id INTEGER REFERENCES farms(id) ON DELETE CASCADE,
  report_type VARCHAR(50) CHECK (report_type IN ('profit_loss', 'balance_sheet', 'cash_flow', 'custom')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_income DECIMAL(12, 2),
  total_expenses DECIMAL(12, 2),
  net_profit DECIMAL(12, 2),
  notes TEXT,
  generated_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_animals_farm_id ON animals(farm_id);
CREATE INDEX idx_animals_tag_number ON animals(tag_number);
CREATE INDEX idx_health_records_animal_id ON health_records(animal_id);
CREATE INDEX idx_crops_farm_id ON crops(farm_id);
CREATE INDEX idx_inventory_items_farm_id ON inventory_items(farm_id);
CREATE INDEX idx_sales_farm_id ON sales(farm_id);
CREATE INDEX idx_expenses_farm_id ON expenses(farm_id);
CREATE INDEX idx_users_role ON users(role);