# GoodWe Installer Sim — v0.1 (Troubleshooting Mode)

A premium browser game prototype for the GoodWe Installer Academy concept.
This first build establishes the core architecture and one fully playable
gameplay loop: **Troubleshooting Mode**.

## What's in this build

- **Dashboard**: player rank/level/XP, coins, reputation, badges, job history.
- **Troubleshooting Mode**: a random fault is assigned, you run diagnostic
  checks with the tool belt (Multimeter, Clamp Meter, Megger, SolarGo, SEMS,
  RS485 Tester), watch live readings on the instrument-panel readout, chat
  with the customer for context, then diagnose the fault and pick the correct
  fix. Wrong diagnoses cost customer satisfaction; a fast, correct, first-try
  diagnosis earns a "Textbook Diagnosis" bonus and badge.
- **Save system**: player XP/coins/reputation/badges/history persist to
  localStorage automatically (via Zustand's `persist` middleware).

## Architecture (built to extend)

```
src/
  data/
    faults.ts     ← the fault knowledge base (PLACEHOLDER DATA — see below)
    checks.ts     ← diagnostic actions catalog (mapped to tools)
    tools.ts      ← inventory/tool catalog
    fixes.ts      ← shared pool of fix/repair actions
  store/
    gameStore.ts  ← Zustand store: player progression + active mission state
  components/
    hud/          ← StatusBar, ToolBelt, ReadoutPanel (the instrument display)
    mission/      ← CustomerBrief, DiagnosisPanel, FixPanel, MissionResult
    ui/           ← Button, GlassPanel, Badge, ProgressBar primitives
  pages/
    DashboardPage.tsx
    MissionPage.tsx
```

**Nothing about the mission generator, diagnosis picker, or fix picker is
hardcoded to specific faults.** Every mission is randomly drawn from
`src/data/faults.ts`. To plug in your real GoodWe manuals later, add more
entries to that array (same shape: complaint, simulated readings per check,
required checks, correct fix, XP/coin reward) — the rest of the app adapts
automatically. This is the seed of the "knowledge base" system described in
the original brief.

### Placeholder data notice

`faults.ts` currently contains **10 illustrative fault scenarios** (No PV,
PV Reverse, Isolation Fail, Relay Check Fail, Grid Lost, AC Voltage High,
Battery Offline, Meter Comm Failure, CT Reverse, Export Limit Failed, AFCI
Alarm) written from general solar-troubleshooting knowledge, not from your
internal manuals. Treat the specific voltages, thresholds, and wording as
placeholders to be corrected once real documentation is added.

## Tech stack

React 19 + TypeScript + Vite, Tailwind CSS v4, Framer Motion, Zustand (with
localStorage persistence), React Router (HashRouter, so it works from any
static host without server-side routing config).

## Running it locally

```bash
npm install
npm run dev       # dev server with hot reload
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Deploying

`npm run build` produces a static `dist/` folder — deploy it the same way as
your CRM (e.g. Vercel, drag-and-drop, or any static host). No backend is
required for this build since persistence is localStorage-only.

## Not built yet (next passes)

Installation Mode, Commissioning Mode (SolarGo simulator), Customer Mode
(open-ended chat diagnosis), Warranty Mode, Compatibility Mode, Firmware
Mode, EV Charger Mode, travel/map system, weather system, audio, boss
levels, daily missions, endless mode, leaderboards, and cloud save. The
architecture above is built so each of these can be added as its own
`data/` file + `components/` folder without touching the core.
