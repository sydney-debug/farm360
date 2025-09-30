-- Seed users with different roles
INSERT INTO users (username, email, password, role, first_name, last_name, phone)
VALUES 
  ('farmer1', 'farmer1@farm360.com', '$2a$10$xVCf0TdQXQ5.vQjXUGCJXOgbZH.3NULFoQPnrwjX9EFBv4zcfQJLe', 'farmer', 'John', 'Doe', '555-123-4567'),
  ('manager1', 'manager1@farm360.com', '$2a$10$xVCf0TdQXQ5.vQjXUGCJXOgbZH.3NULFoQPnrwjX9EFBv4zcfQJLe', 'manager', 'Jane', 'Smith', '555-234-5678'),
  ('vet1', 'vet1@farm360.com', '$2a$10$xVCf0TdQXQ5.vQjXUGCJXOgbZH.3NULFoQPnrwjX9EFBv4zcfQJLe', 'vet', 'Robert', 'Johnson', '555-345-6789');

-- Seed farms
INSERT INTO farms (name, address, city, state, zip_code, country, latitude, longitude)
VALUES 
  ('Green Valley Farm', '123 Farm Road', 'Farmville', 'CA', '95678', 'USA', 38.5949, -121.5034),
  ('Sunset Ranch', '456 Ranch Lane', 'Ranchtown', 'TX', '75001', 'USA', 32.9342, -96.8675);

-- Associate users with farms
INSERT INTO farm_users (farm_id, user_id, is_owner)
VALUES 
  (1, 1, true),  -- John Doe owns Green Valley Farm
  (1, 2, false), -- Jane Smith manages Green Valley Farm
  (2, 1, false), -- John Doe works at Sunset Ranch
  (2, 2, true);  -- Jane Smith owns Sunset Ranch

-- Seed veterinarian data
INSERT INTO veterinarians (user_id, specialization, license_number, practice_name, address, city, state, zip_code, country, latitude, longitude, available_for_emergency)
VALUES 
  (3, 'Large Animal Medicine', 'VET12345', 'Country Vet Clinic', '789 Vet Way', 'Vetville', 'CA', '95680', 'USA', 38.6023, -121.4944, true);

-- Seed animals
INSERT INTO animals (farm_id, tag_number, name, species, breed, gender, date_of_birth, weight_kg, status)
VALUES 
  (1, 'A001', 'Bessie', 'Cattle', 'Holstein', 'female', '2020-03-15', 650.5, 'active'),
  (1, 'A002', 'Ferdinand', 'Cattle', 'Angus', 'male', '2019-05-20', 850.3, 'active'),
  (1, 'A003', 'Daisy', 'Cattle', 'Jersey', 'female', '2021-01-10', 420.7, 'active'),
  (2, 'A004', 'Spot', 'Cattle', 'Hereford', 'male', '2020-07-05', 780.2, 'active');

-- Seed calves
INSERT INTO calves (animal_id, birth_weight_kg, weaning_date, weaning_weight_kg, notes)
VALUES 
  (3, 35.2, '2021-08-15', 120.5, 'Healthy calf, good growth rate');

-- Seed health records
INSERT INTO health_records (animal_id, record_date, record_type, description, diagnosis, treatment, medication, dosage, administered_by, veterinarian_id, cost)
VALUES 
  (1, '2023-01-15', 'vaccination', 'Annual vaccination', NULL, 'Administered vaccine', 'Bovine 5-way', '10ml', 1, 1, 45.00),
  (2, '2023-02-20', 'treatment', 'Limping on front right leg', 'Minor hoof infection', 'Cleaned and treated hoof', 'Antibiotic ointment', '15g', 3, 1, 75.50);

-- Seed crops
INSERT INTO crops (farm_id, name, variety, field_location, area_hectares, planting_date, expected_harvest_date)
VALUES 
  (1, 'Corn', 'Sweet Corn', 'North Field', 5.5, '2023-04-10', '2023-08-15'),
  (1, 'Soybeans', 'Round-Up Ready', 'East Field', 4.2, '2023-05-05', '2023-09-20'),
  (2, 'Wheat', 'Hard Red Winter', 'Main Field', 8.0, '2022-10-15', '2023-07-01');

-- Seed crop health records
INSERT INTO crop_health_records (crop_id, record_date, record_type, description, treatment, product_used, application_rate, applied_by, cost)
VALUES 
  (1, '2023-05-20', 'treatment', 'Pest control - corn borer', 'Sprayed insecticide', 'EcoPest Control', '2.5L/hectare', 1, 120.75),
  (2, '2023-06-10', 'fertilization', 'Mid-season fertilization', 'Applied fertilizer', 'BalancedGrow N-P-K', '200kg/hectare', 2, 350.00);

-- Seed inventory categories
INSERT INTO inventory_categories (name, description)
VALUES 
  ('Feed', 'Animal feed and supplements'),
  ('Seed', 'Crop seeds and planting materials'),
  ('Equipment', 'Farm machinery and tools'),
  ('Medication', 'Animal medications and treatments'),
  ('Fertilizer', 'Crop fertilizers and soil amendments');

-- Seed inventory items
INSERT INTO inventory_items (farm_id, category_id, name, description, quantity, unit, unit_price, reorder_level, location)
VALUES 
  (1, 1, 'Cattle Feed', 'Premium cattle feed mix', 2500, 'kg', 0.45, 500, 'Feed Barn A'),
  (1, 2, 'Corn Seed', 'Sweet corn hybrid seed', 50, 'kg', 8.75, 10, 'Seed Storage'),
  (1, 4, 'Antibiotic', 'General purpose antibiotic', 5, 'liters', 85.00, 2, 'Medicine Cabinet'),
  (2, 3, 'Tractor Parts', 'Replacement parts for John Deere', 12, 'pieces', 125.50, 3, 'Equipment Shed');

-- Seed sales
INSERT INTO sales (farm_id, sale_date, customer_name, sale_type, description, quantity, unit, unit_price, total_price, payment_method, payment_status, recorded_by)
VALUES 
  (1, '2023-03-10', 'Local Dairy Co.', 'animal', 'Sold 2 dairy cows', 2, 'head', 1200.00, 2400.00, 'check', 'paid', 2),
  (1, '2023-04-05', 'Organic Foods Inc.', 'crop', 'Sold last season corn', 12500, 'kg', 0.30, 3750.00, 'bank transfer', 'paid', 2),
  (2, '2023-03-25', 'Grain Processors LLC', 'crop', 'Sold wheat', 15000, 'kg', 0.28, 4200.00, 'bank transfer', 'paid', 2);

-- Seed expenses
INSERT INTO expenses (farm_id, expense_date, category, vendor, description, amount, payment_method, reference_number, recorded_by)
VALUES 
  (1, '2023-02-05', 'Feed', 'Feed Supplier Co.', 'Monthly feed purchase', 1250.75, 'credit card', 'INV-12345', 2),
  (1, '2023-02-15', 'Fuel', 'Farm Gas Station', 'Diesel for tractors', 350.25, 'credit card', 'RCT-6789', 1),
  (2, '2023-02-10', 'Equipment', 'Farm Equipment Inc.', 'Tractor maintenance', 875.50, 'check', 'CHK-1001', 2),
  (2, '2023-03-01', 'Seed', 'Seed Supplier LLC', 'Spring planting seeds', 1200.00, 'bank transfer', 'TRF-2345', 2);

-- Seed financial reports
INSERT INTO financial_reports (farm_id, report_type, start_date, end_date, total_income, total_expenses, net_profit, generated_by)
VALUES 
  (1, 'profit_loss', '2023-01-01', '2023-03-31', 6150.00, 2476.75, 3673.25, 2),
  (2, 'profit_loss', '2023-01-01', '2023-03-31', 4200.00, 2075.50, 2124.50, 2);