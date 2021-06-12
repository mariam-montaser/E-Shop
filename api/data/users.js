import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('55555', 11),
    isAdmin: true
  },
  {
    name: 'Mariam',
    email: 'mariam@gmail.com',
    password: bcrypt.hashSync('55555', 11)
  },
  {
    name: 'Mohamed',
    email: 'Mohamed@gmail.com',
    password: bcrypt.hashSync('55555', 11)
  }
]

export default users;