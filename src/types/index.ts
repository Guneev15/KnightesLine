export type UserRole = 'student' | 'parent' | 'coach' | 'admin';

export type SubscriptionTier = 'none' | 'starter' | 'pro' | 'elite';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar: string;
  rating: number;
  monthlyRatingDelta: number;
  streakDays: number;
  xp: number;
  level: number;
  subscriptionTier: SubscriptionTier;
  subscriptionValidUntil?: string;
  parentLinkedChildId?: string;
  coachTitle?: string;
  badges: Badge[];
  learningGoal?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string; // e.g. "Grandmaster", "International Master", "FIDE Master", "Senior FIDE Trainer"
  fideRating: number;
  experienceYears: number;
  studentsTaught: number;
  hourlyRate: number; // in INR
  rating: number; // e.g. 4.95
  reviewCount: number;
  avatar: string;
  bio: string;
  specialties: string[];
  languages: string[];
  achievements: string[];
  availableSlots: string[]; // e.g. ["Mon 4:00 PM", "Tue 6:30 PM", "Sat 11:00 AM"]
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  durationMinutes: number;
  isCompleted: boolean;
  fen: string;
  pgnMoves?: string[];
  summary: string;
  interactiveChallenge?: {
    prompt: string;
    correctMoves: string[]; // in SAN e.g. ['Nf3', 'd5']
    explanation: string;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Competitive';
  tagline: string;
  description: string;
  thumbnail: string;
  instructorName: string;
  instructorTitle: string;
  enrolledCount: number;
  rating: number;
  totalDurationHours: number;
  modules: CourseModule[];
  progressPercent: number;
}

export interface Puzzle {
  id: string;
  title: string;
  rating: number;
  fen: string;
  playerColor: 'white' | 'black';
  theme: string;
  solutionMoves: string[]; // SAN moves sequence: e.g. ['Qxf7+', 'Kh8', 'Qf8#']
  hint: string;
  tacticalExplanation: string;
}

export interface CriticalMoment {
  moveNumber: number;
  ply: number;
  fen: string;
  move: string;
  player: 'white' | 'black';
  classification: 'brilliant' | 'best' | 'good' | 'inaccuracy' | 'mistake' | 'blunder';
  evalBefore: number;
  evalAfter: number;
  explanation: string;
  betterMove?: string;
}

export interface GameAnalysis {
  id: string;
  title: string;
  date: string;
  playerWhite: string;
  playerBlack: string;
  whiteElo: number;
  blackElo: number;
  result: string;
  accuracyWhite: number;
  accuracyBlack: number;
  openingName: string;
  openingAccuracy: number;
  middlegameAccuracy: number;
  endgameAccuracy: number;
  turningPointMove: number;
  turningPointSummary: string;
  criticalMoments: CriticalMoment[];
  pgn: string;
}

export interface FreeTrialBooking {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  ageGrade: string;
  playerLevel: 'Complete Beginner' | 'Club Player (800-1200)' | 'Intermediate (1200-1600)' | 'Competitive (1600+)';
  preferredDate: string;
  preferredTime: string;
  learningGoal: string;
  coachPreference?: string;
  status: 'confirmed' | 'pending' | 'completed';
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  tagline: string;
  popular?: boolean;
  features: string[];
  suitableFor: string;
}

export interface PaymentRecord {
  id: string;
  invoiceNo: string;
  date: string;
  amount: number;
  currency: string;
  planName: string;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Razorpay';
  status: 'Successful' | 'Pending' | 'Refunded';
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'class' | 'coach' | 'streak' | 'payment' | 'puzzle' | 'achievement';
  actionUrl?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorTitle?: string;
  authorAvatar: string;
  timestamp: string;
  title: string;
  content: string;
  fen?: string;
  likes: number;
  isLiked?: boolean;
  repliesCount: number;
  tags: string[];
  replies: {
    id: string;
    authorName: string;
    authorAvatar: string;
    timestamp: string;
    content: string;
  }[];
}

export interface ClassroomState {
  roomId: string;
  coachName: string;
  studentName: string;
  fen: string;
  activeTurn: 'w' | 'b';
  drawings: {
    type: 'arrow' | 'highlight';
    from: string;
    to?: string;
    color: string;
  }[];
  notes: string[];
  isMicMuted: boolean;
  isCameraOff: boolean;
}
