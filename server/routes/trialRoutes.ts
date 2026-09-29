import { Router, Request, Response } from 'express';
import { db, TrialBookingRecord } from '../db';
import { authenticateJwt, requireRole } from '../middleware/auth';

const router = Router();

// POST /api/trials/book
router.post('/book', (req: Request, res: Response): void => {
  try {
    const { parentName, email, phone, childName, childAge, experienceLevel, preferredTimeSlot, notes } = req.body;

    if (!parentName || !email || !phone || !childName) {
      res.status(400).json({
        success: false,
        message: 'Parent name, email, phone, and student name are required to schedule an evaluation.',
      });
      return;
    }

    const newBooking: TrialBookingRecord = {
      id: 'trial_' + Date.now(),
      parentName: parentName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      childName: childName.trim(),
      childAge: Number(childAge) || 9,
      experienceLevel: experienceLevel || 'beginner',
      preferredTimeSlot: preferredTimeSlot || 'Weekend Morning (10:00 AM)',
      notes: notes || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    const saved = db.createTrialBooking(newBooking);

    res.status(201).json({
      success: true,
      message: 'Complimentary Grandmaster Evaluation trial session confirmed!',
      booking: saved,
    });
  } catch (err) {
    console.error('Trial booking error:', err);
    res.status(500).json({ success: false, message: 'Failed to record trial booking.' });
  }
});

// GET /api/trials (Admin and Coach portal access)
router.get('/', authenticateJwt, requireRole(['admin', 'coach']), (_req: Request, res: Response): void => {
  const trials = db.getAllTrialBookings();
  res.json({
    success: true,
    trials,
  });
});

export default router;
