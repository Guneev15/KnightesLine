import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: 'student' | 'parent' | 'coach' | 'admin';
  avatar?: string;
  rating: number;
  monthlyRatingDelta: number;
  streakDays: number;
  xp: number;
  level: number;
  subscriptionTier: 'starter' | 'pro' | 'elite';
  subscriptionValidUntil?: string;
  parentLinkedChildId?: string;
  badges?: Array<{ id: string; name: string; description: string; icon: string; unlockedAt: string }>;
  learningGoal?: string;
  coachTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  planId: string;
  planName: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  amount: number;
  currency: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
  invoiceUrl?: string;
  createdAt: string;
}

export interface TrialBookingRecord {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredTimeSlot: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

interface DatabaseSchema {
  users: UserRecord[];
  payments: PaymentRecord[];
  trials: TrialBookingRecord[];
}

const DB_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

class Database {
  private data: DatabaseSchema = {
    users: [],
    payments: [],
    trials: [],
  };

  constructor() {
    this.init();
  }

  private init() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch (err) {
        console.error('Failed to parse database file, resetting to defaults', err);
        this.seedInitialUsers();
        this.save();
      }
    } else {
      this.seedInitialUsers();
      this.save();
    }
  }

  private seedInitialUsers() {
    const salt = bcrypt.genSaltSync(10);
    const defaultPasswordHash = bcrypt.hashSync('password123', salt);
    const now = new Date().toISOString();

    this.data.users = [
      {
        id: 'usr_student_01',
        name: 'Aryan Sharma',
        email: 'aryan.chess@gmail.com',
        passwordHash: defaultPasswordHash,
        phone: '+91 98765 43210',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        rating: 1248,
        monthlyRatingDelta: 86,
        streakDays: 7,
        xp: 2840,
        level: 14,
        subscriptionTier: 'pro',
        subscriptionValidUntil: '2026-10-25',
        badges: [
          { id: 'b1', name: 'Tactical Beast', description: 'Solved 50 tactical puzzles with >80% accuracy', icon: '🧠', unlockedAt: '2026-09-15' },
          { id: 'b2', name: '7-Day Streak', description: 'Trained every single day for a week', icon: '🔥', unlockedAt: '2026-09-22' },
        ],
        learningGoal: 'Cross 1500 rating and master the Italian Game',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr_parent_01',
        name: 'Pooja Sharma',
        email: 'pooja.sharma@yahoo.com',
        passwordHash: defaultPasswordHash,
        phone: '+91 98765 43210',
        role: 'parent',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        rating: 0,
        monthlyRatingDelta: 0,
        streakDays: 7,
        xp: 1200,
        level: 1,
        subscriptionTier: 'pro',
        parentLinkedChildId: 'usr_student_01',
        badges: [],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr_coach_01',
        name: 'IM Vikramaditya Rao',
        email: 'vikram.im@knightesline.com',
        passwordHash: defaultPasswordHash,
        phone: '+91 99887 76655',
        role: 'coach',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        rating: 2410,
        monthlyRatingDelta: 12,
        streakDays: 45,
        xp: 15400,
        level: 32,
        subscriptionTier: 'elite',
        coachTitle: 'International Master',
        badges: [
          { id: 'cb1', name: 'Master Trainer', description: 'Coached over 300 students to national ratings', icon: '👑', unlockedAt: '2025-01-10' },
        ],
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 'usr_admin_01',
        name: 'Devendra Singh',
        email: 'admin@knightesline.com',
        passwordHash: defaultPasswordHash,
        phone: '+91 98200 11223',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        rating: 2150,
        monthlyRatingDelta: 0,
        streakDays: 120,
        xp: 35000,
        level: 50,
        subscriptionTier: 'elite',
        badges: [
          { id: 'ab1', name: 'Platform Founder', description: 'Building the next era of chess learning', icon: '⚡', unlockedAt: '2024-01-01' },
        ],
        createdAt: now,
        updatedAt: now,
      },
    ];

    this.data.payments = [
      {
        id: 'pay_demo_01',
        userId: 'usr_student_01',
        userEmail: 'aryan.chess@gmail.com',
        userName: 'Aryan Sharma',
        planId: 'plan_pro',
        planName: 'Grandmaster Aspirant (Pro)',
        billingCycle: 'monthly',
        amount: 1499,
        currency: 'INR',
        razorpayOrderId: 'order_demo_001',
        razorpayPaymentId: 'pay_demo_rzp_001',
        paymentMethod: 'UPI',
        status: 'completed',
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
      },
    ];
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to database file', err);
    }
  }

  // --- Users Operations ---
  public findUserByEmail(email: string): UserRecord | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): UserRecord | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public createUser(user: Omit<UserRecord, 'createdAt' | 'updatedAt'>): UserRecord {
    const now = new Date().toISOString();
    const newUser: UserRecord = {
      ...user,
      createdAt: now,
      updatedAt: now,
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  public updateUser(id: string, updates: Partial<UserRecord>): UserRecord | undefined {
    const index = this.data.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    this.data.users[index] = {
      ...this.data.users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.users[index];
  }

  public getAllUsers(): UserRecord[] {
    return this.data.users;
  }

  // --- Payments Operations ---
  public createPayment(payment: PaymentRecord): PaymentRecord {
    this.data.payments.unshift(payment);
    this.save();
    return payment;
  }

  public findPaymentsByUserId(userId: string): PaymentRecord[] {
    return this.data.payments.filter((p) => p.userId === userId);
  }

  public getAllPayments(): PaymentRecord[] {
    return this.data.payments;
  }

  // --- Trials Operations ---
  public createTrialBooking(trial: TrialBookingRecord): TrialBookingRecord {
    this.data.trials.unshift(trial);
    this.save();
    return trial;
  }

  public getAllTrialBookings(): TrialBookingRecord[] {
    return this.data.trials;
  }
}

export const db = new Database();
