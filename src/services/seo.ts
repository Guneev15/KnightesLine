import { shatranjStore } from './store';

interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
}

const DEFAULT_SEO: PageSeoConfig = {
  title: 'KNIGHTESLINE • Premier Online Chess Academy | Grandmaster Coaching',
  description: 'Master chess with certified Grandmasters and FIDE instructors. 1-on-1 private coaching, interactive tactical classroom, personalized curriculum, and parent monitoring. Book a free evaluation session today.',
  keywords: 'online chess academy, chess coaching online, grandmaster chess lessons, kids chess coaching, learn chess online, fide certified chess coaches, best chess academy india',
  canonicalPath: '/'
};

const ROUTE_SEO: Record<string, PageSeoConfig> = {
  home: DEFAULT_SEO,
  courses: {
    title: 'Accredited Chess Masterclass Courses & Curriculum | Knightesline',
    description: 'Explore comprehensive chess courses from beginner zero-to-hero to advanced tournament opening repertoires and endgame mastery. Structured FIDE-aligned lessons with interactive boards.',
    keywords: 'chess courses online, learn chess fundamentals, chess tactics course, endgame mastery chess, opening repertoire tournament, interactive chess curriculum',
    canonicalPath: '/#/courses'
  },
  coaches: {
    title: 'Titled Grandmasters & FIDE Certified Faculty | Knightesline',
    description: 'Meet our distinguished faculty of International Grandmasters, International Masters, and youth champions dedicated to personalized chess mentorship.',
    keywords: 'grandmaster chess coach, fide certified instructor, private chess coach, hire chess grandmaster, kids chess mentor',
    canonicalPath: '/#/coaches'
  },
  pricing: {
    title: 'Transparent Tuition & Chess Membership Plans from ₹799/mo | Knightesline',
    description: 'Affordable chess academy membership plans. Access tactical gyms, group live masterclasses, or private 1-on-1 Grandmaster coaching with money-back guarantee.',
    keywords: 'chess coaching fees, chess class price india, affordable grandmaster chess, private chess lesson cost, chess academy plans',
    canonicalPath: '/#/pricing'
  },
  'free-trial': {
    title: 'Book a Free 1-on-1 Chess Evaluation Session (45 Mins) | Knightesline',
    description: 'Claim your complimentary 45-minute private evaluation with a certified FIDE coach. Receive an instant diagnostic assessment of your playing strength and tailored learning roadmap.',
    keywords: 'free chess trial, free chess assessment, chess evaluation session, chess demo class online',
    canonicalPath: '/#/free-trial'
  },
  puzzles: {
    title: 'Tactical Chess Puzzle Gym & Combinations | Knightesline',
    description: 'Sharpen your calculation and pattern recognition with rated chess puzzles. Practice pins, forks, skewers, back-rank checkmates, and tactical sacrifices.',
    keywords: 'chess tactics gym, daily chess puzzle, practice chess combinations, solve chess puzzles, chess tactics trainer',
    canonicalPath: '/#/puzzles'
  },
  play: {
    title: 'Play Chess Online vs Adaptive Bots & AI Engines | Knightesline',
    description: 'Play chess directly in your browser against customizable bots tailored for every Elo rating from Beginner 600 to Master 2400.',
    keywords: 'play chess online, chess vs computer, practice chess bots, chess engine online, play chess free',
    canonicalPath: '/#/play'
  },
  analysis: {
    title: 'Interactive Chess Board & Deep Engine Analysis | Knightesline',
    description: 'Import PGNs or analyze custom positions with our browser chess engine. Evaluate blunder checks, best moves, and alternative opening variations.',
    keywords: 'chess analysis board, analyze chess pgn, online chess engine, review chess games, chess blunder finder',
    canonicalPath: '/#/analysis'
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | Knightesline Chess Academy',
    description: 'Find answers about scheduling, trial classes, age eligibility (starting from age 5), coaching credentials, refund policies, and tournament preparation.',
    keywords: 'chess academy questions, how online chess classes work, chess classes for 6 year old, chess coaching faq',
    canonicalPath: '/#/faq'
  },
  about: {
    title: 'Our Story & Grandmaster Mission | Knightesline Chess Academy',
    description: 'Learn how Knightesline is democratizing elite chess education through world-class grandmaster mentorship, child-safe interactive technology, and transparent parent reporting.',
    keywords: 'about knightesline, chess academy vision, best chess school, grandmaster academy founders',
    canonicalPath: '/#/about'
  },
  contact: {
    title: 'Contact & Dedicated Parent Support | Knightesline Academy',
    description: 'Get in touch with our academic advisors and student coordinators via WhatsApp, phone, or email. We are available 7 days a week to support your chess journey.',
    keywords: 'contact chess academy, chess academy phone number, chess support whatsapp',
    canonicalPath: '/#/contact'
  },
  community: {
    title: 'Knightesline Community Chess Club & Student Forums',
    description: 'Connect with fellow chess enthusiasts, discuss master games, share tactical discoveries, and organize friendly sparring matches.',
    keywords: 'chess forum, chess community club, chess discussion online, student chess group',
    canonicalPath: '/#/community'
  },
  classroom: {
    title: 'Live Interactive Virtual Classroom | Knightesline Academy',
    description: 'Real-time interactive digital chessboard classroom with video, voice, move sync, and grandmaster annotations.',
    canonicalPath: '/#/classroom'
  },
  'student-dashboard': {
    title: 'Student Learning Hub & Practice Progress | Knightesline',
    description: 'Track your course completions, solve daily puzzle streaks, view coach assignments, and monitor your Elo rating trajectory.',
    canonicalPath: '/#/student-dashboard'
  },
  'parent-dashboard': {
    title: 'Parent Monitoring Portal & Progress Reports | Knightesline',
    description: 'Inspect class attendance, teacher remarks, tactical accuracy graphs, and watch recorded session replays.',
    canonicalPath: '/#/parent-dashboard'
  },
  login: {
    title: 'Student & Parent Login | Knightesline Academy',
    description: 'Sign in to access your interactive chess classroom, personal assignments, and live coaching schedule.',
    canonicalPath: '/#/login'
  },
  signup: {
    title: 'Join Knightesline Chess Academy | Student Enrollment',
    description: 'Create an account to begin your grandmaster chess training journey, track your ratings, and join academy tournaments.',
    canonicalPath: '/#/signup'
  },
  '404': {
    title: 'Page Not Found (Error 404) | Knightesline Online Chess Academy',
    description: 'The requested chess page or masterclass does not exist on our board.',
    canonicalPath: '/#/404'
  }
};

const BASE_URL = 'https://knightesliner.tguneev.workers.dev';

export function updatePageSeo(path: string, param?: string) {
  if (typeof document === 'undefined') return;

  let seo: PageSeoConfig = ROUTE_SEO[path] || DEFAULT_SEO;

  // Dynamic SEO for Course Detail
  if (path === 'course-detail' && param) {
    const course = shatranjStore.getCourseById(param);
    if (course) {
      seo = {
        title: `${course.title} — By ${course.instructorName} | Knightesline`,
        description: `${course.tagline} ${course.description.slice(0, 140)}...`,
        keywords: `${course.title.toLowerCase()}, ${course.level.toLowerCase()} chess course, ${course.instructorName}, chess masterclass`,
        canonicalPath: `/#/course-detail?${course.slug}`
      };
    }
  }

  // Dynamic SEO for Coach Profile
  if (path === 'coach-profile' && param) {
    const coach = shatranjStore.getCoachById(param);
    if (coach) {
      seo = {
        title: `${coach.name} (${coach.title}) — Private Chess Coach | Knightesline`,
        description: `Train 1-on-1 with ${coach.title} ${coach.name}. ${coach.bio.slice(0, 140)}... Rated ${coach.rating} stars by students.`,
        keywords: `${coach.name}, ${coach.title} chess coach, chess lessons with ${coach.name}, fide coach`,
        canonicalPath: `/#/coach-profile?${coach.id}`
      };
    }
  }

  // Update Page Title
  document.title = seo.title;

  // Helper to safely set or create meta tag
  const setMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      if (isProperty) el.setAttribute('property', name);
      else el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Update Standard Meta Tags
  setMeta('description', seo.description);
  setMeta('title', seo.title);
  if (seo.keywords) setMeta('keywords', seo.keywords);

  // Update OpenGraph
  setMeta('og:title', seo.title, true);
  setMeta('og:description', seo.description, true);
  const canonicalUrl = `${BASE_URL}${seo.canonicalPath || '/'}`;
  setMeta('og:url', canonicalUrl, true);

  // Update Twitter
  setMeta('twitter:title', seo.title);
  setMeta('twitter:description', seo.description);
  setMeta('twitter:url', canonicalUrl);

  // Update Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);
}
