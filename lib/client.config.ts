// ─── White-Label Client Configuration ────────────────────────────────────────
// To reuse this proposal template for another client:
//   1. Update all values below
//   2. Replace lib/data.ts with new client content
//   3. Change the password in .env → PORTAL_PASSWORD
// No other files need to change for basic rebranding.

export const CLIENT_CONFIG = {
  // ── Brand Identity ──────────────────────────────────────────────────────────
  brandName: 'Bhumiputra OTT',
  brandShortName: 'Bhumiputra',
  logoLetter: 'B',
  logoGradient: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
  logoShadow: '0 2px 10px rgba(249,115,22,0.45)',
  accentColor: '#F97316',
  accentColorLight: '#FB923C',
  accentColorDim: 'rgba(249,115,22,0.1)',
  accentBorder: 'rgba(249,115,22,0.25)',

  // ── Project Info ────────────────────────────────────────────────────────────
  tagline: 'Turn Your Followers Into Paying Students.',
  taglineMr: 'तुमचे फॉलोअर्स शिकणाऱ्या विद्यार्थ्यांमध्ये रूपांतरित करा.',
  description: 'A creator-first OTT platform that converts Instagram & YouTube audience into paid learners through premium Marathi-language business education content.',
  descriptionMr: 'इन्स्टाग्राम आणि यूट्यूब ऑडियन्सला प्रीमियम मराठी बिझनेस एज्युकेशन कंटेंटद्वारे पेड लर्नर्समध्ये रूपांतरित करणारे क्रिएटर-फर्स्ट OTT प्लॅटफॉर्म.',
  client: 'Sawgave Sir',
  clientLabel: 'Client',
  developer: 'Centera Labs Pvt Ltd',
  developerLabel: 'Developed by',

  // ── Portal UI Labels ────────────────────────────────────────────────────────
  badgeText: 'PROPOSAL',
  statusText: 'Proposal Phase',
  statusColor: '#F97316',
  portalSectionLabel: 'Platform',
  portalTitle: 'Bhumiputra OTT — Project Proposal Portal',
  portalSubtitle: 'Prepared by Centera Labs Pvt Ltd for Sawgave Sir',

  // ── Page Metadata ───────────────────────────────────────────────────────────
  documentTitle: 'Bhumiputra OTT — Project Proposal',
  documentDescription: 'Professional project proposal for the Bhumiputra OTT creator education platform.',

  // ── Login Page ──────────────────────────────────────────────────────────────
  loginTitle: 'Bhumiputra',
  loginSubtitle: 'OTT Project Proposal',
  loginIcon: 'Play', // Lucide icon name
  loginFooter: 'Confidential proposal. Shared with Sawgave Sir only.',
} as const;
