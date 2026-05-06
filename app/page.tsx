// @ts-nocheck
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  GitMerge,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Package,
  BarChart2,
  Shield,
  ExternalLink,
  XCircle,
  Info,
  Zap,
  GitBranch,
  ShieldCheck,
  RefreshCw,
  Smartphone,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Header } from "@/components/header";
import { TabNavigation } from "@/components/tab-navigation";
import { StatCardComponent } from "@/components/stat-card";
import { ModuleCard } from "@/components/module-card";
import { StatusBadge } from "@/components/status-badge";
import { PriorityBadge } from "@/components/priority-badge";
import { SearchInput } from "@/components/search-input";
import {
  PROJECT_META,
  STATS,
  MODULES_DATA,
  FEATURES_DATA,
  INTEGRATIONS_DATA,
  CURRENT_SYSTEMS_REPLACED,
  SYSTEMS_KEPT,
  BUILD_PHASES,
  CREDENTIALS_DATA,
  KEY_DEVELOPMENT_POINTS,
  type SystemReplacement,
  type SystemKept,
} from "@/lib/data";

type DashTab =
  | "overview"
  | "modules"
  | "features"
  | "integrations"
  | "credentials";
type PhaseFilter = "all" | "1" | "2";

const VALID_TABS: DashTab[] = [
  "overview",
  "modules",
  "features",
  "integrations",
  "credentials",
];

const INTEGRATION_CATEGORY_COLORS: Record<string, string> = {
  Accounting: "#10B981",
  Marketplace: "#F59E0B",
  Shipping: "#06B6D4",
  "Microsoft 365": "#22C55E",
  Payments: "#8B5CF6",
  "AI/ML": "#F97316",
  "Real-time": "#EF4444",
  Legacy: "#5A5A70",
};

const API_AVAILABILITY_STYLE = {
  yes: {
    label: "API: Yes",
    bg: "rgba(34,197,94,0.1)",
    text: "#4ADE80",
    border: "rgba(34,197,94,0.25)",
  },
  no: {
    label: "API: No",
    bg: "rgba(239,68,68,0.1)",
    text: "#F87171",
    border: "rgba(239,68,68,0.25)",
  },
  partial: {
    label: "API: Partial",
    bg: "rgba(245,158,11,0.1)",
    text: "#FCD34D",
    border: "rgba(245,158,11,0.25)",
  },
};

const STACK_SOURCE_CONFIG = {
  "client-required": {
    label: "Client Required",
    bg: "rgba(245,158,11,0.1)",
    text: "#FCD34D",
  },
  recommended: {
    label: "Dev Recommended",
    bg: "rgba(34,197,94,0.1)",
    text: "#4ADE80",
  },
  both: { label: "Agreed", bg: "rgba(16,185,129,0.1)", text: "#34D399" },
};

const KD_COLOR: Record<
  string,
  { accent: string; bg: string; border: string; tag: string }
> = {
  primary: {
    accent: "#22C55E",
    bg: "rgba(34,197,94,0.05)",
    border: "rgba(34,197,94,0.18)",
    tag: "rgba(34,197,94,0.1)",
  },
  success: {
    accent: "#10B981",
    bg: "rgba(16,185,129,0.05)",
    border: "rgba(16,185,129,0.18)",
    tag: "rgba(16,185,129,0.1)",
  },
  danger: {
    accent: "#EF4444",
    bg: "rgba(239,68,68,0.05)",
    border: "rgba(239,68,68,0.18)",
    tag: "rgba(239,68,68,0.1)",
  },
  warning: {
    accent: "#F59E0B",
    bg: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.18)",
    tag: "rgba(245,158,11,0.1)",
  },
  info: {
    accent: "#06B6D4",
    bg: "rgba(6,182,212,0.05)",
    border: "rgba(6,182,212,0.18)",
    tag: "rgba(6,182,212,0.1)",
  },
  purple: {
    accent: "#8B5CF6",
    bg: "rgba(139,92,246,0.05)",
    border: "rgba(139,92,246,0.18)",
    tag: "rgba(139,92,246,0.1)",
  },
};

const KD_ICON: Record<string, React.ElementType> = {
  GitBranch,
  ShieldCheck,
  Layers,
  RefreshCw,
  Smartphone,
  DollarSign,
  AlertTriangle,
  Zap,
};

/* ── Key Development Point Card ── */
function KDCard({ kd }: { kd: (typeof KEY_DEVELOPMENT_POINTS)[0] }) {
  const c = KD_COLOR[kd.color] ?? KD_COLOR.primary;
  const Icon = KD_ICON[kd.icon] ?? Zap;
  const phaseColor = kd.phase === 1 ? "#F59E0B" : "#8B5CF6";
  return (
    <div
      style={{
        backgroundColor: "#111118",
        border: `1px solid #2A2A35`,
        borderTop: `3px solid ${c.accent}`,
        borderRadius: 12,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              backgroundColor: c.tag,
              border: `1px solid ${c.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={14} color={c.accent} />
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#E0E0E8",
              lineHeight: 1.35,
            }}
          >
            {kd.title}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: c.accent,
              backgroundColor: c.tag,
              padding: "2px 8px",
              borderRadius: 9999,
              border: `1px solid ${c.border}`,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
            }}
          >
            {kd.tag}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: phaseColor,
              backgroundColor: `${phaseColor}15`,
              padding: "2px 7px",
              borderRadius: 9999,
              border: `1px solid ${phaseColor}25`,
            }}
          >
            P{kd.phase}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: 12.5,
          color: "#9090A8",
          lineHeight: 1.65,
        }}
      >
        {kd.description}
      </p>

      {/* Why it matters */}
      <div
        style={{
          padding: "9px 12px",
          backgroundColor: `${c.accent}08`,
          border: `1px solid ${c.border}`,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: c.accent,
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          Why it matters
        </div>
        <p
          style={{ margin: 0, fontSize: 12, color: "#7A7A90", lineHeight: 1.6 }}
        >
          {kd.why_it_matters}
        </p>
      </div>

      {/* Linked modules */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexWrap: "wrap",
          marginTop: "auto" as const,
          paddingTop: 4,
          borderTop: "1px solid #1A1A22",
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: "#4A4A5A",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.06em",
          }}
        >
          Modules:
        </span>
        {kd.linked_modules.map((id) => (
          <span
            key={id}
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#6A6A80",
              backgroundColor: "#1A1A24",
              border: "1px solid #2A2A35",
              padding: "1px 7px",
              borderRadius: 4,
              fontFamily: "var(--font-mono)",
            }}
          >
            M{id}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Replaced System Card ── */
function ReplacedCard({ sys }: { sys: SystemReplacement }) {
  return (
    <div
      style={{
        backgroundColor: "#111118",
        border: "1px solid #2A2A35",
        borderTop: "3px solid rgba(239,68,68,0.5)",
        borderRadius: 12,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#E0E0E8",
              marginBottom: 4,
            }}
          >
            {sys.oldSystem}
          </div>
          <span
            style={{
              fontSize: 10,
              color: "#5A5A70",
              backgroundColor: "#0D0D13",
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid #2A2A35",
            }}
          >
            {sys.category}
          </span>
        </div>
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: "#F87171",
            backgroundColor: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            padding: "2px 9px",
            borderRadius: 9999,
            flexShrink: 0,
          }}
        >
          Replaced
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: 12.5,
          color: "#9090A8",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {sys.oldDescription}
      </p>

      {/* Replacement */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 7,
          padding: "9px 12px",
          backgroundColor: "rgba(245,158,11,0.05)",
          border: "1px solid rgba(245,158,11,0.15)",
          borderRadius: 8,
          marginTop: "auto" as const,
        }}
      >
        <ArrowRight
          size={13}
          color="#F59E0B"
          style={{ flexShrink: 0, marginTop: 1 }}
        />
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#F59E0B",
              textTransform: "uppercase" as const,
              letterSpacing: "0.07em",
              marginBottom: 2,
            }}
          >
            Replaced by
          </div>
          <span
            style={{
              fontSize: 12.5,
              color: "#FCD34D",
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {sys.replacement}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Kept System Card ── */
function KeptCard({ sys }: { sys: SystemKept }) {
  const isNew = sys.integrationType === "new";
  return (
    <div
      style={{
        backgroundColor: "#111118",
        border: "1px solid #2A2A35",
        borderTop: `3px solid ${isNew ? "rgba(139,92,246,0.5)" : "rgba(34,197,94,0.5)"}`,
        borderRadius: 12,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#E0E0E8",
              marginBottom: 4,
            }}
          >
            {sys.name}
          </div>
          <span
            style={{
              fontSize: 10,
              color: "#5A5A70",
              backgroundColor: "#0D0D13",
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid #2A2A35",
            }}
          >
            {sys.category}
          </span>
        </div>
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            padding: "2px 9px",
            borderRadius: 9999,
            border: "1px solid",
            flexShrink: 0,
            ...(isNew
              ? {
                  color: "#C4B5FD",
                  backgroundColor: "rgba(139,92,246,0.08)",
                  borderColor: "rgba(139,92,246,0.25)",
                }
              : {
                  color: "#34D399",
                  backgroundColor: "rgba(16,185,129,0.08)",
                  borderColor: "rgba(16,185,130,0.25)",
                }),
          }}
        >
          {isNew ? "New Addition" : "Integrated"}
        </span>
      </div>

      {/* Description */}
      <p
        style={{ margin: 0, fontSize: 12.5, color: "#9090A8", lineHeight: 1.6 }}
      >
        {sys.description}
      </p>

      {/* Role */}
      <div
        style={{
          padding: "9px 12px",
          backgroundColor: isNew
            ? "rgba(139,92,246,0.05)"
            : "rgba(34,197,94,0.04)",
          border: `1px solid ${isNew ? "rgba(139,92,246,0.15)" : "rgba(34,197,94,0.12)"}`,
          borderRadius: 8,
          marginTop: "auto" as const,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: isNew ? "#A78BFA" : "#22C55E",
            textTransform: "uppercase" as const,
            letterSpacing: "0.07em",
            marginBottom: 3,
          }}
        >
          Role
        </div>
        <p
          style={{ margin: 0, fontSize: 12, color: "#7A7A90", lineHeight: 1.6 }}
        >
          {sys.role}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardInner />
    </Suspense>
  );
}

function DashboardInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<DashTab>("overview");
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>("all");
  const [featureSearch, setFeatureSearch] = useState("");
  const [featureModule, setFeatureModule] = useState<number | "all">("all");

  const tabParam = searchParams.get("tab");
  useEffect(() => {
    if (tabParam && VALID_TABS.includes(tabParam as DashTab)) {
      setActiveTab(tabParam as DashTab);
    }
  }, [tabParam]);

  // Scroll to a specific item when navigating via global search hash
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace(/^#/, '');

    const tabMatches =
      (activeTab === 'modules' && id.startsWith('module-')) ||
      (activeTab === 'features' && id.startsWith('feature-')) ||
      (activeTab === 'integrations' && id.startsWith('integration-'));
    if (!tabMatches) return;

    if (id.startsWith('feature-')) {
      setFeatureSearch('');
      setFeatureModule('all');
    }

    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const stickyOffset = 56 + 48 + 16; // topbar + tabs + breathing room
        const top = el.getBoundingClientRect().top + window.scrollY - stickyOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const phaseBadge = (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "2px 9px",
        borderRadius: 9999,
        backgroundColor: "rgba(90,90,112,0.15)",
        color: "#9090A8",
        border: "1px solid #2A2A35",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      Planning Phase
    </span>
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart2 size={14} /> },
    {
      id: "modules",
      label: "Modules",
      icon: <Layers size={14} />,
      count: MODULES_DATA.length,
    },
    {
      id: "features",
      label: "Features",
      icon: <Package size={14} />,
      count: FEATURES_DATA.length,
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: <GitMerge size={14} />,
      count: INTEGRATIONS_DATA.length,
    },
    { id: "credentials", label: "Credentials", icon: <Shield size={14} /> },
  ];

  const filteredModules = MODULES_DATA.filter(
    (m) => phaseFilter === "all" || m.phase === parseInt(phaseFilter),
  );

  const filteredFeatures = FEATURES_DATA.filter((f) => {
    const matchSearch =
      !featureSearch ||
      f.name.toLowerCase().includes(featureSearch.toLowerCase()) ||
      f.moduleName.toLowerCase().includes(featureSearch.toLowerCase());
    const matchModule = featureModule === "all" || f.moduleId === featureModule;
    return matchSearch && matchModule;
  });

  const groupedIntegrations = INTEGRATIONS_DATA.reduce<
    Record<string, typeof INTEGRATIONS_DATA>
  >((acc, int) => {
    if (!acc[int.category]) acc[int.category] = [];
    acc[int.category].push(int);
    return acc;
  }, {});

  return (
    <AppShell>
      <Header
        title={PROJECT_META.name}
        description={PROJECT_META.tagline}
        badge={phaseBadge}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 20px",
        }}
      >
        <div
          className="sticky-under-topbar"
          style={{
            backgroundColor: "#0A0A0F",
            paddingTop: 4,
            marginLeft: -20,
            marginRight: -20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <TabNavigation
            tabs={tabs as Parameters<typeof TabNavigation>[0]["tabs"]}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as DashTab)}
          />
        </div>

        <div style={{ padding: "24px 0 48px" }}>
          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "flex", flexDirection: "column", gap: 32 }}
            >
              {/* Hero */}
              <div
                style={{
                  borderRadius: 14,
                  backgroundColor: "#111118",
                  border: "1px solid #2A2A35",
                  padding: "28px 32px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background:
                      "linear-gradient(90deg, #22C55E, #06B6D4, #8B5CF6)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "radial-gradient(circle, rgba(42,42,53,0.5) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    gap: 28,
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: "1 1 340px", minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#22C55E",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 10,
                      }}
                    >
                      Internal Platform Docs · Planning Phase
                    </div>
                    <h2
                      style={{
                        margin: "0 0 10px",
                        fontSize: 22,
                        fontWeight: 700,
                        color: "#F0F0F5",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                      }}
                    >
                      AmazinXpress ERP &amp; GPU Exchange
                    </h2>
                    <p
                      style={{
                        margin: "0 0 18px",
                        fontSize: 13.5,
                        color: "#9090A8",
                        lineHeight: 1.7,
                      }}
                    >
                      {PROJECT_META.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <span
                        style={{
                          fontSize: 11.5,
                          color: "#9090A8",
                          backgroundColor: "rgba(255,255,255,0.04)",
                          padding: "5px 12px",
                          borderRadius: 6,
                          border: "1px solid #2A2A35",
                        }}
                      >
                        Client:{" "}
                        <strong style={{ color: "#F0F0F5" }}>
                          {PROJECT_META.client}
                        </strong>
                      </span>
                      <span
                        style={{
                          fontSize: 11.5,
                          color: "#9090A8",
                          backgroundColor: "rgba(255,255,255,0.04)",
                          padding: "5px 12px",
                          borderRadius: 6,
                          border: "1px solid #2A2A35",
                        }}
                      >
                        Developer:{" "}
                        <strong style={{ color: "#F0F0F5" }}>
                          {PROJECT_META.developer}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div>
                <h3
                  style={{
                    margin: "0 0 14px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#5A5A70",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Key Metrics
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  {STATS.map((stat, i) => (
                    <StatCardComponent
                      key={i}
                      stat={stat}
                      index={i}
                      highlighted={stat.label === "Phase 1 Modules"}
                    />
                  ))}
                </div>
              </div>

              {/* ── KEY DEVELOPMENT POINTS — CARDS ── */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <Zap size={14} color="#F59E0B" />
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#F0F0F5",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Key Development Points
                  </h3>
                  <span style={{ fontSize: 11, color: "#5A5A70" }}>
                    {KEY_DEVELOPMENT_POINTS.length} points
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 14,
                  }}
                >
                  {KEY_DEVELOPMENT_POINTS.map((kd) => (
                    <KDCard key={kd.id} kd={kd} />
                  ))}
                </div>
              </div>

              {/* ── APPLICATIONS OVERVIEW ── */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#5A5A70",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Applications Overview
                  </h3>
                  <span
                    style={{
                      fontSize: 10.5,
                      color: "#5A5A70",
                      backgroundColor: "#1A1A24",
                      padding: "1px 8px",
                      borderRadius: 10,
                      border: "1px solid #2A2A35",
                    }}
                  >
                    {CURRENT_SYSTEMS_REPLACED.length + SYSTEMS_KEPT.length}{" "}
                    total
                  </span>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {/* Being Replaced */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        marginBottom: 12,
                      }}
                    >
                      <XCircle size={13} color="#EF4444" />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#F87171",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Being Replaced
                      </span>
                      <span style={{ fontSize: 10.5, color: "#5A5A70" }}>
                        {CURRENT_SYSTEMS_REPLACED.length} apps
                      </span>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: 12,
                      }}
                    >
                      {CURRENT_SYSTEMS_REPLACED.map((sys, i) => (
                        <ReplacedCard key={i} sys={sys} />
                      ))}
                    </div>
                  </div>

                  {/* Being Kept */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        marginBottom: 12,
                      }}
                    >
                      <CheckCircle2 size={13} color="#22C55E" />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#4ADE80",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Being Kept &amp; Integrated
                      </span>
                      <span style={{ fontSize: 10.5, color: "#5A5A70" }}>
                        {SYSTEMS_KEPT.length} apps
                      </span>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: 12,
                      }}
                    >
                      {SYSTEMS_KEPT.map((sys, i) => (
                        <KeptCard key={i} sys={sys} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Build phases */}
              <div>
                <h3
                  style={{
                    margin: "0 0 14px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#5A5A70",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Build Phases
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {BUILD_PHASES.map((phase) => (
                    <div
                      key={phase.phase}
                      style={{
                        backgroundColor: "#111118",
                        border: `1px solid ${phase.color}22`,
                        borderRadius: 14,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          backgroundColor: phase.color,
                        }}
                      />
                      <div
                        style={{
                          padding: "22px 28px",
                          display: "flex",
                          gap: 32,
                          flexWrap: "wrap",
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ flexShrink: 0, minWidth: 200 }}>
                          <div
                            style={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: phase.color,
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              marginBottom: 6,
                            }}
                          >
                            Phase {phase.phase}
                          </div>
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 700,
                              color: "#F0F0F5",
                              marginBottom: 16,
                              letterSpacing: "-0.01em",
                              lineHeight: 1.25,
                            }}
                          >
                            {(phase.name || phase.label || "").replace(/^Phase \d+ — /, "")}
                          </div>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "baseline",
                              gap: 5,
                              backgroundColor: `${phase.color}12`,
                              border: `1px solid ${phase.color}22`,
                              borderRadius: 8,
                              padding: "9px 16px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 30,
                                fontWeight: 800,
                                color: phase.color,
                                lineHeight: 1,
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "-0.03em",
                              }}
                            >
                              {MODULES_DATA.filter(m => m.phase === phase.phase).length}                            
                            </span>
                            <span
                              style={{
                                fontSize: 12,
                                color: "#6A6A80",
                                fontWeight: 500,
                              }}
                            >
                              modules
                            </span>
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 220 }}>
                          <div
                            style={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: "#5A5A70",
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              marginBottom: 12,
                            }}
                          >
                            Key Deliverables
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fill, minmax(210px, 1fr))",
                              gap: "8px 20px",
                            }}
                          >
                            {phase.highlights.map((h, hi) => (
                              <div
                                key={hi}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: 9,
                                }}
                              >
                                <div
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    backgroundColor: `${phase.color}15`,
                                    border: `1px solid ${phase.color}28`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    marginTop: 1,
                                  }}
                                >
                                  <CheckCircle2 size={10} color={phase.color} />
                                </div>
                                <span
                                  style={{
                                    fontSize: 12.5,
                                    color: "#9090A8",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {h}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── MODULES TAB ── */}
          {activeTab === "modules" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {(["all", "1", "2"] as PhaseFilter[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPhaseFilter(p)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: 7,
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        border: `1px solid ${phaseFilter === p ? "#22C55E" : "#2A2A35"}`,
                        backgroundColor:
                          phaseFilter === p
                            ? "rgba(34,197,94,0.12)"
                            : "transparent",
                        color: phaseFilter === p ? "#4ADE80" : "#9090A8",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {p === "all"
                        ? `All (${MODULES_DATA.length})`
                        : `Phase ${p} (${MODULES_DATA.filter((m) => m.phase === parseInt(p)).length})`}{" "}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "#5A5A70" }}>
                  {filteredModules.length} modules shown
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: 14,
                }}
              >
                {filteredModules.map((mod, i) => (
                  <ModuleCard key={mod.id} module={mod} index={i} id={`module-${mod.id}`} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── FEATURES TAB ── */}
          {activeTab === "features" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <SearchInput
                    value={featureSearch}
                    onChange={setFeatureSearch}
                    placeholder="Search features..."
                  />
                </div>
                <select
                  value={
                    featureModule === "all" ? "all" : featureModule.toString()
                  }
                  onChange={(e) =>
                    setFeatureModule(
                      e.target.value === "all"
                        ? "all"
                        : parseInt(e.target.value),
                    )
                  }
                  style={{
                    backgroundColor: "#111118",
                    border: "1px solid #2A2A35",
                    borderRadius: 8,
                    color: "#F0F0F5",
                    fontSize: 13,
                    padding: "8px 12px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="all">All Modules</option>
                  {MODULES_DATA.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.id}. {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid #2A2A35",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Feature", "Module", "Priority", "Status"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "10px 14px",
                            backgroundColor: "#111118",
                            color: "#9090A8",
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            textAlign: "left",
                            borderBottom: "1px solid #2A2A35",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeatures.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          style={{
                            padding: "32px",
                            textAlign: "center",
                            color: "#5A5A70",
                            fontSize: 13,
                          }}
                        >
                          No features match your search.
                        </td>
                      </tr>
                    ) : (
                      filteredFeatures.map((f, i) => (
                        <tr key={i} id={`feature-${f.id}`}>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom: "1px solid #1E1E2A",
                              verticalAlign: "top",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#F0F0F5",
                                marginBottom: 2,
                              }}
                            >
                              {f.name}
                            </div>
                            <div
                              style={{
                                fontSize: 11.5,
                                color: "#5A5A70",
                                lineHeight: 1.5,
                              }}
                            >
                              {f.description}
                            </div>
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom: "1px solid #1E1E2A",
                              verticalAlign: "top",
                              fontSize: 12.5,
                              color: "#9090A8",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {f.moduleName}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom: "1px solid #1E1E2A",
                              verticalAlign: "top",
                            }}
                          >
                            <PriorityBadge priority={f.priority} />
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              borderBottom: "1px solid #1E1E2A",
                              verticalAlign: "top",
                            }}
                          >
                            <StatusBadge status={f.status} size="sm" />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: 11, color: "#5A5A70" }}>
                {filteredFeatures.length} of {FEATURES_DATA.length} features
                shown
              </div>
            </motion.div>
          )}

{/* ── INTEGRATIONS TAB ── */}
{activeTab === 'integrations' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
  >

    {/* API availability note */}
    <div style={{
      backgroundColor: '#111118',
      border: '1px solid rgba(34,197,94,0.2)',
      borderRadius: 10,
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }}>
      <Info size={14} color="#22C55E" style={{ flexShrink: 0, marginTop: 1 }} />
      <div>
        <span style={{ fontSize: 13, color: '#4ADE80', fontWeight: 600 }}>
          API Availability Evaluated
        </span>
        <span style={{
          fontSize: 12.5,
          color: '#9090A8',
          lineHeight: 1.6,
          display: 'block',
          marginTop: 3
        }}>
          All third-party services were evaluated for API availability. Services marked <strong style={{ color: '#4ADE80' }}>Yes</strong> support programmatic integration. Services marked <strong style={{ color: '#F87171' }}>No</strong> require manual processes or webhooks. Services marked <strong style={{ color: '#FCD34D' }}>Partial</strong> have limited or indirect API support.
        </span>
      </div>
    </div>

    {Object.entries(groupedIntegrations).map(([category, ints]) => {
      const catColor = INTEGRATION_CATEGORY_COLORS[category] ?? '#9090A8';

      return (
        <div key={category}>
          {/* Category header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: catColor }} />
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#F0F0F5' }}>
              {category}
            </h3>
            <span style={{ fontSize: 11, color: '#5A5A70' }}>
              {ints.length} integration{ints.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Responsive Table Wrapper */}
          <div style={{
            borderRadius: 10,
            border: `1px solid #2A2A35`,
            borderTop: `2px solid ${catColor}`,
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 900, borderCollapse: 'collapse' }}>

                <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                  <tr style={{ backgroundColor: '#0E0E14' }}>
                    {['Integration', 'Used For', 'API', 'Auth', 'Docs', 'Source', 'Status'].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: '9px 14px',
                          color: '#9090A8',
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          textAlign: 'left',
                          borderBottom: '1px solid #2A2A35',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {ints.map((int, idx) => {
                    const srcCfg = STACK_SOURCE_CONFIG[int.stackSource] ?? {
                      bg: '#1A1A24',
                      text: '#9090A8',
                      label: 'Unknown'
                    };

                    const apiStyle = API_AVAILABILITY_STYLE[int.apiAvailable];

                    return (
                      <tr
                        key={int.id}
                        id={`integration-${int.id}`}
                        style={{
                          backgroundColor: idx % 2 === 0 ? '#111118' : '#0F0F16'
                        }}
                      >

                        {/* Integration */}
                        <td style={{
                          padding: '11px 14px',
                          borderBottom: '1px solid #1A1A22',
                          verticalAlign: 'top',
                          minWidth: 120,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word'
                        }}>
                          <div style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#E0E0E8',
                            marginBottom: int.apiNote ? 4 : 0
                          }}>
                            {int.name}
                          </div>

                          {int.apiNote && (
                            <div style={{
                              fontSize: 11,
                              color: '#5A5A70',
                              fontStyle: 'italic',
                              lineHeight: 1.4
                            }}>
                              {int.apiNote}
                            </div>
                          )}
                        </td>

                        {/* Used for */}
                        <td style={{
                          padding: '11px 14px',
                          borderBottom: '1px solid #1A1A22',
                          verticalAlign: 'top',
                          fontSize: 12,
                          color: '#9090A8',
                          lineHeight: 1.6,
                          maxWidth: 260,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word'
                        }}>
                          {int.usedFor}
                        </td>

                        {/* API */}
                        <td style={{
                          padding: '11px 14px',
                          borderBottom: '1px solid #1A1A22',
                          verticalAlign: 'top',
                          whiteSpace: 'nowrap'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <span style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '2px 9px',
                              borderRadius: 9999,
                              backgroundColor: apiStyle.bg,
                              color: apiStyle.text,
                              border: `1px solid ${apiStyle.border}`,
                              display: 'inline-block',
                            }}>
                              {apiStyle.label}
                            </span>

                            {int.apiName && (
                              <span style={{
                                fontSize: 10.5,
                                color: '#5A5A70',
                                lineHeight: 1.4,
                                whiteSpace: 'normal'
                              }}>
                                {int.apiName}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Auth */}
                        <td style={{
                          padding: '11px 14px',
                          borderBottom: '1px solid #1A1A22',
                          verticalAlign: 'top',
                          whiteSpace: 'nowrap'
                        }}>
                          {int.apiAuthMethod ? (
                            <span style={{
                              fontSize: 11,
                              color: '#7A7A90',
                              backgroundColor: '#1A1A24',
                              padding: '2px 8px',
                              borderRadius: 4,
                              border: '1px solid #2A2A35'
                            }}>
                              {int.apiAuthMethod}
                            </span>
                          ) : (
                            <span style={{ fontSize: 11, color: '#3A3A48' }}>—</span>
                          )}
                        </td>

                        {/* Docs */}
                        <td style={{
                          padding: '11px 14px',
                          borderBottom: '1px solid #1A1A22',
                          verticalAlign: 'top',
                          whiteSpace: 'nowrap'
                        }}>
                          {int.apiDocsUrl ? (
                            <a
                              href={int.apiDocsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: 11,
                                color: '#22C55E',
                                textDecoration: 'none'
                              }}
                              onMouseEnter={e => e.currentTarget.style.color = '#4ADE80'}
                              onMouseLeave={e => e.currentTarget.style.color = '#22C55E'}
                            >
                              <ExternalLink size={10} />
                              API Docs
                            </a>
                          ) : (
                            <span style={{ fontSize: 11, color: '#3A3A48' }}>—</span>
                          )}
                        </td>

                        {/* Source */}
                        <td style={{
                          padding: '11px 14px',
                          borderBottom: '1px solid #1A1A22',
                          verticalAlign: 'top',
                          whiteSpace: 'nowrap'
                        }}>
                          <span style={{
                            fontSize: 10.5,
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: 9999,
                            backgroundColor: srcCfg.bg,
                            color: srcCfg.text
                          }}>
                            {srcCfg.label}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={{
                          padding: '11px 14px',
                          borderBottom: '1px solid #1A1A22',
                          verticalAlign: 'top'
                        }}>
                          <StatusBadge status={int.status} size="sm" />
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      );
    })}
  </motion.div>
)}

          {/* ── CREDENTIALS TAB ── */}
          {activeTab === "credentials" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div
                style={{
                  backgroundColor: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Shield size={15} color="#EF4444" />
                <span
                  style={{ fontSize: 13, color: "#F87171", fontWeight: 500 }}
                >
                  Internal use only. Never commit these values to version
                  control. Use .env.local for local development.
                </span>
              </div>

              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid #2A2A35",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {[
                        "Variable",
                        "Description",
                        "Category",
                        "Phase",
                        "Required",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "10px 14px",
                            backgroundColor: "#111118",
                            color: "#9090A8",
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            textAlign: "left",
                            borderBottom: "1px solid #2A2A35",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CREDENTIALS_DATA.map((cred, i) => (
                      <tr key={i}>
                        <td
                          style={{
                            padding: "10px 14px",
                            borderBottom: "1px solid #1E1E2A",
                            verticalAlign: "top",
                          }}
                        >
                          <code
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 12,
                              color: "#4ADE80",
                              backgroundColor: "rgba(34,197,94,0.08)",
                              padding: "1px 6px",
                              borderRadius: 4,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {cred.variable}
                          </code>
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            borderBottom: "1px solid #1E1E2A",
                            verticalAlign: "top",
                            fontSize: 12.5,
                            color: "#9090A8",
                            lineHeight: 1.5,
                          }}
                        >
                          {cred.description}
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            borderBottom: "1px solid #1E1E2A",
                            verticalAlign: "top",
                            fontSize: 12,
                            color: "#5A5A70",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cred.category}
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            borderBottom: "1px solid #1E1E2A",
                            verticalAlign: "top",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: "1px 7px",
                              borderRadius: 9999,
                              backgroundColor:
                                cred.phase === 1
                                  ? "rgba(245,158,11,0.1)"
                                  : cred.phase === 2
                                    ? "rgba(139,92,246,0.1)"
                                    : "rgba(34,197,94,0.1)",
                              color:
                                cred.phase === 1
                                  ? "#FCD34D"
                                  : cred.phase === 2
                                    ? "#C4B5FD"
                                    : "#4ADE80",
                            }}
                          >
                            {cred.phase === "both"
                              ? "Both"
                              : `Phase ${cred.phase}`}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            borderBottom: "1px solid #1E1E2A",
                            verticalAlign: "top",
                          }}
                        >
                          {cred.required ? (
                            <span
                              style={{
                                fontSize: 11,
                                color: "#F87171",
                                fontWeight: 600,
                              }}
                            >
                              Required
                            </span>
                          ) : (
                            <span style={{ fontSize: 11, color: "#5A5A70" }}>
                              Optional
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
