// ─── Types ────────────────────────────────────────────────────────────────────

export type Phase = 1 | 2;
export type Status = 'planned' | 'in-progress' | 'completed' | 'deferred';
export type Priority = 'P1' | 'P2' | 'P3';
export type StackSource = 'client-required' | 'recommended' | 'both';
// export type ComparisonRating = 'strong' | 'partial' | 'unsuitable';
export type ComparisonRating = 'strong' | 'moderate' | 'limited';
export type ApiAvailability = 'yes' | 'no' | 'partial';

// ─── Key Development Points ───────────────────────────────────────────────────

export interface DevPoint { icon: string; title: string; detail: string; level: 'critical' | 'important' | 'info'; }

export const KEY_DEV_POINTS: DevPoint[] = [
  { icon: 'AlertTriangle', title: 'SellerCloud export is a pre-kickoff blocker', detail: 'Full data export and audit must complete before Sprint 1 begins.', level: 'critical' },
  { icon: 'Cpu', title: 'State machine is the architectural core', detail: 'Custom guarded transitions enforce GPU lifecycle — not Power Platform.', level: 'critical' },
  { icon: 'Hash', title: 'Serial-number tracking from day one', detail: 'Every GPU tracked individually from intake to sale — no batch-only shortcut.', level: 'important' },
  { icon: 'Calendar', title: 'Phase 1: May → Nov 2026', detail: '17 modules, 30-week build. Phase 2 starts Dec 2026.', level: 'important' },
  { icon: 'Globe', title: 'GPU Exchange is Phase 2 — public-facing', detail: 'Customer buy/sell/trade/repair site — Next.js SSR, Stripe checkout.', level: 'info' },
  { icon: 'Link', title: 'M365 integrated via Microsoft Graph API', detail: 'Teams threads, Outlook, SharePoint, Planner — no Zapier middleware.', level: 'info' },
];

// ─── Project Meta ─────────────────────────────────────────────────────────────

export interface ProjectMeta {
  name: string; tagline: string; description: string;
  currentPhase: Phase; client: string; developer: string;
}

export const PROJECT_META: ProjectMeta = {
  name: 'AmazinXpress ERP & GPU Exchange',
  tagline: 'The operating system for the best GPU reseller in America.',
  description: 'A custom ERP-style platform replacing SellerCloud, ClickUp, Excel, and Slack — with Zapier automation absorbed into native ERP logic — plus a customer-facing GPU Exchange marketplace for buying, selling, trading, and repairing graphics cards. Every GPU is tracked individually by serial number from intake to sale.',
  currentPhase: 1,
  client: 'AmazinXpress',
  developer: 'Centera Labs Pvt Ltd',
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export interface StatCard { label: string; value: string; icon: string; color: string; sub?: string; }

export const STATS: StatCard[] = [
  { label: 'Total Modules', value: '30', icon: 'Layers', color: '#22C55E', sub: 'Phase 1 + Phase 2 combined' },
  { label: 'Phase 1 Modules', value: '19', icon: 'Rocket', color: '#F59E0B', sub: 'Core ERP — internal operations' },
  { label: 'Phase 2 Modules', value: '11', icon: 'Zap', color: '#8B5CF6', sub: 'GPU Exchange & advanced features' },
  { label: 'Integrations', value: '8', icon: 'GitMerge', color: '#10B981', sub: 'Active third-party services' },
  { label: 'SOPs Documented', value: '30+', icon: 'FileText', color: '#F97316', sub: 'Knowledge base sections' },
];

// ─── Modules ──────────────────────────────────────────────────────────────────

export interface Module {
  id: number; name: string; description: string;
  phase: Phase; status: Status; progress: number;
  team: string[]; subItems: string[]; priority: Priority;
}

export const MODULES_DATA: Module[] = [
  {
    id: 1, name: 'Purchasing & PO Management', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Create and manage purchase orders through their full lifecycle from draft to closed, with vendor tracking, deadline alerts, and aging reports.',
    team: ['purchasing', 'finance'],
    subItems: ['PO lifecycle states: purchased → paid → delivered → received → closed', 'B2B extended lifecycle states', 'Partial receipt support', 'Vendor return window tracking with deadline alerts', 'PO aging and exception reports', 'Configurable PO form — admin show/hide fields, mark required/optional, add custom fields', 'Vendor type dropdown: eBay, B2B, walk-in, direct, other', 'ASIN and FNSKU fields on PO line items', 'Invoice templates — PDF from PO, auto-generated invoice numbers, history per vendor, send via Outlook'],
  },
  {
    id: 2, name: 'Intake & Receiving', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Two-stage receiving workflow: Stage 1 unpacks and counts units, Stage 2 inspects, assigns condition, and confirms serial numbers. Guided escalation for mismatches.',
    team: ['technician', 'floor_manager'],
    subItems: ['Stage 1: scan tracking number, unpack, count units', 'Stage 2: receive against PO, inspect, assign condition, confirm serial', 'Guided escalation workflow: reason + notes + photos + routing', 'Escalation monitored list for follow-up', 'Multiple intake paths: purchasing, customer, returns'],
  },
  {
    id: 3, name: 'Production Workflow Management', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'End-to-end stage tracking for every GPU through the production floor — from receiving through testing, cleaning, packaging, and warehousing.',
    team: ['technician', 'floor_manager', 'warehouse'],
    subItems: ['Stage tracking: receiving → testing → cleaning → packaging → warehouse', 'Who performed each action + timestamps', 'Scan-based workflow actions', 'Technician notes per unit', 'Workflow-action-based history (not just shelf scans)'],
  },
  {
    id: 4, name: 'Testing Module', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Technician-driven GPU testing blocks with scan-based pass/fail recording, escalation for failures, and an expedited priority queue.',
    team: ['technician', 'floor_manager'],
    subItems: ['Technician begins testing block', 'Scan serial numbers tested in block', 'Record pass/fail, cleaning condition, notes', 'Failed units trigger guided escalation', 'Expedited testing priority queue', 'Testing results become part of SN history', 'Phase 2+: auto-parse HWiNFO and GPU-Z test logs'],
  },
  {
    id: 5, name: 'Inventory State, Flags & Business Logic Engine', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'The rules engine governing what can happen to each GPU at each stage — typed flags, blocking states, guarded transitions, and admin-configurable thresholds.',
    team: ['admin', 'floor_manager'],
    subItems: ['Stage and state tracking per unit', 'Typed issue flags', 'Blocked states preventing transitions', 'Allowed and disallowed transition rules', 'Condition and value change tracking', 'In-transit states', 'Admin-configurable thresholds without developer'],
  },
  {
    id: 6, name: 'Repairs Management', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Tier 1 and Tier 2 repair ticketing with issue categorization, routing, notes, outcomes, and seamless integration with each unit\'s continuous history.',
    team: ['technician', 'repair_tech'],
    subItems: ['Create repair tickets with issue categorization', 'Tier 1 and Tier 2 routing', 'Notes, comments, repair state, outcomes', 'Route repaired units back to inventory or write-off', 'Repairs stay in same continuous item history as production'],
  },
  {
    id: 7, name: 'Returns Management & Fraud Workflow', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Guided inspection workflow for all 8 return classifications — serial verification, tamper seals, fraud assessment, Amazon case management, and reimbursement tracking.',
    team: ['returns_specialist', 'floor_manager', 'finance'],
    subItems: ['Guided inspection: serial verify → tamper seal → physical → functional → fraud → routing', 'All 8 return classifications', 'Photo collection required', 'Case management branch for Amazon reimbursements', 'Reimbursement tracking', 'Returns reporting: defect rates, fraud rates, recovery amounts', 'FBM returns create a dedicated Teams chat thread per case — not just a notification', 'FBA return ingestion via Amazon SP-API — auto-pulled, LPN tracked, linked to M30'],
  },
  {
    id: 8, name: 'Warehousing & Inventory Location', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Bin-level, shelf-level, region-level, and stage-level visibility across all warehouse areas including production, internal warehouse, returns, FBA, and in-transit.',
    team: ['warehouse', 'floor_manager'],
    subItems: ['Bin level visibility', 'Shelving unit level visibility', 'Region level visibility', 'Stage level visibility', 'Areas: production, warehouse, interim warehouse, returns warehouse, FBA', 'In-transit visibility (inbound + outbound)'],
  },
  {
    id: 9, name: 'Reporting & Operational Visibility', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Multi-audience reporting — leadership metrics, technician output, and exception reports for stuck items, vendor deadlines, and unresolved flags.',
    team: ['admin', 'floor_manager', 'finance'],
    subItems: ['Leadership: units produced, hours, avg hrs/GPU, inventory value, purchasing exposure', 'Technician: units/hr, output by person, task, and throughput', 'Exception: vendor return deadlines, stuck items, unresolved flags, delayed POs', 'Export button on every list and table toolbar — Excel, CSV, PDF', 'Interactive Excel exports with formulas and formatted tables', 'Scheduled exports with email delivery or SharePoint save', 'Column filters on every column — single and multi-value', 'Save filter and column config as named view templates', 'Share saved views across team members', 'Toggle column visibility and drag-reorder columns'],
  },
  {
    id: 10, name: 'QBO Synchronization', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Two-way accounting sync with QuickBooks Online — purchasing posting, prepaid inventory logic, COGS, write-downs, FBA FIFO costing, and reconciliation.',
    team: ['finance', 'admin'],
    subItems: ['Purchasing-related posting', 'Receiving-related value movement (prepaid → inventory)', 'Inventory asset tracking', 'COGS support', 'Write-down and markdown handling', 'Graveyard and defective inventory handling', 'Reconciliation confirmation ERP vs QBO', 'Serial-number costing where possible', 'FIFO costing for FBA', 'Permission-based financial actions'],
  },
  {
    id: 11, name: 'Sales Channel & Order Management', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Unified order management across Amazon FBA, Amazon FBM, eBay, B2B, local, and GPU Exchange — connected to inventory, profitability, and returns.',
    team: ['purchasing', 'warehouse', 'finance'],
    subItems: ['Channels: Amazon FBA, Amazon FBM, eBay, B2B, Local, GPU Exchange', 'Connect orders to inventory state', 'Track sold serial numbers', 'Profitability per unit', 'Customer linkage to sold inventory', 'Return linkage'],
  },
  {
    id: 12, name: 'Search & Lookup', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Cross-system search by serial number, SKU/MSKU, PO number, customer order, and channel order — returning full unit history.',
    team: ['admin'],
    subItems: ['Serial number lookup with full history', 'SKU/MSKU lookup', 'PO lookup', 'Customer order lookup', 'Channel order lookup'],
  },
  {
    id: 13, name: 'Attachments, Photos & Documents', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'File and photo management tied to unit history — escalation photos, returns evidence, intake forms, and Amazon case documents.',
    team: ['technician', 'returns_specialist'],
    subItems: ['Escalation photos (Phase 1 priority)', 'Returns evidence (Phase 1 priority)', 'Intake forms', 'Case support documents', 'Tied to item history events'],
  },
  {
    id: 14, name: 'Permissions, Roles & Auditability', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Permission-controlled actions for 11 defined roles, with full audit logging of every scan, movement, value change, and receiving/shipment action.',
    team: ['admin'],
    subItems: ['Permission-controlled: write-downs, reclassification, sellable status', 'Audit log: scan history, movement, value changes, receiving, shipment', '11 roles: technician, repair_tech, returns_specialist, warehouse, floor_manager, purchasing, finance, admin, customer, b2b_seller', 'Product conditions admin-configurable: Grade A, B, C, For Parts, Defective (extensible)', 'Condition mapped to Amazon condition codes and eBay condition codes', 'Permission-controlled condition changes — role-gated', 'Condition change history per unit in SN history'],
  },
  {
    id: 15, name: 'Data Migration from SellerCloud', phase: 1, status: 'planned', progress: 0, priority: 'P2',
    description: 'One-time migration of all historical data from SellerCloud: serial numbers, inventory, sold history, POs, customers, and product catalog.',
    team: ['admin'],
    subItems: ['Serial number records', 'Inventory on hand', 'Sold inventory history', 'Customer linkage to sold serials', 'Purchase orders', 'Product catalog data', 'Sales history'],
  },
  {
    id: 16, name: 'Notifications & Reminders', phase: 1, status: 'planned', progress: 0, priority: 'P2',
    description: 'Multi-channel notification system (in-app, Teams, Outlook) for escalation reminders, assignment alerts, aging warnings, and completion confirmations.',
    team: ['admin', 'floor_manager'],
    subItems: ['Escalation reminders', 'Assignment reminders', 'Aging alerts for POs and vendor return windows', 'Completion notifications', 'Channels: in-app, Microsoft Teams, Outlook', 'Structured escalation templates per type: receiving mismatch, damage, testing failure, returns discrepancy, FBA discrepancy, general flag', 'Each template: pre-filled unit data, required fields enforced, photo upload, auto-routing, SLA timer, Teams notification', 'SLA timer on each escalation — auto-escalate to manager on breach', 'Scheduled task engine: inventory snapshot, PO aging, sales report, returns report, low-stock alert', 'Scheduled task config: frequency, time, output destination (email, SharePoint, download)', 'Task history log and manual trigger option', 'Replace Calendly + Slack with Microsoft Calendar + Teams — Zapier automation absorbed into native ERP logic', 'Replace Mail + Slack + ClickUp + Excel with Microsoft To Do — Zapier automation absorbed into native ERP logic'],
  },
  {
    id: 17, name: 'LPOS Bulk Import', phase: 1, status: 'planned', progress: 0, priority: 'P2',
    description: 'Bulk import bridge for large-PO pre-receiving records while native LPOS workflow is deferred to Phase 2.',
    team: ['purchasing', 'warehouse'],
    subItems: ['Bulk import finalized LPOS pre-receiving records', 'Fields: SKU/MSKU, serial number, bin/location, condition', 'Bridge while native LPOS workflow deferred to Phase 2'],
  },
  {
    id: 18, name: 'Product Catalog & Cost Catalog Master', phase: 2, status: 'planned', progress: 0, priority: 'P2',
    description: 'Replaces the current Excel-based product and cost catalog with a searchable, versioned, admin-managed catalog.',
    team: ['purchasing', 'finance'],
    subItems: ['SKU/MSKU catalog management', 'Cost catalog with versioning', 'Category and model hierarchy', 'Admin-configurable without developer', 'ASIN and FNSKU fields on every product record — searchable everywhere', 'FNSKU displayed on printed unit labels (Zebra printer)', 'ASIN and FNSKU on PO line items, order records, FBA shipments, and FBA returns'],
  },
  {
    id: 19, name: 'Large-PO Pre-Receiving (LPOS) Native Workflow', phase: 2, status: 'planned', progress: 0, priority: 'P2',
    description: 'Native B2B lot evaluation workspace replacing the LPOS bulk import bridge with a full pre-receiving workflow.',
    team: ['purchasing', 'warehouse'],
    subItems: ['B2B lot evaluation workspace', 'Line-by-line pre-receiving', 'Condition assessment workflow', 'PO confirmation integration'],
  },
  {
    id: 20, name: 'Cleaning Workflow', phase: 2, status: 'planned', progress: 0, priority: 'P2',
    description: 'Scan-supported batch cleaning workflow recording cleaning station, technician, timestamp, and condition per unit.',
    team: ['technician'],
    subItems: ['Scan-supported rapid batch scanning', 'Cleaning station assignment', 'Before/after condition notes', 'Throughput metrics by technician'],
  },
  {
    id: 21, name: 'Packaging Workflow', phase: 2, status: 'planned', progress: 0, priority: 'P2',
    description: 'Scan-supported packaging workflow with fraud-defense photo capture at every packaging step.',
    team: ['technician'],
    subItems: ['Scan-supported packaging steps', 'Fraud-defense photos required per unit', 'OEM box tracking', 'Bulk box building workflow'],
  },
  {
    id: 22, name: 'Parts Inventory & Readiness', phase: 2, status: 'planned', progress: 0, priority: 'P2',
    description: 'Track consumable parts inventory, reserve against open repair tickets, and alert when stock is low.',
    team: ['repair_tech', 'purchasing'],
    subItems: ['Parts catalog and inventory tracking', 'Reserve parts against repair tickets', 'Low-stock alerts', 'Parts reorder recommendations'],
  },
  {
    id: 23, name: 'Operations Scheduling & Labor Planning', phase: 2, status: 'planned', progress: 0, priority: 'P3',
    description: 'Time blocks, production quotas, and scheduling tools for floor operations management.',
    team: ['floor_manager'],
    subItems: ['Time block scheduling', 'Daily and weekly production quotas', 'Labor planning by station', 'Actual vs planned output tracking'],
  },
  {
    id: 24, name: 'Email-to-Task Workflow', phase: 2, status: 'planned', progress: 0, priority: 'P3',
    description: 'Parse incoming Outlook emails into structured ERP tasks automatically via Microsoft Graph API.',
    team: ['admin', 'purchasing'],
    subItems: ['Outlook email parsing via Graph API', 'Vendor response → PO task update', 'Amazon case emails → case task', 'Customer inquiry → GPU Exchange ticket'],
  },
  {
    id: 25, name: 'Training Checklists & Compliance Workflows', phase: 2, status: 'planned', progress: 0, priority: 'P3',
    description: 'Digital training checklists replacing paper forms, tied to SOP versions and employee records.',
    team: ['floor_manager', 'admin'],
    subItems: ['Digital training checklists', 'SOP version linking', 'Employee completion tracking', 'Compliance reporting'],
  },
  {
    id: 26, name: 'GPU Exchange Customer Platform', phase: 2, status: 'planned', progress: 0, priority: 'P1',
    description: 'Public-facing customer marketplace for buying, selling, trading, and repairing GPUs — powered by Stripe and the ERP inventory system.',
    team: ['customer', 'finance'],
    subItems: ['Buy flow: browse → checkout via Stripe → fulfill → live tracking', 'Sell flow: select model → condition questions → instant offer → ship → payout', 'Trade-in flow: value old GPU → browse new → pay difference → outbound ships', 'Repair flow: describe issue → estimate → approve → ship → diagnose → repair → ship back', 'B2B flow: upload CSV lot → bulk valuation → contract → pallet ship → bulk intake'],
  },
  {
    id: 27, name: 'AI Readiness & Future Automation', phase: 2, status: 'planned', progress: 0, priority: 'P2',
    description: 'AI is not the immediate core deliverable. The goal is to build a structured, scalable operating system — clean serial-number history, consistent notes, standardized workflows, well-defined issue states, and strong reporting — that becomes more valuable as AI tools continue to improve. Long-term AI capabilities become practical only when the system structure and documentation are strong enough to support them.',
    team: ['admin'],
    subItems: ['Serial-number history summarization', 'Proactive issue surfacing and anomaly detection', 'Routing and teammate suggestions for follow-up', 'Customer service assistance with case context', 'AI-assisted drafting for vendor returns and support cases', 'Future agent-based workflow execution as system matures'],
  },
  {
    id: 28, name: 'Advanced Parts Forecasting', phase: 2, status: 'planned', progress: 0, priority: 'P3',
    description: 'ML-driven forecasting of parts demand based on incoming PO volumes and historical repair rates.',
    team: ['repair_tech', 'purchasing'],
    subItems: ['Regression per part type', 'Consumption rate model by repair tier', 'Auto reorder suggestion', 'Historical accuracy tracking'],
  },
  {
    id: 29, name: 'SkuStack Replacement — Android Scanning App', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Full replacement for SkuStack — delivered as a native Android app built with React Native. Covers bin scanning, product scanning, bin and SKU transfers, label printing, and session-based scan grouping. Distributed via APK sideload or MDM. All IDs and serial numbers are clickable with drill-down navigation.',
    team: ['warehouse', 'technician', 'floor_manager'],
    subItems: ['Native Android app built with React Native', 'APK distribution via sideload or MDM — no Play Store dependency', 'Camera-based barcode and QR code scanning (no dedicated scanner hardware required)', 'Bin scanning and product scanning interface', 'Bin-to-bin transfer and SKU-to-SKU transfer workflows', 'Bin movements log — full audit trail of every scan', 'All IDs and serial numbers clickable with drill-down navigation', 'Label printing on unit receipt: serial as QR code, SKU, condition, PO number, received date', 'Zebra printer support via Bluetooth/USB (ZPL label format)', 'Offline mode with background sync — works on warehouse floor with intermittent WiFi', 'Session ID: auto-generated when scanning session begins — groups all scans under one session ID', 'Session history — view all scans per session'],
  },
  {
    id: 30, name: 'FBA Returns Ingestion', phase: 1, status: 'planned', progress: 0, priority: 'P1',
    description: 'Automatically pull FBA return data from Amazon SP-API into the ERP. Every FBA return is captured with LPN, ASIN, FNSKU, return reason, and action and state tags. Unmatched returns are flagged for manual review.',
    team: ['returns_specialist', 'floor_manager'],
    subItems: ['Connect Amazon SP-API to auto-pull FBA return data on a scheduled basis', 'Capture LPN (License Plate Number), ASIN, FNSKU, return reason per return', 'Action tags and state tags on each return record', 'Auto-match LPN to original sale serial number', 'Flag unmatched LPNs for manual review with review workflow', 'FBA returns dashboard with filtering by state, action tag, and date range', 'Link each return to unit SN history'],
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────

export interface Feature {
  id: string; name: string; moduleId: number; moduleName: string;
  priority: Priority; status: Status; description: string;
}

export const FEATURES_DATA: Feature[] = [
  { id: 'f1-1', name: 'PO Creation Form', moduleId: 1, moduleName: 'Purchasing & PO Management', priority: 'P1', status: 'planned', description: 'Create new POs with vendor, line items, cost, and expected delivery date.' },
  { id: 'f1-2', name: 'PO Lifecycle State Machine', moduleId: 1, moduleName: 'Purchasing & PO Management', priority: 'P1', status: 'planned', description: 'Guard transitions: purchased → paid → delivered → received → closed.' },
  { id: 'f1-3', name: 'Vendor Return Window Tracking', moduleId: 1, moduleName: 'Purchasing & PO Management', priority: 'P1', status: 'planned', description: 'Track return windows with alerts as deadlines approach.' },
  { id: 'f1-4', name: 'PO Aging Report', moduleId: 1, moduleName: 'Purchasing & PO Management', priority: 'P2', status: 'planned', description: 'Flag POs that have been in the same state too long.' },
  { id: 'f2-1', name: 'Stage 1 Receiving Workflow', moduleId: 2, moduleName: 'Intake & Receiving', priority: 'P1', status: 'planned', description: 'Scan tracking number, unpack, count units, flag mismatches.' },
  { id: 'f2-2', name: 'Stage 2 Receiving Workflow', moduleId: 2, moduleName: 'Intake & Receiving', priority: 'P1', status: 'planned', description: 'Receive against PO, inspect, assign condition grade, confirm serial number.' },
  { id: 'f2-3', name: 'Receiving Escalation Workflow', moduleId: 2, moduleName: 'Intake & Receiving', priority: 'P1', status: 'planned', description: 'Guided escalation for mismatches: reason + notes + photos + routing.' },
  { id: 'f4-1', name: 'Testing Block Management', moduleId: 4, moduleName: 'Testing Module', priority: 'P1', status: 'planned', description: 'Start/end testing blocks with technician assignment and timestamps.' },
  { id: 'f4-2', name: 'Pass/Fail Recording', moduleId: 4, moduleName: 'Testing Module', priority: 'P1', status: 'planned', description: 'Scan serial → record pass/fail, condition, notes.' },
  { id: 'f5-1', name: 'Unit State Tracking', moduleId: 5, moduleName: 'Inventory State, Flags & Business Logic Engine', priority: 'P1', status: 'planned', description: 'Current stage/state for every serial number in the system.' },
  { id: 'f5-2', name: 'Issue Flag System', moduleId: 5, moduleName: 'Inventory State, Flags & Business Logic Engine', priority: 'P1', status: 'planned', description: 'Typed flags that block stage transitions until resolved.' },
  { id: 'f6-1', name: 'Repair Ticket Creation', moduleId: 6, moduleName: 'Repairs Management', priority: 'P1', status: 'planned', description: 'Open Tier 1 or Tier 2 repair ticket with issue categorization.' },
  { id: 'f7-1', name: 'Returns Guided Inspection', moduleId: 7, moduleName: 'Returns Management & Fraud Workflow', priority: 'P1', status: 'planned', description: 'Step-by-step guided inspection with required photo capture at each step.' },
  { id: 'f7-2', name: 'Fraud Assessment Workflow', moduleId: 7, moduleName: 'Returns Management & Fraud Workflow', priority: 'P1', status: 'planned', description: 'Score and classify return fraud risk, route to case management if needed.' },
  { id: 'f10-1', name: 'QBO Purchase Posting', moduleId: 10, moduleName: 'QBO Synchronization', priority: 'P1', status: 'planned', description: 'Post PO creation and payment to QBO automatically.' },
  { id: 'f10-2', name: 'Prepaid Inventory Logic', moduleId: 10, moduleName: 'QBO Synchronization', priority: 'P1', status: 'planned', description: 'Move value from prepaid inventory asset to inventory asset on receipt.' },
  { id: 'f10-3', name: 'ERP vs QBO Reconciliation', moduleId: 10, moduleName: 'QBO Synchronization', priority: 'P2', status: 'planned', description: 'Reconciliation report confirming IMS inventory value matches QBO at all times.' },
  { id: 'f14-1', name: 'Role-Based Permissions', moduleId: 14, moduleName: 'Permissions, Roles & Auditability', priority: 'P1', status: 'planned', description: 'Enforce permission rules for write-downs, reclassification, and sellable status.' },
  { id: 'f14-2', name: 'Audit Log', moduleId: 14, moduleName: 'Permissions, Roles & Auditability', priority: 'P1', status: 'planned', description: 'Append-only log of every scan, movement, value change, and receiving action.' },
  { id: 'f26-1', name: 'GPU Exchange Sell Flow', moduleId: 26, moduleName: 'GPU Exchange Customer Platform', priority: 'P1', status: 'planned', description: 'Customer sell flow: select model → condition → instant offer → ship → payout.' },
  { id: 'f26-2', name: 'GPU Exchange Buy Flow', moduleId: 26, moduleName: 'GPU Exchange Customer Platform', priority: 'P1', status: 'planned', description: 'Customer buy flow: browse → checkout via Stripe → fulfill → tracking.' },
  { id: 'f27-1', name: 'Proactive Issue Surfacing & Routing', moduleId: 27, moduleName: 'AI Readiness & Future Automation', priority: 'P2', status: 'planned', description: 'Long-term capability: surface issues proactively and suggest the right teammate for follow-up, enabled by clean serial-number history and well-defined issue states in the ERP.' },
  { id: 'f27-2', name: 'AI-Assisted Drafting & Case Support', moduleId: 27, moduleName: 'AI Readiness & Future Automation', priority: 'P2', status: 'planned', description: 'Long-term capability: assist customer service with case context, draft responses, support vendor returns, and help with support-case workflows — practical only once system structure and documentation are mature.' },
  // M1 — Purchasing additions
  { id: 'f1-5', name: 'Configurable PO Form', moduleId: 1, moduleName: 'Purchasing & PO Management', priority: 'P1', status: 'planned', description: 'Admin can show/hide any PO field, mark fields required or optional, add custom fields, and set a vendor type (eBay, B2B, walk-in, direct, other). Tracking number always visible; email field hidden by default but configurable.' },
  { id: 'f1-6', name: 'PO Invoice Templates', moduleId: 1, moduleName: 'Purchasing & PO Management', priority: 'P2', status: 'planned', description: 'Generate PDF invoices directly from POs with auto-generated invoice numbers. Invoice history per vendor. Send invoices via Outlook from within the ERP.' },
  { id: 'f1-7', name: 'ASIN & FNSKU on PO Line Items', moduleId: 1, moduleName: 'Purchasing & PO Management', priority: 'P1', status: 'planned', description: 'ASIN and FNSKU fields on every PO line item — populated from the product catalog and searchable across the system.' },
  // M7 — Returns additions
  { id: 'f7-3', name: 'FBM Returns Teams Thread per Case', moduleId: 7, moduleName: 'Returns Management & Fraud Workflow', priority: 'P1', status: 'planned', description: 'Each FBM return case automatically creates a Microsoft Teams chat thread — not just a notification — so the team can collaborate on the specific case with full context.' },
  // M9 — Reporting additions
  { id: 'f9-1', name: 'Universal Exports (Excel / CSV / PDF)', moduleId: 9, moduleName: 'Reporting & Operational Visibility', priority: 'P1', status: 'planned', description: 'Export button on every list and table toolbar. Excel exports are interactive with formatted tables and formulas. CSV for raw data. PDF for print-ready reports.' },
  { id: 'f9-2', name: 'Scheduled Exports & Email Delivery', moduleId: 9, moduleName: 'Reporting & Operational Visibility', priority: 'P2', status: 'planned', description: 'Admin-configurable scheduled exports: set frequency, time, and output destination (email, SharePoint, or download). Task types: inventory snapshot, PO aging, sales report, returns report, low-stock alert. Task history log and manual trigger.' },
  { id: 'f9-3', name: 'Column Filters & Saved Views', moduleId: 9, moduleName: 'Reporting & Operational Visibility', priority: 'P1', status: 'planned', description: 'Filter on every column with single and multi-value support. Save filter and column config as named view templates. Share views across team. Toggle column visibility and drag-reorder columns.' },
  // M14 — Permissions additions
  { id: 'f14-3', name: 'Product Conditions Configuration', moduleId: 14, moduleName: 'Permissions, Roles & Auditability', priority: 'P1', status: 'planned', description: 'Admin-managed condition list (Grade A, B, C, For Parts, Defective — extensible). Each condition maps to Amazon and eBay condition codes. Condition affects listing, price tier, and warehouse state. Permission-controlled changes with full condition change history per unit.' },
  // M16 — Notifications additions
  { id: 'f16-1', name: 'Structured Escalation Templates', moduleId: 16, moduleName: 'Notifications & Reminders', priority: 'P1', status: 'planned', description: 'Typed escalation templates replace freeform Slack messages: receiving mismatch, receiving damage, testing failure, returns discrepancy, FBA discrepancy, general flag. Each template pre-fills unit data, enforces required fields, requires photo upload, auto-routes, starts an SLA timer, and posts to Teams.' },
  { id: 'f16-2', name: 'Scheduled Task Engine', moduleId: 16, moduleName: 'Notifications & Reminders', priority: 'P2', status: 'planned', description: 'Admin-configurable scheduled tasks for recurring exports and alerts. Replaces Calendly + Zapier + Slack (with Microsoft Calendar + Teams) and Mail + Zapier + Slack + ClickUp + Excel (with Microsoft To Do). Full task history log with manual trigger option.' },
  // M18 — Product Catalog additions
  { id: 'f18-1', name: 'ASIN & FNSKU Catalog Fields', moduleId: 18, moduleName: 'Product Catalog & Cost Catalog Master', priority: 'P1', status: 'planned', description: 'ASIN and FNSKU fields on every product catalog record. Searchable everywhere in the system. FNSKU printed on unit labels. Fields propagate to PO line items, order records, FBA shipments, and FBA returns.' },
  // M29 — SkuStack Replacement (Android App)
  { id: 'f29-1', name: 'React Native Android Scanning App', moduleId: 29, moduleName: 'SkuStack Replacement — Android Scanning App', priority: 'P1', status: 'planned', description: 'Native Android app built with React Native. Replaces SkuStack on the warehouse floor. Camera-based barcode and QR code scanning — no dedicated scanner hardware required. Distributed as an APK via sideload or MDM, no Play Store dependency. Supports bin scanning, product scanning, bin-to-bin transfer, and SKU-to-SKU transfer. All IDs and serials are clickable with drill-down navigation to full unit history.' },
  { id: 'f29-2', name: 'Label Printing — Zebra Printer (Bluetooth/USB)', moduleId: 29, moduleName: 'SkuStack Replacement — Android Scanning App', priority: 'P1', status: 'planned', description: 'Print a unit label on PO receipt: serial number as QR code, SKU, condition grade, PO number, and received date. Connects to Zebra printers via Bluetooth or USB from the Android app. Uses ZPL label format. Label re-print available from any unit record.' },
  { id: 'f29-3', name: 'Scanning Session IDs', moduleId: 29, moduleName: 'SkuStack Replacement — Android Scanning App', priority: 'P1', status: 'planned', description: 'Auto-generated session ID when a scanning session begins. All scans in the session are grouped under that ID. Session history shows every scan, timestamp, technician, and action taken.' },
  { id: 'f29-4', name: 'Offline Mode & Background Sync', moduleId: 29, moduleName: 'SkuStack Replacement — Android Scanning App', priority: 'P1', status: 'planned', description: 'App functions in offline mode on the warehouse floor where WiFi is intermittent. Scans and movements are queued locally and synced to the ERP in the background when connectivity is restored. Sync status visible in the app header.' },
  // M30 — FBA Returns Ingestion
  { id: 'f30-1', name: 'FBA Return Auto-Ingestion via SP-API', moduleId: 30, moduleName: 'FBA Returns Ingestion', priority: 'P1', status: 'planned', description: 'Scheduled SP-API pull automatically ingests FBA return data: LPN, ASIN, FNSKU, return reason, action tags, and state tags. Each record linked to unit SN history. Runs on configurable frequency.' },
  { id: 'f30-2', name: 'LPN Matching & Unmatched Review', moduleId: 30, moduleName: 'FBA Returns Ingestion', priority: 'P1', status: 'planned', description: 'Auto-match each LPN to the original sale serial number. Unmatched LPNs are flagged and routed to a manual review queue with a guided resolution workflow.' },
  { 
  id: 'f9-4', 
  name: 'Advanced Scheduled Export Engine', 
  moduleId: 9, 
  moduleName: 'Reporting & Operational Visibility', 
  priority: 'P2', 
  status: 'planned', 
  description: 'Rule-based scheduled export engine allowing admins to define multiple export jobs per dataset with filters, formats (Excel/CSV/PDF), triggers (time-based or event-based), and destinations (email, SharePoint, Teams). Includes retry logic, failure alerts, and execution audit logs.' 
},
];

// ─── Integrations ─────────────────────────────────────────────────────────────

export interface Integration {
  id: string; name: string; category: string; description: string;
  usedFor: string; stackSource: StackSource; status: Status;
  apiAvailable: ApiAvailability;
  apiName?: string;
  apiDocsUrl?: string;
  apiAuthMethod?: string;
  apiNote?: string;
}

export const INTEGRATIONS_DATA: Integration[] = [
  // ── Active integrations ───────────────────────────────────────────────────
  {
    id: 'qbo', name: 'QuickBooks Online', category: 'Accounting', stackSource: 'both', status: 'planned',
    description: 'Financial ledger and accounting system.',
    usedFor: 'PO posting, prepaid inventory movement, COGS, write-downs, FBM return JEs, inventory reconciliation.',
    apiAvailable: 'yes', apiName: 'QBO REST API (Intuit Developer)', apiAuthMethod: 'OAuth 2.0',
    apiDocsUrl: 'https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account',
  },
  {
    id: 'amazon', name: 'Amazon Seller API (SP-API)', category: 'Marketplace', stackSource: 'both', status: 'planned',
    description: 'Amazon Selling Partner API for FBA and FBM operations.',
    usedFor: 'FBA/FBM order sync, returns processing, inventory sync, Amazon case management, reimbursement tracking.',
    apiAvailable: 'yes', apiName: 'Amazon SP-API (Selling Partner API)', apiAuthMethod: 'OAuth 2.0',
    apiDocsUrl: 'https://developer-docs.amazon.com/sp-api/docs',
  },
  {
    id: 'ebay', name: 'eBay API', category: 'Marketplace', stackSource: 'both', status: 'planned',
    description: 'eBay Marketplace API for listing management and order processing.',
    usedFor: 'eBay listing sync, order management, inventory updates, purchase order imports.',
    apiAvailable: 'yes', apiName: 'eBay REST API (Developer Program)', apiAuthMethod: 'OAuth 2.0',
    apiDocsUrl: 'https://developer.ebay.com/develop/apis/restful-apis',
  },
  {
    id: 'easypost', name: 'EasyPost', category: 'Shipping', stackSource: 'recommended', status: 'planned',
    description: 'Unified carrier API supporting UPS, FedEx, USPS, and DHL.',
    usedFor: 'Label generation, carrier webhooks, tracking, FBA shipment creation, FBM order fulfillment.',
    apiAvailable: 'yes', apiName: 'EasyPost REST API', apiAuthMethod: 'API Key',
    apiDocsUrl: 'https://www.easypost.com/docs/api',
  },
  {
    id: 'graph', name: 'Microsoft 365 (Graph API)', category: 'Microsoft 365', stackSource: 'both', status: 'planned',
    description: 'Unified API for the entire Microsoft 365 ecosystem.',
    usedFor: 'Teams notifications, SharePoint file storage, Outlook email triggers, Planner task creation.',
    apiAvailable: 'yes', apiName: 'Microsoft Graph API', apiAuthMethod: 'OAuth 2.0',
    apiDocsUrl: 'https://learn.microsoft.com/en-us/graph/api/overview',
  },
  {
    id: 'stripe', name: 'Stripe', category: 'Payments', stackSource: 'recommended', status: 'planned',
    description: 'Payment processing and seller payout platform.',
    usedFor: 'GPU Exchange customer checkout, seller payouts, B2B invoicing, refund processing.',
    apiAvailable: 'yes', apiName: 'Stripe REST API', apiAuthMethod: 'API Key',
    apiDocsUrl: 'https://stripe.com/docs/api',
  },
  {
    id: 'pusher', name: 'Pusher', category: 'Real-time', stackSource: 'recommended', status: 'planned',
    description: 'Managed WebSocket infrastructure for real-time events.',
    usedFor: 'Live floor WIP dashboard, order status updates, GPU Exchange buyer tracking.',
    apiAvailable: 'yes', apiName: 'Pusher Channels API', apiAuthMethod: 'API Key',
    apiDocsUrl: 'https://pusher.com/docs/channels/library_auth_reference/rest-api',
  },
  // ── Evaluated / Legacy (being replaced) ──────────────────────────────────
  {
    id: 'shipstation', name: 'ShipStation', category: 'Shipping', stackSource: 'client-required', status: 'deferred',
    description: 'Shipping management platform — evaluated, superseded by EasyPost.',
    usedFor: 'Shipping label generation and order management — replaced by EasyPost unified API.',
    apiAvailable: 'yes', apiName: 'ShipStation REST API', apiAuthMethod: 'API Key',
    apiDocsUrl: 'https://www.shipstation.com/docs/api/',
    apiNote: 'Being replaced by EasyPost — API documented for migration reference',
  },
  {
    id: 'pirateship', name: 'Pirate Ship', category: 'Shipping', stackSource: 'client-required', status: 'deferred',
    description: 'Discounted USPS/UPS label tool — no public API, manual only.',
    usedFor: 'Manual label purchases — replaced by EasyPost programmatic label generation.',
    apiAvailable: 'no', apiNote: 'No public API — manual web UI only. All shipping moved to EasyPost.',
  },
  {
    id: 'sellercloud', name: 'SellerCloud', category: 'Legacy', stackSource: 'client-required', status: 'deferred',
    description: 'Current primary inventory and operations platform — being fully replaced by the custom ERP.',
    usedFor: 'Inventory management, order management, warehouse operations — data export required for migration.',
    apiAvailable: 'yes', apiName: 'SellerCloud REST API', apiAuthMethod: 'API Key',
    apiDocsUrl: 'https://developer.sellercloud.com/',
    apiNote: 'API available for data export and migration. Being fully replaced.',
  },
  {
    id: 'calendly', name: 'Calendly', category: 'Legacy', stackSource: 'client-required', status: 'deferred',
    description: 'Scheduling tool — being replaced by Microsoft Calendar + Teams.',
    usedFor: 'Appointment scheduling — replaced by Scheduled Task Engine (Module 16) + Microsoft Calendar.',
    apiAvailable: 'yes', apiName: 'Calendly v2 API', apiAuthMethod: 'OAuth 2.0',
    apiDocsUrl: 'https://developer.calendly.com/api-docs',
    apiNote: 'Being replaced by M365 Calendar + Teams',
  },
  {
    id: 'slack', name: 'Slack', category: 'Legacy', stackSource: 'client-required', status: 'deferred',
    description: 'Operations communication layer — being replaced by Microsoft Teams.',
    usedFor: 'Team notifications and coordination — fully replaced by Microsoft Teams + Graph API.',
    apiAvailable: 'yes', apiName: 'Slack Web API', apiAuthMethod: 'OAuth 2.0',
    apiDocsUrl: 'https://api.slack.com/methods',
    apiNote: 'Being replaced — Slack Web API exists but integration is not planned',
  },
  {
    id: 'clickup', name: 'ClickUp', category: 'Legacy', stackSource: 'client-required', status: 'deferred',
    description: 'Operational workflow and task management — being replaced by ERP Workflow Engine + Microsoft Planner.',
    usedFor: 'Task and workflow management — replaced by ERP native workflow engine (Module 5) + Microsoft Planner.',
    apiAvailable: 'yes', apiName: 'ClickUp REST API', apiAuthMethod: 'API Key',
    apiDocsUrl: 'https://clickup.com/api',
    apiNote: 'Being replaced — API exists for data export only',
  },
  {
    id: 'zapier', name: 'Zapier', category: 'Legacy', stackSource: 'client-required', status: 'deferred',
    description: 'Automation glue between tools — logic absorbed into native ERP workflows.',
    usedFor: 'Cross-tool automation — replaced by native ERP business logic engine, no middleware needed.',
    apiAvailable: 'yes', apiName: 'Zapier API and Webhooks', apiAuthMethod: 'API Key / Webhook',
    apiDocsUrl: 'https://platform.zapier.com/reference/zapier-platform-cli',
    apiNote: 'Being replaced — all automation moves into native ERP logic',
  },
];

// ─── Team Members ─────────────────────────────────────────────────────────────

export interface TeamMember { name: string; role: string; initials: string; color: string; focus: string; progressPct: number; }

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Operations Lead', role: 'Business Requirements & SOP Owner', initials: 'OL', color: '#F59E0B', focus: 'Assigned — starts at Phase 1 kickoff', progressPct: 0 },
  { name: 'Lead Full-Stack Dev', role: 'Architecture & Core ERP', initials: 'LD', color: '#22C55E', focus: 'Assigned — starts at Phase 1 kickoff', progressPct: 0 },
  { name: 'Frontend Developer', role: 'UI/UX & GPU Exchange', initials: 'FE', color: '#10B981', focus: 'Assigned — starts at Phase 1 kickoff', progressPct: 0 },
  { name: 'Backend Developer', role: 'Integrations & APIs', initials: 'BE', color: '#8B5CF6', focus: 'Assigned — starts at Phase 1 kickoff', progressPct: 0 },
  { name: 'ML Engineer', role: 'AI Readiness & Future Automation', initials: 'ML', color: '#06B6D4', focus: 'Assigned — starts at Phase 2 kickoff', progressPct: 0 },
  { name: 'QA Engineer', role: 'Testing & Documentation', initials: 'QA', color: '#F97316', focus: 'Assigned — starts at Phase 1 kickoff', progressPct: 0 },
];

// ─── Milestones ───────────────────────────────────────────────────────────────

export interface Milestone { date: string; label: string; description: string; phase: Phase | 0; status: 'past' | 'current' | 'future'; }

export const MILESTONES: Milestone[] = [
  // ── Phase 1 ─────────────────────────────
  { date: 'May 2026', label: 'Project Kickoff', description: 'Scoping complete, team assembled, project initiated.', phase: 1, status: 'future' },

  { date: 'Jun 2026', label: 'Architecture Finalized', description: 'Database schema, state machine design, and dev environment ready.', phase: 1, status: 'future' },

  { date: 'Aug 2026', label: 'Core Modules Complete', description: 'Purchasing, receiving, testing, and repairs modules functional.', phase: 1, status: 'future' },

  { date: 'Oct 2026', label: 'Integrations Complete', description: 'QBO, Amazon, eBay, and shipping APIs integrated and tested.', phase: 1, status: 'future' },

  { date: 'Nov 2026', label: 'Phase 1 Launch', description: 'Internal ERP goes live — AmazinXpress production team onboarded.', phase: 1, status: 'future' },

  // ── Phase 2 ─────────────────────────────
  { date: 'Dec 2026', label: 'Phase 2 Begins', description: 'GPU Exchange, advanced modules, and AI readiness development starts.', phase: 2, status: 'future' },

  { date: 'Feb 2027', label: 'GPU Exchange Beta', description: 'Customer-facing platform beta — buy, sell, trade, repair flows live.', phase: 2, status: 'future' },

  { date: 'Apr 2027', label: 'Phase 2 Complete', description: 'All 28 modules live, AI readiness infrastructure in place.', phase: 2, status: 'future' },

  { date: 'May 2027', label: 'Full Public Launch', description: 'GPU Exchange fully launched with production stability validation.', phase: 0, status: 'future' },
];

// ─── Sprints ──────────────────────────────────────────────────────────────────

export interface SprintTask { name: string; status: Status; }
export interface Sprint { number: number; title: string; dateRange: string; tasks: SprintTask[]; status: Status; }

export const SPRINTS: Sprint[] = [

  // ── Phase 1 — Core ERP (13 × 2-week sprints, May – Nov 2026) ─────────────

  {
    number: 1, title: 'Architecture & Foundation', dateRange: '1–14 May 2026', status: 'planned',
    tasks: [
      { name: 'PostgreSQL schema — units, SNs, events, POs, roles', status: 'planned' },
      { name: 'Node.js project setup — modular monolith structure', status: 'planned' },
      { name: 'Custom auth — session management, JWT, role middleware', status: 'planned' },
      { name: 'State machine design — GPU unit lifecycle states and transitions', status: 'planned' },
      { name: 'Dev environment, CI/CD pipeline, and deployment scaffolding', status: 'planned' },
      { name: 'SellerCloud data export and audit', status: 'planned' },
    ],
  },
  {
    number: 2, title: 'Business Logic Engine & Core Data Layer', dateRange: '15–28 May 2026', status: 'planned',
    tasks: [
      { name: 'Inventory state engine — unit states and stage tracking (M5)', status: 'planned' },
      { name: 'Append-only unit history event log implementation', status: 'planned' },
      { name: 'Issue flag system — typed flags and blocking states (M5)', status: 'planned' },
      { name: 'Guarded transition rules — allowed and disallowed transitions (M5)', status: 'planned' },
      { name: 'Role-based permission scaffolding — 11 roles defined (M14)', status: 'planned' },
    ],
  },
  {
    number: 3, title: 'Purchasing & PO Management', dateRange: '1–14 Jun 2026', status: 'planned',
    tasks: [
      { name: 'PO creation form — vendor, line items, cost, delivery date (M1)', status: 'planned' },
      { name: 'PO lifecycle state machine — purchased → paid → delivered → received → closed (M1)', status: 'planned' },
      { name: 'Partial receipt support (M1)', status: 'planned' },
      { name: 'Vendor return window tracking with deadline alerts (M1)', status: 'planned' },
      { name: 'B2B extended lifecycle states and PO aging report (M1)', status: 'planned' },
    ],
  },
  {
    number: 4, title: 'Intake & Receiving', dateRange: '15–28 Jun 2026', status: 'planned',
    tasks: [
      { name: 'Stage 1 receiving — scan tracking number, unpack, count units (M2)', status: 'planned' },
      { name: 'Stage 2 receiving — inspect, condition grade, serial confirm (M2)', status: 'planned' },
      { name: 'Receiving escalation workflow — reason, notes, photos, routing (M2)', status: 'planned' },
      { name: 'Escalation monitored list for purchasing follow-up (M2)', status: 'planned' },
      { name: 'Production stage tracking — units flow through workflow with timestamps (M3)', status: 'planned' },
    ],
  },
  {
    number: 5, title: 'Testing Module', dateRange: '1–14 Jul 2026', status: 'planned',
    tasks: [
      { name: 'Testing block management — start/end block, technician assignment (M4)', status: 'planned' },
      { name: 'Scan-based pass/fail recording with condition and notes (M4)', status: 'planned' },
      { name: 'Failed unit → guided escalation workflow (M4)', status: 'planned' },
      { name: 'Expedited priority queue for urgent units (M4)', status: 'planned' },
      { name: 'Test results written into unit SN history (M4)', status: 'planned' },
    ],
  },
  {
    number: 6, title: 'Repairs Management', dateRange: '15–28 Jul 2026', status: 'planned',
    tasks: [
      { name: 'Repair ticket creation with issue categorization — Tier 1 and Tier 2 (M6)', status: 'planned' },
      { name: 'Repair routing logic and state tracking (M6)', status: 'planned' },
      { name: 'Repair notes, comments, and outcomes (M6)', status: 'planned' },
      { name: 'Route repaired units back to inventory or write-off (M6)', status: 'planned' },
      { name: 'Repairs integrated into continuous unit SN history (M6)', status: 'planned' },
    ],
  },
  {
    number: 7, title: 'Returns Management & Fraud Workflow', dateRange: '1–14 Aug 2026', status: 'planned',
    tasks: [
      { name: 'Guided inspection — serial → tamper seal → physical → functional → fraud → routing (M7)', status: 'planned' },
      { name: 'All 8 return classifications and routing decisions (M7)', status: 'planned' },
      { name: 'Required photo collection at each inspection step (M7)', status: 'planned' },
      { name: 'Fraud assessment scoring and classification (M7)', status: 'planned' },
      { name: 'Amazon case management and reimbursement tracking (M7)', status: 'planned' },
    ],
  },
  {
    number: 8, title: 'Warehousing, Search & Attachments', dateRange: '15–28 Aug 2026', status: 'planned',
    tasks: [
      { name: 'Bin / shelf / region / stage inventory visibility (M8)', status: 'planned' },
      { name: 'In-transit visibility — inbound and outbound (M8)', status: 'planned' },
      { name: 'Cross-system search — SN, SKU/MSKU, PO, customer order (M12)', status: 'planned' },
      { name: 'Attachments and photos tied to unit history events (M13)', status: 'planned' },
      { name: 'Photo upload enforcement for escalations and returns evidence (M13)', status: 'planned' },
    ],
  },
  {
    number: 9, title: 'Sales Channels & Amazon SP-API', dateRange: '1–14 Sep 2026', status: 'planned',
    tasks: [
      { name: 'Sales channel management — multi-channel order framework (M11)', status: 'planned' },
      { name: 'Amazon SP-API — order sync, inventory sync, returns webhook (M11)', status: 'planned' },
      { name: 'Serial numbers marked sold and connected to channel orders (M11)', status: 'planned' },
      { name: 'Profitability per unit and customer linkage (M11)', status: 'planned' },
      { name: 'FBA vs FBM differentiation and fulfillment routing (M11)', status: 'planned' },
    ],
  },
  {
    number: 10, title: 'eBay Integration & QBO Sync', dateRange: '15–28 Sep 2026', status: 'planned',
    tasks: [
      { name: 'eBay API — listing sync, order management, inventory updates', status: 'planned' },
      { name: 'QBO purchasing posting — PO creation and payment sync (M10)', status: 'planned' },
      { name: 'Receiving value movement — prepaid asset → inventory asset (M10)', status: 'planned' },
      { name: 'COGS posting, write-downs, and markdown handling (M10)', status: 'planned' },
      { name: 'FIFO costing for FBA lots (M10)', status: 'planned' },
    ],
  },
  {
    number: 11, title: 'Shipping, Notifications & Reporting', dateRange: '1–14 Oct 2026', status: 'planned',
    tasks: [
      { name: 'EasyPost integration — label generation, carrier webhooks, tracking', status: 'planned' },
      { name: 'FBA shipment creation via EasyPost', status: 'planned' },
      { name: 'Notification system — in-app, Microsoft Teams, Outlook (M16)', status: 'planned' },
      { name: 'Real-time live floor WIP dashboard via Pusher (M9)', status: 'planned' },
      { name: 'Leadership, technician, and exception reporting dashboards (M9)', status: 'planned' },
    ],
  },
  {
    number: 12, title: 'Permissions, Audit Log & Data Migration', dateRange: '15–28 Oct 2026', status: 'planned',
    tasks: [
      { name: 'Full permission enforcement — write-downs, reclassify, sellable status (M14)', status: 'planned' },
      { name: 'Append-only audit log — scans, movements, value changes, receiving (M14)', status: 'planned' },
      { name: 'SellerCloud data migration — SNs, inventory, POs, customers, catalog (M15)', status: 'planned' },
      { name: 'LPOS bulk import bridge (M17)', status: 'planned' },
      { name: 'QBO reconciliation report — ERP vs QBO zero-delta validation (M10)', status: 'planned' },
    ],
  },
  {
    number: 13, title: 'Phase 1 Hardening & Launch', dateRange: 'Nov 2026', status: 'planned',
    tasks: [
      { name: 'End-to-end test coverage — all 5 E2E journeys passing (QA)', status: 'planned' },
      { name: 'User acceptance testing with AmazinXpress team', status: 'planned' },
      { name: 'SOP documentation digitization and training materials', status: 'planned' },
      { name: 'Bug fixes, performance polish, and security review', status: 'planned' },
      { name: 'Phase 1 production deployment', status: 'planned' },
      { name: 'Monitoring, alerting, and on-call runbook setup', status: 'planned' },
    ],
  },

  // ── Phase 2 — GPU Exchange & AI Readiness (10 × 2-week sprints, Dec 2026 – Apr 2027) ──

  {
    number: 14, title: 'Phase 2 Foundation & Product Catalog', dateRange: '1–14 Dec 2026', status: 'planned',
    tasks: [
      { name: 'GPU Exchange Next.js app setup — routing, layout, auth (M26)', status: 'planned' },
      { name: 'Product catalog and cost catalog master — SKU/MSKU, versioning (M18)', status: 'planned' },
      { name: 'Stripe integration — checkout, payouts, webhook handling', status: 'planned' },
      { name: 'Pusher real-time infrastructure setup', status: 'planned' },
    ],
  },
  {
    number: 15, title: 'GPU Exchange — Buy & Sell Flows', dateRange: '15–28 Dec 2026', status: 'planned',
    tasks: [
      { name: 'Sell flow — model → condition questions → instant offer → ship → payout (M26)', status: 'planned' },
      { name: 'Buy flow — browse → checkout via Stripe → fulfill → live tracking (M26)', status: 'planned' },
      { name: 'GPU Exchange inventory sync with ERP state and SN assignment (M26)', status: 'planned' },
      { name: 'Seller payout processing and reconciliation (M26)', status: 'planned' },
    ],
  },
  {
    number: 16, title: 'GPU Exchange — Trade-in, Repair & B2B Flows', dateRange: '1–14 Jan 2027', status: 'planned',
    tasks: [
      { name: 'Trade-in flow — value old GPU → browse new → pay difference → outbound ships (M26)', status: 'planned' },
      { name: 'Repair flow — describe → estimate → approve → ship → diagnose → repair → return (M26)', status: 'planned' },
      { name: 'B2B flow — CSV lot → bulk valuation → contract → pallet ship → bulk intake (M26)', status: 'planned' },
    ],
  },
  {
    number: 17, title: 'LPOS Native Workflow & Cleaning', dateRange: '15–28 Jan 2027', status: 'planned',
    tasks: [
      { name: 'LPOS native B2B lot evaluation workspace — replaces bulk import bridge (M19)', status: 'planned' },
      { name: 'Line-by-line pre-receiving and PO confirmation integration (M19)', status: 'planned' },
      { name: 'Cleaning workflow — scan-supported batch, station assignment, technician metrics (M20)', status: 'planned' },
    ],
  },
  {
    number: 18, title: 'Packaging Workflow & Parts Inventory', dateRange: '1–14 Feb 2027', status: 'planned',
    tasks: [
      { name: 'Packaging workflow — fraud-defense photo capture per unit (M21)', status: 'planned' },
      { name: 'OEM box tracking and bulk box building workflow (M21)', status: 'planned' },
      { name: 'Parts catalog and inventory tracking (M22)', status: 'planned' },
      { name: 'Reserve parts against repair tickets, low-stock alerts, reorder recommendations (M22)', status: 'planned' },
    ],
  },
  {
    number: 19, title: 'Scheduling, Email-to-Task & Training', dateRange: '15–28 Feb 2027', status: 'planned',
    tasks: [
      { name: 'Operations scheduling and labor planning — time blocks, quotas (M23)', status: 'planned' },
      { name: 'Actual vs planned output tracking per station (M23)', status: 'planned' },
      { name: 'Email-to-task workflow via Microsoft Graph API — vendor, Amazon, customer (M24)', status: 'planned' },
      { name: 'Training checklists and compliance workflows — SOP-linked, employee tracked (M25)', status: 'planned' },
    ],
  },
  {
    number: 20, title: 'Advanced Forecasting & AI Readiness Infrastructure', dateRange: '1–14 Mar 2027', status: 'planned',
    tasks: [
      { name: 'Advanced parts forecasting — regression, consumption model, auto-reorder suggestion (M28)', status: 'planned' },
      { name: 'AI readiness data audit — SN history completeness, flag coverage, workflow consistency (M27)', status: 'planned' },
      { name: 'SN history export hooks and summarization stubs (M27)', status: 'planned' },
      { name: 'Proactive issue surfacing and routing suggestion framework (M27)', status: 'planned' },
    ],
  },
  {
    number: 21, title: 'Phase 2 Integration Hardening', dateRange: '15–28 Mar 2027', status: 'planned',
    tasks: [
      { name: 'GPU Exchange UAT — buy, sell, trade-in, repair, B2B flows end-to-end', status: 'planned' },
      { name: 'Stripe payout reconciliation and edge-case testing', status: 'planned' },
      { name: 'Pusher real-time event validation under load', status: 'planned' },
      { name: 'GPU Exchange analytics and advanced reporting enhancements', status: 'planned' },
    ],
  },
  {
    number: 22, title: 'Full System QA & Launch Preparation', dateRange: '1–14 Apr 2027', status: 'planned',
    tasks: [
      { name: 'Full 28-module regression test suite — all E2E journeys', status: 'planned' },
      { name: 'Performance and load testing under production-level volume', status: 'planned' },
      { name: 'GPU Exchange public beta — limited live user group', status: 'planned' },
      { name: 'Security audit and data access review', status: 'planned' },
    ],
  },
  {
    number: 23, title: 'Phase 2 Production Deployment & Full Launch', dateRange: '15–30 Apr 2027', status: 'planned',
    tasks: [
      { name: 'Phase 2 production deployment — all 28 modules live', status: 'planned' },
      { name: 'GPU Exchange full public launch', status: 'planned' },
      { name: 'Monitoring, alerting, and on-call runbook updates', status: 'planned' },
      { name: 'Handover documentation and team training completion', status: 'planned' },
    ],
  },
];

// ─── Power Platform Roadmap ───────────────────────────────────────────────────

export const MILESTONES_PP: Milestone[] = [
  { date: 'May 2026', label: 'Project Kickoff', description: 'Scoping complete, Power Platform environments provisioned, licenses assigned.', phase: 1, status: 'future' },
  { date: 'May 2026', label: 'Dataverse Schema Ready', description: 'All tables, relationships, business rules, and security roles configured in Dataverse.', phase: 1, status: 'future' },
  { date: 'Jul 2026', label: 'Core Modules Live', description: 'Purchasing, receiving, testing, repairs, and returns modules functional in Power Apps.', phase: 1, status: 'future' },
  { date: 'Aug 2026', label: 'Integrations Complete', description: 'QBO, Amazon SP-API, eBay, EasyPost connected via Power Automate. Power BI dashboards live.', phase: 1, status: 'future' },
  { date: 'Sep 2026', label: 'Phase 1 Launch', description: 'Internal ERP live on Power Platform — AmazinXpress production team onboarded.', phase: 1, status: 'future' },
  { date: 'Oct 2026', label: 'Phase 2 Begins', description: 'Advanced modules, AI features, and email-to-task workflows begin.', phase: 2, status: 'future' },
  { date: 'Jan 2027', label: 'Phase 2 Complete', description: 'All Power Platform-deliverable modules live. AI readiness in place via Azure OpenAI.', phase: 2, status: 'future' },
  { date: '⚠️ GPU Exchange', label: 'Not Deliverable on This Path', description: 'Power Pages cannot support SSR, SEO, Stripe payments, or ecommerce-grade UX. GPU Exchange requires a separate custom-code project.', phase: 0, status: 'future' },
];

export const SPRINTS_PP: Sprint[] = [

  // ── Phase 1 — Core ERP on Power Platform (8 × 2-week sprints, May – Sep 2026) ──

  {
    number: 1, title: 'Dataverse Schema & Environment Setup', dateRange: '1–14 May 2026', status: 'planned',
    tasks: [
      { name: 'Dataverse tables — units, serial numbers, purchase orders, roles, unit history log', status: 'planned' },
      { name: 'Power Platform environments — development, UAT, production', status: 'planned' },
      { name: 'Entra ID / Azure AD authentication and Power Apps license assignment', status: 'planned' },
      { name: 'ALM pipeline — managed solutions, Azure DevOps, environment variable strategy', status: 'planned' },
      { name: 'SellerCloud data export and audit', status: 'planned' },
    ],
  },
  {
    number: 2, title: 'Business Rules & Core Automation', dateRange: '15–28 May 2026', status: 'planned',
    tasks: [
      { name: 'GPU lifecycle status column — state transitions approximated via Dataverse business rules', status: 'planned' },
      { name: 'Append-style unit history table — timestamped event log per serial number', status: 'planned' },
      { name: 'Issue flag table — flag type, blocking column, resolution state', status: 'planned' },
      { name: 'Power Automate — base notification flows: Teams alerts, Outlook reminders', status: 'planned' },
      { name: 'Dataverse security roles and field-level security profiles — 11 roles', status: 'planned' },
    ],
  },
  {
    number: 3, title: 'Purchasing & PO Management', dateRange: '1–14 Jun 2026', status: 'planned',
    tasks: [
      { name: 'PO creation canvas app — vendor, line items, cost, expected delivery (M1)', status: 'planned' },
      { name: 'PO status column — lifecycle states via Dataverse status transitions (M1)', status: 'planned' },
      { name: 'Partial receipt support — related receiving line items table (M1)', status: 'planned' },
      { name: 'Power Automate — vendor return deadline reminder alerts to purchasing via Teams (M1)', status: 'planned' },
      { name: 'Power BI — PO aging and open PO dashboard (scheduled refresh, not real-time) (M1)', status: 'planned' },
    ],
  },
  {
    number: 4, title: 'Intake & Receiving', dateRange: '15–28 Jun 2026', status: 'planned',
    tasks: [
      { name: 'Stage 1 receiving canvas app — scan tracking number, record unpack count (M2)', status: 'planned' },
      { name: 'Stage 2 form — inspect against PO, assign condition grade, confirm serial (M2)', status: 'planned' },
      { name: 'Receiving escalation flow — guided reason, notes, photo, Teams alert to purchasing (M2)', status: 'planned' },
      { name: 'Escalation monitored view in Power Apps for purchasing follow-up (M2)', status: 'planned' },
      { name: 'Production stage tracking via unit status column updates with timestamps (M3)', status: 'planned' },
    ],
  },
  {
    number: 5, title: 'Testing Module', dateRange: '1–14 Jul 2026', status: 'planned',
    tasks: [
      { name: 'Testing block canvas app — start/end block, technician assignment, scan-based entry (M4)', status: 'planned' },
      { name: 'Pass/fail recording with condition grade and notes (M4)', status: 'planned' },
      { name: 'Failed unit escalation — guided multi-step form with required photo capture (M4)', status: 'planned' },
      { name: 'Expedited priority queue — column filter and technician view (M4)', status: 'planned' },
      { name: 'Test results written to unit history table in Dataverse (M4)', status: 'planned' },
    ],
  },
  {
    number: 6, title: 'Repairs & Returns', dateRange: '15–28 Jul 2026', status: 'planned',
    tasks: [
      { name: 'Repair ticket canvas form — issue category, Tier 1 / Tier 2 routing, outcome recording (M6)', status: 'planned' },
      { name: 'Repair state tracking, notes thread, and parts availability column (M6)', status: 'planned' },
      { name: 'Guided returns inspection canvas app — 6-step sequential inspection form (M7)', status: 'planned' },
      { name: 'All 8 return classifications with routing decisions (M7)', status: 'planned' },
      { name: 'Photo attachment collection via Power Apps camera control for escalations and returns (M7)', status: 'planned' },
    ],
  },
  {
    number: 7, title: 'Sales Channels, Integrations & Warehousing', dateRange: '1–14 Aug 2026', status: 'planned',
    tasks: [
      { name: 'Amazon SP-API custom connector — order sync, inventory updates, returns webhook (M11)', status: 'planned' },
      { name: 'eBay API custom connector — order management and inventory updates', status: 'planned' },
      { name: 'QBO sync via Power Automate — purchasing, receiving, COGS, and write-downs (M10)', status: 'planned' },
      { name: 'Warehousing views — bin, shelf, region, stage hierarchy in Power Apps (M8)', status: 'planned' },
      { name: 'EasyPost label generation via Power Automate HTTP action', status: 'planned' },
    ],
  },
  {
    number: 8, title: 'Permissions, Migration & Phase 1 Launch', dateRange: '15 Aug – Sep 2026', status: 'planned',
    tasks: [
      { name: 'Dataverse security role enforcement — 11 roles with field-level access controls (M14)', status: 'planned' },
      { name: 'Audit log table — scan history, movement, value changes, receiving actions (M14)', status: 'planned' },
      { name: 'SellerCloud data migration — SNs, inventory, POs, customer linkage, product catalog (M15)', status: 'planned' },
      { name: 'Power BI — leadership, technician output, and exception reporting dashboards (M9)', status: 'planned' },
      { name: 'User acceptance testing and Phase 1 production deployment', status: 'planned' },
    ],
  },

  // ── Phase 2 — Advanced Modules (4 × 2-week sprints, Oct 2026 – Jan 2027) ──

  {
    number: 9, title: 'Product Catalog & Advanced Approvals', dateRange: 'Oct 2026', status: 'planned',
    tasks: [
      { name: 'Cost Catalog Master in Dataverse — SKU/MSKU, series anchors, pricing tiers (M18)', status: 'planned' },
      { name: 'Advanced Power Automate approval chains — write-downs and reclassifications (M14)', status: 'planned' },
      { name: 'Operations scheduling canvas app — time blocks, employee task assignment (M23)', status: 'planned' },
      { name: 'Actual vs planned output tracking and technician productivity views (M23)', status: 'planned' },
    ],
  },
  {
    number: 10, title: 'Email-to-Task & Parts Inventory', dateRange: 'Nov 2026', status: 'planned',
    tasks: [
      { name: 'Outlook-triggered Power Automate flows — vendor, Amazon, and customer email intake (M24)', status: 'planned' },
      { name: 'Parts inventory tracking in Dataverse — quantities, location, availability (M22)', status: 'planned' },
      { name: 'Reserve parts against repair tickets via Power Automate flows (M22)', status: 'planned' },
      { name: 'Low-stock alert flows and reorder recommendation rules (M22)', status: 'planned' },
    ],
  },
  {
    number: 11, title: 'Training, AI Integration & Advanced Reporting', dateRange: 'Dec 2026', status: 'planned',
    tasks: [
      { name: 'Training checklist canvas app — SOP-linked, employee-tracked compliance workflows (M25)', status: 'planned' },
      { name: 'Azure OpenAI via Power Automate — SN history summarization and case drafting (M27)', status: 'planned' },
      { name: 'Microsoft Copilot integration for escalation and support-case assistance (M27)', status: 'planned' },
      { name: 'Advanced Power BI — returns trends, fraud rates, and reimbursement recovery dashboards (M9)', status: 'planned' },
    ],
  },
  {
    number: 12, title: 'Phase 2 Hardening & Launch', dateRange: 'Jan 2027', status: 'planned',
    tasks: [
      { name: 'End-to-end UAT across all Power Apps modules and Power Automate flows', status: 'planned' },
      { name: 'Dataverse capacity review and performance tuning', status: 'planned' },
      { name: 'Bug fixes, user training, and SOP documentation completion', status: 'planned' },
      { name: 'Phase 2 production deployment — all Power Platform-deliverable modules live', status: 'planned' },
      { name: '⚠️ GPU Exchange not included — requires separate Next.js + Stripe custom build', status: 'planned' },
    ],
  },
];

// ─── Hybrid Roadmap ───────────────────────────────────────────────────────────

export const MILESTONES_HYBRID: Milestone[] = [
  { date: 'May 2026', label: 'Project Kickoff', description: 'Scoping complete, team assembled, custom code stack and M365 Graph API OAuth configured.', phase: 1, status: 'future' },
  { date: 'Jun 2026', label: 'Architecture Finalized', description: 'Database schema, state machine, dev environment, and Microsoft Graph API integration ready.', phase: 1, status: 'future' },
  { date: 'Aug 2026', label: 'Core Modules Complete', description: 'Purchasing, receiving, testing, repairs, and returns modules functional.', phase: 1, status: 'future' },
  { date: 'Oct 2026', label: 'Integrations Complete', description: 'QBO, Amazon, eBay, shipping, and M365 (Teams/Outlook/SharePoint) fully integrated.', phase: 1, status: 'future' },
  { date: 'Nov 2026', label: 'Phase 1 Launch', description: 'Internal ERP live — M365 ecosystem fully connected, production team onboarded.', phase: 1, status: 'future' },
  { date: 'Dec 2026', label: 'Phase 2 Begins', description: 'GPU Exchange, advanced modules, and AI readiness development starts.', phase: 2, status: 'future' },
  { date: 'Feb 2027', label: 'GPU Exchange Beta', description: 'Customer-facing platform beta — buy, sell, trade, and repair flows live.', phase: 2, status: 'future' },
  { date: 'Apr 2027', label: 'Phase 2 Complete', description: 'All 28 modules live, AI readiness infrastructure in place.', phase: 2, status: 'future' },
  { date: 'May 2027', label: 'Full Public Launch', description: 'GPU Exchange fully launched with production stability validation.', phase: 0, status: 'future' },
];

export const SPRINTS_HYBRID: Sprint[] = [

  // ── Phase 1 — Core ERP (13 × 2-week sprints, May – Nov 2026) ─────────────

  {
    number: 1, title: 'Architecture & Foundation', dateRange: '1–14 May 2026', status: 'planned',
    tasks: [
      { name: 'PostgreSQL schema — units, SNs, events, POs, roles', status: 'planned' },
      { name: 'Node.js project setup — modular monolith structure', status: 'planned' },
      { name: 'Microsoft Graph API OAuth2 setup — Entra ID SSO, Teams and Outlook permissions', status: 'planned' },
      { name: 'State machine design — GPU unit lifecycle states and transitions', status: 'planned' },
      { name: 'Dev environment, CI/CD pipeline, and deployment scaffolding', status: 'planned' },
      { name: 'SellerCloud data export and audit', status: 'planned' },
    ],
  },
  {
    number: 2, title: 'Business Logic Engine & Core Data Layer', dateRange: '15–28 May 2026', status: 'planned',
    tasks: [
      { name: 'Inventory state engine — unit states and stage tracking (M5)', status: 'planned' },
      { name: 'Append-only unit history event log implementation', status: 'planned' },
      { name: 'Issue flag system — typed flags and blocking states (M5)', status: 'planned' },
      { name: 'Guarded transition rules — allowed and disallowed transitions (M5)', status: 'planned' },
      { name: 'Role-based permission scaffolding — 11 roles defined (M14)', status: 'planned' },
    ],
  },
  {
    number: 3, title: 'Purchasing & PO Management', dateRange: '1–14 Jun 2026', status: 'planned',
    tasks: [
      { name: 'PO creation form — vendor, line items, cost, delivery date (M1)', status: 'planned' },
      { name: 'PO lifecycle state machine — purchased → paid → delivered → received → closed (M1)', status: 'planned' },
      { name: 'Partial receipt support (M1)', status: 'planned' },
      { name: 'Vendor return window tracking with deadline alerts (M1)', status: 'planned' },
      { name: 'B2B extended lifecycle states and PO aging report (M1)', status: 'planned' },
    ],
  },
  {
    number: 4, title: 'Intake & Receiving', dateRange: '15–28 Jun 2026', status: 'planned',
    tasks: [
      { name: 'Stage 1 receiving — scan tracking number, unpack, count units (M2)', status: 'planned' },
      { name: 'Stage 2 receiving — inspect, condition grade, serial confirm (M2)', status: 'planned' },
      { name: 'Receiving escalation workflow — reason, notes, photos, routing (M2)', status: 'planned' },
      { name: 'Escalation monitored list for purchasing follow-up (M2)', status: 'planned' },
      { name: 'Production stage tracking — units flow through workflow with timestamps (M3)', status: 'planned' },
    ],
  },
  {
    number: 5, title: 'Testing Module', dateRange: '1–14 Jul 2026', status: 'planned',
    tasks: [
      { name: 'Testing block management — start/end block, technician assignment (M4)', status: 'planned' },
      { name: 'Scan-based pass/fail recording with condition and notes (M4)', status: 'planned' },
      { name: 'Failed unit → guided escalation workflow (M4)', status: 'planned' },
      { name: 'Expedited priority queue for urgent units (M4)', status: 'planned' },
      { name: 'Test results written into unit SN history (M4)', status: 'planned' },
    ],
  },
  {
    number: 6, title: 'Repairs Management', dateRange: '15–28 Jul 2026', status: 'planned',
    tasks: [
      { name: 'Repair ticket creation with issue categorization — Tier 1 and Tier 2 (M6)', status: 'planned' },
      { name: 'Repair routing logic and state tracking (M6)', status: 'planned' },
      { name: 'Repair notes, comments, and outcomes (M6)', status: 'planned' },
      { name: 'Route repaired units back to inventory or write-off (M6)', status: 'planned' },
      { name: 'Repairs integrated into continuous unit SN history (M6)', status: 'planned' },
    ],
  },
  {
    number: 7, title: 'Returns Management & Fraud Workflow', dateRange: '1–14 Aug 2026', status: 'planned',
    tasks: [
      { name: 'Guided inspection — serial → tamper seal → physical → functional → fraud → routing (M7)', status: 'planned' },
      { name: 'All 8 return classifications and routing decisions (M7)', status: 'planned' },
      { name: 'Required photo collection at each inspection step (M7)', status: 'planned' },
      { name: 'Fraud assessment scoring and classification (M7)', status: 'planned' },
      { name: 'Amazon case management and reimbursement tracking (M7)', status: 'planned' },
    ],
  },
  {
    number: 8, title: 'Warehousing, Search & Attachments', dateRange: '15–28 Aug 2026', status: 'planned',
    tasks: [
      { name: 'Bin / shelf / region / stage inventory visibility (M8)', status: 'planned' },
      { name: 'In-transit visibility — inbound and outbound (M8)', status: 'planned' },
      { name: 'Cross-system search — SN, SKU/MSKU, PO, customer order (M12)', status: 'planned' },
      { name: 'Attachments and photos tied to unit history events (M13)', status: 'planned' },
      { name: 'Photo upload enforcement for escalations and returns evidence (M13)', status: 'planned' },
    ],
  },
  {
    number: 9, title: 'Sales Channels & Amazon SP-API', dateRange: '1–14 Sep 2026', status: 'planned',
    tasks: [
      { name: 'Sales channel management — multi-channel order framework (M11)', status: 'planned' },
      { name: 'Amazon SP-API — order sync, inventory sync, returns webhook (M11)', status: 'planned' },
      { name: 'Serial numbers marked sold and connected to channel orders (M11)', status: 'planned' },
      { name: 'Profitability per unit and customer linkage (M11)', status: 'planned' },
      { name: 'FBA vs FBM differentiation and fulfillment routing (M11)', status: 'planned' },
    ],
  },
  {
    number: 10, title: 'eBay Integration & QBO Sync', dateRange: '15–28 Sep 2026', status: 'planned',
    tasks: [
      { name: 'eBay API — listing sync, order management, inventory updates', status: 'planned' },
      { name: 'QBO purchasing posting — PO creation and payment sync (M10)', status: 'planned' },
      { name: 'Receiving value movement — prepaid asset → inventory asset (M10)', status: 'planned' },
      { name: 'COGS posting, write-downs, and markdown handling (M10)', status: 'planned' },
      { name: 'FIFO costing for FBA lots (M10)', status: 'planned' },
    ],
  },
  {
    number: 11, title: 'Shipping, Notifications & Reporting', dateRange: '1–14 Oct 2026', status: 'planned',
    tasks: [
      { name: 'EasyPost integration — label generation, carrier webhooks, tracking', status: 'planned' },
      { name: 'FBA shipment creation via EasyPost', status: 'planned' },
      { name: 'Microsoft Teams notifications via Power Automate — zero-code alert flows for escalations, exceptions, and deadlines (M16)', status: 'planned' },
      { name: 'Outlook email triggers via Microsoft Graph API — vendor, Amazon, and customer email intake (M16)', status: 'planned' },
      { name: 'Real-time live floor WIP dashboard via Pusher WebSockets (M9)', status: 'planned' },
      { name: 'Leadership, technician, and exception reporting dashboards (M9)', status: 'planned' },
    ],
  },
  {
    number: 12, title: 'Permissions, Audit Log & Data Migration', dateRange: '15–28 Oct 2026', status: 'planned',
    tasks: [
      { name: 'Full permission enforcement — write-downs, reclassify, sellable status (M14)', status: 'planned' },
      { name: 'Append-only audit log — scans, movements, value changes, receiving (M14)', status: 'planned' },
      { name: 'SellerCloud data migration — SNs, inventory, POs, customers, catalog (M15)', status: 'planned' },
      { name: 'LPOS bulk import bridge (M17)', status: 'planned' },
      { name: 'QBO reconciliation report — ERP vs QBO zero-delta validation (M10)', status: 'planned' },
    ],
  },
  {
    number: 13, title: 'Phase 1 Hardening & Launch', dateRange: 'Nov 2026', status: 'planned',
    tasks: [
      { name: 'End-to-end test coverage — all 5 E2E journeys passing (QA)', status: 'planned' },
      { name: 'User acceptance testing with AmazinXpress team', status: 'planned' },
      { name: 'SOP documentation digitization and training materials', status: 'planned' },
      { name: 'Bug fixes, performance polish, and security review', status: 'planned' },
      { name: 'Phase 1 production deployment', status: 'planned' },
      { name: 'Monitoring, alerting, and on-call runbook setup', status: 'planned' },
    ],
  },

  // ── Phase 2 — GPU Exchange & AI Readiness (10 × 2-week sprints, Dec 2026 – Apr 2027) ──

  {
    number: 14, title: 'Phase 2 Foundation & Product Catalog', dateRange: '1–14 Dec 2026', status: 'planned',
    tasks: [
      { name: 'GPU Exchange Next.js app setup — routing, layout, auth (M26)', status: 'planned' },
      { name: 'Product catalog and cost catalog master — SKU/MSKU, versioning (M18)', status: 'planned' },
      { name: 'Stripe integration — checkout, payouts, webhook handling', status: 'planned' },
      { name: 'Pusher real-time infrastructure setup', status: 'planned' },
    ],
  },
  {
    number: 15, title: 'GPU Exchange — Buy & Sell Flows', dateRange: '15–28 Dec 2026', status: 'planned',
    tasks: [
      { name: 'Sell flow — model → condition → instant offer → ship → payout (M26)', status: 'planned' },
      { name: 'Buy flow — browse → checkout via Stripe → fulfill → live tracking (M26)', status: 'planned' },
      { name: 'GPU Exchange inventory sync with ERP state and SN assignment (M26)', status: 'planned' },
      { name: 'Seller payout processing and reconciliation (M26)', status: 'planned' },
    ],
  },
  {
    number: 16, title: 'GPU Exchange — Trade-in, Repair & B2B Flows', dateRange: '1–14 Jan 2027', status: 'planned',
    tasks: [
      { name: 'Trade-in flow — value old GPU → browse new → pay difference → outbound ships (M26)', status: 'planned' },
      { name: 'Repair flow — describe → estimate → approve → ship → diagnose → repair → return (M26)', status: 'planned' },
      { name: 'B2B flow — CSV lot → bulk valuation → contract → pallet ship → bulk intake (M26)', status: 'planned' },
    ],
  },
  {
    number: 17, title: 'LPOS Native Workflow & Cleaning', dateRange: '15–28 Jan 2027', status: 'planned',
    tasks: [
      { name: 'LPOS native B2B lot evaluation workspace — replaces bulk import bridge (M19)', status: 'planned' },
      { name: 'Line-by-line pre-receiving and PO confirmation integration (M19)', status: 'planned' },
      { name: 'Cleaning workflow — scan-supported batch, station assignment, technician metrics (M20)', status: 'planned' },
    ],
  },
  {
    number: 18, title: 'Packaging Workflow & Parts Inventory', dateRange: '1–14 Feb 2027', status: 'planned',
    tasks: [
      { name: 'Packaging workflow — fraud-defense photo capture per unit (M21)', status: 'planned' },
      { name: 'OEM box tracking and bulk box building workflow (M21)', status: 'planned' },
      { name: 'Parts catalog and inventory tracking (M22)', status: 'planned' },
      { name: 'Reserve parts against repair tickets, low-stock alerts, reorder recommendations (M22)', status: 'planned' },
    ],
  },
  {
    number: 19, title: 'Scheduling & Training Workflows', dateRange: '15–28 Feb 2027', status: 'planned',
    tasks: [
      { name: 'Operations scheduling and labor planning — time blocks, quotas (M23)', status: 'planned' },
      { name: 'Actual vs planned output tracking per station (M23)', status: 'planned' },
      { name: 'SharePoint document library integration for SOP and training materials (M25)', status: 'planned' },
      { name: 'Training checklists and compliance workflows — SOP-linked, employee tracked (M25)', status: 'planned' },
    ],
  },
  {
    number: 20, title: 'Advanced Forecasting & AI Readiness Infrastructure', dateRange: '1–14 Mar 2027', status: 'planned',
    tasks: [
      { name: 'Advanced parts forecasting — regression, consumption model, auto-reorder suggestion (M28)', status: 'planned' },
      { name: 'AI readiness data audit — SN history completeness, flag coverage, workflow consistency (M27)', status: 'planned' },
      { name: 'SN history export hooks and summarization stubs (M27)', status: 'planned' },
      { name: 'Proactive issue surfacing and routing suggestion framework (M27)', status: 'planned' },
    ],
  },
  {
    number: 21, title: 'Phase 2 Integration Hardening', dateRange: '15–28 Mar 2027', status: 'planned',
    tasks: [
      { name: 'GPU Exchange UAT — buy, sell, trade-in, repair, B2B flows end-to-end', status: 'planned' },
      { name: 'Stripe payout reconciliation and edge-case testing', status: 'planned' },
      { name: 'Pusher real-time event validation under load', status: 'planned' },
      { name: 'GPU Exchange analytics and advanced reporting enhancements', status: 'planned' },
    ],
  },
  {
    number: 22, title: 'Full System QA & Launch Preparation', dateRange: '1–14 Apr 2027', status: 'planned',
    tasks: [
      { name: 'Full 28-module regression test suite — all E2E journeys', status: 'planned' },
      { name: 'Performance and load testing under production-level volume', status: 'planned' },
      { name: 'GPU Exchange public beta — limited live user group', status: 'planned' },
      { name: 'Security audit and data access review', status: 'planned' },
    ],
  },
  {
    number: 23, title: 'Phase 2 Production Deployment & Full Launch', dateRange: '15–30 Apr 2027', status: 'planned',
    tasks: [
      { name: 'Phase 2 production deployment — all 28 modules live', status: 'planned' },
      { name: 'GPU Exchange full public launch', status: 'planned' },
      { name: 'Monitoring, alerting, and on-call runbook updates', status: 'planned' },
      { name: 'Handover documentation and team training completion', status: 'planned' },
    ],
  },
];

// ─── Test Coverage ─────────────────────────────────────────────────────────────

export interface TestCoverageRow { moduleId: number; moduleName: string; unitTests: number; integrationTests: number; e2eTests: number; coverage: number; }

export const TEST_COVERAGE: TestCoverageRow[] = MODULES_DATA.filter(m => m.phase === 1).map(m => ({
  moduleId: m.id, moduleName: m.name, unitTests: 0, integrationTests: 0, e2eTests: 0, coverage: 0,
}));

export interface E2EJourney { name: string; description: string; steps: string[]; status: Status; }

export const E2E_JOURNEYS: E2EJourney[] = [
  { name: 'Full GPU Production Lifecycle', status: 'planned', description: 'Receive a PO, unpack, inspect, test, clean, package, warehouse, and sell a GPU — validating every stage transition and history event.', steps: ['Create PO', 'Stage 1 receive', 'Stage 2 inspect', 'Test pass', 'Clean', 'Package', 'Warehouse transfer', 'Sell on Amazon FBA', 'Verify sold SN history'] },
  { name: 'Returns Inspection & Fraud Detection', status: 'planned', description: 'Process an FBM return through the guided inspection, classify fraud, open an Amazon case, and track reimbursement.', steps: ['Receive return package', 'SN verification', 'Tamper seal check', 'Physical inspection', 'Functional test', 'Fraud assessment', 'Classification', 'Amazon case open', 'Reimbursement logged'] },
  { name: 'Amazon/eBay Order Sync', status: 'planned', description: 'New order received via Amazon SP-API and eBay API — inventory deducted, shipping label generated, SN marked sold.', steps: ['Amazon order webhook', 'Inventory reserve', 'Label generate (EasyPost)', 'Mark SN sold', 'QBO COGS posting', 'Tracking update'] },
  { name: 'QBO Sync Reconciliation', status: 'planned', description: 'Receive a PO and verify the prepaid → inventory value movement posts correctly to QBO with zero reconciliation delta.', steps: ['Create PO', 'Credit card expense → prepaid asset', 'Receive PO', 'Inventory asset increase', 'Prepaid asset decrease', 'QBO reconciliation report → zero delta'] },
  { name: 'Receiving Escalation Workflow', status: 'planned', description: 'Receive a shipment with a count mismatch, escalate, notify purchasing, track resolution.', steps: ['Stage 1 scan', 'Count mismatch detected', 'Escalation opened', 'Reason + notes + photo', 'Purchasing notified via Teams', 'Vendor contacted', 'Resolution logged', 'PO adjusted'] },
];

export interface QAChecklist { moduleId: number; moduleName: string; items: string[]; }

export const QA_CHECKLISTS: QAChecklist[] = [
  { moduleId: 1, moduleName: 'Purchasing & PO Management', items: ['PO creates with all required fields', 'State transitions are guarded — cannot skip states', 'Partial receipts update PO correctly', 'Vendor return deadline alerts fire at correct threshold', 'PO aging shows correct overdue flag'] },
  { moduleId: 2, moduleName: 'Intake & Receiving', items: ['Stage 1 scan records tracking number correctly', 'Count mismatch triggers escalation', 'Stage 2 assigns correct condition grade', 'Serial number confirmation rejects invalid SNs', 'Escalation photos are required before routing'] },
  { moduleId: 4, moduleName: 'Testing Module', items: ['Testing block requires technician assignment', 'Pass result advances unit to correct next stage', 'Fail result opens escalation with required notes', 'Priority queue shows expedited units first', 'Test result recorded in SN history'] },
  { moduleId: 7, moduleName: 'Returns Management', items: ['All 8 return classifications are selectable', 'Fraud assessment score is logged', 'FBM returns appear within 2-hour SLA', 'Amazon case link created from return inspection', 'Photos required before routing decision'] },
  { moduleId: 10, moduleName: 'QBO Synchronization', items: ['PO creation posts to QBO within 60 seconds', 'Receiving moves value from prepaid to inventory asset', 'Reconciliation report shows zero delta after all transactions', 'Write-downs require finance permission', 'FIFO costing correct for FBA lots'] },
];

// ─── Credentials ──────────────────────────────────────────────────────────────

export interface CredentialRow { variable: string; description: string; category: string; required: boolean; phase: Phase | 'both'; }

export const CREDENTIALS_DATA: CredentialRow[] = [
  { variable: 'PORTAL_PASSWORD', description: 'Shared password for this documentation portal', category: 'Portal', required: true, phase: 'both' },
  { variable: 'DATABASE_URL', description: 'PostgreSQL connection string', category: 'Database', required: true, phase: 'both' },
  { variable: 'REDIS_URL', description: 'Redis connection string (Upstash)', category: 'Database', required: true, phase: 'both' },
  { variable: 'AWS_S3_BUCKET', description: 'AWS S3 bucket for files and photos', category: 'Storage', required: true, phase: 'both' },
  { variable: 'AWS_S3_REGION', description: 'AWS S3 bucket region', category: 'Storage', required: true, phase: 'both' },
  { variable: 'MICROSOFT_CLIENT_ID', description: 'Microsoft Graph API OAuth2 app client ID — for Teams, SharePoint, and Outlook integration', category: 'Microsoft 365', required: true, phase: 'both' },
  { variable: 'MICROSOFT_CLIENT_SECRET', description: 'Microsoft Graph API OAuth2 app client secret', category: 'Microsoft 365', required: true, phase: 'both' },
  { variable: 'MICROSOFT_TENANT_ID', description: 'Microsoft 365 tenant ID — scopes Graph API calls to the organisation', category: 'Microsoft 365', required: true, phase: 'both' },
  { variable: 'QBO_CLIENT_ID', description: 'QuickBooks Online OAuth2 client ID', category: 'Accounting', required: true, phase: 1 },
  { variable: 'QBO_CLIENT_SECRET', description: 'QuickBooks Online OAuth2 client secret', category: 'Accounting', required: true, phase: 1 },
  { variable: 'QBO_REALM_ID', description: 'QuickBooks company realm ID', category: 'Accounting', required: true, phase: 1 },
  { variable: 'AMAZON_CLIENT_ID', description: 'Amazon SP-API application client ID', category: 'Marketplace', required: true, phase: 1 },
  { variable: 'AMAZON_CLIENT_SECRET', description: 'Amazon SP-API application client secret', category: 'Marketplace', required: true, phase: 1 },
  { variable: 'AMAZON_REFRESH_TOKEN', description: 'Amazon SP-API refresh token', category: 'Marketplace', required: true, phase: 1 },
  { variable: 'AMAZON_SELLER_ID', description: 'Amazon seller account ID', category: 'Marketplace', required: true, phase: 1 },
  { variable: 'EBAY_APP_ID', description: 'eBay Developer Program app ID', category: 'Marketplace', required: true, phase: 1 },
  { variable: 'EBAY_CERT_ID', description: 'eBay Developer Program cert ID', category: 'Marketplace', required: true, phase: 1 },
  { variable: 'EBAY_AUTH_TOKEN', description: 'eBay OAuth user token', category: 'Marketplace', required: true, phase: 1 },
  { variable: 'EASYPOST_API_KEY', description: 'EasyPost production API key for all carriers', category: 'Shipping', required: true, phase: 1 },
  { variable: 'STRIPE_SECRET_KEY', description: 'Stripe server-side secret key', category: 'Payments', required: true, phase: 2 },
  { variable: 'STRIPE_PUBLISHABLE_KEY', description: 'Stripe client-side publishable key', category: 'Payments', required: true, phase: 2 },
  { variable: 'STRIPE_WEBHOOK_SECRET', description: 'Stripe webhook endpoint signing secret', category: 'Payments', required: true, phase: 2 },
  { variable: 'AI_ML_API_KEY', description: 'API key for AI/ML provider — specific provider TBD during Phase 2 planning', category: 'AI/ML', required: false, phase: 2 },
  { variable: 'PUSHER_APP_ID', description: 'Pusher application ID', category: 'Real-time', required: false, phase: 2 },
  { variable: 'PUSHER_APP_KEY', description: 'Pusher app key (client-side)', category: 'Real-time', required: false, phase: 2 },
  { variable: 'PUSHER_APP_SECRET', description: 'Pusher app secret (server-side)', category: 'Real-time', required: false, phase: 2 },
  { variable: 'NEXTAUTH_SECRET', description: 'NextAuth.js session signing secret', category: 'Auth', required: true, phase: 'both' },
  { variable: 'NEXTAUTH_URL', description: 'Base URL of the application', category: 'Auth', required: true, phase: 'both' },
];

// ─── SOP Documents ────────────────────────────────────────────────────────────

export interface SOPDocument { name: string; date: string; category: string; folder: string; fileType: 'pdf'|'docx'|'txt'|'xlsx'|'pptx'; status: 'active'|'in-development'|'draft'; covers: string; }

// ─── Business Glossary ────────────────────────────────────────────────────────

export interface GlossaryTerm { term: string; fullForm: string; meaning: string; category: string; source: string; }

export const BUSINESS_GLOSSARY: GlossaryTerm[] = [
  { term: 'QBO', fullForm: 'QuickBooks Online', meaning: 'Cloud accounting software used as the AmazinXpress financial ledger.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'IMS', fullForm: 'Inventory Management System', meaning: 'The custom ERP being built — the operational source of truth for inventory.', category: 'Technology', source: 'Accounting Workflow' },
  { term: 'EoM', fullForm: 'End of Month', meaning: 'End-of-month accounting period when journal entries are posted.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'BoM', fullForm: 'Beginning of Month', meaning: 'Start of the monthly accounting cycle.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'JE', fullForm: 'Journal Entry', meaning: 'A manual accounting entry in QBO to record a financial transaction.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'COGS', fullForm: 'Cost of Goods Sold', meaning: 'The direct cost of inventory sold in a given period.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'SWR', fullForm: 'Sold Without Receipt', meaning: 'Units sold before a purchase receipt is posted — requires EoM adjustment.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'FIFO', fullForm: 'First In, First Out', meaning: 'Inventory costing method used for FBA lots — oldest units assumed sold first.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'WITR Ship', fullForm: 'Work In Transit — Shipped', meaning: 'Inventory value that has been shipped but not yet received at destination.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'WITR Rec', fullForm: 'Work In Transit — Received', meaning: 'Inventory value received at destination but not yet posted.', category: 'Accounting', source: 'Accounting Workflow' },
  { term: 'FBA', fullForm: 'Fulfillment by Amazon', meaning: 'Amazon stores and ships inventory on behalf of the seller from their fulfillment centers.', category: 'Fulfillment', source: 'SOP Documents' },
  { term: 'FBM', fullForm: 'Fulfilled by Merchant', meaning: 'Seller ships directly to the customer from their own warehouse.', category: 'Fulfillment', source: 'SOP Documents' },
  { term: 'RTG', fullForm: 'Return to Grader', meaning: 'Units returned from Amazon that need inspection and grading.', category: 'Returns', source: 'SOP Documents' },
  { term: 'RMA', fullForm: 'Return Merchandise Authorization', meaning: 'A return authorization number tracking a customer return.', category: 'Returns', source: 'Accounting Workflow' },
  { term: 'PO', fullForm: 'Purchase Order', meaning: 'A document representing a purchase from a vendor — tracks units expected, paid, and received.', category: 'Production', source: 'SOP Documents' },
  { term: 'SKU', fullForm: 'Stock Keeping Unit', meaning: 'An internal product identifier for a specific GPU model and condition.', category: 'Production', source: 'SOP Documents' },
  { term: 'MSKU', fullForm: 'Merchant Stock Keeping Unit', meaning: 'Amazon-specific seller-created product identifier.', category: 'Production', source: 'SOP Documents' },
  { term: 'SN', fullForm: 'Serial Number', meaning: 'The unique hardware serial number on each GPU — the primary tracking identifier.', category: 'Production', source: 'System Design' },
  { term: 'LPOS', fullForm: 'Large PO Pre-Receiving', meaning: 'A workflow for evaluating and pre-recording large B2B GPU lots before physical receipt.', category: 'Production', source: 'System Design' },
  { term: 'B2B', fullForm: 'Business to Business', meaning: 'Direct transactions with other businesses — bulk GPU purchases and sales.', category: 'Production', source: 'SOP Documents' },
  { term: 'Tier 1', fullForm: 'Tier 1 Repairs', meaning: 'Production-team repairs: repaste, repad, fan replacement, shroud replacement.', category: 'Production', source: 'System Design' },
  { term: 'Tier 2', fullForm: 'Tier 2 Repairs', meaning: 'GPU repair technician repairs: diagnostics, port/component issues, non-posting cards.', category: 'Production', source: 'System Design' },
  { term: 'LTL', fullForm: 'Less Than Truckload', meaning: 'Freight shipping method for pallet-sized shipments that don\'t fill a full truck.', category: 'Shipping', source: 'SOP Documents' },
  { term: 'UPS', fullForm: 'United Parcel Service', meaning: 'Primary carrier for FBA shipments. Morning = drop-off only, afternoon = pickup only.', category: 'Shipping', source: 'Carrier Schedule SOP' },
  { term: 'USPS', fullForm: 'United States Postal Service', meaning: 'Secondary carrier — arrives 1:00–2:00 PM daily. Always hand packages when they arrive.', category: 'Shipping', source: 'Carrier Schedule SOP' },
  { term: 'FedEx', fullForm: 'Federal Express', meaning: 'Tertiary carrier — does not come every day (~12:00 PM). Drive to drop-off if no pickup.', category: 'Shipping', source: 'Carrier Schedule SOP' },
  { term: 'Int Whse', fullForm: 'Interim Warehouse', meaning: 'Digital warehouse tracking inventory shipped from Placentia that has not yet been checked in at Amazon. Units are subtracted from Placentia and added here on outbound ship.', category: 'Warehouse', source: 'Warehouse Structure' },
  { term: 'Int Ret Whse', fullForm: 'Interim Return Warehouse', meaning: 'Digital warehouse tracking inventory returned from Amazon that has not yet been received at the Placentia facility. Units are subtracted from FBA and added here when Amazon processes the return.', category: 'Warehouse', source: 'Warehouse Structure' },
  { term: 'Bin', fullForm: 'Bin Location', meaning: 'The smallest physical storage unit — a single slot or shelf position for GPUs. Scanned by the SkuStack Replacement module during transfers and receiving.', category: 'Warehouse', source: 'Warehouse Structure' },
  { term: 'ERP', fullForm: 'Enterprise Resource Planning', meaning: 'A software system integrating all business operations — the core system being built.', category: 'Technology', source: 'System Design' },
  { term: 'SSO', fullForm: 'Single Sign-On', meaning: 'One login for all AmazinXpress systems — implemented via custom authentication.', category: 'Technology', source: 'Tech Stack' },
  { term: 'RBAC', fullForm: 'Role-Based Access Control', meaning: 'Permissions granted based on an employee\'s role — 11 roles defined.', category: 'Technology', source: 'System Design' },
  { term: 'GPU', fullForm: 'Graphics Processing Unit', meaning: 'The core product — graphics cards bought, refurbished, repaired, and resold.', category: 'Production', source: 'Business Model' },
  { term: 'SP-API', fullForm: 'Amazon Selling Partner API', meaning: 'Amazon\'s API for managing FBA/FBM operations programmatically.', category: 'Technology', source: 'Tech Stack' },
  { term: 'M365', fullForm: 'Microsoft 365', meaning: 'Microsoft\'s cloud productivity suite — Teams, Outlook, SharePoint, Planner.', category: 'Technology', source: 'Tech Stack' },
  { term: 'LPN', fullForm: 'License Plate Number', meaning: 'Unique ID Amazon assigns to each FBA return package. Used to match returned inventory back to original sale records.', category: 'Returns', source: 'FBA Returns Module' },
  { term: 'ASIN', fullForm: 'Amazon Standard Identification Number', meaning: 'Unique product identifier assigned by Amazon to a listing. Stored on product catalog records, PO line items, order records, and FBA returns.', category: 'Marketplace', source: 'Product Catalog' },
  { term: 'FNSKU', fullForm: 'Fulfillment Network SKU', meaning: 'Amazon tracking code for your specific inventory inside an FBA warehouse. Printed on unit labels and stored on product catalog, PO line items, and FBA return records.', category: 'Marketplace', source: 'Product Catalog' },
  { term: 'Session ID', fullForm: 'Scanning Session ID', meaning: 'Auto-generated identifier created when a scanning session begins in the SkuStack Replacement module. Groups all scans performed in that session under one ID for auditability.', category: 'Technology', source: 'SkuStack Replacement Module' },
];

// ─── Carrier Schedule ─────────────────────────────────────────────────────────

export interface CarrierScheduleRow { carrier: string; time: string; type: string; frequency: string; rules: string[]; critical: boolean; }

export const CARRIER_SCHEDULE: CarrierScheduleRow[] = [
  { carrier: 'UPS', time: '9:45 AM ±30 min', type: 'Drop-off ONLY', frequency: 'Daily', critical: true, rules: ['DO NOT give outgoing packages during this visit', 'Morning visit is drop-off only — no exceptions'] },
  { carrier: 'UPS', time: '3:30–4:30 PM', type: 'Pickup ONLY', frequency: 'Daily', critical: true, rules: ['Give ALL UPS packages — including air and ground', 'FBA shipments ALWAYS go UPS', 'Check red tape FBA alert box on carts and flatbeds before releasing'] },
  { carrier: 'USPS', time: '1:00–2:00 PM', type: 'Drop-off & Pickup', frequency: 'Daily (1+ visits)', critical: false, rules: ['ALWAYS give packages when they arrive', 'Comes one to many times per day', 'Do not hold USPS packages waiting for a second visit'] },
  { carrier: 'FedEx', time: '~12:00 PM', type: 'Drop-off & Pickup', frequency: 'NOT daily', critical: true, rules: ['Does NOT come every day', 'If they arrive: give outbound FedEx packages', 'If they do NOT arrive: someone must drive packages to FedEx for drop-off'] },
];

// ─── Return Classifications ───────────────────────────────────────────────────

export interface ReturnClassificationRow { label: string; description: string; fraudRisk: 'high'|'medium'|'low'|'n/a'; routingAction: string; urgency: 'immediate'|'high'|'normal'; }

export const RETURN_CLASSIFICATIONS: ReturnClassificationRow[] = [
  { label: 'Ours — Functioning', description: 'Returned GPU is the correct unit and passes functional testing.', fraudRisk: 'low', routingAction: 'Restock to sellable inventory', urgency: 'normal' },
  { label: 'Ours — Defective', description: 'Returned GPU is the correct unit but fails functional testing.', fraudRisk: 'low', routingAction: 'Route to Tier 1 or Tier 2 repairs', urgency: 'normal' },
  { label: 'Not Ours — Same SKU — Functioning', description: 'Customer returned a different GPU with the same model but different SN. Unit functions.', fraudRisk: 'medium', routingAction: 'Accept and restock — open Amazon case if applicable', urgency: 'high' },
  { label: 'Not Ours — Same SKU — Defective', description: 'Customer returned wrong GPU of same model that also fails testing.', fraudRisk: 'high', routingAction: 'Open Amazon fraud case immediately — route to graveyard pending outcome', urgency: 'immediate' },
  { label: 'Not Ours — Different SKU — Functioning', description: 'Customer returned a completely different GPU model that functions.', fraudRisk: 'high', routingAction: 'Quarantine — open Amazon fraud case — track for reimbursement', urgency: 'immediate' },
  { label: 'Not Ours — Different SKU — Defective', description: 'Customer returned a completely different GPU model that also fails testing.', fraudRisk: 'high', routingAction: 'Quarantine — open Amazon fraud case — write-off pending reimbursement', urgency: 'immediate' },
  { label: 'Lost in Transit / Not Returned', description: 'Amazon shows return initiated but package never arrived or arrived empty.', fraudRisk: 'medium', routingAction: 'Open Amazon safe-T claim — track reimbursement', urgency: 'high' },
  { label: 'Returned to Sender', description: 'Outbound shipment was returned by carrier or undeliverable.', fraudRisk: 'n/a', routingAction: 'Contact customer — reship or refund via order management', urgency: 'high' },
];

// ─── Intake Types ─────────────────────────────────────────────────────────────

export interface IntakeTypeRow { code: string; label: string; source: string; specialRules: string; downstreamWorkflow: string; }

export const INTAKE_TYPES: IntakeTypeRow[] = [
  { code: 'purchase_ebay', label: 'eBay Purchase', source: 'eBay marketplace purchase', specialRules: 'Linked to eBay order — track seller rating and SLA.', downstreamWorkflow: 'Standard receiving → production lifecycle' },
  { code: 'purchase_b2b', label: 'B2B Purchase', source: 'Direct business-to-business sourcing', specialRules: 'May arrive as pallet lot — LPOS workflow. Vendor return window tracked carefully.', downstreamWorkflow: 'LPOS pre-receiving → bulk intake → production lifecycle' },
  { code: 'walk_in', label: 'Walk-in Purchase', source: 'In-person local purchase from individual', specialRules: 'Immediate ID verification. Cash purchase requires finance approval over threshold.', downstreamWorkflow: 'Direct intake → production lifecycle' },
  { code: 'customer_submission', label: 'Customer Sell Submission', source: 'GPU Exchange sell flow — customer ships in to sell', specialRules: 'Customer accepted an offer. Inspection confirms condition. Payout triggered on accept.', downstreamWorkflow: 'Intake inspection → condition confirm → payout or dispute' },
  { code: 'customer_trade_in', label: 'Customer Trade-In', source: 'GPU Exchange trade-in flow', specialRules: 'Trade value applied to new purchase. Shortfall/excess handled via Stripe.', downstreamWorkflow: 'Intake inspection → trade value confirm → apply to purchase' },
  { code: 'customer_repair', label: 'Customer Repair Submission', source: 'GPU Exchange repair flow — customer ships in for repair', specialRules: 'Diagnosis must confirm or revise estimate before repair begins. Customer approval required.', downstreamWorkflow: 'Intake → diagnosis → customer approval → repair → post-repair test → return ship' },
  { code: 'return_fba', label: 'FBA Return (RTG)', source: 'Amazon FBA removal order or customer return from FBA', specialRules: 'Fulfillable vs unfulfillable determines routing. Removal orders arrive as batches.', downstreamWorkflow: 'FBA returns area → RTG inspection → classify → route to grading/repair/graveyard' },
  { code: 'return_fbm', label: 'FBM Return', source: 'Amazon or Walmart FBM return', specialRules: 'HIGHLY time-sensitive — refund required within 2 business days. High-visibility required.', downstreamWorkflow: 'Returns inspection → fraud assessment → classify → route' },
];

// ─── Roles ────────────────────────────────────────────────────────────────────

export interface RoleRow { role: string; label: string; description: string; moduleAccess: string[]; canFinancialActions: boolean; canReclassify: boolean; isExternal: boolean; }

export const ROLES_DATA: RoleRow[] = [
  { role: 'technician', label: 'Technician', description: 'Production floor employee performing receiving, testing, cleaning, and packaging.', moduleAccess: ['Receiving', 'Testing', 'Production Workflow', 'Attachments'], canFinancialActions: false, canReclassify: false, isExternal: false },
  { role: 'repair_tech', label: 'Repair Technician', description: 'Specialized technician performing Tier 2 repairs and deep diagnostics.', moduleAccess: ['Repairs', 'Testing', 'Inventory State', 'Attachments'], canFinancialActions: false, canReclassify: false, isExternal: false },
  { role: 'returns_specialist', label: 'Returns Specialist', description: 'Employee managing the full returns inspection and classification workflow.', moduleAccess: ['Returns', 'Fraud Workflow', 'Attachments', 'Inventory State'], canFinancialActions: false, canReclassify: true, isExternal: false },
  { role: 'warehouse', label: 'Warehouse Associate', description: 'Responsible for inventory location, bin management, and pick/pack operations.', moduleAccess: ['Warehousing', 'Inventory Location', 'FBA/FBM Shipping'], canFinancialActions: false, canReclassify: false, isExternal: false },
  { role: 'floor_manager', label: 'Floor Manager', description: 'Oversees all production floor operations — escalations, exceptions, throughput.', moduleAccess: ['All Production Modules', 'Reporting', 'Notifications', 'Escalations'], canFinancialActions: false, canReclassify: true, isExternal: false },
  { role: 'purchasing', label: 'Purchasing', description: 'Manages PO creation, vendor relationships, and sourcing decisions.', moduleAccess: ['Purchasing & PO Management', 'Intake', 'LPOS', 'Search'], canFinancialActions: false, canReclassify: false, isExternal: false },
  { role: 'finance', label: 'Finance', description: 'Manages QBO sync, write-downs, reclassifications, and financial reporting.', moduleAccess: ['QBO Sync', 'Reporting', 'Financial Permissions', 'All financial views'], canFinancialActions: true, canReclassify: true, isExternal: false },
  { role: 'admin', label: 'Admin', description: 'Full system access — configures rules, manages roles, handles edge cases.', moduleAccess: ['All modules', 'Admin configuration', 'Audit logs', 'All permissions'], canFinancialActions: true, canReclassify: true, isExternal: false },
  { role: 'customer', label: 'Customer', description: 'External GPU Exchange customer — buy, sell, trade, repair only.', moduleAccess: ['GPU Exchange Platform only'], canFinancialActions: false, canReclassify: false, isExternal: true },
  { role: 'b2b_seller', label: 'B2B Seller', description: 'External business partner with access to B2B pricing and bulk submission.', moduleAccess: ['GPU Exchange B2B flow', 'Bulk submission', 'B2B order status'], canFinancialActions: false, canReclassify: false, isExternal: true },
];

// ─── Tech Comparison ──────────────────────────────────────────────────────────

export interface ComparisonRow {
  requirement: string;
  powerPlatform: { rating: ComparisonRating; notes: string };
  customCode: { rating: ComparisonRating; notes: string };
}

export const TECH_COMPARISON: ComparisonRow[] = [
  {
    requirement: 'Serial-number level unit tracking',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'Dataverse supports relational modeling and can track individual units. Performance tuning and schema complexity increase at scale with deep history queries and event-sourced audit trails.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Best fit for fine-grained per-unit tracking with full control over schema design, indexing strategy, audit history, and event sourcing patterns.'
    }
  },
  {
    requirement: 'State machine for GPU lifecycle',
    powerPlatform: {
      rating: 'limited',
      notes:
        'Power Automate is event-driven, not state-machine-driven. Enforcing strict transition guards and preventing illegal state jumps requires significant custom workarounds outside the platform\'s natural design.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Ideal for strict server-side state machines with transition guards, blocked-state enforcement, and full audit-safe lifecycle control — directly mapped to GPU lifecycle requirements.'
    }
  },
  {
    requirement: 'Real-time live floor WIP dashboard',
    powerPlatform: {
      rating: 'limited',
      notes:
        'Power BI\'s fastest refresh is 15–30 minutes; DirectQuery adds load but is not event-driven. True sub-second operational live views are not achievable within the platform.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Supports true real-time dashboards via WebSockets with sub-second push updates — directly applicable to live floor WIP, stage visibility, and bottleneck detection.'
    }
  },
  {
    requirement: 'Initial development speed',
    powerPlatform: {
      rating: 'strong',
      notes:
        'Low-code tooling delivers working forms, approval flows, and internal apps significantly faster. Non-developers can contribute. Fast early iterations without full development cycles.'
    },
    customCode: {
      rating: 'limited',
      notes:
        'Requires architecture design, data modeling, scaffolding, and full development cycles before features ship. Higher upfront time investment before the first usable module is delivered.'
    }
  },
  {
    requirement: 'Upfront build investment',
    powerPlatform: {
      rating: 'strong',
      notes:
        'Lower initial developer hours for core forms, CRUD operations, and standard workflows. Faster path to initial deployment reduces early project risk and cash outlay.'
    },
    customCode: {
      rating: 'limited',
      notes:
        'Significantly higher upfront development cost to build the architecture, workflow engine, state machine, and admin panels before core modules are usable. Justified by long-term flexibility.'
    }
  },
  {
    requirement: 'Complex guided workflow engine',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'Handles linear and moderately branching workflows well. The deeply dynamic, multi-step guided inspection flows required for returns and testing escalations push beyond what Power Apps manages cleanly.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Fully flexible for dynamic workflows with conditional branching, step orchestration, blocked states, required evidence capture, and custom routing logic.'
    }
  },
  {
    requirement: 'Business logic enforcement & validation',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'Dataverse business rules handle field-level validation well. Complex cross-entity consistency rules and multi-step transition enforcement are harder to centralize reliably.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Centralized server-side validation ensures strict consistency, reusable rule evaluation, and full control over business logic — including blocked-state prevention and permission-sensitive actions.'
    }
  },
  {
    requirement: 'Built-in approval & notification workflows',
    powerPlatform: {
      rating: 'strong',
      notes:
        'Power Automate provides native approval chains, scheduled reminders, Teams/Outlook alerts, and escalation routing with minimal configuration — directly applicable to receiving escalations and return workflows.'
    },
    customCode: {
      rating: 'moderate',
      notes:
        'Notification pipelines, approval flows, and scheduled reminders must be explicitly developed. Full flexibility once built, but nothing exists until engineered.'
    }
  },
  {
    requirement: 'Future AI/ML integration',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'Strong native integration with Azure OpenAI and Microsoft Copilot for standard use cases. Custom model deployment, fine-tuned inference, and non-Azure ML providers require external services.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Fully flexible integration with any ML stack or provider, including custom models, fine-tuned inference, and streaming pipelines. No platform constraints on model choice or deployment.'
    }
  },
  {
    requirement: 'Customer-facing ecommerce platform',
    powerPlatform: {
      rating: 'limited',
      notes:
        'Power Pages can host external sites but lacks SEO-grade rendering (no SSR/SSG), ecommerce-grade performance tuning, and the deep UX control GPU Exchange requires.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Enables full ecommerce architecture with SSR/SSG for SEO, Stripe payment integration, product indexing, and high-performance frontend — GPU Exchange requires this.'
    }
  },
  {
    requirement: 'Multi-channel integrations (Amazon, eBay)',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'No native connectors for Amazon SP-API or eBay. Custom connectors are required. High-frequency sync and webhook processing add architectural complexity inside Power Automate.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Direct API integration with full control over sync logic, retry handling, rate limiting, event processing, and order-inventory state consistency.'
    }
  },
  {
    requirement: 'Webhook/event processing',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'HTTP triggers in Power Automate handle basic event ingestion. High-throughput scenarios, reliable dead-letter handling, and complex fan-out patterns require careful workaround architecture.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Naturally supports event-driven architectures with durable queues, background workers, retries, dead-letter handling, and distributed processing.'
    }
  },
  {
    requirement: 'Admin configurability',
    powerPlatform: {
      rating: 'strong',
      notes:
        'Non-developers can configure forms, fields, business rules, and approval workflows without code. Directly satisfies the admin configurability core principle (SOW §6.6) with no engineering involvement.'
    },
    customCode: {
      rating: 'moderate',
      notes:
        'Admin panels must be explicitly designed and built. Nothing is configurable by non-developers until purpose-built admin interfaces exist — a real upfront investment. Full flexibility ceiling once built.'
    }
  },
  {
    requirement: 'Microsoft 365 integration',
    powerPlatform: {
      rating: 'strong',
      notes:
        'Zero-code native connectors to Teams, Outlook, SharePoint, and Planner. M365 authentication is automatic. Standard integrations require no development effort.'
    },
    customCode: {
      rating: 'moderate',
      notes:
        'Achievable via Microsoft Graph API with full flexibility, but requires explicit developer effort for OAuth flows, token management, and each integration point.'
    }
  },
  {
    requirement: 'Barcode / QR scan workflows',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'Power Apps Mobile includes a native barcode scanner control. Functional for basic scanning but not optimized for high-speed, low-latency production-floor scan workflows or industrial UX.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Can be fully optimized for scan throughput, offline-first support, device-specific integration, and warehouse-grade UX with minimal confirmation taps.'
    }
  },
  {
    requirement: 'Scalability (1M+ records)',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'Scales within Dataverse limits. Performance tuning, storage costs, and query complexity become meaningful constraints at scale — particularly for deep serial-number history queries.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Scales effectively with proper schema design, indexing, partitioning, caching layers, and distributed infrastructure. No platform-imposed record or query limits.'
    }
  },
  {
    requirement: 'Ongoing operational cost (20 users)',
    powerPlatform: {
      rating: 'limited',
      notes:
        'Per-user licensing for Power Apps, Power Automate, and Power BI compounds linearly. Adding users or premium connectors directly increases recurring cost.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Infrastructure-based cost ($100–$300/month) does not scale with headcount. Lower marginal cost per additional user or module long-term.'
    }
  },
  {
    requirement: 'Vendor lock-in risk',
    powerPlatform: {
      rating: 'limited',
      notes:
        'Core data and logic live in Dataverse and Power Platform runtime. Migration to another platform requires restructuring data models, workflows, and business rules — a significant undertaking.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Full stack ownership using open standards. Portable across cloud providers and database systems with no proprietary runtime dependency.'
    }
  },
  {
    requirement: 'Data portability',
    powerPlatform: {
      rating: 'moderate',
      notes:
        'Data export is available but requires transformation due to Dataverse-specific schema encoding, relationship structures, and proprietary identifiers.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Standard PostgreSQL relational schema — directly portable, queryable, and exportable to any system without transformation.'
    }
  },
  {
    requirement: 'Public SEO pages',
    powerPlatform: {
      rating: 'limited',
      notes:
        'Power Pages supports public sites but lacks server-side rendering, SSG, deep meta-tag control, and the performance tuning required for indexed product pages.'
    },
    customCode: {
      rating: 'strong',
      notes:
        'Full SEO control via Next.js SSR/SSG, structured metadata, sitemap generation, and Core Web Vitals optimization — required for GPU Exchange product listings.'
    }
  }
];

export interface PowerPlatformLimitation {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export const POWER_PLATFORM_LIMITATIONS: PowerPlatformLimitation[] = [
  {
    id: 'pp-1',
    title: 'Not built for complex UX',
    summary:
      'Power Apps is optimized for form-based apps, not highly dynamic operational systems or real-time workflow UIs.',
    detail:
      'Complex workflows like guided inspections, conditional multi-step processes, and real-time operational dashboards require component-level UI control that Power Apps cannot fully provide compared to React-based systems.'
  },
  {
    id: 'pp-2',
    title: 'Dataverse cost scaling',
    summary:
      'Costs scale per user and per service usage, which increases significantly with operational workforce expansion.',
    detail:
      'Licensing (Power Apps, Power Automate, Power BI) plus Dataverse storage leads to linear cost growth per user, making it less efficient for large operational teams compared to infrastructure-based costing.'
  },
  {
    id: 'pp-3',
    title: 'Weak state machine enforcement',
    summary:
      'Power Automate is event-driven and does not enforce strict lifecycle state rules.',
    detail:
      'Complex systems requiring strict transition validation (e.g., GPU lifecycle) need backend-enforced state machines to prevent invalid transitions and ensure data integrity.'
  },
  {
    id: 'pp-4',
    title: 'Limited real-time capability',
    summary:
      'Not suitable for sub-second operational dashboards or high-frequency updates.',
    detail:
      'Power BI refresh mechanisms and DirectQuery are not designed for real-time operational monitoring systems requiring instant updates.'
  },
  {
    id: 'pp-5',
    title: 'Limited custom AI/ML flexibility',
    summary:
      'Power Platform handles Azure OpenAI and standard Copilot use cases well, but custom model deployment is out of scope.',
    detail:
      'For the AI readiness goals in the SOW — serial history summarization, fine-tuned issue detection, custom inference — the models need to run outside Power Platform via external APIs. Standard Azure OpenAI use cases (drafting, summarization with GPT) work natively; anything requiring a custom or fine-tuned model does not.'
  },
  {
    id: 'pp-6',
    title: 'Not suitable for full ecommerce systems',
    summary:
      'Power Pages cannot fully support high-performance, SEO-driven ecommerce platforms.',
    detail:
      'Advanced ecommerce requirements like SSR, payment orchestration, product indexing, and performance optimization require custom frontend and backend architectures.'
  },
  {
    id: 'pp-7',
    title: 'Platform dependency',
    summary:
      'Dataverse and Power Platform introduce ecosystem lock-in for core data and workflows.',
    detail:
      'While export is possible, full migration requires restructuring data models, business logic, and workflow systems outside the platform.'
  }
];

export interface PowerPlatformWin {
  id: string;
  title: string;
  description: string;
}

export const POWER_PLATFORM_WINS: PowerPlatformWin[] = [
  {
    id: 'win-1',
    title: 'Native M365 Integration',
    description:
      'Zero-code native connectors to Teams, Outlook, SharePoint, and Planner. Authentication is automatic and standard integrations require no developer effort — a genuine advantage for an M365-aligned organization.'
  },
  {
    id: 'win-2',
    title: 'Admin Configurability',
    description:
      'Non-developers can configure forms, fields, business rules, and approval flows without code. This directly satisfies the admin configurability core principle (SOW §6.6) out of the box — custom code requires building these admin panels from scratch.'
  },
  {
    id: 'win-3',
    title: 'Faster Time-to-Working-App',
    description:
      'Low-code tooling delivers usable internal forms, approval workflows, and dashboards significantly faster than a full custom build cycle. Lower early project risk and faster stakeholder feedback loops.'
  },
  {
    id: 'win-4',
    title: 'Lower Upfront Build Investment',
    description:
      'Standard forms, CRUD operations, and business workflows require far fewer developer hours to stand up in Power Platform. The upfront cost difference vs. a fully custom system is substantial.'
  },
  {
    id: 'win-5',
    title: 'Built-in Approval & Escalation Flows',
    description:
      'Power Automate provides native approval chains, escalation routing, Teams/Outlook alerts, and scheduled reminders — immediately applicable to receiving escalations, returns handling, and exception workflows described in the SOW.'
  },
  {
    id: 'win-6',
    title: 'Azure OpenAI & Copilot Integration',
    description:
      'Native connectors to Azure OpenAI and Microsoft Copilot enable AI-assisted workflows without custom integration work. Strong for standard generative and summarization use cases within the M365 ecosystem.'
  },
  {
    id: 'win-7',
    title: 'Citizen Developer Capability',
    description:
      'Operations staff can build and modify simple internal tools, reducing the dependency on the developer for every minor process change. Useful for fast-moving operational environments.'
  },
  {
    id: 'win-8',
    title: 'Enterprise Familiarity & Support',
    description:
      'Widely deployed in enterprise environments with Microsoft-backed SLA, structured support tiers, and a large ecosystem of community resources and certified consultants.'
  }
];

// ─── Architecture Layers ───────────────────────────────────────────────────────

export interface ArchitectureLayer { id: string; label: string; sublabel: string; color: string; items: { name: string; tech?: string }[]; }

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  { id: 'clients', label: 'Client Layer', sublabel: 'User-facing applications', color: '#22C55E', items: [{ name: 'Internal ERP', tech: 'Next.js 15' }, { name: 'GPU Exchange', tech: 'Next.js 15' }, { name: 'React Native App', tech: 'Scan workflows' }] },
  { id: 'backend', label: 'Backend Layer', sublabel: 'API & business logic', color: '#8B5CF6', items: [{ name: 'Node.js API', tech: 'Modular monolith' }, { name: 'State Machine Engine', tech: 'GPU lifecycle' }, { name: 'Event Bus', tech: 'Background jobs' }] },
  { id: 'data', label: 'Data Layer', sublabel: 'Storage & cache', color: '#10B981', items: [{ name: 'PostgreSQL', tech: 'Relational DB' }, { name: 'Redis Cache', tech: 'In-memory cache' }, { name: 'AWS S3', tech: 'Files & photos' }] },
  { id: 'integrations', label: 'Integration Layer', sublabel: 'External services', color: '#F59E0B', items: [{ name: 'QuickBooks Online' }, { name: 'Amazon SP-API' }, { name: 'eBay API' }, { name: 'EasyPost' }, { name: 'Microsoft 365' }, { name: 'Stripe' }] },
  { id: 'ai', label: 'AI Readiness Layer', sublabel: 'Structured for future AI capability', color: '#06B6D4', items: [{ name: 'AI Readiness Infrastructure', tech: 'Long-term capability' }, { name: 'Real-time Events', tech: 'Live dashboard updates' }] },
];

// ─── Systems Replaced ─────────────────────────────────────────────────────────

export interface SystemReplacement { oldSystem: string; oldDescription: string; replacement: string; category: string; }

export const CURRENT_SYSTEMS_REPLACED: SystemReplacement[] = [
  { oldSystem: 'SellerCloud', oldDescription: 'Primary inventory and operations platform', replacement: 'ERP Inventory Management System (IMS)', category: 'Core Platform' },
  { oldSystem: 'ClickUp', oldDescription: 'Operational workflow management', replacement: 'ERP Workflow Engine + Microsoft Planner', category: 'Project Management' },
  { oldSystem: 'Excel', oldDescription: 'Cost catalog, LPOS pre-receiving, various tracking', replacement: 'ERP Modules 18 (Catalog) + 19 (LPOS)', category: 'Data Management' },
  { oldSystem: 'Slack', oldDescription: 'Operations control and communication layer', replacement: 'Microsoft Teams', category: 'Communication' },
  { oldSystem: 'Zapier', oldDescription: 'Automation glue between tools', replacement: 'Native ERP logic', category: 'Automation' },
  { oldSystem: 'SkuStack', oldDescription: 'FBM picking and warehouse management', replacement: 'ERP Warehousing Module (Module 8)', category: 'Warehouse' },
  { oldSystem: 'Paper Forms', oldDescription: 'Physical staging systems and production tracking', replacement: 'Scan-based digital ERP workflows', category: 'Production' },
];

// ─── Systems Kept ─────────────────────────────────────────────────────────────

export interface SystemKept { name: string; description: string; role: string; category: string; integrationType: 'integrated' | 'new'; }

export const SYSTEMS_KEPT: SystemKept[] = [
  { name: 'QuickBooks Online', description: 'Accounting and financial ledger', role: 'PO accounting, COGS, inventory write-downs, FBM return journal entries, reconciliation', category: 'Accounting', integrationType: 'integrated' },
  { name: 'Amazon Seller Central', description: 'FBA/FBM marketplace operations', role: 'Marketplace sales, FBA returns ingestion, inventory sync, case management', category: 'Marketplace', integrationType: 'integrated' },
  { name: 'eBay Marketplace', description: 'Secondary marketplace for GPU sales and purchasing', role: 'eBay listing sync, order management, PO import from eBay purchases', category: 'Marketplace', integrationType: 'integrated' },
  { name: 'Microsoft 365', description: 'Teams, Outlook, SharePoint, Planner — replaces Slack communication layer', role: 'Team notifications, escalation threads, file storage, Planner task management', category: 'Microsoft 365', integrationType: 'integrated' },
  { name: 'Stripe', description: 'Payment processing for GPU Exchange customer platform', role: 'Customer checkout, seller payouts, B2B invoicing, refund processing', category: 'Payments', integrationType: 'new' },
  { name: 'EasyPost', description: 'Unified carrier API replacing per-carrier integrations (UPS, FedEx, USPS, DHL)', role: 'Label generation, carrier webhooks, tracking, FBA shipment creation', category: 'Shipping', integrationType: 'new' },
];

// ─── Repair Tiers ─────────────────────────────────────────────────────────────

export interface RepairTier { tier: 1|2; label: string; performedBy: string; triggers: string[]; actions: string[]; outcomes: string[]; }

export const REPAIR_TIERS: RepairTier[] = [
  { tier: 1, label: 'Tier 1 — Production Team Repairs', performedBy: 'Production technicians (non-specialist)', triggers: ['GPU fails testing — thermal issue suspected', 'Fan not spinning or loud', 'Thermal paste visibly degraded', 'Minor cosmetic issue with shroud'], actions: ['Repaste (replace thermal paste)', 'Repad (replace thermal pads)', 'Fan replacement', 'Shroud replacement'], outcomes: ['Pass — re-enter testing queue', 'Escalate to Tier 2 — deeper issue found', 'Write-off — damage too severe'] },
  { tier: 2, label: 'Tier 2 — GPU Repair Technician', performedBy: 'Dedicated GPU repair technician (specialist)', triggers: ['Failed Tier 1 repair', 'Non-posting GPU (no video output)', 'Physical port damage (DisplayPort, HDMI)', 'Component-level issue suspected', 'Deep diagnostics required'], actions: ['Full diagnostics with specialized equipment', 'Port repair or replacement', 'Component-level soldering', 'BIOS-level troubleshooting', 'Capacitor or MOSFET replacement'], outcomes: ['Pass — re-enter production lifecycle', 'Partial repair — downgrade condition grade', 'Write-off — unrepairable', 'Parts salvage — valuable components extracted'] },
];

// ─── Build Phases ─────────────────────────────────────────────────────────────

export interface BuildPhase { phase: Phase; label: string; start: string; end: string; moduleCount: number; color: string; highlights: string[]; }

export const BUILD_PHASES: BuildPhase[] = [
  { phase: 1, label: 'Phase 1 — Core ERP', start: 'May 2026', end: 'November 2026', moduleCount: 17, color: '#F59E0B', highlights: ['17 core modules', 'Full GPU production lifecycle', 'QBO accounting sync', 'Amazon + eBay integrations', 'Replaces SellerCloud, ClickUp, Excel'] },
  { phase: 2, label: 'Phase 2 — GPU Exchange & AI Readiness', start: 'December 2026', end: 'April 2026', moduleCount: 11, color: '#8B5CF6', highlights: ['11 advanced modules', 'GPU Exchange customer platform', 'AI readiness infrastructure — structured for future AI capability', 'Parts inventory and scheduling'] },
];

// ─── Accounting Flows ─────────────────────────────────────────────────────────

export interface AccountingFlowStep { step: number; action: string; debit?: string; credit?: string; notes?: string; }
export interface AccountingFlow { id: string; name: string; description: string; steps: AccountingFlowStep[]; }

export const ACCOUNTING_FLOWS: AccountingFlow[] = [
  {
    id: 'po-flow', name: 'Purchase Order Accounting Flow', description: 'How a GPU purchase moves through the books from PO creation through inventory receipt.',
    steps: [
      { step: 1, action: 'PO Created', notes: 'No accounting entry yet — PO is a commitment, not a transaction.' },
      { step: 2, action: 'Credit Card Charge / Payment Made', debit: 'Prepaid Inventory Asset', credit: 'Credit Card / Cash', notes: 'Money leaves the business — asset created representing paid-for inventory in transit.' },
      { step: 3, action: 'Inventory Physically Received (Stage 2)', debit: 'Inventory Asset', credit: 'Prepaid Inventory Asset', notes: 'Value moves from prepaid to actual inventory when GPUs are physically confirmed.' },
      { step: 4, action: 'PO Closed', notes: 'PO is reconciled. Discrepancies trigger vendor communication and PO adjustment.' },
    ],
  },
  {
    id: 'fbm-return-flow', name: 'FBM Return Accounting Flow', description: 'How a returned FBM unit flows through the books from return arrival through end-of-month adjustment.',
    steps: [
      { step: 1, action: 'FBM Return Received at Warehouse', notes: 'Return arrives — 2 business day refund SLA clock is running.' },
      { step: 2, action: 'RMA Received + Inspection Complete', notes: 'Unit classified. Serial number inspected and return type determined.' },
      { step: 3, action: 'End of Month — Sum RMA Inventory Value', notes: 'Finance sums the value of all RMA inventory received during the month.' },
      { step: 4, action: 'Journal Entry — Increase Inventory Asset', debit: 'Inventory Asset', credit: 'FBM/FBA SWR', notes: 'Returned inventory re-enters the books as an asset.' },
      { step: 5, action: 'Adjust out FBM/FBA SWR', notes: 'Sold Without Receipt balance reduced to reflect returned unit.' },
      { step: 6, action: 'PO / Cost Adjustment', notes: 'If unit cost differs from original (downgraded condition), PO cost is adjusted.' },
    ],
  },
];

// ─── Inventory States ─────────────────────────────────────────────────────────

export const INVENTORY_STATES: string[] = [
  'receiving_stage1', 'receiving_stage2', 'receiving_escalation',
  'testing_queue', 'testing_in_progress', 'testing_passed', 'testing_failed', 'testing_escalation',
  'repairs_tier1', 'repairs_tier2', 'repairs_completed',
  'cleaning_queue', 'cleaning_in_progress',
  'packaging_queue', 'packaging_in_progress', 'packaged',
  'warehouse_transfer', 'warehouse', 'reserved',
  'listed_fba', 'listed_fbm', 'listed_ebay', 'sold',
  'in_transit_outbound', 'in_transit_inbound',
  'returns_pending', 'returns_inspection', 'returns_classified',
  'amazon_case_open', 'write_off', 'graveyard', 'blocked', 'hold',
];

// Key development points

export const KEY_DEVELOPMENT_POINTS = [
  {
    id: 'KD1',
    title: 'Every GPU Has One Unbreakable History',
    description:
      'From the moment a unit enters the business to the moment it leaves — every action, repair, return, flag, and value change is permanently recorded against its serial number. Nothing is ever overwritten or deleted.',
    why_it_matters:
      'This is the foundation of the entire system. Accountability, fraud detection, profitability tracking, and AI readiness all depend on this being built correctly from day one.',
    linked_modules: [2, 3, 5, 6, 7],
    tag: 'Core Architecture',
    icon: 'GitBranch',
    color: 'primary',
    phase: 1,
  },
  {
    id: 'KD2',
    title: 'The System Enforces Rules — Not People',
    description:
      'A defective GPU cannot be marked for sale. A flagged unit cannot advance stages. A write-down cannot happen without authorization. The business logic is enforced by the system itself — not by memory or tribal knowledge.',
    why_it_matters:
      'Eliminates human error at the most critical decision points. Every transition is guarded. Every flag blocks progress until resolved.',
    linked_modules: [5, 14],
    tag: 'Business Logic Engine',
    icon: 'ShieldCheck',
    color: 'danger',
    phase: 1,
  },
  {
    id: 'KD3',
    title: 'Replaces Six Tools With One System',
    description:
      'SellerCloud, SkuStack, ClickUp, Slack, Zapier, and Excel are all replaced by one connected operating system. Every workflow, every record, and every communication lives in one place.',
    why_it_matters:
      'Eliminates data scattered across disconnected tools. No more copy-pasting between Excel and Slack. No more lost escalations. One source of truth for the entire operation.',
    linked_modules: [1, 2, 3, 4, 8, 9, 16, 29],
    tag: 'System Consolidation',
    icon: 'Layers',
    color: 'success',
    phase: 1,
  },
  {
    id: 'KD4',
    title: 'Amazon FBA Returns — Fully Automated',
    description:
      'FBA return data is automatically pulled from Amazon SP-API into a dedicated returns module. Every return arrives with its LPN, ASIN, FNSKU, return reason, and action tags — ready to process without manual entry.',
    why_it_matters:
      'Currently the most manual and error-prone workflow in the business. Fully automating this eliminates daily Slack and Excel overhead and ensures no return is missed or delayed.',
    linked_modules: [7, 30],
    tag: 'Highest ROI Automation',
    icon: 'RefreshCw',
    color: 'warning',
    phase: 1,
  },
  {
    id: 'KD5',
    title: 'Warehouse Floor Goes Fully Digital',
    description:
      'SkuStack is replaced by a native Android scanning app. Bin scanning, bin-to-bin transfers, label printing with QR codes, and session-based scan grouping — all on a mobile device on the warehouse floor with offline support.',
    why_it_matters:
      'The warehouse floor is where the business physically happens. Replacing SkuStack with a purpose-built Android app eliminates the last major paper and manual scanning dependency.',
    linked_modules: [29, 8, 2],
    tag: 'Operational Transformation',
    icon: 'Smartphone',
    color: 'info',
    phase: 1,
  },
  {
    id: 'KD6',
    title: 'Financial Accuracy — ERP and QBO Always in Sync',
    description:
      'Every inventory movement, sale, write-down, return, and condition change in the ERP is automatically synchronized to QuickBooks Online. The ERP is the operational truth. QBO is the accounting ledger. Both stay aligned.',
    why_it_matters:
      'Financial reporting accuracy depends on inventory data being clean and synchronized at all times. Serial-level COGS tracking and FIFO costing for FBA give the business true per-unit profitability.',
    linked_modules: [10, 9, 14],
    tag: 'Financial Integrity',
    icon: 'DollarSign',
    color: 'success',
    phase: 1,
  },
  {
    id: 'KD7',
    title: 'Returns and Fraud Are Guided — Not Guessed',
    description:
      'Every return goes through a mandatory guided inspection workflow — serial verification, tamper seal check, physical inspection with photos, functional test, and ML-assisted fraud scoring. No step can be skipped.',
    why_it_matters:
      'Returns is simultaneously an intake process, a fraud control process, a technical inspection, and a case management system. Structuring it correctly directly reduces financial losses from fraud and missed Amazon reimbursements.',
    linked_modules: [7, 13, 30],
    tag: 'Loss Prevention',
    icon: 'AlertTriangle',
    color: 'danger',
    phase: 1,
  },
  {
    id: 'KD8',
    title: 'Built to Scale — AI and Future Categories Ready',
    description:
      'Clean serial-number history, structured workflow outcomes, typed flags, and standardized notes mean AI tools can be layered on later without rebuilding anything. The system is also designed to expand beyond GPUs into CPUs, RAM, and other electronics.',
    why_it_matters:
      'AI readiness is not a feature — it is the outcome of building the ERP correctly from day one. Every structured data point collected today becomes training data and context for future automation.',
    linked_modules: [27, 28, 5],
    tag: 'Future Scalability',
    icon: 'Zap',
    color: 'purple',
    phase: 2,
  },
];


// ─── GROUP PANELS ─────────────────────────────────────────────────────────────
// Spacing notes:
//   • gp_cust_sub  bottom → 555   (y:280 + h:275)
//   • gp_fba_ret   top    → 580   (+25 px gap)   bottom → 810
//   • gp_external  top    → 835   (+25 px gap)
//
//   • gp_cleaning  bottom → 220   (y:-100 + h:320)
//   • gp_repairs   top    → 250   (+30 px gap)

// ─── WORKFLOW NODES ───────────────────────────────────────────────────────────

export const GROUPS = [
  // gp_external: starts at y=790 (not 835) so calendly/zapier nodes at y=820 sit inside with headroom
  { id: 'gp_external',    x: 190,  y: 900,  w: 980,  h: 625, label: '⚡ Current: Zapier / Slack / ClickUp Workflows', bg: 'rgba(251,191,36,0.05)',  borderColor: '#F59E0B55' },
  { id: 'gp_intake',      x: -200,  y: 40,   w: 680,  h: 660, label: '📥 Intake Sources',                              bg: 'rgba(59,130,246,0.05)',  borderColor: '#3B82F655' },
  { id: 'gp_lpos',        x: 500,  y: 120,  w: 760,  h: 200, label: '🗂️ LPOS Pre-Receiving (B2B Lots)',               bg: 'rgba(14,165,233,0.05)',  borderColor: '#0EA5E955' },
  { id: 'gp_receiving',   x: 1300,  y: -320, w: 1250, h: 760, label: '📦 Receiving (Stage 1 + Stage 2)',               bg: 'rgba(99,102,241,0.05)',  borderColor: '#6366F155' },
  { id: 'gp_finance',     x: 1640, y: -700, w: 980,  h: 310, label: '💰 Accounting & QBO Sync',                       bg: 'rgba(5,150,105,0.05)',   borderColor: '#05966955' },
  { id: 'gp_vendor',      x: 2700, y: -350, w: 1010, h: 250, label: '↩️ Vendor Return Path',                          bg: 'rgba(234,88,12,0.05)',   borderColor: '#EA580C55' },
  { id: 'gp_testing',     x: 2700, y: -60,  w: 1720, h: 490, label: '🔬 Testing Module',                              bg: 'rgba(245,158,11,0.05)',  borderColor: '#F59E0B55' },
  { id: 'gp_repairs',     x: 3790, y: 500,  w: 750,  h: 510, label: '🔧 Repairs (Tier 1 + Tier 2)',                   bg: 'rgba(168,85,247,0.05)',  borderColor: '#A855F755' },
  // gp_cleaning: h=400 (not 320) so cleaning_omega at y=200 (extends to ~y=270) stays inside
  { id: 'gp_cleaning',    x: 4500, y: -100, w: 1490, h: 400, label: '🧹 Cleaning Workflow',                           bg: 'rgba(6,182,212,0.05)',   borderColor: '#06B6D455' },
  { id: 'gp_packaging',   x: 6100, y: -60,  w: 1490, h: 380, label: '📦 Packaging Workflow',                          bg: 'rgba(16,185,129,0.05)',  borderColor: '#10B98155' },
  { id: 'gp_warehouse',   x: 7700, y: -350, w: 760,  h: 650, label: '🏭 Warehouse Operations',                        bg: 'rgba(107,114,128,0.05)', borderColor: '#6B728055' },
  { id: 'gp_sales',       x: 7100, y: -1100, w: 1280, h: 650, label: '🛒 Sales Channels & Fulfillment',                bg: 'rgba(34,197,94,0.05)',   borderColor: '#22C55E55' },
  { id: 'gp_delivery',    x: 8510, y: -80,  w: 1020, h: 240, label: '🚚 Order Fulfillment & Delivery',                bg: 'rgba(59,130,246,0.05)',  borderColor: '#3B82F655' },
  { id: 'gp_returns',     x: 8000, y: 500,  w: 1990, h: 370, label: '↩️ Returns Inspection (8-Step Guided)',          bg: 'rgba(239,68,68,0.05)',   borderColor: '#EF444455' },
  { id: 'gp_ret_outcomes',x: 6700, y: 340,  w: 1010, h: 630, label: '📋 Returns Outcomes & Case Management',          bg: 'rgba(239,68,68,0.04)',   borderColor: '#EF444433' },
  { id: 'gp_fba_ret',     x: 500,  y: 650,  w: 760,  h: 230, label: '🔄 FBA Returns — Auto SP-API Ingestion',         bg: 'rgba(251,146,60,0.05)',  borderColor: '#FB923C55' },
  { id: 'gp_cust_sub',    x: 500,  y: 350,  w: 510,  h: 275, label: '👤 GPU Exchange Customer Submission',            bg: 'rgba(139,92,246,0.05)',  borderColor: '#8B5CF655' },
];

// ─── PROCESS_STEPS ────────────────────────────────────────────────────────────
// Stakeholder-facing simplified view of the 17 business phases, ordered as a
// chronological journey (not the layout order used in GROUPS). Powers the
// `/process` overview page.

export type ProcessStep = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  xp: number;
  accent: string;
  icon: string;
  // Optional parallel channels/pathways grouped under this step, mirroring how the
  // playground groups multiple intake source nodes inside the gp_intake panel.
  channels?: { emoji: string; label: string; accent: string }[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'gp_intake',
    emoji: '📥',
    title: 'Intake Sources',
    description: 'Every GPU enters the system through one of four parallel channels — purchasing, customer submission, FBA returns, or a B2B LPOS lot. The serial number is captured the moment it arrives, regardless of channel.',
    xp: 20,
    accent: '#3B82F6',
    icon: 'PackageOpen',
    channels: [
      { emoji: '🛒', label: 'Purchasing / POs', accent: '#3B82F6' },
      { emoji: '👤', label: 'Customer Submission', accent: '#8B5CF6' },
      { emoji: '🔄', label: 'FBA Returns (SP-API)', accent: '#FB923C' },
      { emoji: '🗂️', label: 'LPOS B2B Lots', accent: '#0EA5E9' },
    ],
  },
  {
    id: 'gp_receiving',
    emoji: '📦',
    title: 'Receiving',
    description: 'Two-stage receiving: Stage 1 unpacks and logs every unit against its PO; Stage 2 performs physical inspection and captures photos. Discrepancies are flagged for vendor follow-up.',
    xp: 25,
    accent: '#6366F1',
    icon: 'PackageCheck',
  },
  {
    id: 'gp_finance',
    emoji: '💰',
    title: 'Accounting & QBO Sync',
    description: 'Receipts, bills, and cost-basis entries flow to QuickBooks Online automatically. Every unit carries its landed cost forward for margin reporting later.',
    xp: 20,
    accent: '#059669',
    icon: 'DollarSign',
  },
  {
    id: 'gp_vendor',
    emoji: '↩️',
    title: 'Vendor Returns',
    description: 'Units that fail receiving or testing and are covered by vendor terms are routed back to the supplier. RMAs, labels, and credits are tracked through to reconciliation.',
    xp: 15,
    accent: '#EA580C',
    icon: 'CornerUpLeft',
  },
  {
    id: 'gp_testing',
    emoji: '🔬',
    title: 'Testing',
    description: 'Each GPU is benchmarked and validated. Pass / fail / repair-needed outcomes are logged with test traces tied to the serial number for life-of-unit traceability.',
    xp: 30,
    accent: '#F59E0B',
    icon: 'Microscope',
  },
  {
    id: 'gp_repairs',
    emoji: '🔧',
    title: 'Repairs',
    description: 'Tier 1 covers thermal paste, fan swaps, and minor board work. Tier 2 handles component-level rework. Units either re-enter testing or are marked as scrap.',
    xp: 25,
    accent: '#A855F7',
    icon: 'Wrench',
  },
  {
    id: 'gp_cleaning',
    emoji: '🧹',
    title: 'Cleaning',
    description: 'Full teardown clean, thermal refresh, and cosmetic touch-ups. Every GPU leaves looking like it is ready for a premium listing photograph.',
    xp: 15,
    accent: '#06B6D4',
    icon: 'Sparkles',
  },
  {
    id: 'gp_packaging',
    emoji: '📦',
    title: 'Packaging',
    description: 'Standardized packaging workflow with anti-static wrap, foam inserts, and sealed outer boxes. FNSKU labels are printed and affixed here for FBA-bound units.',
    xp: 15,
    accent: '#10B981',
    icon: 'Package',
  },
  {
    id: 'gp_warehouse',
    emoji: '🏭',
    title: 'Warehouse Operations',
    description: 'Units are binned by channel destination (FBA, FBM, eBay, B2B). Location, quantity, and channel readiness are tracked live.',
    xp: 20,
    accent: '#6B7280',
    icon: 'Warehouse',
  },
  {
    id: 'gp_sales',
    emoji: '🛒',
    title: 'Sales Channels & Fulfillment',
    description: 'Listings go out to Amazon, eBay, GPU Exchange, and B2B deals. Pricing, inventory, and channel rules all stay in sync from a single source of truth.',
    xp: 25,
    accent: '#22C55E',
    icon: 'ShoppingCart',
  },
  {
    id: 'gp_delivery',
    emoji: '🚚',
    title: 'Order Fulfillment & Delivery',
    description: 'Orders are picked, labels are printed, and carrier pickups are scheduled. Tracking and delivery confirmation feed back into the order record automatically.',
    xp: 20,
    accent: '#3B82F6',
    icon: 'Truck',
  },
  {
    id: 'gp_returns',
    emoji: '↩️',
    title: 'Returns Inspection',
    description: 'An 8-step guided returns inspection — serial verification, tamper seal check, photos, functional test, and ML-assisted fraud scoring. No step can be skipped.',
    xp: 30,
    accent: '#EF4444',
    icon: 'Undo2',
  },
  {
    id: 'gp_ret_outcomes',
    emoji: '📋',
    title: 'Returns Outcomes & Cases',
    description: 'Inspection results drive the outcome: restock, refurbish, warranty claim, A-to-Z response, or scrap. Each path opens a tracked case with deadlines and owners.',
    xp: 25,
    accent: '#EF4444',
    icon: 'FileText',
  },
  {
    id: 'gp_external',
    emoji: '⚡',
    title: 'Current: Zapier / Slack / ClickUp',
    description: 'The legacy glue — Calendly, Zapier chains, Slack routing, and ClickUp tasks — that the new ERP is progressively replacing. Shown here so nothing falls through the cracks during migration.',
    xp: 10,
    accent: '#F59E0B',
    icon: 'Zap',
  },
];

// ─── GROUPS_BASELINE ──────────────────────────────────────────────────────────
// Frozen snapshot of the group geometry that WF_NODES coordinates were authored
// against. Do NOT edit. Edit GROUPS above to re-space the layout — the helper
// `getAlignedWFNodes()` below will shift every node by its parent group's
// (x, y) delta so child nodes stay aligned with their group automatically.
const GROUPS_BASELINE = [
  { id: 'gp_external',    x: 190,  y: 790,  w: 980,  h: 625 },
  { id: 'gp_intake',      x: -50,  y: 40,   w: 510,  h: 590 },
  { id: 'gp_lpos',        x: 440,  y: 120,  w: 760,  h: 200 },
  { id: 'gp_receiving',   x: 920,  y: -320, w: 1250, h: 760 },
  { id: 'gp_finance',     x: 1640, y: -420, w: 980,  h: 310 },
  { id: 'gp_vendor',      x: 2110, y: -300, w: 1010, h: 220 },
  { id: 'gp_testing',     x: 2110, y: -60,  w: 1720, h: 490 },
  { id: 'gp_repairs',     x: 3790, y: 250,  w: 750,  h: 510 },
  { id: 'gp_cleaning',    x: 3790, y: -100, w: 1490, h: 400 },
  { id: 'gp_packaging',   x: 5230, y: -60,  w: 1490, h: 380 },
  { id: 'gp_warehouse',   x: 6430, y: -300, w: 760,  h: 610 },
  { id: 'gp_sales',       x: 6910, y: -260, w: 1280, h: 710 },
  { id: 'gp_delivery',    x: 8110, y: -80,  w: 1020, h: 240 },
  { id: 'gp_returns',     x: 6910, y: 240,  w: 1990, h: 370 },
  { id: 'gp_ret_outcomes',x: 6190, y: 340,  w: 1010, h: 630 },
  { id: 'gp_fba_ret',     x: 430,  y: 580,  w: 760,  h: 230 },
  { id: 'gp_cust_sub',    x: 430,  y: 280,  w: 510,  h: 275 },
];

export const WF_NODES: WFNode[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // ENTRY
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'start', x: 0, y: 400, kind: 'entry',
    label: '🖥️ New GPU Enters System',
    description: 'A GPU has arrived at AmazinXpress. Choose the intake source to begin tracking this unit through the ERP. Every unit gets a serial-number record from this moment forward.',
    role: 'System',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // INTAKE BRANCHES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'purchase', x: 330, y: 80, kind: 'entry',
    label: 'Purchase Intake',
    description: 'GPU purchased via eBay, B2B deal, or walk-in customer. A Purchase Order exists and is matched to this shipment. Unit enters the receiving workflow.',
    role: 'Purchasing Team',
  },
  {
    id: 'lpos_intake', x: 330, y: 240, kind: 'entry',
    label: 'Large B2B Lot (LPOS)',
    description: 'A large B2B vendor lot has arrived for pre-receiving evaluation. Units go into the LPOS workspace before formal receiving — condition assessed, pricing negotiated per unit.',
    role: 'Purchasing Team',
  },
  {
    id: 'customer_sub', x: 337, y: 400, kind: 'entry',
    label: 'Customer Submission',
    description: 'A customer is selling their GPU via the GPU Exchange platform. Staff must inspect the unit before accepting it and issuing a payout.',
    role: 'GPU Exchange Staff',
  },
  {
    id: 'fba_rtg', x: 337, y: 560, kind: 'entry',
    label: '🔄 FBA Return (RTG)',
    description: 'Amazon returned inventory from FBA. The system auto-ingests this via Amazon SP-API. Each return arrives with an LPN (License Plate Number), ASIN, FNSKU, and return reason.',
    role: 'Warehouse Team',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ZAPIER / EXTERNAL WORKFLOW CHAINS (Current State)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'calendly_booking', x: 240, y: 930, kind: 'process',
    label: '📅 Calendly — Client Books Meeting',
    description: 'Client books a meeting via Calendly link. Zapier picks up the booking event and routes it to Slack. Currently being replaced with Microsoft Calendar + Slack meeting workflow.',
    role: 'Sales Team',
  },
  {
    id: 'zapier_meeting', x: 480, y: 930, kind: 'notification',
    label: '⚡ Zapier → Slack Meeting Alert',
    description: 'Zapier automation fires on Calendly booking. Slack notification sent to relevant channel with meeting details. Manual — no calendar invite auto-created. Being replaced by Slack.',
    role: 'Zapier (Auto)',
  },
  {
    id: 'email_incoming', x: 240, y: 1050, kind: 'entry',
    label: 'Incoming Email — Issue / Claim',
    description: 'An email arrives: A-to-Z claim, chargeback, FBA return notification, or vendor issue. Triggers the Zapier email workflow chain. Currently a 4-tool manual process.',
    role: 'External',
  },
  {
    id: 'zapier_email_chain', x: 480, y: 1020, kind: 'process',
    label: '⚡ Zapier → Slack → ClickUp → Excel',
    description: 'Email triggers Zapier. Zapier posts to Slack. Team manually creates ClickUp task. Data manually entered into Excel. Four tools for one incoming email. Being replaced with Microsoft To Do.',
    role: 'Zapier (Auto)',
  },
  {
    id: 'clickup_task', x: 720, y: 980, kind: 'process',
    label: '✅ ClickUp Task Created',
    description: 'Task manually created in ClickUp list based on Slack message. Status tracked in ClickUp. No direct connection to ERP inventory data. Being replaced by native ERP task management.',
    role: 'Operations Team',
  },
  {
    id: 'marketplace_message', x: 240, y: 1140, kind: 'entry',
    label: 'Marketplace Message Received',
    description: 'Customer message arrives from Amazon or eBay. Zapier routes it to a dedicated Slack channel. Team responds via Slack. Being replaced with dedicated Slack channel routing.',
    role: 'Customer Service',
  },
  {
    id: 'slack_cs_channel', x: 480, y: 1140, kind: 'notification',
    label: '💬 Slack — Customer Service',
    description: 'Marketplace messages land in Slack #customer-service channel. Agent reads and responds manually. No case tracking. No link to order or serial number history.',
    role: 'Customer Service',
  },
  {
    id: 'atoz_claim', x: 720, y: 1140, kind: 'escalation',
    label: '⚠️ A-to-Z Claim Filed',
    description: 'Customer files an A-to-Z claim on Amazon. Amazon emails AmazinXpress. Email goes through Zapier → Slack → ClickUp chain. Claim must be responded to within Amazon deadline or seller loses automatically.',
    role: 'Case Manager',
  },
  {
    id: 'chargeback', x: 720, y: 1280, kind: 'escalation',
    label: '⚠️ Chargeback Filed',
    description: 'Customer files a chargeback via their bank or Amazon Pay. Email notification triggers the Zapier chain. Requires evidence submission (photos, tracking, description) and QBO financial note.',
    role: 'Finance',
  },
  {
    id: 'done_claim_resolved', x: 960, y: 1200, kind: 'terminal_good',
    label: '✅ Claim Resolved',
    description: 'A-to-Z claim or chargeback resolved. Outcome recorded. If won — no further action needed. If lost — write-down posted in QBO and unit value adjusted. Case archived in ERP.',
    role: 'Finance',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SELLERCLOUD → SKUSTACK HANDOFF (Current State)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sellercloud_po_recv', x: 1200, y: -280, kind: 'process',
    label: '🗄️ SellerCloud — PO Received',
    description: 'PO marked as received in SellerCloud. Unit record created with serial number, SKU, and condition. This is the current system of record for inventory. Triggers the SkuStack handoff for physical bin placement.',
    role: 'Receiving Technician',
  },
  {
    id: 'skustack_handoff', x: 1440, y: -280, kind: 'scan',
    label: '📱 SkuStack — Assign Bin',
    description: 'Unit handed off from SellerCloud to SkuStack. Technician scans unit into a bin using SkuStack. Bin, shelf, and region tracked in SkuStack separately from SellerCloud. Current dual-system workflow.',
    role: 'Warehouse Staff',
  },
  {
    id: 'serial_gen', x: 1680, y: -280, kind: 'scan',
    label: 'Serial Number Generated + Printed',
    description: 'Serial number generated in SellerCloud on PO receive. Zebra printer triggered to print QR code label: serial number, SKU, condition, PO number, received date. Label applied to unit physically.',
    role: 'Receiving Technician',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MANUAL QBO + EOM RECONCILIATION (Current State)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'manual_qbo_je', x: 2160, y: -380, kind: 'financial',
    label: '📊 Manual QBO Journal Entry',
    description: 'Finance team manually creates journal entry in QuickBooks Online. Current process — no automatic sync. Time-consuming and error-prone. Being replaced by automated QBO sync module in the new ERP.',
    role: 'Finance',
  },
  {
    id: 'eom_excel_recon', x: 2400, y: -380, kind: 'terminal_good',
    label: '✅ EoM Reconciliation Complete',
    description: 'End of Month: Finance manually compares SellerCloud inventory value against QBO balance using an Excel tracking matrix. Rows per SKU, columns per warehouse (Placentia, Interim, FBA, Int Ret Whse). Discrepancies corrected manually. This repeats every month — but for this unit\'s financial journey, reconciliation is the final step.',
    role: 'Finance',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // LPOS PRE-RECEIVING
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'lpos_workspace', x: 530, y: 240, kind: 'process',
    label: 'LPOS Pre-Receiving Workspace',
    description: 'Temporary Excel-based workspace for large-lot evaluation. Each unit gets SKU/MSKU, serial number, bin location, and condition assigned before final acceptance. Vendor negotiation happens here before committing to formal receiving.',
    role: 'Purchasing Team',
  },
  {
    id: 'lpos_decision', x: 750, y: 240, kind: 'decision',
    label: 'Unit-by-Unit Accept Decision',
    description: 'For each unit in the lot: accept (enters production), return to vendor (defective or overpriced), or renegotiate price based on condition and repair exposure assessment.',
    role: 'Purchasing Team',
  },
  {
    id: 'lpos_accepted', x: 960, y: 200, kind: 'process',
    label: 'LPOS → Bulk Import to Receiving',
    description: 'All accepted units bulk-imported into the main ERP receiving flow with serial numbers, bins, MSKUs, and condition already captured from the LPOS workspace. Replaces manual Excel-to-SellerCloud transfer.',
    role: 'Warehouse Team',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CUSTOMER SUBMISSION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'intake_inspect', x: 480, y: 400, kind: 'decision',
    label: 'Customer GPU Inspection',
    description: 'Staff inspects the submitted GPU. Verify model matches what was quoted, check serial number, assess actual condition vs stated condition, look for damage or fraud indicators.',
    role: 'GPU Exchange Staff',
  },
  {
    id: 'done_rejected', x: 720, y: 500, kind: 'terminal_bad',
    label: '❌ Submission Rejected',
    description: 'GPU failed inspection — condition was misrepresented, model is wrong, or fraud suspected. Customer is notified via GPU Exchange. Unit returned to customer.',
    role: 'GPU Exchange Staff',
  },
  {
    id: 'customer_payout', x: 720, y: 320, kind: 'financial',
    label: '💸 Accept GPU → Issue Payout',
    description: 'GPU accepted. Condition confirmed. Customer payout triggered via Stripe Connect. QBO entry posted. Unit now enters production workflow as new inventory.',
    role: 'Finance',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FBA RTG RETURNS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'fba_lpn_capture', x: 480, y: 620, kind: 'scan',
    label: 'LPN Capture + Auto-Match',
    description: 'Amazon SP-API delivers return data automatically. LPN (License Plate Number) matched to original sale serial number. If match found — unit history linked. If no match — flagged for manual review.',
    role: 'System (Auto)',
  },
  {
    id: 'fba_action_tags', x: 720, y: 620, kind: 'process',
    label: 'Assign Action Tags + State Tags',
    description: 'Each FBA return gets action tags (inspect, restock, dispose, escalate) and state tags (pending, in-review, resolved). Replaces the current manual Slack + Excel process entirely.',
    role: 'Returns Specialist',
  },
  {
    id: 'rtg_inspect', x: 960, y: 620, kind: 'decision',
    label: 'RTG Inspection + Classification',
    description: 'Classify this return: Fulfillable (re-sellable), Unfulfillable (damaged), Manual Removal (AmazinXpress requested back), or Stranded (no active listing). Each subtype routes differently.',
    role: 'Returns Specialist',
  },
  {
    id: 'fba_notify', x: 720, y: 700, kind: 'notification',
    label: 'Slack Alert: FBA Return Received',
    description: 'Automatic Slack notification fires to the #returns-alerts channel. Return is time-sensitive — FBM returns require refund action within 2 business days.',
    role: 'System (Auto)',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RECEIVING STAGE 1
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'recv_scan_tracking', x: 980, y: 80, kind: 'scan',
    label: '📷 Scan Inbound Tracking',
    description: 'Technician scans the inbound shipment tracking number. System matches to open PO. Session ID auto-generated — groups all scans in this receiving session together for productivity tracking.',
    role: 'Receiving Technician',
  },
  {
    id: 'recv_unbox_count', x: 1200, y: 80, kind: 'process',
    label: '📦 Unpack + Count Units',
    description: 'Unpack the shipment. Count units received vs units expected on PO. Productivity logged per technician. Any count discrepancy triggers partial receipt state on the PO.',
    role: 'Receiving Technician',
  },
  {
    id: 'recv_count_check', x: 1440, y: 80, kind: 'decision',
    label: 'Count Match PO?',
    description: 'Does the number of units received match the PO? If yes — proceed to Stage 2 inspection. If no — partial receipt recorded and purchasing team notified.',
    role: 'Receiving Technician',
  },
  {
    id: 'recv_partial', x: 1440, y: -100, kind: 'escalation',
    label: 'Partial Receipt — PO Discrepancy',
    description: 'Received fewer units than the PO expected. Partial receipt state set on PO. Purchasing team alerted via Slack. Missing units flagged for vendor follow-up.',
    role: 'Purchasing Team',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RECEIVING STAGE 2
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'receiving_s2', x: 1680, y: 80, kind: 'decision',
    label: 'Receiving Stage 2 — Full Inspection',
    description: 'Inspect each unit: confirm serial number against PO, assess condition (Grade A/B/C), check for physical damage, verify accessories. Pass or escalate each unit individually.',
    role: 'Receiving Technician',
  },
  {
    id: 'recv_label_print', x: 1920, y: -20, kind: 'scan',
    label: '🏷️ Print Unit Label (QR)',
    description: 'Unit passed receiving. Zebra printer triggered via Android scanning app. Label contains: serial number as QR code, SKU, condition grade, PO number, received date. Applied to unit.',
    role: 'Receiving Technician',
  },
  {
    id: 'recv_esc', x: 1680, y: 280, kind: 'escalation',
    label: 'Receiving Escalation',
    description: 'Mismatch or damage found. Guided escalation workflow: select escalation type, capture notes, upload required photos, choose routing. Floor manager notified via Slack with SLA timer.',
    role: 'Floor Manager',
  },
  {
    id: 'recv_esc_template', x: 1920, y: 340, kind: 'process',
    label: 'Escalation Template Filled',
    description: 'Structured escalation template auto-filled with unit data (serial, SKU, PO). Technician adds photo evidence and notes. Replaces current Slack + Excel manual process entirely.',
    role: 'Receiving Technician',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // VENDOR RETURN PATH
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'vendor_pending', x: 2160, y: -110, kind: 'process',
    label: '↩️ Vendor Return Pending',
    description: 'Unit flagged for return to vendor. RMA requested. Vendor return window checked — deadline alert set. Unit placed in vendor-return hold state. Cannot be processed until vendor responds.',
    role: 'Purchasing Team',
  },
  {
    id: 'vendor_deadline_alert', x: 2160, y: -260, kind: 'notification',
    label: 'Slack Alert: Vendor Deadline',
    description: 'System fires Slack alerts at 7 days, 3 days, and 1 day before vendor return window expires. Alert goes to #purchasing-alerts channel with unit details and one-click action buttons.',
    role: 'System (Auto)',
  },
  {
    id: 'in_transit_vendor', x: 2400, y: -140, kind: 'process',
    label: 'In Transit to Vendor',
    description: 'GPU shipped back via UPS. EasyPost label generated. Tracking active. Vendor must confirm receipt within return window to validate the claim.',
    role: 'Warehouse Team',
  },
  {
    id: 'vendor_received', x: 2640, y: -140, kind: 'process',
    label: 'Vendor Confirmed Receipt',
    description: 'Vendor confirmed receipt. Credit memo or replacement unit expected. QBO note attached to PO. Vendor return window clock stops.',
    role: 'Purchasing Team',
  },
  {
    id: 'done_vendor_refund', x: 2880, y: -140, kind: 'terminal_good',
    label: '✅ Vendor Refund Received',
    description: 'Credit or refund processed. PO closed. Journal entry posted in QuickBooks Online via QBO sync. Case fully resolved.',
    role: 'Finance',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TESTING QUEUE + BLOCK
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'testing_q', x: 2160, y: 80, kind: 'process',
    label: '🔬 Testing Queue',
    description: 'GPU enters the testing queue. Floor manager assigns to a technician time block based on daily operations schedule. Expedited units jump to the top of the queue.',
    role: 'Floor Manager',
  },
  {
    id: 'testing_block_start', x: 2400, y: 80, kind: 'scan',
    label: 'Technician Starts Testing Block',
    description: 'Technician opens the Android scanning app and starts a testing block. Session ID generated. All test scans in this session grouped together for productivity tracking.',
    role: 'Testing Technician',
  },
  {
    id: 'expedited_check', x: 2400, y: -20, kind: 'decision',
    label: 'Expedited Testing?',
    description: 'Is this unit flagged as expedited (priority)? Expedited units skip the normal queue and are assigned to the next available technician immediately.',
    role: 'Floor Manager',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // TESTING IN PROGRESS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'test_functional', x: 2640, y: 80, kind: 'process',
    label: '⚡ Functional Test',
    description: 'GPU powers on. Display output confirmed. Basic benchmark run via GPU-Z or HWiNFO. Pass or note failure. Result logged against serial number.',
    role: 'Testing Technician',
  },
  {
    id: 'test_thermal', x: 2880, y: 80, kind: 'process',
    label: '🌡️ Thermal Test',
    description: 'Stress test run. Temperature readings logged (idle + load) via HWiNFO. Overheating flag added if temps exceed threshold. HWiNFO log screenshot captured for record.',
    role: 'Testing Technician',
  },
  {
    id: 'test_vram', x: 3120, y: 80, kind: 'process',
    label: '💾 VRAM + Fan Test',
    description: 'VRAM scan run for errors. Each fan individually tested for speed and noise. Artifacting check performed. All results logged per test type against serial number.',
    role: 'Testing Technician',
  },
  {
    id: 'test_visual', x: 3360, y: 80, kind: 'decision',
    label: 'Visual Inspection + Overall Verdict',
    description: 'Physical condition assessed: scratches, burn marks, bent pins, damaged shroud. Cleaning level assigned (Standard / Deep / Omega). Overall pass or fail decision made.',
    role: 'Testing Technician',
  },
  {
    id: 'cleaning_level_assign', x: 3600, y: -20, kind: 'process',
    label: 'Assign Cleaning Level',
    description: 'Based on testing findings, cleaning level assigned: Standard (light dust), Deep (fans + heatsink), or Omega (full disassembly, thermal paste + pads replaced).',
    role: 'Testing Technician',
  },
  {
    id: 'testing_esc', x: 3360, y: 280, kind: 'escalation',
    label: 'Testing Failed — Escalation',
    description: 'GPU failed one or more tests. Guided escalation: technician selects issue type, uploads photos, writes notes. Floor manager notified via Slack. Routing decision required.',
    role: 'Floor Manager',
  },
  {
    id: 'testing_esc_template', x: 3600, y: 360, kind: 'process',
    label: 'Testing Escalation Template',
    description: 'Structured testing-failure template filled with unit data, test results, and photos. Replaces current Slack + Excel escalation process. SLA timer started on submission.',
    role: 'Testing Technician',
  },
  {
    id: 'testing_notify', x: 3120, y: 280, kind: 'notification',
    label: 'Slack Alert: Testing Failure',
    description: 'Automatic Slack alert fires to #floor-alerts channel. Floor manager sees: unit serial, SKU, failure type, and routing options. Acknowledgment required within SLA window.',
    role: 'System (Auto)',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // REPAIRS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'repairs_t1', x: 3840, y: 360, kind: 'process',
    label: '🔧 Tier 1 Repairs',
    description: 'Production-team repair: repaste thermal compound, replace pads, fan replacement, shroud repair. Session ID generated. Parts reserved from parts inventory. Standard turnaround expected.',
    role: 'Production Technician',
  },
  {
    id: 'waiting_part', x: 3840, y: 540, kind: 'blocked',
    label: '⛔ BLOCKED — Waiting on Part',
    description: 'Required replacement part is not in stock. Unit in BLOCKED state — cannot advance. Part ordered from supplier. System fires alert when part arrives. Repair resumes automatically.',
    role: 'Repair Supervisor',
  },
  {
    id: 'part_arrived_notify', x: 4080, y: 540, kind: 'notification',
    label: 'Slack Alert: Part Arrived',
    description: 'Part arrived at warehouse and scanned into parts inventory. Automatic Slack alert fires to repair technician: "Part RTX-3080-FAN-L arrived — unit SN-XXXXX ready for repair."',
    role: 'System (Auto)',
  },
  {
    id: 'repairs_t2', x: 4080, y: 460, kind: 'process',
    label: '🔩 Tier 2 Repairs',
    description: 'Specialist repair: deep diagnostics, port repair, BIOS recovery, component soldering, capacitor/MOSFET replacement. Full repair history logged in unit SN timeline.',
    role: 'GPU Repair Technician',
  },
  {
    id: 'repair_qbo_entry', x: 4080, y: 260, kind: 'financial',
    label: 'QBO: Repair Cost Added to Unit',
    description: 'Repair cost posted to unit record. Added to serial-level COGS calculation. If write-off decision made — journal entry created in QuickBooks Online automatically.',
    role: 'Finance',
  },
  {
    id: 'write_off', x: 4320, y: 540, kind: 'terminal_bad',
    label: '📉 Write-Off',
    description: 'Unit deemed uneconomical to repair. Removed from active inventory. Write-down event logged in ERP. Journal entry posted in QBO. Serial number archived permanently.',
    role: 'Finance',
  },
  {
    id: 'graveyard', x: 4320, y: 680, kind: 'terminal_bad',
    label: '⚰️ Graveyard',
    description: 'Defective unit moved to graveyard inventory. Awaiting final disposition — parts salvage or periodic bulk write-off. Still tracked by serial number.',
    role: 'Warehouse Manager',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CLEANING WORKFLOW
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'cleaning_q', x: 3840, y: 80, kind: 'process',
    label: '🧹 Cleaning Queue',
    description: 'GPU passed testing with cleaning level assigned. Added to cleaning queue. Floor manager schedules based on cleaning type and available technician capacity.',
    role: 'Floor Manager',
  },
  {
    id: 'cleaning_scan_in', x: 4080, y: 80, kind: 'scan',
    label: 'Scan Units Into Cleaning Batch',
    description: 'Technician batch-scans multiple units into a cleaning session using the Android scanning app. High-speed scanning — minimal taps required. Session ID groups all units.',
    role: 'Cleaning Technician',
  },
  {
    id: 'cleaning_level_check', x: 4320, y: 80, kind: 'decision',
    label: 'Which Cleaning Level?',
    description: 'Route based on assigned cleaning level: Standard (basic wipe), Deep (fans + heatsink addressed), or Omega (full disassembly in Omega machine — most intensive).',
    role: 'Cleaning Technician',
  },
  {
    id: 'cleaning_standard', x: 4560, y: -40, kind: 'process',
    label: '🧹 Standard Clean',
    description: 'Basic exterior wipe, compressed air, no disassembly. Quick turnaround. Technician logs completion with timestamp and session ID.',
    role: 'Cleaning Technician',
  },
  {
    id: 'cleaning_deep', x: 4560, y: 80, kind: 'process',
    label: '🧽 Deep Clean',
    description: 'Fans cleaned, heatsink fins cleared, thermal compound inspected. Moderate turnaround. Any damage found during cleaning triggers a flag.',
    role: 'Cleaning Technician',
  },
  {
    id: 'cleaning_omega', x: 4560, y: 200, kind: 'process',
    label: '⚙️ Omega Clean',
    description: 'Full disassembly. Thermal paste and pads replaced. All surfaces cleaned. GPU run through the Omega machine per SOP. Highest time investment — flagged units may be found here.',
    role: 'Cleaning Technician',
  },
  {
    id: 'cleaning_issue_check', x: 4800, y: 80, kind: 'decision',
    label: 'Issue Found During Cleaning?',
    description: 'Damage discovered during cleaning that was not caught in testing? If yes — flag added and unit escalated back for review. If no — proceed to drying.',
    role: 'Cleaning Technician',
  },
  {
    id: 'drying', x: 5040, y: 80, kind: 'process',
    label: '💨 Drying Stage',
    description: 'GPU dries after cleaning. Minimum drying time enforced by system — unit cannot advance to packaging until drying time has elapsed. Timer tracked per unit.',
    role: 'Cleaning Technician',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PACKAGING WORKFLOW
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'packaging_q', x: 5280, y: 80, kind: 'process',
    label: '📦 Packaging Queue',
    description: 'Dried GPU queued for packaging. Floor manager assigns to packaging technician. OEM box availability checked — if original box present, OEM workflow triggered.',
    role: 'Floor Manager',
  },
  {
    id: 'oem_box_check', x: 5520, y: -20, kind: 'decision',
    label: 'OEM Box Available?',
    description: 'Does this unit have its original manufacturer box? OEM box units follow a specific packaging SOP. Non-OEM units use standard anti-static + bulk box workflow.',
    role: 'Packaging Technician',
  },
  {
    id: 'bulk_box_build', x: 5760, y: 80, kind: 'process',
    label: 'Bulk Box Building',
    description: 'Standard packaging: anti-static bag, foam padding, bulk box construction per the Bulk Box Building SOP. Box size matched to GPU dimensions.',
    role: 'Packaging Technician',
  },
  {
    id: 'accessory_checklist', x: 6000, y: 80, kind: 'decision',
    label: 'Accessory Checklist',
    description: 'System enforces accessory requirements from product catalog: power adapter required? Support stand required? Specific cable required? Cannot complete packaging without confirming all accessories.',
    role: 'Packaging Technician',
  },
  {
    id: 'accessory_missing', x: 6000, y: 240, kind: 'blocked',
    label: '⛔ BLOCKED — Accessory Missing',
    description: 'Required accessory not present. Unit BLOCKED from advancing. Technician must locate the accessory or flag for management decision. Cannot bypass this check.',
    role: 'Packaging Technician',
  },
  {
    id: 'condition_confirm', x: 6240, y: 80, kind: 'decision',
    label: 'Final Condition Confirmation',
    description: 'Final grade confirmed at packaging — must match condition assigned at testing. Discrepancy triggers flag and supervisor review. Correct condition critical for accurate listing.',
    role: 'Packaging Technician',
  },
  {
    id: 'condition_mismatch', x: 6240, y: 240, kind: 'escalation',
    label: 'Condition Mismatch — Flag',
    description: 'Grade at packaging does not match testing assignment. Flag added. Supervisor review required before advancing. Common cause: unit mixed up in cleaning batch.',
    role: 'Floor Manager',
  },
  {
    id: 'packaging_done', x: 6480, y: 80, kind: 'process',
    label: '✅ Packaging Complete',
    description: 'Packaging logged against serial number — technician ID, timestamp, accessories confirmed, condition grade confirmed. Scan event added to SN history. Ready for warehouse.',
    role: 'Packaging Technician',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // WAREHOUSE OPERATIONS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'shelf_label', x: 6480, y: -140, kind: 'process',
    label: 'Warehouse Shelving + Labeling Setup',
    description: 'New shelving set up per the Warehouse Shelving and Labeling SOP. Each shelf and bin labeled with location code. Labels match Android app bin identifiers for accurate scanning and lookup.',
    role: 'Warehouse Manager',
  },
  {
    id: 'warehousing', x: 6720, y: 80, kind: 'scan',
    label: '🏭 Bin Assignment — Placentia',
    description: 'GPU scanned into a physical bin location at the Placentia facility using the Android app. Bin, shelf, and region tracked. Unit now in Placentia warehouse inventory.',
    role: 'Warehouse Manager',
  },
  {
    id: 'bin_to_bin', x: 6720, y: 220, kind: 'scan',
    label: '↔️ Bin-to-Bin Transfer',
    description: 'Android scanning app used to move unit from one bin to another. Full audit trail logged. Replaces SkuStack software entirely. SKU-to-SKU transfer also supported.',
    role: 'Warehouse Staff',
  },
  {
    id: 'warehouse_transfer', x: 6960, y: 220, kind: 'process',
    label: 'Warehouse-to-Warehouse Transfer',
    description: 'Unit transferred between physical facilities (e.g. Placentia to another location). Subtracted from source warehouse, added to destination. Transit state tracked digitally.',
    role: 'Warehouse Manager',
  },
  {
    id: 'b2b_facility_transfer', x: 6480, y: -260, kind: 'process',
    label: 'B2B Facility Transfer (SOP)',
    description: 'Bulk inventory transferred between AmazinXpress facilities per the B2B Transfers SOP. Units subtracted from source facility inventory, added to destination. SellerCloud and Excel both updated in current process.',
    role: 'Warehouse Manager',
  },
  {
    id: 'ltl_release', x: 6720, y: -200, kind: 'process',
    label: '🚛 LTL Release — Cargo Check',
    description: 'Large LTL shipment scheduled for pickup. Staff follows the LTL releasing SOP to verify driver credentials, check paperwork, and prevent strategic cargo theft before releasing the shipment.',
    role: 'Warehouse Manager',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SALES CHANNELS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'listed_fba', x: 6960, y: -100, kind: 'process',
    label: '📦 Ship to Amazon FBA',
    description: 'GPU shipped from Placentia to Amazon FBA. Subtracted from Placentia, added to Interim Warehouse (digital — tracking in transit). MSKU and FNSKU assigned.',
    role: 'Warehouse Team',
  },
  {
    id: 'interim_wh', x: 7200, y: -100, kind: 'process',
    label: 'Interim Warehouse (In Transit)',
    description: 'Unit is in transit from Placentia to Amazon warehouse. Digital tracking state. Subtracted from Interim, added to FBA Warehouse when Amazon confirms receipt.',
    role: 'System (Auto)',
  },
  {
    id: 'fba_wh_active', x: 7440, y: -100, kind: 'process',
    label: 'Active in FBA Warehouse',
    description: 'Amazon confirmed receipt of shipment. Inventory now live in Amazon FBA warehouse. Available for Amazon customer orders. FIFO costing tracked for this FBA lot.',
    role: 'System (Auto)',
  },
  {
    id: 'fba_audit', x: 7440, y: -220, kind: 'process',
    label: 'FBA Shipment Audit',
    description: 'After FBA shipment sent, staff audits what Amazon confirmed received vs what was shipped. Discrepancy notes template completed. Any missing units flagged for Amazon reimbursement case.',
    role: 'Warehouse Team',
  },
  {
    id: 'fba_discrepancy', x: 7680, y: -220, kind: 'escalation',
    label: '⚠️ FBA Discrepancy — Case',
    description: 'Amazon received fewer units than were shipped in the FBA shipment. Discrepancy notes template completed with evidence. Amazon case opened for missing inventory reimbursement.',
    role: 'Case Manager',
  },
  {
    id: 'listed_fbm', x: 6960, y: 20, kind: 'process',
    label: '🏪 Listed — Amazon FBM',
    description: 'GPU listed on Amazon as Fulfilled-by-Merchant. AmazinXpress ships directly on order. EasyPost label generated at time of order. 2-day return window active.',
    role: 'Sales Team',
  },
  {
    id: 'listed_ebay', x: 6960, y: 140, kind: 'process',
    label: '🛒 Listed — eBay',
    description: 'GPU listed on eBay marketplace. eBay API syncs inventory quantity and pricing automatically. Serial number tracked against eBay order ID on sale.',
    role: 'Sales Team',
  },
  {
    id: 'listed_gpuex', x: 6960, y: 290, kind: 'process',
    label: '🌐 Listed — GPU Exchange',
    description: 'GPU listed on the customer-facing GPU Exchange platform. Stripe checkout enabled. Trade-in valuation available. B2B bulk purchase option enabled.',
    role: 'Sales Team',
  },
  {
    id: 'listed_b2b', x: 6960, y: 360, kind: 'process',
    label: '🤝 B2B / Local Sale',
    description: 'GPU sold via B2B agreement or local walk-in customer. Invoice generated from template. Bulk pricing applied. Local sale = direct handoff, no shipping required.',
    role: 'Sales Team',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PICKLIST + FBM SHIPPING
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'picklist_gen', x: 7200, y: 80, kind: 'process',
    label: 'Morning Picklist Generated',
    description: 'Every morning the system auto-generates a picklist of all FBM orders due for shipment. Employees are assigned picklists and retrieve units from their bin locations.',
    role: 'Warehouse Staff',
  },
  {
    id: 'picklist_pick', x: 7440, y: 80, kind: 'scan',
    label: 'Employee Picks Units from Bins',
    description: 'Employee uses Android app to scan and pick each unit from its bin. Units move from storage to shipping staging area. Picking logged per employee for productivity tracking.',
    role: 'Warehouse Staff',
  },
  {
    id: 'fbm_label_gen', x: 7680, y: 80, kind: 'process',
    label: 'EasyPost Label Generated',
    description: 'Shipping label generated via EasyPost. Carrier selected based on SOP: UPS afternoon pickup at 3:30–4:30 PM, USPS at 1–2 PM, FedEx if they show otherwise drive to drop-off.',
    role: 'Shipping Team',
  },
  {
    id: 'fbm_ship_deadline', x: 7680, y: 200, kind: 'notification',
    label: 'Slack Alert: Ship-by Deadline',
    description: 'System checks ship-by deadline per FBM order. If approaching deadline — alert fires to #floor-alerts. UPS afternoon pickup at 3:30–4:30 PM is the hard cutoff for same-day shipment.',
    role: 'System (Auto)',
  },
  {
    id: 'order_images_upload', x: 7920, y: 80, kind: 'process',
    label: 'Upload Order Images',
    description: 'Photos of packaged unit uploaded and linked to order record per SOP. Required for high-value FBM orders as fraud protection. Images accessible if return dispute arises.',
    role: 'Shipping Team',
  },
  {
    id: 'bulk_label_print', x: 7920, y: -80, kind: 'scan',
    label: 'Bulk Pink 3x2 Label Printing',
    description: 'Bulk batch of pink 3x2 box labels printed per SOP. Used for outgoing shipment identification and staging area organization. Zebra printer batch job triggered from the system.',
    role: 'Warehouse Staff',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ORDER SOLD + DELIVERY
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'sold', x: 8160, y: 80, kind: 'financial',
    label: '💰 Sold — COGS Posted',
    description: 'Order confirmed on channel. Serial number linked to this order permanently. COGS entry auto-posted to QuickBooks Online via QBO sync. Customer linked to serial number.',
    role: 'System (Auto)',
  },
  {
    id: 'in_transit_out', x: 8400, y: 80, kind: 'process',
    label: '🚚 In Transit to Customer',
    description: 'GPU shipped. EasyPost tracking active. Customer notification sent via channel. Carrier webhooks update ERP in real time: in transit → out for delivery → delivered.',
    role: 'Shipping Team',
  },
  {
    id: 'delivered', x: 8640, y: 80, kind: 'decision',
    label: '📬 Delivered',
    description: 'Carrier confirms delivery. Customer received the GPU. Warranty period starts. Smooth sailing — or is a return coming within the return window?',
    role: 'System (Auto)',
  },
  {
    id: 'done_sold', x: 8880, y: -40, kind: 'terminal_good',
    label: '🎉 Sold & Delivered!',
    description: 'GPU lifecycle complete. Customer satisfied. Full profit realized. COGS reconciled in QBO. Serial number permanently archived with complete history from intake to delivery.',
    role: 'System',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CUSTOMER RETURNS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'return_transit', x: 8640, y: 280, kind: 'process',
    label: '📮 Return In Transit',
    description: 'Customer initiated a return. RMA issued. Prepaid return label sent (USPS for FBM). Return package is en route. FBM returns are time-critical — 2 business day refund window.',
    role: 'Returns Specialist',
  },
  {
    id: 'return_received', x: 8400, y: 380, kind: 'scan',
    label: '📥 Return Received',
    description: 'Return package arrived. Serial number scanned and matched against original sale record. LPN captured if FBA return. slack thread created per FBM return case.',
    role: 'Returns Specialist',
  },
  {
    id: 'fbm_slack_thread', x: 8400, y: 520, kind: 'notification',
    label: '💬 Slack Thread Created (FBM)',
    description: 'For FBM returns a dedicated Slack thread is created per return case. Team members communicate inside the thread. Replaces current Slack-based return coordination entirely.',
    role: 'System (Auto)',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RETURNS 8-STEP GUIDED INSPECTION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'ret_step1', x: 8160, y: 380, kind: 'process',
    label: 'Step 1: Serial Verify',
    description: 'Scan returned unit. System matches serial number against original sale. If serial matches — continue. If mismatch — critical fraud flag added immediately.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_serial_mismatch', x: 8160, y: 520, kind: 'escalation',
    label: 'Serial Mismatch — Critical Flag',
    description: 'Returned unit serial does not match original sale. Critical fraud flag set. Unit quarantined immediately. Amazon fraud case opened. Management notified via Slack.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_step2', x: 7920, y: 380, kind: 'process',
    label: 'Step 2: Tamper Seal Check',
    description: 'Are tamper-evident seals intact? If broken — flag added: tamper_seal_broken. Photo required. Broken seal is a strong fraud indicator but not conclusive alone.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_step3', x: 7680, y: 380, kind: 'process',
    label: 'Step 3: Physical Inspection + Photos',
    description: 'Compare physical condition to condition at time of sale. New damage documented with required photos. Damage type selected from taxonomy. Photos stored in SharePoint.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_step4', x: 7440, y: 380, kind: 'process',
    label: 'Step 4: Functional Test',
    description: 'Does the unit power on? Display output? Basic stability test. A functional unit returned as "defective" is a strong fraud signal. Result logged against return record.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_step5_fraud', x: 7200, y: 380, kind: 'decision',
    label: 'Step 5: Fraud Risk Assessment',
    description: 'ML model evaluates all inspection inputs and scores fraud risk 0–100. Key signals: serial match, tamper seal, new damage, functional but returned as broken, customer history.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_step6', x: 6960, y: 420, kind: 'decision',
    label: 'Step 6: Return Classification',
    description: 'Classify this return into one of 8 categories. Classification determines routing, refund decision, and whether an Amazon case should be opened.',
    role: 'Returns Specialist',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RETURNS OUTCOMES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'restock', x: 6720, y: 380, kind: 'process',
    label: 'Restock — Ours / Functioning',
    description: 'Our unit, passes functionality test. Condition re-assessed and grade updated. GPU re-enters warehouse inventory at Placentia. Available for re-listing on all channels.',
    role: 'Returns Specialist',
  },
  {
    id: 'done_restock', x: 6480, y: 380, kind: 'terminal_good',
    label: '✅ Restocked — Back in Inventory',
    description: 'GPU successfully restocked. Inventory value updated. Available for sale again on active channels. Lifecycle continues with updated history.',
    role: 'System',
  },
  {
    id: 'ret_interim_return', x: 6720, y: 500, kind: 'process',
    label: 'Interim Return Warehouse',
    description: 'Return received — subtracted from FBA warehouse, added to Interim Return Warehouse (digital). When physically received at AmazinXpress — moved from Interim Return to Placentia.',
    role: 'Warehouse Team',
  },
  {
    id: 'amazon_case', x: 6720, y: 620, kind: 'escalation',
    label: '📋 Amazon Case Opened',
    description: 'Suspicious return — wrong unit, tamper evidence, or fraud suspected. Amazon Seller Central case opened. Evidence (photos + inspection report) submitted automatically.',
    role: 'Case Manager',
  },
  {
    id: 'fraud_hold', x: 6960, y: 520, kind: 'blocked',
    label: '⛔ Fraud Hold — Quarantined',
    description: 'High-confidence fraud return. Unit quarantined — BLOCKED from all actions. Photos and documentation secured. Amazon Seller Central fraud case opened immediately.',
    role: 'Returns Specialist',
  },
  {
    id: 'safe_t_claim', x: 6960, y: 680, kind: 'terminal_good',
    label: '✅ Safe-T Claim Filed',
    description: 'Return never arrived or carrier issue. Safe-T claim filed with Amazon for reimbursement. Tracking dispute opened with carrier. QBO entry pending reimbursement.',
    role: 'Case Manager',
  },
  {
    id: 'case_won', x: 6480, y: 620, kind: 'financial',
    label: 'Amazon Case Won — Reimbursement',
    description: 'Amazon ruled in our favor. Reimbursement approved and deposited to selling account. QBO entry posted: reimbursement income recorded. Case archived.',
    role: 'Finance',
  },
  {
    id: 'done_reimbursement', x: 6240, y: 620, kind: 'terminal_good',
    label: '✅ Reimbursement Received',
    description: 'Reimbursement funds received. QuickBooks Online entry posted. EoM reconciliation will include this. Serial number archived. Case permanently closed.',
    role: 'Finance',
  },
  {
    id: 'ret_ours_defective', x: 6720, y: 740, kind: 'process',
    label: 'Ours — Defective → Repairs',
    description: 'Our unit but it failed functionality testing. Routes to repairs workflow for Tier 1 or Tier 2 assessment. Repair cost added to unit record.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_not_ours_diff', x: 6480, y: 760, kind: 'escalation',
    label: 'Not Ours — Different SKU',
    description: 'Completely different GPU model returned. High fraud confidence. Quarantine immediately. Open Amazon case with photos. This is a deliberate swap fraud.',
    role: 'Returns Specialist',
  },
  {
    id: 'ret_returned_to_sender', x: 6480, y: 880, kind: 'process',
    label: 'Returned to Sender / Lost',
    description: 'Package returned to sender by carrier or reported lost in transit. Safe-T claim or carrier claim filed. Unit status set to lost_in_transit pending resolution.',
    role: 'Returns Specialist',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // QBO FINANCIAL EVENTS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'qbo_po_created', x: 1680, y: -180, kind: 'financial',
    label: '💳 QBO: PO → CC Expense',
    description: 'When PO is created and paid by credit card — credit card expense recorded in QBO immediately. Prepaid inventory asset debited. IMS and QBO must stay aligned.',
    role: 'Finance',
  },
  {
    id: 'qbo_po_received', x: 1920, y: -180, kind: 'financial',
    label: '📊 QBO: Received → Asset',
    description: 'When inventory physically received — value moves from prepaid inventory asset to inventory asset in QBO. Journal entry posted automatically via QBO sync.',
    role: 'Finance',
  },
  {
    id: 'qbo_eom', x: 2160, y: -180, kind: 'terminal_good',
    label: '✅ ERP Period Reconciled — Automated',
    description: 'End of Month: ERP inventory value vs QBO balance reconciled automatically. Discrepancies surfaced in exception report. SWR (Sold Without Receipt) adjusted out. WITR Ship/Rec accounted for. This repeats every month — but for this unit\'s financial journey, automated reconciliation is the final step.',
    role: 'Finance',
  },
];

// ─── Node → group alignment ──────────────────────────────────────────────────
// Node dimensions used for centering (must match the rendered <WorkflowNode>).
const NODE_W = 185;
const NODE_H = 60;

// For a node at (x, y), return the baseline group whose bounding box contains
// the node's center. When multiple baselines match (nested/overlapping groups)
// the smallest-area one wins, i.e. the most specific container.
function findBaselineGroup(x: number, y: number) {
  const cx = x + NODE_W / 2;
  const cy = y + NODE_H / 2;
  const matches = GROUPS_BASELINE.filter(
    (g) => cx >= g.x && cx <= g.x + g.w && cy >= g.y && cy <= g.y + g.h,
  );
  if (matches.length === 0) return null;
  matches.sort((a, b) => a.w * a.h - b.w * b.h);
  return matches[0];
}

// Returns WF_NODES with each node's (x, y) shifted by its baseline-group's
// (x, y) delta so children stay aligned with GROUPS even after the user
// re-spaces groups. Pure function; safe to call from useMemo.
export function getAlignedWFNodes(): WFNode[] {
  const deltaByGroupId = new Map<string, { dx: number; dy: number }>();
  for (const g of GROUPS) {
    const baseline = GROUPS_BASELINE.find((b) => b.id === g.id);
    if (!baseline) continue;
    deltaByGroupId.set(g.id, { dx: g.x - baseline.x, dy: g.y - baseline.y });
  }

  return WF_NODES.map((n) => {
    const baseline = findBaselineGroup(n.x, n.y);
    if (!baseline) return n;
    const delta = deltaByGroupId.get(baseline.id);
    if (!delta) return n;
    return { ...n, x: n.x + delta.dx, y: n.y + delta.dy };
  });
}

// ─── WORKFLOW EDGES ───────────────────────────────────────────────────────────

export const WF_EDGES: WFEdge[] = [

  // Start → Intake branches
  { id: 'e_s_pur',    from: 'start',            to: 'purchase',           label: 'Purchase — eBay / B2B / Walk-in' },
  { id: 'e_s_lpos',   from: 'start',            to: 'lpos_intake',        label: 'Large B2B Lot (LPOS Pre-Receiving)' },
  { id: 'e_s_sub',    from: 'start',            to: 'customer_sub',       label: 'Customer Submission via GPU Exchange' },
  { id: 'e_s_fba',    from: 'start',            to: 'fba_rtg',            label: 'FBA Return from Amazon (RTG)' },
  { id: 'e_s_cal',    from: 'start',            to: 'calendly_booking',   label: 'Client Schedules Meeting (Calendly)' },
  { id: 'e_s_email',  from: 'start',            to: 'email_incoming',     label: 'Incoming Email — Claim / Issue' },
  { id: 'e_s_mkt',    from: 'start',            to: 'marketplace_message', label: 'Marketplace Message from Customer' },

  // Zapier meeting chain
  { id: 'e_cal_zap',  from: 'calendly_booking', to: 'zapier_meeting',     label: 'Zapier Picks Up Booking Event' },

  // Email → Zapier → ClickUp chain
  { id: 'e_email_zap', from: 'email_incoming',  to: 'zapier_email_chain', label: 'Zapier Email Trigger Fires' },
  { id: 'e_zap_click', from: 'zapier_email_chain', to: 'clickup_task',    label: 'Manual ClickUp Task Created' },
  { id: 'e_click_atoz', from: 'clickup_task',   to: 'atoz_claim',         label: 'A-to-Z Claim Identified' },
  { id: 'e_click_chbk', from: 'clickup_task',   to: 'chargeback',         label: 'Chargeback Identified' },
  { id: 'e_atoz_res',  from: 'atoz_claim',      to: 'done_claim_resolved', label: 'Claim Responded + Resolved' },
  { id: 'e_chbk_res',  from: 'chargeback',      to: 'done_claim_resolved', label: 'Chargeback Disputed + Resolved' },

  // Marketplace messages
  { id: 'e_mkt_slack', from: 'marketplace_message', to: 'slack_cs_channel', label: 'Zapier Routes to Slack Channel' },
  { id: 'e_slack_atoz', from: 'slack_cs_channel', to: 'atoz_claim',       label: 'Claim Escalated from Message' },

  // Purchase → Receiving S1
  { id: 'e_pur_scan',  from: 'purchase',         to: 'recv_scan_tracking', label: 'Send to Receiving Dock' },

  // SellerCloud → SkuStack handoff
  { id: 'e_sc_sku',    from: 'sellercloud_po_recv', to: 'skustack_handoff', label: 'Hand Off to SkuStack for Bin Placement' },
  { id: 'e_sku_ser',   from: 'skustack_handoff', to: 'serial_gen',         label: 'Bin Assigned — Print Serial Label' },
  { id: 'e_sc_link',   from: 'recv_scan_tracking', to: 'sellercloud_po_recv', label: 'Match to PO in SellerCloud' },

  // LPOS flow
  { id: 'e_lpos_ws',   from: 'lpos_intake',      to: 'lpos_workspace',     label: 'Open LPOS Workspace (Excel)' },
  { id: 'e_lpos_dec',  from: 'lpos_workspace',   to: 'lpos_decision',      label: 'Evaluate Each Unit' },
  { id: 'e_lpos_acc',  from: 'lpos_decision',    to: 'lpos_accepted',      label: 'Accept Unit — Finalize' },
  { id: 'e_lpos_vnd',  from: 'lpos_decision',    to: 'vendor_pending',     label: 'Return to Vendor — Defective / Overpriced' },
  { id: 'e_lpos_r1',   from: 'lpos_accepted',    to: 'recv_scan_tracking', label: 'Bulk Import into Receiving Flow' },

  // Customer submission
  { id: 'e_sub_ins',   from: 'customer_sub',     to: 'intake_inspect',     label: 'Begin Staff Inspection' },
  { id: 'e_ins_rej',   from: 'intake_inspect',   to: 'done_rejected',      label: 'Reject — Does Not Meet Standards' },
  { id: 'e_ins_acc',   from: 'intake_inspect',   to: 'customer_payout',    label: 'Accept GPU — Issue Payout' },
  { id: 'e_pay_scan',  from: 'customer_payout',  to: 'recv_scan_tracking', label: 'Payout Sent → Enter Production' },

  // FBA RTG flow
  { id: 'e_fba_lpn',   from: 'fba_rtg',          to: 'fba_lpn_capture',    label: 'Auto-Ingest via Amazon SP-API' },
  { id: 'e_lpn_tags',  from: 'fba_lpn_capture',  to: 'fba_action_tags',    label: 'Match LPN + Assign Tags' },
  { id: 'e_tags_not',  from: 'fba_action_tags',  to: 'fba_notify',         label: 'Fire Slack Notification' },
  { id: 'e_tags_ins',  from: 'fba_action_tags',  to: 'rtg_inspect',        label: 'Begin RTG Inspection' },
  { id: 'e_rtg_r1',    from: 'rtg_inspect',      to: 'recv_scan_tracking', label: 'Fulfillable — Enter Production Flow' },
  { id: 'e_rtg_tst',   from: 'rtg_inspect',      to: 'recv_scan_tracking', label: 'Needs Re-Testing — Enter Receiving' },
  { id: 'e_rtg_grv',   from: 'rtg_inspect',      to: 'repairs_t1',         label: 'Unfulfillable — Assess for Repairs' },

  // Receiving S1
  { id: 'e_scan_unbox', from: 'recv_scan_tracking', to: 'recv_unbox_count', label: 'Session ID Generated — Begin Unpack' },
  { id: 'e_unbox_cnt',  from: 'recv_unbox_count',   to: 'recv_count_check', label: 'Count Complete — Check vs PO' },
  { id: 'e_cnt_ok',     from: 'recv_count_check',   to: 'receiving_s2',     label: 'Count Matches PO — Proceed to S2' },
  { id: 'e_cnt_part',   from: 'recv_count_check',   to: 'recv_partial',     label: 'Count Mismatch — Partial Receipt' },
  { id: 'e_part_s2',    from: 'recv_partial',       to: 'receiving_s2',     label: 'Log Partial Receipt — Continue with Received Units' },

  // Receiving S2
  { id: 'e_s2_label',   from: 'receiving_s2',     to: 'recv_label_print',   label: 'All Clear — Print Unit Label' },
  { id: 'e_label_tq',   from: 'recv_label_print', to: 'testing_q',          label: 'Label Printed — Move to Testing Queue' },
  { id: 'e_s2_esc',     from: 'receiving_s2',     to: 'recv_esc',           label: 'Issue Found — Trigger Escalation' },
  { id: 'e_esc_tmpl',   from: 'recv_esc',         to: 'recv_esc_template',  label: 'Fill Escalation Template' },
  { id: 'e_tmpl_tq',    from: 'recv_esc_template', to: 'testing_q',         label: 'Issue Resolved — Continue to Testing' },
  { id: 'e_tmpl_vnd',   from: 'recv_esc_template', to: 'vendor_pending',    label: 'Return to Vendor Required' },

  // QBO financial events
  { id: 'e_qbo_po',     from: 'recv_scan_tracking', to: 'qbo_po_created',   label: 'PO Payment → QBO CC Expense' },
  { id: 'e_qbo_recv',   from: 'receiving_s2',        to: 'qbo_po_received',  label: 'Received → QBO Inventory Asset' },
  { id: 'e_qbo_eom',    from: 'qbo_po_received',     to: 'qbo_eom',          label: 'EoM Reconciliation' },
  { id: 'e_qbo_man',    from: 'qbo_po_created',      to: 'manual_qbo_je',    label: 'Current: Manual JE in QBO' },
  { id: 'e_man_eom',    from: 'manual_qbo_je',       to: 'eom_excel_recon',  label: 'Monthly Excel Reconciliation' },

  // Vendor return path
  { id: 'e_vnd_alert',  from: 'vendor_pending',    to: 'vendor_deadline_alert', label: 'Set Deadline Alert' },
  { id: 'e_vnd_trn',    from: 'vendor_pending',    to: 'in_transit_vendor',     label: 'RMA Approved — Ship via UPS' },
  { id: 'e_trn_vrc',    from: 'in_transit_vendor', to: 'vendor_received',       label: 'Vendor Confirms Receipt' },
  { id: 'e_vrc_ref',    from: 'vendor_received',   to: 'done_vendor_refund',    label: 'Credit / Refund Received' },

  // Testing queue + block
  { id: 'e_tq_exp',     from: 'testing_q',           to: 'expedited_check',     label: 'Check Priority Level' },
  { id: 'e_exp_blk',    from: 'expedited_check',     to: 'testing_block_start', label: 'Normal Queue — Assign to Block' },
  { id: 'e_exp_fast',   from: 'expedited_check',     to: 'test_functional',     label: 'Expedited — Skip Queue Immediately' },
  { id: 'e_blk_func',   from: 'testing_block_start', to: 'test_functional',     label: 'Begin Testing Sequence' },

  // Testing steps
  { id: 'e_func_thm',   from: 'test_functional',  to: 'test_thermal',          label: 'Functional Pass — Run Thermal' },
  { id: 'e_thm_vram',   from: 'test_thermal',     to: 'test_vram',             label: 'Thermal Logged — Run VRAM + Fan' },
  { id: 'e_vram_vis',   from: 'test_vram',        to: 'test_visual',           label: 'VRAM + Fan Done — Visual Inspect' },
  { id: 'e_vis_cln',    from: 'test_visual',      to: 'cleaning_level_assign', label: 'Pass — Assign Cleaning Level' },
  { id: 'e_cln_lvl_q',  from: 'cleaning_level_assign', to: 'cleaning_q',      label: 'Level Assigned — Add to Cleaning Queue' },
  { id: 'e_vis_fail',   from: 'test_visual',      to: 'testing_esc',           label: 'Fail — Escalate' },
  { id: 'e_func_fail',  from: 'test_functional',  to: 'testing_esc',           label: 'Functional Fail — Escalate Immediately' },
  { id: 'e_tesc_not',   from: 'testing_esc',      to: 'testing_notify',        label: 'Fire Slack Alert' },
  { id: 'e_tesc_tmpl',  from: 'testing_esc',      to: 'testing_esc_template',  label: 'Fill Testing Escalation Template' },
  { id: 'e_tesc_t1',    from: 'testing_esc_template', to: 'repairs_t1',        label: 'Route to Tier 1 Repair' },
  { id: 'e_tesc_t2',    from: 'testing_esc_template', to: 'repairs_t2',        label: 'Route Directly to Tier 2 Specialist' },
  { id: 'e_tesc_wo',    from: 'testing_esc_template', to: 'write_off',         label: 'Repair Uneconomical — Write Off' },

  // Repairs
  { id: 'e_t1_pass',    from: 'repairs_t1',  to: 'cleaning_q',          label: 'Tier 1 Repair Successful ✓' },
  { id: 'e_t1_wait',    from: 'repairs_t1',  to: 'waiting_part',        label: 'Required Part Not in Stock' },
  { id: 'e_t1_t2',      from: 'repairs_t1',  to: 'repairs_t2',          label: 'Escalate to Tier 2 Specialist' },
  { id: 'e_wp_t1',      from: 'waiting_part', to: 'repairs_t1',         label: 'Part Arrived — Resume Tier 1' },
  { id: 'e_wp_t2',      from: 'waiting_part', to: 'repairs_t2',         label: 'Part Arrived — Proceed to Tier 2' },
  { id: 'e_wp_not',     from: 'waiting_part', to: 'part_arrived_notify', label: 'System Alert on Part Arrival' },
  { id: 'e_t2_pass',    from: 'repairs_t2',  to: 'cleaning_q',          label: 'Tier 2 Repair Successful ✓' },
  { id: 'e_t2_qbo',     from: 'repairs_t2',  to: 'repair_qbo_entry',    label: 'Log Repair Cost to Unit' },
  { id: 'e_t2_wo',      from: 'repairs_t2',  to: 'write_off',           label: 'Beyond Repair — Write Off' },
  { id: 'e_t2_grv',     from: 'repairs_t2',  to: 'graveyard',           label: 'Defective — Move to Graveyard' },

  // Cleaning
  { id: 'e_cq_scan',    from: 'cleaning_q',           to: 'cleaning_scan_in',     label: 'Batch Scan Units into Cleaning' },
  { id: 'e_scan_lvl',   from: 'cleaning_scan_in',     to: 'cleaning_level_check', label: 'Check Assigned Cleaning Level' },
  { id: 'e_lvl_std',    from: 'cleaning_level_check', to: 'cleaning_standard',    label: 'Standard Level' },
  { id: 'e_lvl_deep',   from: 'cleaning_level_check', to: 'cleaning_deep',        label: 'Deep Level' },
  { id: 'e_lvl_omega',  from: 'cleaning_level_check', to: 'cleaning_omega',       label: 'Omega Level (Full Disassembly)' },
  { id: 'e_std_chk',    from: 'cleaning_standard',    to: 'cleaning_issue_check', label: 'Standard Complete — Check for Issues' },
  { id: 'e_deep_chk',   from: 'cleaning_deep',        to: 'cleaning_issue_check', label: 'Deep Complete — Check for Issues' },
  { id: 'e_omega_chk',  from: 'cleaning_omega',       to: 'cleaning_issue_check', label: 'Omega Complete — Check for Issues' },
  { id: 'e_chk_dry',    from: 'cleaning_issue_check', to: 'drying',               label: 'No Issues — Move to Drying' },
  { id: 'e_chk_esc',    from: 'cleaning_issue_check', to: 'testing_esc',          label: 'Issue Found During Cleaning — Escalate' },
  { id: 'e_dry_pq',     from: 'drying',               to: 'packaging_q',          label: 'Drying Complete — Move to Packaging Queue' },

  // Packaging
  { id: 'e_pq_oem',     from: 'packaging_q',          to: 'oem_box_check',        label: 'Begin Packaging — Check OEM Box' },
  { id: 'e_oem_yes',    from: 'oem_box_check',        to: 'accessory_checklist',  label: 'OEM Box Present — Use Original Box' },
  { id: 'e_oem_no',     from: 'oem_box_check',        to: 'bulk_box_build',       label: 'No OEM Box — Build Bulk Box' },
  { id: 'e_bulk_acc',   from: 'bulk_box_build',       to: 'accessory_checklist',  label: 'Box Built — Check Accessories' },
  { id: 'e_acc_ok',     from: 'accessory_checklist',  to: 'condition_confirm',    label: 'All Accessories Present ✓' },
  { id: 'e_acc_miss',   from: 'accessory_checklist',  to: 'accessory_missing',    label: 'Accessory Missing — BLOCKED' },
  { id: 'e_acc_found',  from: 'accessory_missing',    to: 'accessory_checklist',  label: 'Accessory Located — Re-check' },
  { id: 'e_cond_ok',    from: 'condition_confirm',    to: 'packaging_done',       label: 'Condition Confirmed ✓ — Complete Packaging' },
  { id: 'e_cond_bad',   from: 'condition_confirm',    to: 'condition_mismatch',   label: 'Grade Mismatch — Flag' },
  { id: 'e_cond_fix',   from: 'condition_mismatch',   to: 'condition_confirm',    label: 'Supervisor Reviewed — Re-confirm' },
  { id: 'e_pkg_wh',     from: 'packaging_done',       to: 'warehousing',          label: 'Packaged — Transfer to Warehouse' },

  // Warehouse setup + operations
  { id: 'e_shelf_wh',   from: 'shelf_label',          to: 'warehousing',          label: 'Shelving Labeled — Ready for Bin Assignment' },
  { id: 'e_b2b_ltl',    from: 'b2b_facility_transfer', to: 'ltl_release',         label: 'Large Transfer — LTL Release Process' },
  { id: 'e_wh_bin',     from: 'warehousing',          to: 'bin_to_bin',           label: 'Bin Transfer (SkuStack Replacement)' },
  { id: 'e_wh_whtr',    from: 'bin_to_bin',           to: 'warehouse_transfer',   label: 'Transfer to Another Facility' },

  // Sales channels
  { id: 'e_wh_fba',     from: 'warehousing',    to: 'listed_fba',      label: 'Ship to Amazon FBA' },
  { id: 'e_fba_int',    from: 'listed_fba',     to: 'interim_wh',      label: 'Shipped — Now in Interim Warehouse' },
  { id: 'e_int_fba_wh', from: 'interim_wh',     to: 'fba_wh_active',   label: 'Amazon Confirms Receipt — FBA Active' },
  { id: 'e_fba_audit',  from: 'fba_wh_active',  to: 'fba_audit',       label: 'Audit FBA Shipment vs Amazon Received' },
  { id: 'e_audit_disc', from: 'fba_audit',      to: 'fba_discrepancy', label: 'Units Missing — Open Amazon Case' },
  { id: 'e_wh_fbm',     from: 'warehousing',    to: 'listed_fbm',      label: 'List on Amazon FBM' },
  { id: 'e_wh_eby',     from: 'warehousing',    to: 'listed_ebay',     label: 'List on eBay' },
  { id: 'e_wh_gpx',     from: 'warehousing',    to: 'listed_gpuex',    label: 'List on GPU Exchange' },
  { id: 'e_wh_b2b',     from: 'warehousing',    to: 'listed_b2b',      label: 'B2B / Local Sale' },

  // Picklist + FBM shipping
  { id: 'e_fbm_pick',   from: 'listed_fbm',          to: 'picklist_gen',       label: 'Order Placed — Generate Picklist' },
  { id: 'e_pick_gen',   from: 'picklist_gen',         to: 'picklist_pick',      label: 'Employee Assigned Picklist' },
  { id: 'e_pick_lbl',   from: 'picklist_pick',        to: 'fbm_label_gen',      label: 'Units Picked — Generate Labels' },
  { id: 'e_lbl_dead',   from: 'fbm_label_gen',        to: 'fbm_ship_deadline',  label: 'Check Ship-by Deadline' },
  { id: 'e_lbl_img',    from: 'fbm_label_gen',        to: 'order_images_upload', label: 'Upload Order Photos' },
  { id: 'e_img_bulk',   from: 'order_images_upload',  to: 'bulk_label_print',   label: 'Print Bulk Box Labels' },
  { id: 'e_img_sold',   from: 'order_images_upload',  to: 'sold',               label: 'Photos Uploaded — Order Ready' },

  // FBA + other channels → sold
  { id: 'e_fba_sld',    from: 'fba_wh_active',  to: 'sold',  label: 'Amazon Customer Order Placed' },
  { id: 'e_eby_sld',    from: 'listed_ebay',    to: 'sold',  label: 'Order Placed' },
  { id: 'e_gpx_sld',    from: 'listed_gpuex',   to: 'sold',  label: 'Order Placed via GPU Exchange' },
  { id: 'e_b2b_sld',    from: 'listed_b2b',     to: 'sold',  label: 'B2B / Local Sale Confirmed' },

  // Order → delivery
  { id: 'e_sld_trn',    from: 'sold',           to: 'in_transit_out',  label: 'Ship to Customer' },
  { id: 'e_trn_del',    from: 'in_transit_out', to: 'delivered',       label: 'Carrier Confirms Delivery' },
  { id: 'e_del_win',    from: 'delivered',      to: 'done_sold',       label: '✓ Successful Delivery — Complete!' },
  { id: 'e_del_ret',    from: 'delivered',      to: 'return_transit',  label: 'Customer Initiates Return' },

  // Returns flow
  { id: 'e_ret_rcv',    from: 'return_transit',  to: 'return_received',   label: 'Return Package Arrives at Warehouse' },
  { id: 'e_rcv_thrd',   from: 'return_received', to: 'fbm_slack_thread',  label: 'Create FBM Slack Thread' },
  { id: 'e_rcv_s1',     from: 'return_received', to: 'ret_step1',         label: 'Begin Guided Inspection' },

  // Returns inspection steps
  { id: 'e_s1_s2',      from: 'ret_step1',       to: 'ret_step2',          label: 'Serial Matched ✓ — Check Tamper Seal' },
  { id: 'e_s1_mism',    from: 'ret_step1',       to: 'ret_serial_mismatch', label: 'Serial MISMATCH — Critical Flag' },
  { id: 'e_mism_cas',   from: 'ret_serial_mismatch', to: 'amazon_case',    label: 'Open Amazon Fraud Case' },
  { id: 'e_s2_s3',      from: 'ret_step2',       to: 'ret_step3',          label: 'Seal Checked — Physical Inspection' },
  { id: 'e_s3_s4',      from: 'ret_step3',       to: 'ret_step4',          label: 'Photos Uploaded — Functional Test' },
  { id: 'e_s4_s5',      from: 'ret_step4',       to: 'ret_step5_fraud',    label: 'Test Done — Fraud Assessment' },
  { id: 'e_s5_s6',      from: 'ret_step5_fraud', to: 'ret_step6',          label: 'Score Calculated — Classify Return' },

  // Returns classification outcomes
  { id: 'e_cls_rst',    from: 'ret_step6', to: 'restock',              label: 'Ours — Functioning → Restock' },
  { id: 'e_cls_def',    from: 'ret_step6', to: 'ret_ours_defective',   label: 'Ours — Defective → Repairs' },
  { id: 'e_cls_sus',    from: 'ret_step6', to: 'amazon_case',          label: 'Not Ours — Same SKU (Suspicious)' },
  { id: 'e_cls_frd',    from: 'ret_step6', to: 'fraud_hold',           label: 'Not Ours — Different SKU (Fraud!)' },
  { id: 'e_cls_dif',    from: 'ret_step6', to: 'ret_not_ours_diff',    label: 'Different SKU — Escalate Immediately' },
  { id: 'e_cls_rts',    from: 'ret_step6', to: 'ret_returned_to_sender', label: 'Returned to Sender / Lost' },
  { id: 'e_rts_safe',   from: 'ret_returned_to_sender', to: 'safe_t_claim', label: 'File Safe-T Claim' },

  // Returns outcomes
  { id: 'e_rst_don',    from: 'restock',            to: 'done_restock',      label: 'Back in Active Inventory' },
  { id: 'e_rst_int',    from: 'restock',            to: 'ret_interim_return', label: 'FBA Return → Interim Return Wh.' },
  { id: 'e_int_plc',    from: 'ret_interim_return', to: 'warehousing',       label: 'Received at AmazinXpress → Placentia' },
  { id: 'e_def_rep',    from: 'ret_ours_defective', to: 'repairs_t1',        label: 'Route to Tier 1 Repairs' },
  { id: 'e_frd_cas',    from: 'fraud_hold',         to: 'amazon_case',       label: 'Open Amazon Fraud Case' },
  { id: 'e_dif_cas',    from: 'ret_not_ours_diff',  to: 'amazon_case',       label: 'Open Amazon Case — Swap Fraud' },
  { id: 'e_cas_won',    from: 'amazon_case',        to: 'case_won',          label: 'Amazon Rules in Our Favor' },
  { id: 'e_cas_los',    from: 'amazon_case',        to: 'write_off',         label: 'Case Lost — Write Off Unit' },
  { id: 'e_won_rei',    from: 'case_won',           to: 'done_reimbursement', label: 'Reimbursement Processed' },

  // Continuations for previously dead-end nodes — unit / cycle keeps flowing
  { id: 'e_zap_sub',    from: 'zapier_meeting',         to: 'customer_sub',         label: 'Meeting Held — Customer Submits Unit' },
  { id: 'e_ser_tq',     from: 'serial_gen',             to: 'testing_q',            label: 'Label Applied — Enter Testing Queue' },
  { id: 'e_fbanot_ret', from: 'fba_notify',             to: 'return_received',      label: 'Staff Retrieves — Begin Inspection' },
  { id: 'e_vda_tr',     from: 'vendor_deadline_alert',  to: 'in_transit_vendor',    label: 'Ship to Vendor Before Deadline' },
  { id: 'e_tnot_rep',   from: 'testing_notify',         to: 'repairs_t1',           label: 'Floor Mgr Routes to Tier 1 Repair' },
  { id: 'e_pnot_rt2',   from: 'part_arrived_notify',    to: 'repairs_t2',           label: 'Resume Tier 2 Repair with Part' },
  { id: 'e_rqbo_don',   from: 'repair_qbo_entry',       to: 'done_restock',         label: 'Repair Complete — Back in Inventory' },
  { id: 'e_wht_wh',     from: 'warehouse_transfer',     to: 'warehousing',          label: 'Assigned New Bin at Destination' },
  { id: 'e_ltl_iwh',    from: 'ltl_release',            to: 'interim_wh',           label: 'LTL Departed — In Transit' },
  { id: 'e_fdisc_case', from: 'fba_discrepancy',        to: 'amazon_case',          label: 'Open Amazon Case for Discrepancy' },
  { id: 'e_fdead_oiu',  from: 'fbm_ship_deadline',      to: 'order_images_upload',  label: 'Expedite — Proceed to Packaging' },
  { id: 'e_blp_out',    from: 'bulk_label_print',       to: 'in_transit_out',       label: 'Labels Applied — Ship Out' },
  { id: 'e_fbst_ret',   from: 'fbm_slack_thread',       to: 'ret_step1',            label: 'Begin Return Inspection' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export type NodeKind =
  | 'entry'
  | 'process'
  | 'decision'
  | 'escalation'
  | 'terminal_good'
  | 'terminal_bad'
  | 'blocked'
  | 'financial'
  | 'notification'
  | 'scan';

export interface WFNode {
  id: string;
  label: string;
  description: string;
  role: string;
  kind: NodeKind;
  x: number;
  y: number;
}

export interface WFEdge {
  id: string;
  from: string;
  to: string;
  label: string;
}

export interface HistoryEntry {
  fromNodeId: string;
  fromNodeLabel: string;
  toNodeId: string;
  action: string;
}

// ─── Visual constants ─────────────────────────────────────────────────────────

export const KIND_META: Record<
  NodeKind,
  { bg: string; border: string; color: string; tag: string }
> = {
  entry:         { bg: '#0F2A4A', border: '#3B82F6', color: '#93C5FD', tag: 'ENTRY' },
  process:       { bg: '#0D1117', border: '#374151', color: '#9CA3AF', tag: 'PROCESS' },
  decision:      { bg: '#1C1007', border: '#F59E0B', color: '#FDE68A', tag: 'DECISION' },
  escalation:    { bg: '#1A0805', border: '#EA580C', color: '#FDBA74', tag: 'ESCALATION' },
  terminal_good: { bg: '#021A0E', border: '#16A34A', color: '#86EFAC', tag: 'SUCCESS' },
  terminal_bad:  { bg: '#1A0505', border: '#DC2626', color: '#FCA5A5', tag: 'TERMINAL' },
  blocked:       { bg: '#1A0A1A', border: '#A855F7', color: '#D8B4FE', tag: 'BLOCKED' },
  financial:     { bg: '#0A1A0F', border: '#059669', color: '#6EE7B7', tag: 'FINANCE' },
  notification:  { bg: '#0F1525', border: '#6366F1', color: '#A5B4FC', tag: 'ALERT' },
  scan:          { bg: '#0A1520', border: '#0EA5E9', color: '#7DD3FC', tag: 'SCAN' },
};

// ─── Tech Comparison Page ─────────────────────────────────────────────────────

export type CompTab = 'comparison' | 'power-platform' | 'custom-code' | 'hybrid' | 'impl-plan';

export interface TechCompTab { id: CompTab; label: string; }

export const TECH_COMPARISON_TABS: TechCompTab[] = [
  { id: 'comparison',      label: 'Side-by-Side' },
  { id: 'power-platform',  label: 'Power Platform' },
  { id: 'custom-code',     label: 'Custom Code' },
  { id: 'hybrid',          label: 'Hybrid Architecture' },
  { id: 'impl-plan',       label: 'Implementation Plan' },
];

export interface CostRow { label: string; value: string; valueColor?: string; }

export const PP_COST_ROWS: CostRow[] = [
  { label: '20 employees × Power Apps license', value: '~$400/month' },
  { label: 'Dataverse storage',                 value: 'variable' },
  { label: 'Power Automate premium flows',      value: 'variable' },
  { label: 'Power BI Pro',                      value: 'additional' },
  { label: 'Upfront build cost',                value: 'lower', valueColor: '#4ADE80' },
];

export const CC_COST_ROWS: CostRow[] = [
  { label: 'Hosting',          value: 'Centera Labs Pvt Ltd Servers' },
  { label: 'Backend',          value: '$20/month' },
  { label: 'PostgreSQL',       value: '$25/month' },
  { label: 'Upstash Redis',    value: '$10/month' },
  { label: 'AWS S3',           value: '~$20/month' },
  { label: 'Upfront build cost', value: 'higher', valueColor: '#F87171' },
];

export interface RecommendedToolRow { component: string; tool: string; reason: string; }

export const RECOMMENDED_TOOL_ROWS: RecommendedToolRow[] = [
  { component: 'Team Notifications', tool: 'Microsoft Teams',                  reason: 'Everyone already lives here — no new tool to learn' },
  { component: 'File Storage',       tool: 'SharePoint / AWS S3',              reason: 'SharePoint for docs, AWS S3 for photo/asset storage' },
  { component: 'Email Triggers',     tool: 'Microsoft Outlook + Graph API',    reason: 'Parse vendor emails, Amazon cases, customer inquiries into tasks' },
  { component: 'Task/Planner',       tool: 'Microsoft Planner',                reason: 'Simple kanban boards for admin-owned task tracking' },
  { component: 'ERP Frontend',       tool: 'Next.js 15 + TypeScript',          reason: 'Required for real-time dashboards, scan workflows, responsive floor UI' },
  { component: 'ERP Backend',        tool: 'Node.js + TypeScript',             reason: 'State machine, workflow engine, integration orchestration (specific framework TBD)' },
  { component: 'Database',           tool: 'PostgreSQL',                       reason: 'Serial-number-level tracking at 1M+ scale, zero vendor lock-in' },
  { component: 'Cache & Queues',     tool: 'Redis (Upstash) + BullMQ',         reason: 'Background jobs, rate-limited API calls, session cache' },
  { component: 'Real-time',          tool: 'Pusher WebSockets',                reason: 'Live floor WIP dashboard — Power BI cannot deliver this' },
  { component: 'GPU Exchange',       tool: 'Next.js + Stripe',                 reason: 'Public-facing ecommerce — Power Apps cannot produce this' },
  { component: 'QBO Sync',           tool: 'Intuit API + NestJS',              reason: 'Same integration regardless of platform choice' },
  { component: 'Amazon/eBay',        tool: 'SP-API + eBay API',                reason: 'Webhook processing and rate limiting require code' },
  { component: 'ML/AI',              tool: 'AI & ML Services',                 reason: 'Custom model deployment required — AI Builder cannot run custom models' },
];

export interface PPArchLayer { letter: string; title: string; subtitle: string; color: string; items: string[]; }

export const PP_ARCHITECTURE_LAYERS: PPArchLayer[] = [
  { letter: 'UI',   title: 'Power Apps',      subtitle: 'Canvas & model-driven apps',              color: '#8B5CF6', items: ['Canvas Apps (floor UI)', 'Model-driven Apps (admin)', 'Power Apps Portal (external)'] },
  { letter: 'AUTO', title: 'Power Automate',  subtitle: 'Workflow & event automation',             color: '#7C3AED', items: ['Approval flows', 'Scheduled triggers', 'HTTP webhooks', 'Email parsing'] },
  { letter: 'DATA', title: 'Dataverse',       subtitle: 'Proprietary cloud data platform',         color: '#6D28D9', items: ['Tables (entities)', 'Business rules', 'Relationships', 'Proprietary format'] },
  { letter: 'BI',   title: 'Power BI',        subtitle: 'Analytics & reporting (15–30 min refresh)', color: '#5B21B6', items: ['Dashboards', 'Reports', 'Power BI Pro license', 'No real-time'] },
  { letter: 'M365', title: 'Microsoft 365',   subtitle: 'Native zero-code connectors',             color: '#22C55E', items: ['Teams', 'SharePoint', 'Outlook', 'Planner', 'Entra ID'] },
];

export interface CCStrength { title: string; desc: string; }

export const CC_STRENGTHS: CCStrength[] = [
  { title: 'True State Machine Support',    desc: 'Guarded lifecycle transitions enforced server-side — illegal state jumps are blocked at the data layer.' },
  { title: 'Real-Time Capability',          desc: 'Pusher WebSockets deliver sub-100ms live updates to the floor dashboard. No polling, no refresh intervals.' },
  { title: 'Public-Facing Ecommerce',       desc: 'Next.js renders SEO-indexed product pages for GPU Exchange — impossible in Power Apps.' },
  { title: 'No Licensing Headcount Cost',   desc: '$100–$300/month total regardless of how many employees use the system.' },
  { title: 'Full Data Ownership',           desc: 'Standard PostgreSQL — portable, exportable, hostable anywhere with no transformation required.' },
  { title: 'Unlimited Complexity Ceiling',  desc: 'Any business logic, any integration, any UI — constrained only by developer time, not platform capabilities.' },
];

export interface CCTradeoff { title: string; detail: string; }

export const CC_TRADEOFFS: CCTradeoff[] = [
  { title: 'Requires developer for every change', detail: 'Unlike Power Platform, non-technical admins cannot modify workflows or forms without developer involvement. Admin-configurable UI must be explicitly designed and built.' },
  { title: 'Higher upfront build time',           detail: 'Power Platform can produce simple forms in hours. Custom code requires architecture, scaffolding, and careful design before features ship.' },
  { title: 'No built-in M365 connectors',         detail: 'M365 integration requires writing Graph API code. Power Platform has zero-code connectors for Teams, Outlook, and SharePoint.' },
  { title: 'Requires ongoing maintenance',        detail: "Dependencies, security patches, and infrastructure management are the team's responsibility — not a managed platform vendor." },
];

export interface HybridLayer {
  letter: string; title: string; subtitle: string; color: string;
  items: string[]; rationale: string; connector: boolean; connectorLabel: string;
}

export const HYBRID_LAYERS: HybridLayer[] = [
  {
    letter: 'A', title: 'Microsoft 365', subtitle: 'Used natively — no custom build required', color: '#3B82F6',
    items: ['Teams', 'SharePoint', 'Outlook', 'Planner', 'Entra ID (SSO)'],
    rationale: 'Everyone already uses M365. No new licenses, no new build. Used as-is for collaboration and communication.',
    connector: true, connectorLabel: 'Power Automate connects M365 → ERP (zero code)',
  },
  {
    letter: 'B', title: 'Power Automate — bridge layer', subtitle: 'Zero-code connector between M365 and the ERP', color: '#8B5CF6',
    items: ['Teams notification flows', 'SharePoint file triggers', 'Outlook email parsing', 'Approval chain flows', 'Planner task creation'],
    rationale: 'This is what makes it Hybrid. Power Automate replaces Graph API code for M365 connections only — no developer needed for these flows.',
    connector: true, connectorLabel: 'Triggers and data flow into Node.js backend via webhooks',
  },
  {
    letter: 'C', title: 'Custom Code — ERP core', subtitle: 'Full technical control — same stack as pure custom code', color: '#10B981',
    items: ['Next.js (ERP frontend)', 'Node.js backend', 'State machine engine', 'PostgreSQL (database)', 'Redis (cache)', 'Pusher WebSockets', 'Next.js (GPU Exchange)'],
    rationale: 'Everything Power Platform cannot do lives here: real-time dashboards, serial-number state machines, scan workflows, public GPU Exchange storefront.',
    connector: true, connectorLabel: 'Direct API calls to external services — same as pure custom code',
  },
  {
    letter: 'D', title: 'External Integrations', subtitle: 'Identical to pure custom code — no platform difference', color: '#F59E0B',
    items: ['QBO (accounting)', 'Amazon SP-API', 'eBay API', 'EasyPost (shipping)', 'Stripe (payments)', 'AWS S3', 'AI/ML Services'],
    rationale: 'These are integrated identically regardless of platform choice. Power Platform would use the same HTTP calls with more constraints.',
    connector: false, connectorLabel: '',
  },
];

export interface DecisionSummaryRow { concern: string; decision: string; why: string; }

export const DECISION_SUMMARY_ROWS: DecisionSummaryRow[] = [
  { concern: 'M365 collaboration',   decision: 'Keep natively',              why: 'No licensing change, Graph API handles integration' },
  { concern: 'ERP core',             decision: 'Custom code',                why: 'State machine, real-time, and scan workflows require it' },
  { concern: 'GPU Exchange',         decision: 'Custom code',                why: 'Public-facing ecommerce is impossible in Power Apps' },
  { concern: 'Admin workflows',      decision: 'Custom code + admin UI',     why: 'Admin-configurable screens built explicitly into the ERP' },
  { concern: 'Reporting/analytics',  decision: 'Custom dashboards',          why: 'Real-time data — Power BI refresh intervals are incompatible' },
  { concern: 'Simple automations',   decision: 'Power Automate (selective)', why: 'Approval chains and SharePoint triggers are fine in Power Automate' },
  { concern: 'External APIs',        decision: 'Direct integration',         why: 'Same approach regardless of platform — no middleware needed' },
  { concern: 'AI/ML (Phase 2)',      decision: 'Custom code',                why: 'Any provider, any model — AI Builder cannot run custom models' },
];

export interface HybridDiffRow { aspect: string; customCode: string; hybrid: string; }

export const HYBRID_DIFF_ROWS: HybridDiffRow[] = [
  { aspect: 'M365 integration method', customCode: 'Graph API written in Node.js — 1–2 sprints of dev work',  hybrid: 'Power Automate zero-code connectors — no code written at all' },
  { aspect: 'Teams notifications',     customCode: 'Graph API call from Node.js backend',                     hybrid: 'Power Automate flow — connector, no developer needed' },
  { aspect: 'SharePoint file sync',    customCode: 'Graph API code in Node.js',                               hybrid: 'Power Automate trigger — no developer needed' },
  { aspect: 'Outlook email parsing',   customCode: 'Graph API code in Node.js',                               hybrid: 'Power Automate flow — no developer needed' },
  { aspect: 'Approval chains',         customCode: 'Built in Node.js/BullMQ — developer required',            hybrid: 'Power Automate — non-developer can create and modify' },
  { aspect: 'Planner task creation',   customCode: 'Graph API code',                                          hybrid: 'Power Automate connector — no code' },
  { aspect: 'Non-developer changes',   customCode: 'All M365 flows require a developer',                      hybrid: 'Power Automate flows editable by non-developers' },
  { aspect: 'Deployment surfaces',     customCode: 'One — Centera Labs servers',                              hybrid: 'Two — above + Microsoft tenant (Power Automate)' },
  { aspect: 'Maintenance ownership',   customCode: 'Team owns 100% — every dependency',                       hybrid: 'Split — Microsoft owns PA runtime, team owns custom stack' },
];

export interface HybridSameRow { area: string; both: string; }

export const HYBRID_SAME_ROWS: HybridSameRow[] = [
  { area: 'ERP Frontend',  both: 'Next.js — identical codebase, identical deployment' },
  { area: 'Backend',       both: 'Node.js + state machine engine + BullMQ job queues' },
  { area: 'Database',      both: 'PostgreSQL — same schema, same migrations' },
  { area: 'Cache',         both: 'Redis (Upstash)' },
  { area: 'Real-time',     both: 'Pusher WebSockets — live floor dashboard' },
  { area: 'GPU Exchange',  both: 'Next.js storefront + Stripe checkout' },
  { area: 'External APIs', both: 'QBO, Amazon SP-API, eBay API, EasyPost, AWS S3 — direct Node.js integration' },
  { area: 'Analytics',     both: 'Custom real-time dashboards — not Power BI' },
  { area: 'Testing',       both: 'TypeScript + Jest + Playwright' },
  { area: 'Hosting',       both: 'Centera Labs Pvt Ltd Servers' },
];

export interface ImplPhaseRow { phase: string; pp: string; cc: string; hy: string; }

export const IMPL_PLAN_ROWS: ImplPhaseRow[] = [
  {
    phase: '1. Environment Setup',
    pp: 'Provision Power Platform tenant, configure Dataverse schema via UI, assign per-seat licenses (~$400/mo for 20 users from day one)',
    cc: 'Scaffold Next.js + Node.js monorepo, provision and configure CI/CD pipeline',
    hy: 'Use existing M365 tenant (already provisioned) + scaffold custom code stack. Two environments but minimal overlap — M365 stays native, ERP built fresh',
  },
  {
    phase: '2. Data Model',
    pp: 'Define Dataverse entities and relationships via UI wizard — proprietary format, no SQL migrations, limited portability',
    cc: 'Write PostgreSQL migrations with serial-number-level schema — version-controlled, portable, standard SQL',
    hy: 'PostgreSQL for all ERP and GPU Exchange data. Dataverse not used — avoids proprietary lock-in while retaining M365 connection via Graph API',
  },
  {
    phase: '3. Core UI',
    pp: 'Canvas Apps for floor workers, model-driven apps for admin — limited responsive control, no public-facing output',
    cc: 'Next.js pages with full responsive layouts, custom scan-optimized floor UI, public GPU Exchange storefront',
    hy: 'Next.js for all UI (ERP + GPU Exchange). No Canvas Apps — custom code handles every screen with full control',
  },
  {
    phase: '4. Workflow Automation',
    pp: 'Power Automate flows for approvals and status triggers — 5,000 API call limit per flow/day on standard plan',
    cc: 'BullMQ job queues, server-side state machine with guarded transitions, webhook event bus — no API call limits',
    hy: 'Power Automate for M365-connected flows only (SharePoint triggers, Teams notifications). BullMQ handles all ERP job queues and state transitions',
  },
  {
    phase: '5. Real-Time Features',
    pp: 'Not feasible — Power BI refreshes every 15–30 min, Canvas Apps have no WebSocket support',
    cc: 'Pusher WebSockets deliver sub-100ms live updates to floor dashboard — fully real-time',
    hy: 'Pusher WebSockets via custom code backend — same as pure custom. Power Platform has no role here',
  },
  {
    phase: '6. M365 Integration',
    pp: 'Zero-code connectors for Teams, Outlook, SharePoint, Planner — genuine platform advantage, no API code needed',
    cc: 'Microsoft Graph API calls from Node.js backend — same features, requires 1–2 sprints of development',
    hy: 'Power Automate zero-code connectors for Teams alerts, Outlook parsing, SharePoint file sync, Planner tasks — no Graph API code written for these flows',
  },
  {
    phase: '7. External APIs',
    pp: 'Custom HTTP connectors for QBO, Amazon SP-API, eBay — same complexity as writing code, but inside Power Automate constraints',
    cc: 'Direct API integration via Node.js — Intuit SDK, SP-API, eBay API, EasyPost, Stripe — full control over retry logic and error handling',
    hy: 'All external APIs (QBO, SP-API, eBay, Stripe, EasyPost) integrated directly from Node.js backend — same as pure custom code',
  },
  {
    phase: '8. GPU Exchange',
    pp: 'Not possible — Power Apps cannot produce public-facing, SEO-indexed ecommerce pages',
    cc: 'Next.js storefront with server-side rendering, Stripe checkout, SEO-indexed product pages',
    hy: 'Next.js GPU Exchange storefront — identical to pure custom code. Power Platform is not involved',
  },
  {
    phase: '9. Analytics',
    pp: 'Power BI reports (15–30 min refresh) — no live data, no real-time WIP visibility',
    cc: 'Custom server-side aggregations in real-time dashboards — live WIP counts, throughput, scan activity',
    hy: 'Custom real-time dashboards for ERP. Power BI optionally used for exec-level reports where refresh delay is acceptable — strictly additive',
  },
  {
    phase: '10. Testing',
    pp: 'Manual click-through testing in Power Apps Studio — limited automated testing tooling for Canvas Apps',
    cc: 'TypeScript compile-time checks, Jest unit tests, Playwright E2E — full CI/CD coverage on every PR',
    hy: 'Full test suite for custom code (TypeScript + Jest + Playwright). Power Automate flows tested manually — same limitation as pure Power Platform for those flows',
  },
  {
    phase: '11. Deployment',
    pp: 'Managed by Microsoft — published via Power Platform admin center, tenant-scoped',
    cc: 'Centera Labs Pvt Ltd Servers — team-owned, reproducible, infra-as-code',
    hy: 'Custom code on Centera Labs Pvt Ltd Servers. Power Automate flows deployed via Microsoft tenant — two separate deployment surfaces',
  },
  {
    phase: '12. Maintenance',
    pp: 'Microsoft manages platform updates — customizations risk breaking on Power Platform version changes',
    cc: 'Team owns dependency upgrades, security patches, infra scaling — full control, full responsibility',
    hy: 'Split ownership: Microsoft manages Power Automate runtime; team manages custom code stack. Power Automate surface is small and low-risk',
  },
  {
    phase: '13. Timeline Estimate',
    pp: 'Faster initial MVP for simple forms and M365 workflows (weeks). Ceiling hit at complex state machines, real-time, and public ecommerce',
    cc: 'Longer initial ramp for full scaffold (months). No feature ceiling — every requirement is achievable within the stack',
    hy: 'M365 integration faster than pure custom code (Power Automate connectors). ERP and GPU Exchange timeline same as pure custom. Net: slightly faster overall on M365-adjacent tasks',
  },
];