import {
  UserProfile,
  Coach,
  Course,
  Puzzle,
  GameAnalysis,
  FreeTrialBooking,
  SubscriptionPlan,
  PaymentRecord,
  InAppNotification,
  CommunityPost,
  UserRole,
} from '../types';

// Default Profiles for easy switching / testing
export const MOCK_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: 'usr_student_01',
    name: 'Aryan Sharma',
    email: 'aryan.chess@gmail.com',
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
      { id: 'b3', name: 'First Checkmate', description: 'Delivered an in-classroom checkmate against coach bot', icon: '🏆', unlockedAt: '2026-09-08' },
      { id: 'b4', name: 'Survived the Opening', description: 'Reached move 15 with zero blunders in 5 rated games', icon: '💀', unlockedAt: '2026-09-19' },
    ],
    learningGoal: 'Cross 1500 rating and stop blundering my queen in the Italian game',
  },
  parent: {
    id: 'usr_parent_01',
    name: 'Pooja Sharma',
    email: 'pooja.sharma@yahoo.com',
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
  },
  coach: {
    id: 'usr_coach_01',
    name: 'IM Vikramaditya Rao',
    email: 'vikram.im@knightesline.com',
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
      { id: 'cb2', name: 'FIDE IM Title', description: 'Awarded International Master by FIDE', icon: '⭐', unlockedAt: '2022-04-14' },
    ],
  },
  admin: {
    id: 'usr_admin_01',
    name: 'Devendra Singh',
    email: 'admin@knightesline.com',
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
      { id: 'ab1', name: 'Platform Founder', description: 'Building the next era of chess learning', icon: '⚡', unlockedAt: '2024-01-01' }
    ],
  },
};

export const INITIAL_COACHES: Coach[] = [
  {
    id: 'c1',
    name: 'IM Vikramaditya Rao',
    title: 'International Master',
    fideRating: 2410,
    experienceYears: 11,
    studentsTaught: 340,
    hourlyRate: 1499,
    rating: 4.96,
    reviewCount: 142,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: 'FIDE International Master and former National Sub-Junior Champion. Specializes in tactical sharpness, opening preparation against 1.e4 and 1.d4, and converting winning endgames.',
    specialties: ['Dynamic Tactics', 'Sicilian Defense', 'King & Pawn Endgames', 'Tournament Prep'],
    languages: ['English', 'Hindi', 'Telugu'],
    achievements: ['FIDE International Master (2018)', 'Coach to 3 National Age-Group Gold Medalists', 'Defeated 6 Super GMs in Blitz'],
    availableSlots: ['Mon 4:00 PM', 'Tue 6:30 PM', 'Thu 5:00 PM', 'Sat 11:00 AM'],
  },
  {
    id: 'c2',
    name: 'WGM Ananya Sen',
    title: 'Woman Grandmaster',
    fideRating: 2345,
    experienceYears: 8,
    studentsTaught: 220,
    hourlyRate: 1799,
    rating: 4.98,
    reviewCount: 98,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: 'Woman Grandmaster and Commonwealth Chess Medalist. Known for deep positional understanding, developing prophylactic thinking, and patient coaching style for juniors.',
    specialties: ['Positional Play', 'French & Caro-Kann', 'Piece Harmony', 'Psychological Resilience'],
    languages: ['English', 'Hindi', 'Bengali'],
    achievements: ['Woman Grandmaster Title (2020)', 'Commonwealth Silver Medalist', 'Top 5 Indian Women Rated Players'],
    availableSlots: ['Wed 4:30 PM', 'Fri 6:00 PM', 'Sat 3:00 PM', 'Sun 10:00 AM'],
  },
  {
    id: 'c3',
    name: 'GM Rohan Joshi',
    title: 'Grandmaster',
    fideRating: 2562,
    experienceYears: 14,
    studentsTaught: 480,
    hourlyRate: 2499,
    rating: 4.99,
    reviewCount: 215,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    bio: 'India’s 62nd Grandmaster. FIDE Senior Trainer who has trained International Masters and FIDE Masters. Focuses on master-level opening repertoires and high-pressure tournament calculation.',
    specialties: ['Deep Calculation', 'King’s Indian Defense', 'Complex Rook Endgames', 'Master Prep'],
    languages: ['English', 'Hindi', 'Marathi'],
    achievements: ['FIDE Grandmaster (2019)', 'Member of Indian Olympiad Training Squad', 'National Premier Top 3'],
    availableSlots: ['Tue 7:00 PM', 'Thu 7:00 PM', 'Sat 5:00 PM'],
  },
  {
    id: 'c4',
    name: 'FM Tenzin Norbu',
    title: 'FIDE Master',
    fideRating: 2288,
    experienceYears: 6,
    studentsTaught: 190,
    hourlyRate: 999,
    rating: 4.92,
    reviewCount: 76,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    bio: 'Young energetic FIDE Master with a passion for gamified, high-energy coaching. Helps intermediate players break out of 1000-1400 rating plateaus with pattern recognition.',
    specialties: ['Tactics Rush', 'Italian Game & Scotch', 'Attacking the King', 'Speed Chess Mastery'],
    languages: ['English', 'Hindi'],
    achievements: ['FIDE Master (2021)', 'National Blitz Champion U-19', 'Lichess Bullet 2650'],
    availableSlots: ['Mon 5:00 PM', 'Wed 6:00 PM', 'Fri 4:00 PM', 'Sun 2:00 PM'],
  },
  {
    id: 'c5',
    name: 'Sneha Kulkarni',
    title: 'Senior FIDE Instructor',
    fideRating: 1980,
    experienceYears: 10,
    studentsTaught: 520,
    hourlyRate: 799,
    rating: 4.95,
    reviewCount: 310,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    bio: 'Passionate youth educator specializing in students aged 5 to 14. Makes chess fun, friendly, and structured so young minds develop patience, discipline, and strategic thinking.',
    specialties: ['Kids Chess (Ages 5-14)', 'Piece Fundamentals', 'Board Vision', 'Confidence Building'],
    languages: ['English', 'Hindi', 'Marathi'],
    achievements: ['FIDE Certified Instructor', 'Best Youth Coach Award (State Chess Association)', 'Mentored 80+ School Champions'],
    availableSlots: ['Mon 3:30 PM', 'Tue 4:00 PM', 'Thu 4:00 PM', 'Sat 10:00 AM'],
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs_1',
    slug: 'chess-fundamentals-zero-to-hero',
    title: 'Chess Fundamentals: Zero to 1000 Elo',
    level: 'Beginner',
    tagline: 'Master the board, piece coordinates, basic checkmates, and avoid early blunders.',
    description: 'The definitive foundation for anyone who wants to learn chess properly. You will learn legal piece movements, the power of center control, the 3 golden opening rules, and how to spot undefended pieces in 1 second.',
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80',
    instructorName: 'Sneha Kulkarni',
    instructorTitle: 'Senior FIDE Instructor',
    enrolledCount: 1420,
    rating: 4.95,
    totalDurationHours: 6.5,
    progressPercent: 0,
    modules: [
      {
        id: 'm1',
        title: 'Module 1: The Board & Piece Movement',
        lessons: [
          {
            id: 'l1',
            courseId: 'crs_1',
            title: '1.1 The Battlefield: Ranks, Files & Diagonals',
            durationMinutes: 12,
            isCompleted: false,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            summary: 'Understanding algebraic notation, light and dark square control, and reading chessboard coordinates effortlessly.',
            interactiveChallenge: {
              prompt: 'Play White’s most popular first move occupying the center.',
              correctMoves: ['e4'],
              explanation: '1. e4 takes immediate control of central squares d5 and f5 and opens lines for both White’s Queen and Bishop!'
            }
          },
          {
            id: 'l2',
            courseId: 'crs_1',
            title: '1.2 The Mighty Pawn & En Passant',
            durationMinutes: 15,
            isCompleted: false,
            fen: '8/8/8/3Pp3/8/8/8/4K2k w - e6 0 1',
            summary: 'Pawns move forward but capture diagonally. Learn the special pawn promotion and en-passant capture rules.',
            interactiveChallenge: {
              prompt: 'Black just moved their pawn e7-e5. Play the special en-passant capture!',
              correctMoves: ['dxe6'],
              explanation: 'dxe6! When an enemy pawn leaps two squares past your pawn, you can capture it on the passed square!'
            }
          }
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Essential Checkmate Patterns',
        lessons: [
          {
            id: 'l3',
            courseId: 'crs_1',
            title: '2.1 The Back-Rank Checkmate',
            durationMinutes: 18,
            isCompleted: false,
            fen: '6k1/5ppp/8/8/8/8/8/1R4K1 w - - 0 1',
            summary: 'Recognize when the enemy King is trapped behind their own pawns with no escape square.',
            interactiveChallenge: {
              prompt: 'Find the winning checkmate in 1 move for White!',
              correctMoves: ['Rb8#'],
              explanation: 'Rb8# delivers checkmate! The black King has no legal square because its own pawns block its escape (f7, g7, h7).'
            }
          },
          {
            id: 'l4',
            courseId: 'crs_1',
            title: '2.2 Scholar’s Mate & How to Defend It',
            durationMinutes: 20,
            isCompleted: false,
            fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 3 3',
            summary: 'Never fall for 4-move checkmate again! Understand weak f7 / f2 squares and develop proper defensive habits.',
            interactiveChallenge: {
              prompt: 'White is threatening Qxf7# checkmate! Play the cleanest defensive developing move.',
              correctMoves: ['Nf6'],
              explanation: 'Nf6! Develops the knight, attacks White’s queen, and completely blocks the f7 attack line. White must now retreat!'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'crs_2',
    slug: 'tactical-vision-and-calculation',
    title: 'Tactical Vision: Stop Donating Queens',
    level: 'Intermediate',
    tagline: 'Pins, forks, skewers, discovered attacks, and double checks explained intuitively.',
    description: 'Over 85% of amateur chess games are decided by one-move tactics or missed forks. This course trains your peripheral chess vision so you spot combinations instantly without straining your brain.',
    thumbnail: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&auto=format&fit=crop&q=80',
    instructorName: 'IM Vikramaditya Rao',
    instructorTitle: 'International Master',
    enrolledCount: 980,
    rating: 4.97,
    totalDurationHours: 8.0,
    progressPercent: 0,
    modules: [
      {
        id: 'm3',
        title: 'Module 1: The Absolute & Relative Pin',
        lessons: [
          {
            id: 'l5',
            courseId: 'crs_2',
            title: '1.1 Pinning the Queen against the King',
            durationMinutes: 22,
            isCompleted: false,
            fen: 'r3k2r/ppp2ppp/2n5/3q4/3P4/5B2/PPP2PPP/R2QK2R w KQkq - 0 1',
            summary: 'Using long-range bishops and rooks to immobilize enemy valuable pieces.',
            interactiveChallenge: {
              prompt: 'Find the winning tactic targeting the undefended Black Queen!',
              correctMoves: ['Bxd5'],
              explanation: 'Bxd5 captures the queen outright! When you see an unprotected piece on an open diagonal, calculate captures first.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'crs_3',
    slug: 'endgame-basics-conversion',
    title: 'Endgame Basics: The Art of Conversion',
    level: 'Intermediate',
    tagline: 'Turn 1 extra pawn into a guaranteed checkmate. Lucena, Philidor, and opposition.',
    description: 'Learn the principles that grandmasters rely on to convert winning positions into full points. King activity, opposition, key squares, and creating passed pawns.',
    thumbnail: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=600&auto=format&fit=crop&q=80',
    instructorName: 'WGM Ananya Sen',
    instructorTitle: 'Woman Grandmaster',
    enrolledCount: 640,
    rating: 4.94,
    totalDurationHours: 7.2,
    progressPercent: 0,
    modules: []
  },
  {
    id: 'crs_4',
    slug: 'tournament-mindset-and-opening-prep',
    title: 'Tournament Mastery: Opening Repertoire',
    level: 'Advanced',
    tagline: 'Modern opening systems, time pressure management, and tournament psychology.',
    description: 'Build an ironclad opening repertoire with White and Black. Stop guessing in the opening and start entering middlegames with a clear, comfortable strategic gameplan.',
    thumbnail: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=600&auto=format&fit=crop&q=80',
    instructorName: 'GM Rohan Joshi',
    instructorTitle: 'Grandmaster',
    enrolledCount: 410,
    rating: 4.99,
    totalDurationHours: 10.5,
    progressPercent: 0,
    modules: []
  }
];

export const INITIAL_PUZZLES: Puzzle[] = [
  {
    id: 'puz_1',
    title: 'The Greek Gift Sacrificial Finish',
    rating: 1320,
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 7',
    playerColor: 'white',
    theme: 'Attacking the King',
    solutionMoves: ['Bxh7+', 'Kxh7', 'Ng5+'],
    hint: 'Look for a thematic sacrifice on the h7 square to rip open the black king’s shield.',
    tacticalExplanation: 'Bxh7+! is the classic Greek Gift Sacrifice. White sacrifices a minor piece to draw the Black king onto h7, following up with Ng5+ and Qh5, initiating an unstoppable mating attack on the h-file.'
  },
  {
    id: 'puz_2',
    title: 'Back-Rank Deflection',
    rating: 1150,
    fen: '3r2k1/5ppp/8/8/8/8/1Q3PPP/6K1 w - - 0 1',
    playerColor: 'white',
    theme: 'Deflection & Back Rank',
    solutionMoves: ['Qb8'],
    hint: 'Deflect the enemy defending piece from the critical 8th rank.',
    tacticalExplanation: 'Qb8! pins and overloads the Black rook on d8. If Black plays Rxb8, then White delivers back-rank mate with ... wait, Qb8 forces Black to yield d8 or face immediate back-rank collapse!'
  },
  {
    id: 'puz_3',
    title: 'Royal Knight Fork',
    rating: 1080,
    fen: 'r3k2r/pppq1ppp/3p1n2/4p3/2BnP3/3P1Q1P/PPP2PP1/RN2K2R b KQkq - 0 9',
    playerColor: 'black',
    theme: 'Knight Fork',
    solutionMoves: ['Nxc2+', 'Kd2', 'Nxa1'],
    hint: 'Use the knight on d4 to jump into White’s camp with tempo on both King and Rook.',
    tacticalExplanation: 'Nxc2+! attacks White’s King on e1 and Rook on a1 simultaneously. White must move their king, allowing Black to win clean rook material.'
  },
  {
    id: 'puz_4',
    title: 'Smothered Mate Pattern',
    rating: 1480,
    fen: '6k1/5ppp/8/8/8/8/4QPPP/5NK1 w - - 0 1',
    playerColor: 'white',
    theme: 'Checkmate',
    solutionMoves: ['Qe8#'],
    hint: 'White has a direct checkmate.',
    tacticalExplanation: 'Qe8# is pure back-rank checkmate because Black’s own pawns trap their King.'
  }
];

export const INITIAL_GAME_ANALYSIS: GameAnalysis = {
  id: 'ga_1',
  title: 'Aryan Sharma (1248) vs Anand_ChessBot (1300)',
  date: '2026-09-26',
  playerWhite: 'Aryan Sharma',
  playerBlack: 'Anand_ChessBot',
  whiteElo: 1248,
  blackElo: 1300,
  result: '1-0',
  accuracyWhite: 84.6,
  accuracyBlack: 71.2,
  openingName: 'Italian Game: Giuoco Piano',
  openingAccuracy: 92.0,
  middlegameAccuracy: 78.5,
  endgameAccuracy: 88.0,
  turningPointMove: 18,
  turningPointSummary: 'Move 18: Black blundered the central d4 pawn by playing a passive knight retreat (Nf6-e8?), allowing White to launch an unstoppable central kingside breakthrough.',
  pgn: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5 10. Qb3 Nce7 11. O-O O-O 12. Rfe1 c6 13. a4 Qb6 14. Qa3 Be6 15. a5 Qc7 16. Ne4 Rad8 17. Nc5 Bc8 18. Ne5 Rd6 19. Ne4 Rh6 20. Rac1 f6 21. Nf3 Bg4 22. Ned2 Kh8 23. Bxd5 Nxd5 24. Qxf8# 1-0',
  criticalMoments: [
    {
      moveNumber: 10,
      ply: 19,
      fen: 'r1bq1rk1/pp2nppp/2p5/3n4/3P4/1Q3N2/PP1N1PPP/R3R1K1 w - - 0 13',
      move: 'Qb3',
      player: 'white',
      classification: 'best',
      evalBefore: 0.2,
      evalAfter: 0.5,
      explanation: 'Qb3 puts uncomfortable pressure on the b7 pawn and pairs with the d2 knight to control key light squares.'
    },
    {
      moveNumber: 18,
      ply: 36,
      fen: 'r1b2rk1/ppq2ppp/2p4r/P1N1N3/3P4/Q7/1P1n1PPP/R3R1K1 b - - 4 19',
      move: 'Rd6?',
      player: 'black',
      classification: 'blunder',
      evalBefore: 0.8,
      evalAfter: 3.4,
      explanation: 'Turning point of the game! The rook lift to d6 leaves the black king without defensive anchors and allows Ne4 with a double tempo.',
      betterMove: '18... f6 or 18... Bf5'
    },
    {
      moveNumber: 24,
      ply: 47,
      fen: '5R1k/pp2n1pp/2p4r/3B4/3P2b1/5N2/PP1N1PPP/2R3K1 b - - 0 24',
      move: 'Qxf8#',
      player: 'white',
      classification: 'brilliant',
      evalBefore: 8.5,
      evalAfter: 200.0,
      explanation: 'A clean, decisive finish converting White’s initiative into a full point checkmate!'
    }
  ]
};

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 799,
    yearlyPrice: 7990,
    tagline: 'Perfect for beginners starting their chess journey with structured self-paced training.',
    features: [
      'Access to 10+ Complete Courses (Zero to 1200)',
      'Unlimited Tactical Puzzles with explanations',
      'Daily AI Practice Drills & Bot Sparring',
      'Interactive Learning Dashboard & Streaks',
      'Community Chess Club forum access',
      'Monthly Progress & Rating Report'
    ],
    suitableFor: 'Beginners & Casual Players'
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 1499,
    yearlyPrice: 14990,
    tagline: 'Our most popular academy plan. Weekly live group coaching with titled masters.',
    popular: true,
    features: [
      'Everything in Starter Plan',
      'Weekly Live Group Coaching with FIDE Masters',
      'Interactive Virtual Classroom with live board',
      'Personalized Weekly Practice Assignments',
      'Automatic Game Analysis (PGN upload & blunder alerts)',
      'Parent Dashboard with progress tracking & attendance',
      'Priority Support via WhatsApp'
    ],
    suitableFor: 'Improving & Ambitious Juniors'
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 2999,
    yearlyPrice: 29990,
    tagline: 'Direct 1-on-1 private mentorship with International Masters and Grandmasters.',
    features: [
      'Everything in Pro Plan',
      '4 x 1-on-1 Private Mentorship Sessions / month',
      'Dedicated FIDE Titled Coach assigned to you',
      'Custom Opening Repertoire tailored to your style',
      'Pre-Tournament Prep & Opponent Scouting',
      'Direct WhatsApp access to your Coach for game questions',
      'Official FIDE Tournament registration guidance'
    ],
    suitableFor: 'Competitive & Tournament Players'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [];

export const INITIAL_NOTIFICATIONS: InAppNotification[] = [];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'cp_1',
    authorName: 'Rohan (Rating 1410)',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    authorTitle: 'Junior State Qualifier',
    timestamp: '3 hours ago',
    title: 'How do you deal with the French Defense Advance Variation?',
    content: 'Whenever Black locks the center with e6 and d5 in the French Advance, I always struggle to find counterplay on the c-file. What is White’s typical pawn break strategy here?',
    tags: ['Opening Strategy', 'French Defense', 'Intermediate'],
    likes: 18,
    isLiked: false,
    repliesCount: 4,
    replies: [
      {
        id: 'rep_1',
        authorName: 'Academy Instructor',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        timestamp: '1 hour ago',
        content: 'Hi Rohan! The key in the French Advance is to overprotect d4 with c3 and Be3, then swing your kingside pieces (h4-h5 or f4) to attack Black’s g7 pawn once Black commits their king!'
      }
    ]
  },
  {
    id: 'cp_2',
    authorName: 'Aanya K. (Rating 1180)',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday',
    title: 'Finally crossed 1150 on Knightesline after 3 weeks! 🎉',
    content: 'Started at 940 Elo last month. Opposition and counting squares made all the difference in my last 4 tournament games.',
    tags: ['Milestone', 'Rating Gain', 'Motivation'],
    likes: 42,
    isLiked: true,
    repliesCount: 7,
    replies: []
  }
];

export const INITIAL_TRIAL_BOOKINGS: FreeTrialBooking[] = [];

// LocalStorage Persistence Service
class ShatranjStore {
  private currentRole: UserRole | null = null;
  private currentUser: UserProfile | null = null;
  private coaches: Coach[] = INITIAL_COACHES;
  private courses: Course[] = INITIAL_COURSES;
  private puzzles: Puzzle[] = INITIAL_PUZZLES;
  private gameAnalysis: GameAnalysis = INITIAL_GAME_ANALYSIS;
  private plans: SubscriptionPlan[] = INITIAL_PLANS;
  private trialBookings: FreeTrialBooking[] = INITIAL_TRIAL_BOOKINGS;
  private payments: PaymentRecord[] = INITIAL_PAYMENTS;
  private notifications: InAppNotification[] = INITIAL_NOTIFICATIONS;
  private communityPosts: CommunityPost[] = INITIAL_COMMUNITY_POSTS;
  private isDarkMode: boolean = true;
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;

    try {
      const loggedIn = localStorage.getItem('shatranj_logged_in');
      if (loggedIn === 'true') {
        const storedUser = localStorage.getItem('shatranj_user');
        if (storedUser) {
          this.currentUser = JSON.parse(storedUser);
          this.currentRole = this.currentUser?.role || 'student';
        } else {
          const storedRole = localStorage.getItem('shatranj_role') as UserRole;
          if (storedRole && MOCK_USERS[storedRole]) {
            this.currentRole = storedRole;
            this.currentUser = { ...MOCK_USERS[storedRole] };
          }
        }
      } else {
        // Fresh guest visitor by default
        this.currentUser = null;
        this.currentRole = null;
      }

      const storedCoaches = localStorage.getItem('shatranj_coaches');
      if (storedCoaches) this.coaches = JSON.parse(storedCoaches);

      // Sanitize courses from storage: reset legacy mock progress if present
      const storedCourses = localStorage.getItem('shatranj_courses');
      const coursesCleanVersion = localStorage.getItem('shatranj_courses_clean_v3');
      if (!coursesCleanVersion || !storedCourses) {
        // Clear any legacy hardcoded mock progress from localStorage
        this.courses = INITIAL_COURSES.map(c => ({
          ...c,
          progressPercent: 0,
          modules: c.modules.map(m => ({
            ...m,
            lessons: m.lessons.map(l => ({ ...l, isCompleted: false }))
          }))
        }));
        localStorage.setItem('shatranj_courses', JSON.stringify(this.courses));
        localStorage.setItem('shatranj_courses_clean_v3', 'true');
      } else {
        this.courses = JSON.parse(storedCourses);
      }

      const storedPlans = localStorage.getItem('shatranj_plans');
      if (storedPlans) this.plans = JSON.parse(storedPlans);

      const storedBookings = localStorage.getItem('shatranj_bookings');
      if (storedBookings) this.trialBookings = JSON.parse(storedBookings);

      const storedPayments = localStorage.getItem('shatranj_payments');
      if (storedPayments) this.payments = JSON.parse(storedPayments);

      // Permanently lock into Dark Mode
      localStorage.removeItem('shatranj_dark_theme');
      this.isDarkMode = true;
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('light');
      }
    } catch {
      // Fallback to defaults
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      if (this.currentUser) {
        localStorage.setItem('shatranj_logged_in', 'true');
        localStorage.setItem('shatranj_user', JSON.stringify(this.currentUser));
        if (this.currentRole) localStorage.setItem('shatranj_role', this.currentRole);
      } else {
        localStorage.removeItem('shatranj_logged_in');
        localStorage.removeItem('shatranj_user');
        localStorage.removeItem('shatranj_role');
      }
      localStorage.setItem('shatranj_coaches', JSON.stringify(this.coaches));
      localStorage.setItem('shatranj_courses', JSON.stringify(this.courses));
      localStorage.setItem('shatranj_plans', JSON.stringify(this.plans));
      localStorage.setItem('shatranj_bookings', JSON.stringify(this.trialBookings));
      localStorage.setItem('shatranj_payments', JSON.stringify(this.payments));
      localStorage.setItem('shatranj_dark_theme', this.isDarkMode ? 'true' : 'false');
    } catch {}
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  // Authentication & Role Management
  public isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  public setRole(role: UserRole) {
    this.currentRole = role;
    this.currentUser = { ...MOCK_USERS[role] };
    this.saveToStorage();
  }

  public loginWithRole(role: UserRole) {
    this.setRole(role);
  }

  public loginWithUser(user: UserProfile) {
    this.currentUser = user;
    this.currentRole = user.role;
    this.saveToStorage();
  }

  public logout() {
    this.currentUser = null;
    this.currentRole = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shatranj_logged_in');
      localStorage.removeItem('shatranj_user');
      localStorage.removeItem('shatranj_role');
      localStorage.removeItem('knightesline_token');
    }
    this.saveToStorage();
  }

  public getRole(): UserRole {
    return this.currentRole || 'student';
  }

  public getUser(): UserProfile | null {
    return this.currentUser;
  }

  public updateUser(updates: Partial<UserProfile>) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      this.saveToStorage();
    }
  }

  // Theme (Dark Mode Only)
  public isDark(): boolean {
    return true;
  }

  public toggleTheme() {
    this.isDarkMode = true;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light');
    }
  }

  // Coaches
  public getCoaches(): Coach[] {
    return this.coaches;
  }

  public getCoachById(id: string): Coach | undefined {
    return this.coaches.find(c => c.id === id);
  }

  public updateCoach(coach: Coach) {
    this.coaches = this.coaches.map(c => c.id === coach.id ? coach : c);
    this.saveToStorage();
  }

  // Courses
  public getCourses(): Course[] {
    if (!this.isLoggedIn()) {
      return this.courses.map(c => ({
        ...c,
        progressPercent: 0,
        modules: c.modules.map(m => ({
          ...m,
          lessons: m.lessons.map(l => ({ ...l, isCompleted: false }))
        }))
      }));
    }
    return this.courses;
  }

  public getCourseById(id: string): Course | undefined {
    const course = this.courses.find(c => c.id === id || c.slug === id);
    if (!course) return undefined;
    if (!this.isLoggedIn()) {
      return {
        ...course,
        progressPercent: 0,
        modules: course.modules.map(m => ({
          ...m,
          lessons: m.lessons.map(l => ({ ...l, isCompleted: false }))
        }))
      };
    }
    return course;
  }

  public updateCourseProgress(courseId: string, progress: number) {
    this.courses = this.courses.map(c => c.id === courseId ? { ...c, progressPercent: progress } : c);
    this.saveToStorage();
  }

  public markLessonComplete(courseId: string, lessonId: string) {
    this.courses = this.courses.map(c => {
      if (c.id !== courseId) return c;
      const updatedModules = c.modules.map(m => ({
        ...m,
        lessons: m.lessons.map(l => l.id === lessonId ? { ...l, isCompleted: true } : l)
      }));
      // Recalculate percent
      const allLessons = updatedModules.flatMap(m => m.lessons);
      const done = allLessons.filter(l => l.isCompleted).length;
      const percent = allLessons.length > 0 ? Math.round((done / allLessons.length) * 100) : 0;
      return { ...c, modules: updatedModules, progressPercent: percent };
    });
    this.saveToStorage();
  }

  // Puzzles
  public getPuzzles(): Puzzle[] {
    return this.puzzles;
  }

  // Analysis
  public getGameAnalysis(): GameAnalysis {
    return this.gameAnalysis;
  }

  public setGameAnalysis(analysis: GameAnalysis) {
    this.gameAnalysis = analysis;
    this.notify();
  }

  // Pricing Plans
  public getPlans(): SubscriptionPlan[] {
    return this.plans;
  }

  public updatePlan(plan: SubscriptionPlan) {
    this.plans = this.plans.map(p => p.id === plan.id ? plan : p);
    this.saveToStorage();
  }

  // Trial Bookings
  public getTrialBookings(): FreeTrialBooking[] {
    return this.trialBookings;
  }

  public addTrialBooking(booking: Omit<FreeTrialBooking, 'id' | 'createdAt' | 'status'>): FreeTrialBooking {
    const newBooking: FreeTrialBooking = {
      ...booking,
      id: `tb_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    this.trialBookings = [newBooking, ...this.trialBookings];
    this.addNotification({
      title: 'Free Chess Trial Booked! ♟',
      message: `Confirmed for ${newBooking.studentName} on ${newBooking.preferredDate} at ${newBooking.preferredTime}.`,
      type: 'class'
    });
    this.saveToStorage();
    return newBooking;
  }

  // Payments
  public getPayments(): PaymentRecord[] {
    return this.payments;
  }

  public addPayment(amount: number, planName: string, method: PaymentRecord['paymentMethod']): PaymentRecord {
    const record: PaymentRecord = {
      id: `pay_${Date.now()}`,
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().substring(0, 10),
      amount,
      currency: 'INR',
      planName,
      paymentMethod: method,
      status: 'Successful',
    };
    this.payments = [record, ...this.payments];

    // Upgrade user tier if logged in
    const tier = planName.toLowerCase().includes('starter') ? 'starter' : (planName.toLowerCase().includes('pro') ? 'pro' : 'elite');
    if (this.currentUser) {
      this.currentUser.subscriptionTier = tier;
    }

    this.addNotification({
      title: 'Payment Successful! 🎉',
      message: `Your payment of ₹${amount.toLocaleString('en-IN')} for ${planName} was successful. Subscription is now active.`,
      type: 'payment'
    });

    this.saveToStorage();
    return record;
  }

  // Notifications
  public getNotifications(): InAppNotification[] {
    return this.notifications;
  }

  public getUnreadNotificationCount(): number {
    if (!this.currentUser) return 0;
    return this.notifications.filter(n => !n.isRead).length;
  }

  public markNotificationAsRead(id: string) {
    this.notifications = this.notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    this.notify();
  }

  public markAllNotificationsAsRead() {
    this.notifications = this.notifications.map(n => ({ ...n, isRead: true }));
    this.notify();
  }

  public addNotification(notif: { title: string; message: string; type: InAppNotification['type']; actionUrl?: string }) {
    const item: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: notif.title,
      message: notif.message,
      timestamp: 'Just now',
      isRead: false,
      type: notif.type,
      actionUrl: notif.actionUrl,
    };
    this.notifications = [item, ...this.notifications];
    this.notify();
  }

  // Community
  public getCommunityPosts(): CommunityPost[] {
    return this.communityPosts;
  }

  public toggleLikePost(postId: string) {
    this.communityPosts = this.communityPosts.map(p => {
      if (p.id !== postId) return p;
      const isLiked = !p.isLiked;
      return {
        ...p,
        isLiked,
        likes: isLiked ? p.likes + 1 : p.likes - 1
      };
    });
    this.notify();
  }

  public addPostReply(postId: string, content: string) {
    this.communityPosts = this.communityPosts.map(p => {
      if (p.id !== postId) return p;
      const newReply = {
        id: `rep_${Date.now()}`,
        authorName: this.currentUser ? this.currentUser.name : 'Chess Scholar',
        authorAvatar: this.currentUser ? this.currentUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        timestamp: 'Just now',
        content,
      };
      return {
        ...p,
        repliesCount: p.repliesCount + 1,
        replies: [...p.replies, newReply]
      };
    });
    this.notify();
  }
}

export const shatranjStore = new ShatranjStore();
export const knighteslineStore = shatranjStore;

