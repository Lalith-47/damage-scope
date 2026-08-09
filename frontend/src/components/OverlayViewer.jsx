import React, { useState } from 'react';
import { Eye, Layers, Crosshair, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

const DAMAGE_COLOR_MAP = {
  'no-damage': '#22c55e',
  'minor-damage': '#eab308',
  'major-damage': '#f97316',
  'destroyed': '#ef4444'
};

const DAMAGE_LABEL_MAP = {
  'no-damage': 'No Damage',
  'minor-damage': 'Minor Damage',
  'major-damage': 'Major Damage',
  'destroyed': 'Destroyed'
};

export default function OverlayViewer({ preImageUrl, postImageUrl, buildings = [], summary = {} }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [opacity, setOpacity] = useState(0.45);
  const [viewMode, setViewMode] = useState('overlay'); // 'overlay' | 'split' | 'pre' | 'post'
  const [filterClass, setFilterClass] = useState('all');

  const filteredBuildings = buildings.filter(b => filterClass === 'all' || b.damage_class === filterClass);

  const activeBuilding = selectedBuilding || hoveredBuilding;

  const renderSvgOverlay = (buildingsList, interactive = true) => (
    <svg
      viewBox="0 0 1024 1024"
      className={`absolute inset-0 w-full h-full ${interactive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {buildingsList.map((b) => {
        const isSelected = selectedBuilding?.id === b.id;
        const isHovered = hoveredBuilding?.id === b.id;
        const pointsStr = b.polygon.map(pt => `${pt[0]},${pt[1]}`).join(' ');
        const strokeColor = DAMAGE_COLOR_MAP[b.damage_class] || '#22c55e';

        return (
          <g key={b.id}>
            <polygon
              points={pointsStr}
              fill={strokeColor}
              fillOpacity={isSelected || isHovered ? Math.min(1.0, opacity + 0.3) : opacity}
              stroke={isSelected || isHovered ? '#ffffff' : strokeColor}
              strokeWidth={isSelected || isHovered ? 4 : 2}
              className="cursor-pointer transition-all hover:brightness-125"
              onMouseEnter={() => setHoveredBuilding(b)}
              onMouseLeave={() => setHoveredBuilding(null)}
              onClick={() => setSelectedBuilding(selectedBuilding?.id === b.id ? null : b)}
            />
            {/* Centroid Label for Building ID */}
            {b.polygon && b.polygon.length > 0 && (
              <text
                x={b.bbox[0] + (b.bbox[2] - b.bbox[0]) / 2}
                y={b.bbox[1] + (b.bbox[3] - b.bbox[1]) / 2}
                fill="#ffffff"
                fontSize="15"
                fontWeight="bold"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none drop-shadow-md"
              >
                #{b.id}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="tactical-card rounded-xl p-6 mb-8 border border-slate-700/60 shadow-xl">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2 font-mono">
            <Layers className="w-5 h-5 text-cyan-400" />
            INTERACTIVE BUILDING DAMAGE MAP
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Hover or click vector building contours to inspect structure ID and damage classification confidence.
          </p>
        </div>

        {/* View mode toggle & Opacity Slider */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-lg border border-slate-700 font-mono text-xs">
            <button
              onClick={() => setViewMode('overlay')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'overlay' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              OVERLAY
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'split' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              SPLIT DUAL
            </button>
            <button
              onClick={() => setViewMode('pre')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'pre' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              PRE ONLY
            </button>
            <button
              onClick={() => setViewMode('post')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                viewMode === 'post' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              POST ONLY
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-xs">
            <span className="text-slate-400">OPACITY:</span>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-24 accent-cyan-400 cursor-pointer"
            />
            <span className="text-cyan-400 w-8">{Math.round(opacity * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Class Filters & Legend */}
      <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">FILTER CATEGORY:</span>
        <button
          onClick={() => setFilterClass('all')}
          className={`px-3 py-1 rounded-full border transition-all ${
            filterClass === 'all'
              ? 'bg-slate-700 text-white border-slate-500 font-bold'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
          }`}
        >
          ALL ({buildings.length})
        </button>

        {Object.entries(DAMAGE_COLOR_MAP).map(([clsKey, hexColor]) => {
          const countKey = clsKey.replace('-', '_');
          const count = summary[countKey] || summary[clsKey] || 0;
          return (
            <button
              key={clsKey}
              onClick={() => setFilterClass(clsKey)}
              className={`px-3 py-1 rounded-full border transition-all flex items-center gap-2 ${
                filterClass === clsKey
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:border-slate-700'
              }`}
              style={{
                borderColor: filterClass === clsKey ? hexColor : '#334155',
                boxShadow: filterClass === clsKey ? `0 0 10px ${hexColor}40` : 'none'
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hexColor }} />
              {DAMAGE_LABEL_MAP[clsKey].toUpperCase()} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Visualizer Area */}
        <div className={`relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 ${
          viewMode === 'split' ? 'xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 p-3' : 'xl:col-span-2'
        }`}>
          {/* Single / Overlay View */}
          {viewMode !== 'split' && (
            <div className="relative w-full aspect-square max-h-[640px] bg-slate-950 flex items-center justify-center">
              <img
                src={viewMode === 'pre' ? preImageUrl : postImageUrl}
                alt="Satellite View"
                className="w-full h-full object-contain pointer-events-none select-none"
              />
              {(viewMode === 'overlay' || viewMode === 'post') && renderSvgOverlay(filteredBuildings, true)}
            </div>
          )}

          {/* Split Mode Dual Viewports */}
          {viewMode === 'split' && (
            <>
              <div className="relative w-full aspect-square max-h-[500px] rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                <div className="absolute top-2 left-2 px-2.5 py-1 bg-slate-900/90 border border-slate-700 text-slate-300 font-mono text-[11px] rounded z-20 font-bold shadow-md">
                  PRE-DISASTER SATELLITE
                </div>
                <img src={preImageUrl} alt="Pre Satellite" className="w-full h-full object-contain pointer-events-none select-none" />
                {renderSvgOverlay(filteredBuildings, true)}
              </div>

              <div className="relative w-full aspect-square max-h-[500px] rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                <div className="absolute top-2 left-2 px-2.5 py-1 bg-slate-900/90 border border-slate-700 text-slate-300 font-mono text-[11px] rounded z-20 font-bold shadow-md">
                  POST-DISASTER OVERLAY
                </div>
                <img src={postImageUrl} alt="Post Satellite" className="w-full h-full object-contain pointer-events-none select-none" />
                {renderSvgOverlay(filteredBuildings, true)}
              </div>
            </>
          )}
        </div>

        {/* Building Inspector Panel */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold font-mono text-white flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-cyan-400" />
                BUILDING INSPECTOR
              </span>
              {activeBuilding && (
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
                  ID #{activeBuilding.id}
                </span>
              )}
            </h3>

            {activeBuilding ? (
              <div className="mt-4 font-mono">
                {/* Predicted Class Indicator */}
                <div
                  className="p-3.5 rounded-lg border mb-4 flex items-center justify-between"
                  style={{
                    backgroundColor: `${DAMAGE_COLOR_MAP[activeBuilding.damage_class]}15`,
                    borderColor: DAMAGE_COLOR_MAP[activeBuilding.damage_class]
                  }}
                >
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">PREDICTED SEVERITY</span>
                    <span
                      className="text-base font-extrabold uppercase"
                      style={{ color: DAMAGE_COLOR_MAP[activeBuilding.damage_class] }}
                    >
                      {DAMAGE_LABEL_MAP[activeBuilding.damage_class]}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">CONFIDENCE</span>
                    <span className="text-sm font-bold text-white">
                      {(activeBuilding.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Bounding Box Coordinates */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-4 text-xs text-slate-300">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">BOUNDING BOX (1024x1024):</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-400">
                    <div>Xmin: <span className="text-white font-bold">{activeBuilding.bbox[0]}</span></div>
                    <div>Ymin: <span className="text-white font-bold">{activeBuilding.bbox[1]}</span></div>
                    <div>Xmax: <span className="text-white font-bold">{activeBuilding.bbox[2]}</span></div>
                    <div>Ymax: <span className="text-white font-bold">{activeBuilding.bbox[3]}</span></div>
                  </div>
                </div>

                {/* Classification Probability Breakdown */}
                <div className="space-y-3">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                    DAMAGE SEVERITY CONFIDENCE BREAKDOWN:
                  </span>

                  {Object.entries(activeBuilding.confidences || {}).map(([clsKey, prob]) => {
                    const color = DAMAGE_COLOR_MAP[clsKey] || '#22c55e';
                    const pct = (prob * 100).toFixed(1);
                    return (
                      <div key={clsKey} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">{DAMAGE_LABEL_MAP[clsKey]}</span>
                          <span className="text-slate-400 font-bold">{pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full transition-all duration-300 rounded-full"
                            style={{ width: `${pct}%`, backgroundColor: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 font-mono text-xs flex flex-col items-center justify-center gap-3">
                <Crosshair className="w-8 h-8 text-slate-600 animate-pulse" />
                <p>Hover or click on any vector building polygon in the satellite viewport to view detailed damage logits.</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 font-mono text-[11px] text-slate-500 flex items-center justify-between">
            <span>TOTAL STRUCTURES: {buildings.length}</span>
            <span className="text-cyan-400">INPUT: 1024x1024 PNG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
