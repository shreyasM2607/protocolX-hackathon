import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Clock, 
  AtSign, Filter, Download, Sparkles, MessageSquare, ListTodo 
} from 'lucide-react';

const SAMPLE_CHATS = {
  incident: `[10:15 AM] @alex: Emergency! Production outage on Auth service.
[10:16 AM] @sarah: Investigating. Database connections are timing out.
[10:18 AM] @alex: We DECIDED to rollback deployment v2.4 immediately.
[10:20 AM] @mike: Action item: @sarah needs to rotate DB credentials by 2:00 PM today.
[10:22 AM] @alex: @all post-mortem review scheduled for tomorrow at 10 AM.`,
  launch: `[02:00 PM] @lisa: Finalizing launch checklist for Marketing site.
[02:05 PM] @john: @lisa make sure we update landing hero copy before 5:00 PM.
[02:10 PM] @lisa: DECISION: We are postponing the product video to v1.1 release.
[02:15 PM] @david: I will handle bug fixes for mobile views by Friday.`,
  roommates: `[06:00 PM] @sam: Wi-Fi bill is due tomorrow ($60).
[06:05 PM] @chris: I can pay it today. @sam split it on Splitwise by tonight.
[06:10 PM] @sam: DECISION: Chris pays internet, I will buy groceries.`
};

export default function ChatDigestApp() {
  const [selectedSample, setSelectedSample] = useState('incident');
  const [chatText, setChatText] = useState(SAMPLE_CHATS.incident);
  const [parsedData, setParsedData] = useState({ actions: [], decisions: [], mentions: [], summary: '' });
  const [tasks, setTasks] = useState([]);
  const [mentionFilter, setMentionFilter] = useState('ALL');

  useEffect(() => {
    parseChatLogs(chatText);
  }, [chatText]);

  const parseChatLogs = (text) => {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const actions = [];
    const decisions = [];
    const mentions = new Set();

    lines.forEach((line, index) => {
      // Regex pattern extraction (100% Client-Side)
      const userMatches = line.match(/@(\w+)/g);
      if (userMatches) userMatches.forEach(u => mentions.add(u));

      if (/DECIDED|DECISION/i.test(line)) {
        decisions.push({ id: index, text: line });
      }

      if (/action item|needs to|by \d+|will handle|must/i.test(line)) {
        actions.push({ id: `task-${index}`, text: line, completed: false });
      }
    });

    setParsedData({
      actions,
      decisions,
      mentions: Array.from(mentions),
      summary: `Parsed ${lines.length} lines. Identified ${actions.length} action items and ${decisions.length} key decisions.`
    });

    setTasks(prev => {
      const existingIds = new Set(prev.map(t => t.id));
      const newTasks = actions.filter(a => !existingIds.has(a.id));
      return [...prev, ...newTasks];
    });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSampleChange = (key) => {
    setSelectedSample(key);
    setChatText(SAMPLE_CHATS[key]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col gap-6">
      {/* Top Navbar */}
      <header className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-indigo-400" />
          <h1 className="text-xl font-bold">ChatDigest AI</h1>
        </div>
        <div className="flex items-center gap-2 bg-emerald-950/80 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Offline / Local-First Active</span>
        </div>
      </header>

      {/* Main Split-Screen Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Left Panel: Raw Input & Controls */}
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-300">Raw Chat Transcript</label>
            <select 
              value={selectedSample}
              onChange={(e) => handleSampleChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-1.5 text-slate-200"
            >
              <option value="incident">Sample: Outage Incident</option>
              <option value="launch">Sample: Product Launch</option>
              <option value="roommates">Sample: Shared Expenses</option>
            </select>
          </div>

          <textarea
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            placeholder="Paste raw conversation logs here..."
            className="w-full h-80 bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
          />

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-4 h-4 text-slate-500" />
            <span>Detected Users:</span>
            {parsedData.mentions.map((m) => (
              <span key={m} className="bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">{m}</span>
            ))}
          </div>
        </div>

        {/* Right Panel: Analytical Dashboard */}
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 flex flex-col gap-6">
          {/* Executive Summary */}
          <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Executive Digest</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{parsedData.summary}</p>
          </div>

          {/* Action Items List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-emerald-400" /> Action Items & Tasks
              </span>
              <span className="text-xs text-slate-500">{tasks.filter(t => t.completed).length}/{tasks.length} Done</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No action items detected.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 bg-slate-900 p-2.5 rounded border border-slate-800 text-xs">
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="accent-indigo-500 w-4 h-4 rounded cursor-pointer"
                    />
                    <span className={task.completed ? 'line-through text-slate-500' : 'text-slate-200'}>
                      {task.text}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Key Decisions */}
          <div>
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-blue-400" /> Key Decisions Made
            </span>
            <div className="space-y-2">
              {parsedData.decisions.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No key decisions found.</p>
              ) : (
                parsedData.decisions.map((dec) => (
                  <div key={dec.id} className="bg-blue-950/40 border border-blue-900/50 p-2.5 rounded text-xs text-blue-200">
                    {dec.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
