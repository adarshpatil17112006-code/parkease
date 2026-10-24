import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'parkease_super_secret_jwt_key_2026';

export async function register(req, res) {
  try {
    const { name, email, password, phone, role = 'driver' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const db = await getDb();

    // Check if user already exists
    const existing = await db.get('SELECT id FROM users WHERE email = ?', email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      `INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)`,
      name.trim(),
      email.toLowerCase().trim(),
      hashedPassword,
      phone ? phone.trim() : null,
      role === 'owner' ? 'owner' : 'driver'
    );

    const newUser = {
      id: result.lastID,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role === 'owner' ? 'owner' : 'driver',
      phone: phone || null
    };

    const token = jwt.sign(newUser, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account registered successfully.',
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const db = await getDb();
    const user = await db.get('SELECT * FROM users WHERE email = ?', email.toLowerCase().trim());

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    };

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Logged in successfully.',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
}

export async function getMe(req, res) {
  try {
    const db = await getDb();
    const user = await db.get(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
      req.user.id
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ user });
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ error: 'Server error retrieving user profile.' });
  }
}

export async function getDemoAccounts(req, res) {
  res.json({
    driver: {
      email: 'alex.rivera@example.com',
      password: 'password123',
      role: 'driver',
      name: 'Alex Rivera'
    },
    owner: {
      email: 'host@parkease.com',
      password: 'password123',
      role: 'owner',
      name: 'Downtown Host Co.'
    }
  });
}
