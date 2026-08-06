import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { BarChart3, PieChart as PieIcon, ShieldAlert, Building } from 'lucide-react';

const COLOR_MAP = {
  'No Damage': '#22c55e',
  'Minor Damage': '#eab308',
  'Major Damage': '#f97316',
  'Destroyed': '#ef4444'
};

export default function DamageCharts({ summary = {}, riskLevel = 'LOW' }) {
  const chartData = [
    { name: 'No Damage', count: summary.no_damage || 0, pct: summary.pct_no_damage || 0 },
    { name: 'Minor Damage', count: summary.minor_damage || 0, pct: summary.pct_minor_damage || 0 },
    { name: 'Major Damage', count: summary.major_damage || 0, pct: summary.pct_major_damage || 0 },
    { name: 'Destroyed', count: summary.destroyed || 0, pct: summary.pct_destroyed || 0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* KPI Cards Header Summary */}
      <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="tactical-card p-4 rounded-xl border border-slate-700/60 font-mono">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>TOTAL STRUCTURES</span>
            <Building className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{summary.total_buildings || 0}</div>
          <div className="text-[10px] text-slate-500 mt-1">Localization mask count</div>
        </div>

        <div className="tactical-card p-4 rounded-xl border border-emerald-900/60 bg-emerald-950/20 font-mono">
          <div className="flex items-center justify-between text-emerald-400 text-xs mb-1">
            <span>NO DAMAGE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{summary.no_damage || 0}</div>
          <div className="text-[10px] text-emerald-600 mt-1">{summary.pct_no_damage || 0}% of total</div>
        </div>

        <div className="tactical-card p-4 rounded-xl border border-orange-900/60 bg-orange-950/20 font-mono">
          <div className="flex items-center justify-between text-orange-400 text-xs mb-1">
            <span>MAJOR DAMAGE</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-400">{summary.major_damage || 0}</div>
          <div className="text-[10px] text-orange-600 mt-1">{summary.pct_major_damage || 0}% of total</div>
        </div>

        <div className="tactical-card p-4 rounded-xl border border-red-900/60 bg-red-950/20 font-mono">
          <div className="flex items-center justify-between text-red-400 text-xs mb-1">
            <span>DESTROYED</span>
            <span className="w-2 h-2 rounded-full bg-red-500" />
          </div>
          <div className="text-2xl font-black text-red-400">{summary.destroyed || 0}</div>
          <div className="text-[10px] text-red-600 mt-1">{summary.pct_destroyed || 0}% of total</div>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="tactical-card p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between">
        <h3 className="text-xs font-bold font-mono text-white flex items-center gap-2 mb-4">
          <PieIcon className="w-4 h-4 text-cyan-400" />
          DAMAGE SEVERITY PROPORTION
        </h3>
        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="count"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={COLOR_MAP[entry.name]} stroke="#0f172a" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[11px]">
          {chartData.map(item => (
            <div key={item.name} className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: COLOR_MAP[item.name] }} />
              <span className="truncate">{item.name}: <b className="text-white">{item.count}</b> ({item.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart Breakdown */}
      <div className="lg:col-span-2 tactical-card p-5 rounded-xl border border-slate-700/60 flex flex-col justify-between">
        <h3 className="text-xs font-bold font-mono text-white flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          STRUCTURE COUNTS BY CATEGORY
        </h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                cursor={{ fill: 'rgba(51, 65, 85, 0.3)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={COLOR_MAP[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-slate-400 text-xs font-mono">
          <span>COMBINED IMPACT SEVERITY: <b className="text-cyan-400">{((summary.pct_major_damage || 0) + (summary.pct_destroyed || 0)).toFixed(1)}%</b></span>
          <span className="text-[10px] text-slate-500">xView2 / xBD Damage Taxonomy</span>
        </div>
      </div>
    </div>
  );
}
