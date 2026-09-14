import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, CheckSquare } from 'lucide-react';

const INITIAL_TASKS = [
  { id: 1, title: 'Investigate SKMC helpdesk SLA alerts', done: true, priority: 'HIGH' },
  { id: 2, title: 'Deploy Dialogflow AI webhook integrations', done: true, priority: 'MEDIUM' },
  { id: 3, title: 'Analyze suspicious web logs & firewall rules', done: false, priority: 'HIGH' },
  { id: 4, title: 'Optimize SQL queries for e-commerce checkout', done: false, priority: 'LOW' },
];

export default function TaskBoardSimulator() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTitle, setNewTitle] = useState('');
  const [filter, setFilter] = useState('ALL');

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: newTitle.trim(), done: false, priority: 'MEDIUM' },
    ]);
    setNewTitle('');
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'PENDING') return !t.done;
    if (filter === 'COMPLETED') return t.done;
    return true;
  });

  return (
    <div className="flex flex-col h-[320px] bg-black/80 rounded-2xl border border-white/10 overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-3.5 h-3.5 text-brand-cyan" />
          <span className="text-[10px] uppercase tracking-wider text-zinc-300 font-bold">Interactive Task Platform</span>
        </div>
        <div className="text-[10px] text-zinc-400">
          Efficiency: <strong className="text-emerald-400">{completionRate}%</strong>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
        {['ALL', 'PENDING', 'COMPLETED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold transition-all ${
              filter === f
                ? 'bg-white text-black'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            onClick={() => toggleTask(t.id)}
            className={`cursor-pointer flex items-center justify-between p-2 rounded-xl border transition-all ${
              t.done
                ? 'bg-white/5 border-white/5 opacity-60'
                : 'bg-white/10 border-white/15 hover:border-brand-cyan/40'
            }`}
          >
            <div className="flex items-center gap-2.5 flex-1 pr-2">
              {t.done ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-500 shrink-0" />
              )}
              <span
                className={`text-[11px] leading-tight ${
                  t.done ? 'line-through text-zinc-500' : 'text-zinc-200'
                }`}
              >
                {t.title}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(t.id);
              }}
              className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Task Input */}
      <form
        onSubmit={addTask}
        className="flex items-center gap-2 p-2.5 bg-white/5 border-t border-white/10"
      >
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent px-2 py-1 text-[11px] text-white placeholder-zinc-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!newTitle.trim()}
          className="p-1.5 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-30 transition-all"
          title="Add task"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
