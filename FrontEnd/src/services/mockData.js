export const mockEmployees = [
  {
    id: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    password: 'password123',
    role: 'admin',
    department: 'Human Resources',
    position: 'HR Manager',
    salary: 85000,
    joinDate: '2020-03-15',
    phone: '+1 234-567-8901',
    address: '123 Main St, City, Country',
    avatar: null,
    documents: [
      { name: 'Resume', uploaded: '2020-03-10' },
      { name: 'Contract', uploaded: '2020-03-15' },
      { name: 'ID Proof', uploaded: '2020-03-15' }
    ],
    attendance: [
      { date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-16', checkIn: '09:15', checkOut: '18:30', status: 'present' },
      { date: '2024-01-17', checkIn: null, checkOut: null, status: 'absent' },
      { date: '2024-01-18', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-19', checkIn: '09:30', checkOut: '17:30', status: 'present' }
    ],
    leaveRequests: [
      { id: 1, type: 'Sick Leave', startDate: '2024-01-20', endDate: '2024-01-22', reason: 'Not feeling well', status: 'pending', comments: '' }
    ]
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    password: 'password123',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 75000,
    joinDate: '2021-06-01',
    phone: '+1 234-567-8902',
    address: '456 Oak Ave, City, Country',
    avatar: null,
    documents: [
      { name: 'Resume', uploaded: '2021-05-20' },
      { name: 'Contract', uploaded: '2021-06-01' }
    ],
    attendance: [
      { date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-16', checkIn: '08:45', checkOut: '17:45', status: 'present' },
      { date: '2024-01-17', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-18', checkIn: null, checkOut: null, status: 'leave' },
      { date: '2024-01-19', checkIn: '09:00', checkOut: '18:00', status: 'present' }
    ],
    leaveRequests: [
      { id: 2, type: 'Annual Leave', startDate: '2024-01-18', endDate: '2024-01-18', reason: 'Personal work', status: 'approved', comments: 'Approved by manager' }
    ]
  },
  {
    id: 'EMP003',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    password: 'password123',
    role: 'employee',
    department: 'Marketing',
    position: 'Marketing Specialist',
    salary: 55000,
    joinDate: '2022-01-10',
    phone: '+1 234-567-8903',
    address: '789 Pine Rd, City, Country',
    avatar: null,
    documents: [
      { name: 'Resume', uploaded: '2021-12-20' },
      { name: 'Contract', uploaded: '2022-01-10' },
      { name: 'ID Proof', uploaded: '2022-01-10' }
    ],
    attendance: [
      { date: '2024-01-15', checkIn: '09:30', checkOut: '18:30', status: 'present' },
      { date: '2024-01-16', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-17', checkIn: '09:15', checkOut: '18:15', status: 'present' },
      { date: '2024-01-18', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-19', checkIn: null, checkOut: null, status: 'absent' }
    ],
    leaveRequests: [
      { id: 3, type: 'Sick Leave', startDate: '2024-01-19', endDate: '2024-01-19', reason: 'Fever', status: 'pending', comments: '' }
    ]
  },
  {
    id: 'EMP004',
    name: 'Sarah Williams',
    email: 'sarah.williams@company.com',
    password: 'password123',
    role: 'employee',
    department: 'Finance',
    position: 'Financial Analyst',
    salary: 65000,
    joinDate: '2021-09-15',
    phone: '+1 234-567-8904',
    address: '321 Elm St, City, Country',
    avatar: null,
    documents: [
      { name: 'Resume', uploaded: '2021-08-20' },
      { name: 'Contract', uploaded: '2021-09-15' }
    ],
    attendance: [
      { date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-16', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-17', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-18', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-19', checkIn: '09:00', checkOut: '18:00', status: 'present' }
    ],
    leaveRequests: []
  },
  {
    id: 'EMP005',
    name: 'David Brown',
    email: 'david.brown@company.com',
    password: 'password123',
    role: 'employee',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 45000,
    joinDate: '2023-02-01',
    phone: '+1 234-567-8905',
    address: '654 Maple Dr, City, Country',
    avatar: null,
    documents: [
      { name: 'Resume', uploaded: '2023-01-15' },
      { name: 'Contract', uploaded: '2023-02-01' },
      { name: 'ID Proof', uploaded: '2023-02-01' }
    ],
    attendance: [
      { date: '2024-01-15', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-16', checkIn: '09:00', checkOut: '18:00', status: 'present' },
      { date: '2024-01-17', checkIn: null, checkOut: null, status: 'leave' },
      { date: '2024-01-18', checkIn: null, checkOut: null, status: 'leave' },
      { date: '2024-01-19', checkIn: '09:00', checkOut: '18:00', status: 'present' }
    ],
    leaveRequests: [
      { id: 4, type: 'Annual Leave', startDate: '2024-01-17', endDate: '2024-01-18', reason: 'Vacation', status: 'approved', comments: 'Enjoy your vacation!' }
    ]
  }
];

export const getAllEmployees = () => mockEmployees;

export const getEmployeeById = (id) => mockEmployees.find(emp => emp.id === id);

export const getEmployeeByEmail = (email) => mockEmployees.find(emp => emp.email === email);

export const authenticateUser = (email, password) => {
  const user = mockEmployees.find(emp => emp.email === email && emp.password === password);
  if (user) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};
