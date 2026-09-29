import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, UserRecord } from '../db';
import { config } from '../config/env';
import { authenticateJwt, AuthRequest } from '../middleware/auth';

const router = Router();

const sanitizeUser = (user: UserRecord) => {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role = 'student', phone } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
      return;
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      res.status(400).json({ success: false, message: 'An account with this email already exists.' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = db.createUser({
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      phone: phone || '',
      role: ['student', 'parent', 'coach', 'admin'].includes(role) ? role : 'student',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      rating: 1200,
      monthlyRatingDelta: 0,
      streakDays: 1,
      xp: 100,
      level: 1,
      subscriptionTier: 'starter',
      badges: [],
      learningGoal: 'Master opening fundamentals and build tactical vision',
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as any }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role } = req.body;

    // Quick role login bypass for demo purposes if requested
    if (role && !email && !password) {
      const demoUsers = db.getAllUsers().filter((u) => u.role === role);
      if (demoUsers.length > 0) {
        const demoUser = demoUsers[0];
        const token = jwt.sign(
          { id: demoUser.id, email: demoUser.email, role: demoUser.role },
          config.jwt.secret,
          { expiresIn: config.jwt.expiresIn as any }
        );
        res.json({
          success: true,
          message: `Logged in as demo ${role}`,
          token,
          user: sanitizeUser(demoUser),
        });
        return;
      }
    }

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please provide both email and password.' });
      return;
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn as any }
    );

    res.json({
      success: true,
      message: 'Authentication successful!',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateJwt, (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return;
  }
  res.json({
    success: true,
    user: sanitizeUser(req.user),
  });
});

// PUT /api/auth/profile
router.put('/profile', authenticateJwt, (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ success: false, message: 'Not authenticated' });
    return;
  }

  const { name, phone, avatar, learningGoal } = req.body;
  const updated = db.updateUser(req.user.id, {
    ...(name && { name: name.trim() }),
    ...(phone !== undefined && { phone }),
    ...(avatar && { avatar }),
    ...(learningGoal && { learningGoal }),
  });

  if (!updated) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  res.json({
    success: true,
    message: 'Profile updated successfully!',
    user: sanitizeUser(updated),
  });
});

export default router;
