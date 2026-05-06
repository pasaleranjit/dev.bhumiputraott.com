// ─── Types ────────────────────────────────────────────────────────────────────

export type Phase = 1 | 2 | 3 | 4 | 5;
export type Status = 'planned' | 'in-progress' | 'completed' | 'deferred';
export type Priority = 'P1' | 'P2' | 'P3';
export type ComparisonRating = 'strong' | 'moderate' | 'limited';
export type ApiAvailability = 'yes' | 'no' | 'partial';

// ─── Key Development Points ───────────────────────────────────────────────────

export interface DevPoint { icon: string; title: string; detail: string; level: 'critical' | 'important' | 'info'; }

export const KEY_DEV_POINTS: DevPoint[] = [
  { icon: 'CreditCard', title: 'Payment Gateway is Revenue Core', detail: 'Razorpay integration must be rock-solid. Every rupee of revenue flows through it.', level: 'critical' },
  { icon: 'Video', title: 'Video Delivery Speed = User Retention', detail: 'HLS streaming via CDN is non-negotiable. Buffering kills conversions.', level: 'critical' },
  { icon: 'Smartphone', title: 'OTP-First Auth for Indian Audience', detail: 'No email/password complexity. Mobile number + OTP is the standard for Tier 2/3 Indian users.', level: 'important' },
  { icon: 'Globe', title: 'Marathi Content is the Differentiator', detail: 'Both UI and content in Marathi sets this apart from generic OTT platforms.', level: 'important' },
  { icon: 'Settings', title: 'Admin Must Be Developer-Independent', detail: 'Client must upload, price, and publish videos without dev help.', level: 'important' },
  { icon: 'Zap', title: 'Mobile App is Phase 3 — not MVP', detail: 'Website MVP comes first. App follows after payment flows are validated.', level: 'info' },
];

// ─── Project Meta ─────────────────────────────────────────────────────────────

export interface ProjectMeta {
  name: string; tagline: string; taglineMr?: string; description: string; descriptionMr?: string;
  currentPhase: Phase; client: string; developer: string;
}

export const PROJECT_META: ProjectMeta = {
  name: 'Bhoomiputra OTT',
  tagline: 'Turn Your Followers Into Paying Students.',
  taglineMr: 'तुमचे फॉलोअर्स शिकणाऱ्या विद्यार्थ्यांमध्ये रूपांतरित करा.',
  description: 'A creator-first OTT platform that converts Instagram & YouTube audience into paid learners through premium Marathi-language business education content.',
  descriptionMr: 'इन्स्टाग्राम आणि यूट्यूब ऑडियन्सला प्रीमियम मराठी बिझनेस एज्युकेशन कंटेंटद्वारे पेड लर्नर्समध्ये रूपांतरित करणारे क्रिएटर-फर्स्ट OTT प्लॅटफॉर्म.',
  currentPhase: 1,
  client: 'Sawgave Sir',
  developer: 'Centera Labs Pvt Ltd',
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface StatCard { label: string; value: string; icon: string; color: string; sub?: string; }

export const STATS: StatCard[] = [
  { label: 'Total Modules', value: '3', icon: 'Layers', color: '#22C55E', sub: 'OTT Website + Mobile App + Brand Website' },
  { label: 'Dev Phases', value: '5', icon: 'Rocket', color: '#F59E0B', sub: 'MVP to Scale' },
  { label: 'Revenue Models', value: '4', icon: 'DollarSign', color: '#10B981', sub: 'PPV / Monthly / Annual / Lifetime' },
  { label: 'Integrations', value: '6+', icon: 'GitMerge', color: '#8B5CF6', sub: 'Razorpay, OTP, CDN, FCM, YouTube, Analytics' },
  { label: 'Target Reach', value: '1M+', icon: 'Users', color: '#F97316', sub: 'Combined Instagram + YouTube audience' },
];

// ─── Modules ──────────────────────────────────────────────────────────────────

export interface Module {
  id: number; name: string; description: string; descriptionMr?: string;
  phase: Phase; status: Status; progress: number;
  team: string[]; subItems: string[]; priority: Priority;
}

export const MODULES_DATA: Module[] = [
  {
    id: 1,
    name: 'Bhoomiputra OTT Website',
    description: 'Full-featured web OTT platform — the core revenue engine. Users discover content through social media teasers, land on the website, authenticate via mobile OTP, and unlock premium business education videos through single-video purchase or subscription.',
    descriptionMr: 'संपूर्ण वेब OTT प्लॅटफॉर्म — मुख्य रेव्हेन्यू इंजिन. सोशल मीडिया टीझर्सद्वारे यूजर्स कंटेंट शोधतात, वेबसाइटवर येतात, मोबाइल OTP द्वारे लॉगिन करतात, आणि सिंगल-व्हिडिओ खरेदी किंवा सबस्क्रिप्शनद्वारे प्रीमियम बिझनेस एज्युकेशन व्हिडिओ अनलॉक करतात.',
    phase: 1, status: 'planned', progress: 0, priority: 'P1',
    team: ['frontend', 'backend', 'payments'],
    subItems: [
      'Landing page with hero video preview and CTA',
      'Mobile OTP login / signup (no password)',
      'Video listing with teaser thumbnails and locked overlay',
      'Pay-per-video unlock (₹99–₹299 per video)',
      'Full-access subscription plans (Monthly ₹499 / Annual ₹2,999 / Lifetime ₹4,999)',
      'Razorpay payment gateway with UPI, Card, Net Banking',
      'Watch history and video progress tracking',
      'Category-based video browsing (Food Business, Manufacturing, Retail, etc.)',
      'Search and filter by business type / investment range',
      'Admin dashboard — video upload, pricing, publish/unpublish',
      'Subscription plan management (create, edit, archive)',
      'User management — view, block, manage access',
      'Revenue analytics — daily/weekly/monthly earnings',
      'Coupon and offer management (discount codes, limited-time)',
      'Banner and promotional section management',
      'Push notification system (email + SMS alerts)',
      'Marathi ↔ English language switcher',
      'SEO optimization — meta tags, sitemap, structured data',
      'Mobile-first responsive design',
      'Secure video streaming (no direct download links)',
    ],
  },
  {
    id: 2,
    name: 'Bhoomiputra Mobile App (Android + iOS)',
    description: 'Native mobile application for Android and iOS — bringing the full OTT experience to mobile users with smooth video streaming, push notifications, and biometric login.',
    phase: 3, status: 'planned', progress: 0, priority: 'P1',
    team: ['mobile', 'backend', 'devops'],
    subItems: [
      'Android (Play Store) + iOS (App Store) apps',
      'Mobile OTP + biometric (fingerprint/face) login',
      'Full video library with lock/unlock system',
      'HLS video streaming with adaptive quality',
      'In-app purchase: single video + subscription plans',
      'Push notifications (new video alerts, offer alerts)',
      'Watch history sync across devices',
      'Language switching (Marathi / English)',
      'Deep link integration (Instagram / YouTube → App)',
      'Offline bookmarks (save for later — Phase 4)',
      'App performance optimization',
      'Secure API integration with OTT backend',
    ],
  },
  {
    id: 3,
    name: 'Bhoomiputra Brand Website',
    description: 'Marketing and brand identity website — the public face of Bhoomiputra. Showcases the founder\'s story, success case studies, media presence, and partnership opportunities.',
    phase: 4, status: 'planned', progress: 0, priority: 'P2',
    team: ['marketing', 'frontend', 'content'],
    subItems: [
      'Hero section with brand story and founder intro',
      'About Sawgave Sir — journey, mission, vision',
      'Business categories showcase with preview cards',
      'Success stories and student testimonials',
      'Blog / news section for SEO traffic',
      'Instagram Reels and YouTube Shorts embed section',
      'Partnership and collaboration inquiry form',
      'Contact page with WhatsApp CTA',
      'Press / media coverage section',
      'Promotional landing pages for specific campaigns',
      'SEO-focused architecture (local + national reach)',
      'Fully responsive, performance-optimized',
    ],
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────

export interface Feature {
  id: string; name: string; moduleId: number; moduleName: string;
  priority: Priority; status: Status; description: string;
}

export const FEATURES_DATA: Feature[] = [
  // M1 OTT Website
  { id: 'f1-1', name: 'Video Lock/Unlock Engine', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P1', status: 'planned', description: 'Locks premium content, shows teaser, prompts payment' },
  { id: 'f1-2', name: 'Razorpay Checkout', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P1', status: 'planned', description: 'UPI / Card / Net Banking one-click payment' },
  { id: 'f1-3', name: 'Subscription Engine', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P1', status: 'planned', description: 'Time-based access control (monthly/annual/lifetime)' },
  { id: 'f1-4', name: 'Mobile OTP Auth', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P1', status: 'planned', description: 'Firebase/Twilio OTP, no password required' },
  { id: 'f1-5', name: 'Admin Video Manager', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P1', status: 'planned', description: 'Upload, thumbnail, category, pricing, publish' },
  { id: 'f1-6', name: 'Admin Revenue Dashboard', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P1', status: 'planned', description: 'Earnings by day/week/month, top videos' },
  { id: 'f1-7', name: 'Coupon System', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P2', status: 'planned', description: 'Create discount codes, set expiry, track usage' },
  { id: 'f1-8', name: 'Multi-language UI', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P1', status: 'planned', description: 'Marathi / English toggle across all pages' },
  { id: 'f1-9', name: 'SEO Engine', moduleId: 1, moduleName: 'Bhoomiputra OTT Website', priority: 'P2', status: 'planned', description: 'Dynamic meta tags, Open Graph, JSON-LD schema' },

  // M2 Mobile App
  { id: 'f2-1', name: 'HLS Video Player', moduleId: 2, moduleName: 'Bhoomiputra Mobile App (Android + iOS)', priority: 'P1', status: 'planned', description: 'Adaptive bitrate, no buffering on 4G' },
  { id: 'f2-2', name: 'Deep Link Handler', moduleId: 2, moduleName: 'Bhoomiputra Mobile App (Android + iOS)', priority: 'P1', status: 'planned', description: 'Instagram/YouTube → App direct video open' },
  { id: 'f2-3', name: 'Push Notifications', moduleId: 2, moduleName: 'Bhoomiputra Mobile App (Android + iOS)', priority: 'P1', status: 'planned', description: 'FCM-powered new content and offer alerts' },
  { id: 'f2-4', name: 'Biometric Login', moduleId: 2, moduleName: 'Bhoomiputra Mobile App (Android + iOS)', priority: 'P2', status: 'planned', description: 'Fingerprint / face ID support' },
  { id: 'f2-5', name: 'In-App Purchases', moduleId: 2, moduleName: 'Bhoomiputra Mobile App (Android + iOS)', priority: 'P1', status: 'planned', description: 'Razorpay / Google Pay / Apple Pay integration' },

  // M3 Brand Website
  { id: 'f3-1', name: 'Founder Story Section', moduleId: 3, moduleName: 'Bhoomiputra Brand Website', priority: 'P1', status: 'planned', description: 'Rich multimedia about Sawgave Sir' },
  { id: 'f3-2', name: 'Student Success Wall', moduleId: 3, moduleName: 'Bhoomiputra Brand Website', priority: 'P1', status: 'planned', description: 'Testimonials with photo + business result' },
  { id: 'f3-3', name: 'Instagram / YouTube Embed Feed', moduleId: 3, moduleName: 'Bhoomiputra Brand Website', priority: 'P2', status: 'planned', description: 'Live reel preview on website' },
  { id: 'f3-4', name: 'Blog Engine', moduleId: 3, moduleName: 'Bhoomiputra Brand Website', priority: 'P2', status: 'planned', description: 'SEO articles on small business topics' },
  { id: 'f3-5', name: 'Lead Capture Form', moduleId: 3, moduleName: 'Bhoomiputra Brand Website', priority: 'P1', status: 'planned', description: 'WhatsApp / call CTA for partnerships' },
];

// ─── Integrations ────────────────────────────────────────────────────────────

export interface Integration {
  id: string; name: string; icon: string; category: string;
  description: string; descriptionMr?: string;
}

export const INTEGRATIONS_DATA: Integration[] = [
  {
    id: 'int-1', name: 'Razorpay', icon: 'CreditCard', category: 'Payments',
    description: 'Indian payment gateway; UPI, cards, net banking, EMI; API-first, full webhook support',
    descriptionMr: 'भारतीय पेमेंट गेटवे; UPI, कार्ड, नेट बँकिंग, EMI; API-फर्स्ट, पूर्ण webhook समर्थन'
  },
  {
    id: 'int-2', name: 'Firebase OTP', icon: 'Lock', category: 'Authentication',
    description: 'Mobile number OTP auth; fast, reliable, 99.9% delivery',
    descriptionMr: 'मोबाइल नंबर OTP प्रमाणीकरण; वेगवान, विश्वसनीय, 99.9% डिलिव्हरी'
  },
  {
    id: 'int-3', name: 'AWS S3 / Cloudflare R2', icon: 'Database', category: 'Storage',
    description: 'Video storage; encrypted, CDN-ready, cost-effective',
    descriptionMr: 'व्हिडिओ स्टोरेज; एनक्रिप्टेड, CDN-तयार, खर्च-प्रभावी'
  },
  {
    id: 'int-4', name: 'AWS CloudFront / CDN', icon: 'Globe', category: 'Delivery',
    description: 'Video delivery network; adaptive HLS streaming; global edge nodes',
    descriptionMr: 'व्हिडिओ डिलिव्हरी नेटवर्क; अनुकूली HLS स्ट्रीमिंग; जागतिक edge nodes'
  },
  {
    id: 'int-5', name: 'Firebase Cloud Messaging (FCM)', icon: 'Bell', category: 'Notifications',
    description: 'Push notifications for Android + iOS + Web',
    descriptionMr: 'Android + iOS + Web साठी पुश सूचना'
  },
  {
    id: 'int-6', name: 'YouTube Data API', icon: 'Youtube', category: 'Content',
    description: 'Pull video metadata, shorts previews, subscriber counts',
    descriptionMr: 'व्हिडिओ मेटाडेटा, shorts पूर्वावलोकन, subscriber counts खेचा'
  },
  {
    id: 'int-7', name: 'Google Analytics 4', icon: 'BarChart3', category: 'Analytics',
    description: 'Traffic, conversion tracking, funnel analysis',
    descriptionMr: 'ट्राफिक, रूपांतरण ट्रॅकिंग, फनल विश्लेषण'
  },
  {
    id: 'int-8', name: 'Meta (Instagram) API', icon: 'Instagram', category: 'Social',
    description: 'Embed feed, track campaign traffic sources',
    descriptionMr: 'फीड एम्बेड करा, अभियान ट्राफिक स्रोत ट्रॅक करा'
  },
];

// ─── Build Phases ────────────────────────────────────────────────────────────

export interface PhaseInfo {
  phase: Phase; name: string; duration: string; nameMr?: string;
  goal: string; goalMr?: string;
  highlights: string[];
  color?: string;
}

export const BUILD_PHASES: PhaseInfo[] = [
  {
    phase: 1, name: 'OTT Website MVP', duration: 'Months 1–2', nameMr: 'OTT वेबसाइट MVP',
    goal: 'Landing page, OTP login, video listing, payment gateway, basic admin',
    goalMr: 'लँडिंग पेज, OTP लॉगिन, व्हिडिओ लिस्टिंग, पेमेंट गेटवे, बेसिक admin',
    highlights: ['Landing page', 'OTP login', 'Video listing', 'Razorपay', 'Basic admin'],
    color: '#F97316',
  },
  {
    phase: 2, name: 'Advanced Subscription + Admin', duration: 'Months 3–4', nameMr: 'उन्नत सबस्क्रिप्शन + Admin',
    goal: 'Subscription plans, coupon system, revenue dashboard, multi-language, notifications',
    goalMr: 'सबस्क्रिप्शन योजना, कूपन सिस्टम, रेव्हेन्यू डॅशबोर्ड, मल्टी-भाषा, सूचना',
    highlights: ['Subscriptions', 'Coupons', 'Dashboard', 'Multi-language', 'Notifications'],
    color: '#FB923C',
  },
  {
    phase: 3, name: 'Android + iOS Mobile App', duration: 'Months 5–7', nameMr: 'Android + iOS मोबाइल अ्यॅप',
    goal: 'Both apps on stores, HLS streaming, deep links, push notifications',
    goalMr: 'दोन्ही अ्यॅप स्टोर्सवर, HLS स्ट्रीमिंग, deep links, पुश सूचना',
    highlights: ['Android app', 'iOS app', 'HLS streaming', 'Deep links', 'Push notifications'],
    color: '#FDBA74',
  },
  {
    phase: 4, name: 'Brand Website + Marketing System', duration: 'Months 8–9', nameMr: 'ब्रँड वेबसाइट + मार्केटिंग सिस्टम',
    goal: 'Founder site, SEO blog, testimonials, partnership forms, campaign landing pages',
    goalMr: 'संस्थापक साइट, SEO ब्लॉग, प्रशंसापत्र, partnership फॉर्म, अभियान लँडिंग पेज',
    highlights: ['Founder site', 'Blog', 'Testimonials', 'Partnership forms', 'Campaign pages'],
    color: '#FED7AA',
  },
  {
    phase: 5, name: 'Scaling + Analytics + Optimization', duration: 'Months 10–12', nameMr: 'स्केलिंग + विश्लेषण + अनुकूलन',
    goal: 'A/B testing, AI recommendations, affiliate/referral system, performance optimization',
    goalMr: 'A/B परीक्षण, AI शिफारशें, affiliate/रेफरल सिस्टम, प्रदर्शन अनुकूलन',
    highlights: ['A/B testing', 'AI recs', 'Affiliate system', 'Optimization', '10x growth'],
    color: '#FECACA',
  },
];

// ─── Knowledge Base Sections ──────────────────────────────────────────────────

export interface KBSection {
  id: string; title: string; titleMr?: string;
  description: string; descriptionMr?: string;
}

export const KNOWLEDGE_BASE: KBSection[] = [
  {
    id: 'kb-1', title: 'Platform Overview', titleMr: 'प्लॅटफॉर्म विहंगावलोकन',
    description: 'What is Bhoomiputra OTT, vision, creator economy',
    descriptionMr: 'भूमिपुत्र OTT काय आहे, दृष्टिकोण, creator economy'
  },
  {
    id: 'kb-2', title: 'Business Model', titleMr: 'व्यापार मॉडेल',
    description: 'Short-form teaser → OTT purchase funnel explained',
    descriptionMr: 'शॉर्ट-फॉर्म टीजर → OTT खरीद फनेल स्पष्ट'
  },
  {
    id: 'kb-3', title: 'Revenue Streams', titleMr: 'राजस्व प्रवाह',
    description: 'PPV, monthly, annual, lifetime plans with pricing',
    descriptionMr: 'PPV, मासिक, वार्षिक, आजीवन योजना मूल्य निर्धारण के साथ'
  },
  {
    id: 'kb-4', title: 'Content Strategy', titleMr: 'सामग्री रणनीति',
    description: 'How to create teasers, what makes a premium video',
    descriptionMr: 'टीजर कैसे बनाएं, प्रीमियम वीडियो क्या बनाता है'
  },
  {
    id: 'kb-5', title: 'Admin Panel Guide', titleMr: 'Admin पैनल गाइड',
    description: 'How to upload, price, publish videos',
    descriptionMr: 'वीडियो कैसे अपलोड करें, मूल्य निर्धारण करें, प्रकाशित करें'
  },
  {
    id: 'kb-6', title: 'Payment System', titleMr: 'पेमेंट सिस्टम',
    description: 'Razorpay setup, refund policy, access control',
    descriptionMr: 'Razorpay सेटअप, रिफंड नीति, एक्सेस नियंत्रण'
  },
  {
    id: 'kb-7', title: 'User Management', titleMr: 'यूजर प्रबंधन',
    description: 'How users register, purchase, and access content',
    descriptionMr: 'उपयोगकर्ता कैसे पंजीकृत करते हैं, खरीदारी करते हैं, सामग्री तक पहुंचते हैं'
  },
  {
    id: 'kb-8', title: 'Analytics & Reporting', titleMr: 'विश्लेषण और रिपोर्टिंग',
    description: 'How to read revenue reports, top content',
    descriptionMr: 'राजस्व रिपोर्ट कैसे पढ़ें, शीर्ष सामग्री'
  },
  {
    id: 'kb-9', title: 'Marketing Integration', titleMr: 'मार्केटिंग एकीकरण',
    description: 'Instagram → OTT funnel, link-in-bio setup',
    descriptionMr: 'Instagram → OTT फनेल, जैव सेटअप में लिंक'
  },
  {
    id: 'kb-10', title: 'Subscription Management', titleMr: 'सबस्क्रिप्शन प्रबंधन',
    description: 'Creating and managing subscription plans',
    descriptionMr: 'सबस्क्रिप्शन योजनाओं को बनाना और प्रबंधित करना'
  },
  {
    id: 'kb-11', title: 'Technical Architecture', titleMr: 'तकनीकी आर्किटेक्चर',
    description: 'Stack overview, security, video delivery',
    descriptionMr: 'स्टैक विहंगावलोकन, सुरक्षा, वीडियो वितरण'
  },
  {
    id: 'kb-12', title: 'Future Scalability', titleMr: 'भविष्य की स्केलेबिलिटी',
    description: 'Franchise directory, live webinars, consultations, AI recs',
    descriptionMr: 'फ्रेंचाइज़ डायरेक्टरी, लाइव वेबिनार, परामर्श, AI शिफारशें'
  },
  {
    id: 'kb-13', title: 'FAQ for Client', titleMr: 'क्लायंट के लिए FAQ',
    description: 'Common questions about the platform',
    descriptionMr: 'प्लेटफॉर्म के बारे में सामान्य प्रश्न'
  },
];

// ─── Glossary ────────────────────────────────────────────────────────────────

export interface GlossaryTerm {
  term: string; termMr?: string;
  definition: string; definitionMr?: string;
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'OTT', termMr: 'OTT',
    definition: 'Over-the-Top — streaming platform (Netflix model)',
    definitionMr: 'ओव्हर-द-टॉप — स्ट्रीमिंग प्लॅटफॉर्म (Netflix मॉडेल)'
  },
  {
    term: 'PPV', termMr: 'PPV',
    definition: 'Pay-Per-View — unlock one video at a time',
    definitionMr: 'पे-पर-व्यू — एक समय में एक व्हिडिओ अनलॉक करा'
  },
  {
    term: 'HLS', termMr: 'HLS',
    definition: 'HTTP Live Streaming — adaptive video format',
    definitionMr: 'HTTP लाइव स्ट्रीमिंग — अनुकूली व्हिडिओ प्रारूप'
  },
  {
    term: 'CDN', termMr: 'CDN',
    definition: 'Content Delivery Network — fast global video delivery',
    definitionMr: 'कंटेंट डिलिव्हरी नेटवर्क — वेगवान जागतिक व्हिडिओ डिलिव्हरी'
  },
  {
    term: 'OTP', termMr: 'OTP',
    definition: 'One-Time Password — mobile number login method',
    definitionMr: 'एक-वेळीचा पासवर्ड — मोबाइल नंबर लॉगिन पद्धती'
  },
  {
    term: 'Razorpay', termMr: 'Razorpay',
    definition: 'India\'s leading payment gateway',
    definitionMr: 'भारताचा अग्रणी पेमेंट गेटवे'
  },
  {
    term: 'Creator Economy', termMr: 'Creator Economy',
    definition: 'Monetizing an influencer\'s audience directly',
    definitionMr: 'इन्फ्लूएन्सरच्या ऑडियन्सचे थेट मुद्रीकरण'
  },
  {
    term: 'Premium Content', termMr: 'Premium Content',
    definition: 'Paid, locked video content',
    definitionMr: 'पेड, लॉक केलेले व्हिडिओ कंटेंट'
  },
  {
    term: 'Subscription', termMr: 'Subscription',
    definition: 'Recurring access plan (monthly/annual)',
    definitionMr: 'आवर्ती एक्सेस योजना (मासिक/वार्षिक)'
  },
  {
    term: 'Teaser', termMr: 'Teaser',
    definition: 'Short free video (Instagram Reel / YouTube Short)',
    definitionMr: 'लघु विनामूल्य व्हिडिओ (Instagram Reel / YouTube Short)'
  },
  {
    term: 'Conversion', termMr: 'Conversion',
    definition: 'Turning a viewer into a paying user',
    definitionMr: 'दर्शकाला पेईंग यूजरमध्ये रूपांतरित करणे'
  },
  {
    term: 'Dashboard', termMr: 'Dashboard',
    definition: 'Admin control panel for managing the platform',
    definitionMr: 'प्लॅटफॉर्म व्यवस्थापित करण्यासाठी Admin नियंत्रण पॅनल'
  },
  {
    term: 'FCM', termMr: 'FCM',
    definition: 'Firebase Cloud Messaging — push notification service',
    definitionMr: 'Firebase क्लाउड मेसेजिंग — पुश सूचना सेवा'
  },
  {
    term: 'Webhook', termMr: 'Webhook',
    definition: 'Automatic payment confirmation signal from Razorpay',
    definitionMr: 'Razorpay कडून स्वयंचलित पेमेंट पुष्टी सिग्नल'
  },
  {
    term: 'Deep Link', termMr: 'Deep Link',
    definition: 'A URL that opens specific content inside the mobile app',
    definitionMr: 'एक URL जो मोबाइल अ्यॅपमध्ये विशिष्ट कंटेंट उघडतो'
  },
];

// ─── Dummy nodes and edges for process diagram (placeholder) ────────────────

export interface WFNode {
  id: string;
  label: string;
  description: string;
  role: string;
  kind: 'entry' | 'process' | 'decision' | 'escalation' | 'terminal_good' | 'terminal_bad' | 'blocked' | 'financial' | 'notification' | 'scan';
  x: number;
  y: number;
}

export interface WFEdge {
  id: string;
  from: string;
  to: string;
  label: string;
}

export const PROCESS_NODES: WFNode[] = [
  { id: 'ott_teaser', label: 'Creator Posts Teaser', description: 'Short video on Instagram/YouTube', role: 'creator', kind: 'entry', x: 50, y: 150 },
  { id: 'viewer_watches', label: 'Viewer Watches Teaser', description: 'Free content, CTA to Bhoomiputra OTT', role: 'viewer', kind: 'process', x: 200, y: 150 },
  { id: 'user_clicks', label: 'User Clicks Link', description: 'Bio link, story link, or video description', role: 'viewer', kind: 'process', x: 350, y: 150 },
  { id: 'landing_page', label: 'Landing Page', description: 'Video listing, teaser plays', role: 'system', kind: 'process', x: 500, y: 150 },
  { id: 'login_register', label: 'Login / Register', description: 'Mobile OTP', role: 'system', kind: 'process', x: 650, y: 150 },
  { id: 'choose_access', label: 'Choose Access', description: 'PPV (₹99–₹299) or Subscription', role: 'viewer', kind: 'decision', x: 800, y: 150 },
  { id: 'razorpay_pay', label: 'Razorpay Payment', description: 'UPI / Card / Net Banking', role: 'system', kind: 'financial', x: 950, y: 150 },
  { id: 'access_unlocked', label: 'Access Unlocked', description: 'Watch full video (business setup, profit, marketing)', role: 'system', kind: 'terminal_good', x: 1100, y: 150 },
];

export const PROCESS_EDGES: WFEdge[] = [
  { id: 'e1', from: 'ott_teaser', to: 'viewer_watches', label: 'Viewer sees teaser' },
  { id: 'e2', from: 'viewer_watches', to: 'user_clicks', label: 'CTA triggers link' },
  { id: 'e3', from: 'user_clicks', to: 'landing_page', label: 'Visit website' },
  { id: 'e4', from: 'landing_page', to: 'login_register', label: 'See video listing' },
  { id: 'e5', from: 'login_register', to: 'choose_access', label: 'Authenticated' },
  { id: 'e6', from: 'choose_access', to: 'razorpay_pay', label: 'Choose plan' },
  { id: 'e7', from: 'razorpay_pay', to: 'access_unlocked', label: 'Payment success' },
];

// ─── Tech Comparison ──────────────────────────────────────────────────────────

export type CompTab = 'comparison';

export interface TechCompTab { id: CompTab; label: string; }

export const TECH_COMPARISON_TABS: TechCompTab[] = [
  { id: 'comparison', label: 'OTT vs Alternatives' },
];

export interface ComparisonRow {
  feature: string;
  youtubeMemembership: string;
  instagramExclusive: string;
  bhoomiputraOtt: string;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Revenue Split', youtubeMemembership: '30% to YouTube', instagramExclusive: 'Meta takes cut', bhoomiputraOtt: '0% (only payment gateway fee ~2%)' },
  { feature: 'Custom Branding', youtubeMemembership: 'Limited', instagramExclusive: 'None', bhoomiputraOtt: 'Full control' },
  { feature: 'Marathi UI', youtubeMemembership: 'No', instagramExclusive: 'No', bhoomiputraOtt: 'Yes' },
  { feature: 'Pay-Per-Video', youtubeMemembership: 'No', instagramExclusive: 'No', bhoomiputraOtt: 'Yes' },
  { feature: 'User Database', youtubeMemembership: 'YouTube owns it', instagramExclusive: 'Meta owns it', bhoomiputraOtt: 'You own it' },
  { feature: 'Subscription Plans', youtubeMemembership: 'Basic', instagramExclusive: 'None', bhoomiputraOtt: 'Fully custom' },
  { feature: 'Video Locking', youtubeMemembership: 'No', instagramExclusive: 'Limited', bhoomiputraOtt: 'Granular per-video' },
  { feature: 'Admin Dashboard', youtubeMemembership: 'Basic analytics', instagramExclusive: 'Basic insights', bhoomiputraOtt: 'Full revenue + user mgmt' },
  { feature: 'Mobile App', youtubeMemembership: 'YouTube app', instagramExclusive: 'Instagram app', bhoomiputraOtt: 'Your branded app' },
];

// ─── Hero Copy ────────────────────────────────────────────────────────────────

export const HERO_COPY = {
  en: {
    mainHeading: 'Bhoomiputra OTT — Premium Business Education Platform',
    subheading: 'Turn Your Followers Into Paying Students',
    heroBody: 'A creator-first OTT platform that converts your Instagram and YouTube audience into paid learners. Share short business ideas as free teasers. Unlock detailed guides, profit breakdowns, and real examples for ₹99 or less.',
    cta1: 'Start Learning — ₹99 Only',
    cta2: 'Unlock Full Business Guide',
    cta3: 'Subscribe for Unlimited Access',
    preview: 'Watch Free Preview',
    limited: 'Join Bhoomiputra — Limited Time Offer',
  },
  mr: {
    mainHeading: 'भूमिपुत्र OTT — प्रीमियम बिझनेस एज्युकेशन प्लॅटफॉर्म',
    subheading: 'तुमचे फॉलोअर्स शिकणाऱ्या विद्यार्थ्यांमध्ये रूपांतरित करा',
    heroBody: 'एक क्रिएटर-फर्स्ट OTT प्लॅटफॉर्म जो तुमच्या Instagram आणि YouTube ऑडियन्सला पेड लर्नर्समध्ये रूपांतरित करते. बिझनेस आयडियाज शॉर्ट व्हिडिओंमधून शेअर करा. विस्तृत गाइड्स, प्रॉफिट ब्रेकडाउन, आणि रिअल उदाहरणे ₹99 किंवा कमीमध्ये अनलॉक करा.',
    cta1: 'शिकायला सुरुवात करा — ₹99 मात्र',
    cta2: 'पूर्ण बिझनेस गाइड अनलॉक करा',
    cta3: 'असीमित एक्सेससाठी सबस्क्राइब करा',
    preview: 'विनामूल्य पूर्वावलोकन पहा',
    limited: 'भूमिपुत्रमध्ये सामील व्हा — मर्यादित वेळ ऑफर',
  },
};

// ─── Why Choose Bhoomiputra ──────────────────────────────────────────────────

export interface WhyChoosePoint {
  title: string; titleMr?: string;
  description: string; descriptionMr?: string;
  icon: string;
}

export const WHY_CHOOSE_BHOOMIPUTRA: WhyChoosePoint[] = [
  {
    title: 'Own Your Audience',
    titleMr: 'तुमचा ऑडियन्स मालकीचा',
    description: 'Not renting YouTube\'s algorithm. Your user database, your terms.',
    descriptionMr: 'YouTube च्या अल्गोरिदमचे भाडेतलपी नाही. तुमचो यूजर डेटाबेस, तुमचे अटी.',
    icon: 'Users',
  },
  {
    title: 'Recurring Revenue',
    titleMr: 'आवर्ती राजस्व',
    description: 'Monthly subscriptions = predictable income every month.',
    descriptionMr: 'मासिक सबस्क्रिप्शन = प्रत्येक महिन्यातील अंदाजित उत्पन्न.',
    icon: 'DollarSign',
  },
  {
    title: 'Marathi-First',
    titleMr: 'मराठी-फर्स्ट',
    description: 'Built for your audience, in their language, with their payment methods.',
    descriptionMr: 'तुमच्या ऑडियन्सच्या लिए बनवलेले, त्यांच्या भाषेमध्ये, त्यांच्या पेमेंट पद्धतींसह.',
    icon: 'Globe',
  },
  {
    title: 'Creator-Controlled',
    titleMr: 'Creator-नियंत्रित',
    description: 'Upload a video in minutes. Set your price. Publish immediately.',
    descriptionMr: 'मिनिटांमध्ये व्हिडिओ अपलोड करा. तुमचे मूल्य सेट करा. ताबड तोप प्रकाशित करा.',
    icon: 'Zap',
  },
  {
    title: 'Zero Revenue Split',
    titleMr: 'शून्य राजस्व विभाजन',
    description: 'Unlike YouTube membership, you keep 100% minus payment gateway fees.',
    descriptionMr: 'YouTube membership च्या विपरीत, तुम्ही 100% वजा पेमेंट गेटवे शुल्क ठेवता.',
    icon: 'TrendingUp',
  },
  {
    title: 'Scale Without Limit',
    titleMr: 'मर्यादा न करता स्केल करा',
    description: 'From 100 to 100,000 subscribers — same platform, same control.',
    descriptionMr: '100 ते 100,000 सबस्क्राइबर पर्यंत — समान प्लॅटफॉर्म, समान नियंत्रण.',
    icon: 'Rocket',
  },
];

// ─── Backward Compatibility Exports (for existing pages) ──────────────────────

export interface SystemReplacement { name: string; replacedBy: string; reason: string; }
export interface SystemKept { name: string; usage: string; integration: string; }

export const CURRENT_SYSTEMS_REPLACED: SystemReplacement[] = [
  { name: 'Gumroad / Instamojo', replacedBy: 'Bhoomiputra OTT', reason: 'No Marathi support, no OTT experience' },
  { name: 'Manual WhatsApp groups', replacedBy: 'Bhoomiputra OTT', reason: 'Unscalable, no payment tracking' },
  { name: 'Google Drive sharing', replacedBy: 'Bhoomiputra OTT', reason: 'No access control or monetization' },
  { name: 'YouTube membership', replacedBy: 'Bhoomiputra OTT', reason: 'No custom branding, split revenue' },
  { name: 'Linktree bio', replacedBy: 'Bhoomiputra OTT', reason: 'No conversion tracking or purchase flow' },
];

export const SYSTEMS_KEPT: SystemKept[] = [
  { name: 'Instagram', usage: 'Primary traffic source (stays, deep linked)', integration: 'Deep link integration to OTT app' },
  { name: 'YouTube', usage: 'Secondary traffic + Shorts funnel (stays, API integrated)', integration: 'YouTube Data API integration' },
  { name: 'WhatsApp', usage: 'Customer support and partnership (stays, CTA button)', integration: 'WhatsApp CTA from website' },
];

export const CREDENTIALS_DATA: { id: string; name: string; value: string; category: string }[] = [
  { id: 'cred-1', name: 'Razorpay API Key', value: '••••••••••••••••', category: 'Payments' },
  { id: 'cred-2', name: 'Firebase Project ID', value: '••••••••••••••••', category: 'Authentication' },
  { id: 'cred-3', name: 'AWS S3 Bucket', value: '••••••••••••••••', category: 'Storage' },
  { id: 'cred-4', name: 'CDN API Token', value: '••••••••••••••••', category: 'Delivery' },
];

// Dummy exports for backward compatibility with existing pages
export const INTAKE_TYPES: any[] = [];
export const REPAIR_TIERS: any[] = [];
export const RETURN_CLASSIFICATIONS: { code: string; label: string; description: string }[] = [];
export const CARRIER_SCHEDULE: any[] = [];
export const ACCOUNTING_FLOWS: any[] = [];
export const INVENTORY_STATES: { code: string; label: string; source: string }[] = [];
export const ROLES_DATA: any[] = [];
export const BUSINESS_GLOSSARY = GLOSSARY;
export const PROCESS_STEPS: any[] = [];
export const GROUPS: any[] = [];
export const POWER_PLATFORM_WINS: any[] = [];
export const POWER_PLATFORM_LIMITATIONS: any[] = [];
export const ARCHITECTURE_LAYERS: any[] = [];
export const KNOWLEDGE_BASE_SECTIONS = KNOWLEDGE_BASE;
export const IMPL_PLAN_ROWS: any[] = [];
export const PP_COST_ROWS: any[] = [];
export const CC_COST_ROWS: any[] = [];
export const KEY_DEVELOPMENT_POINTS = KEY_DEV_POINTS;
export const HYBRID_DIFF_ROWS: any[] = [];
export const HYBRID_SAME_ROWS: any[] = [];
export const RECOMMENDED_TOOL_ROWS: any[] = [];
export const PP_ARCHITECTURE_LAYERS: any[] = [];
export const HYBRID_LAYERS: any[] = [];
export const DECISION_SUMMARY_ROWS: any[] = [];
export const CC_STRENGTHS: any[] = [];
export const CC_TRADEOFFS: any[] = [];
export const WF_NODES = PROCESS_NODES;
export const WF_EDGES = PROCESS_EDGES;
export const KIND_META: any = {};
export const getAlignedWFNodes: any = () => [];
export interface HistoryEntry {
  fromNodeId: string;
  fromNodeLabel: string;
  toNodeId: string;
  action: string;
}
export const MILESTONES: any[] = [];
export const SPRINTS: any[] = [];
export const MILESTONES_PP: any[] = [];
export const SPRINTS_PP: any[] = [];
export const MILESTONES_HYBRID: any[] = [];
export const SPRINTS_HYBRID: any[] = [];
export const TECH_COMPARISON: any[] = COMPARISON_ROWS;
export interface ProcessStep {
  id: string;
  name: string;
  description?: string;
}
export interface Group {
  id: string;
  heading: string;
  color: string;
  items: string[];
}
