# Prompts Sequence: ChatDigest AI Project

This document logs the 10 exhaustive prompt sequences used to design, scaffold, optimize, and secure the local-first ChatDigest AI micro-app.

---

### Prompt 1: Initial Architecture & Security Design
"Design a privacy-focused local-first React + Tailwind CSS micro-app called ChatDigest AI. The primary goal is to help users quickly summarize long chat threads, extract action items/decisions, and highlight deadlines without sending any chat payload off the user's browser. Detail the data structure and component layout."

---

### Prompt 2: Side-by-Side UI Dashboard Layout
"Scaffold a responsive side-by-side dashboard in React and Tailwind CSS. The left panel should hold a raw chat log textarea and sample dataset dropdowns. The right panel should render executive summaries, key decisions, action items with checkboxes, and urgency badges. Use Lucide React icons."

---

### Prompt 3: Zero-Server Regex Extraction Engine
"Implement client-side JavaScript regex extraction algorithms for parsing plain-text chat streams. Build extraction modules for:
1. Direct user mentions (@username)
2. Action items and task assignments (keywords like 'needs to', 'will handle', 'action item')
3. Key decisions (keywords like 'DECIDED', 'DECISION')
4. Time and deadline tags ('by 5 PM', 'due tomorrow')"

---

### Prompt 4: Local Storage Persistence & Task State Manager
"Build a custom React state hook that syncs extracted task items with browser LocalStorage. Ensure that checking or unchecking task boxes persists across browser refreshes without relying on an external database."

---

### Prompt 5: Pre-Loaded Multi-Domain Sample Datasets
"Create three realistic sample plain-text chat datasets for testing:
1. Technical Outage Incident (Auth database down, post-mortem scheduling)
2. Product Launch Crunch (Marketing copy, video postponement, bug fixes)
3. Roommate Shared Household Expenses (Wi-Fi bill deadlines, shopping split)"

---

### Prompt 6: Offline Security & Privacy Shield Component
"Design a Privacy Shield Status component in the top navigation header. It must display a visual status banner confirming 100% offline client-side parsing, zero external network requests, and encrypted LocalStorage usage."

---

### Prompt 7: Interactive Filtering & Mention Highlighting
"Add filtering mechanisms that allow users to filter extracted decisions and action items by specific tagged @usernames or urgency level (High, Medium, Low)."

---

### Prompt 8: Local Export Engine (Markdown & JSON)
"Implement clean client-side export features allowing users to download the generated summary, decisions list, and pending action items as a formatted `.md` (Markdown) file or `.json` configuration file with a single click."

---

### Prompt 9: Performance Optimization & Web Worker Scaffold
"Optimize parsing performance for long chat logs (>2,000 lines). Scaffold a client-side Web Worker architecture to run regex string parsing off the main UI thread to eliminate UI stuttering."

---

### Prompt 10: Production Setup & GitHub Deployment Pipeline
"Generate a comprehensive production-ready README file and local deployment workflow detailing project setup, local npm installation scripts, architectural decisions, and zero-telemetry security compliance."
