# protocolX-hackathon
# ChatDigest AI 🛡️⚡

ChatDigest AI is a 100% local-first, privacy-focused micro-app designed to parse overwhelming chat conversations, summarize key narratives, and extract actionable insights—**completely offline inside the browser runtime**.

---

## 🔑 Key Features

- **Zero-Data Leakage:** 100% of text parsing, entity extraction, and state management occurs locally in browser memory.
- **Smart Regex Extraction:** Identifies `@mentions`, critical deadlines, action items, and key decisions.
- **Interactive Task Tracker:** Toggle action items on/off with persistent `LocalStorage` state.
- **Side-by-Side Workspace:** Instant visual feedback split between raw chat input and analytical summary cards.
- **Pre-Loaded Test Scenarios:** Built-in sample datasets covering Engineering Outages, Product Launches, and Household Expenses.

---

## 🛠️ Technical Stack & Props Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Parsing Logic** | Pure Client-Side JavaScript / RegEx |
| **Data Persistence** | Browser `LocalStorage` |

### Core Component Props Interface

```typescript
interface ChatDigestProps {
  initialChatText?: string;
  autoSaveLocalStorage?: boolean;
  onExportSummary?: (format: 'md' | 'json') => void;
}

interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
  assignee?: string;
}

interface DecisionItem {
  id: number;
  text: string;
  timestamp?: string;
}
