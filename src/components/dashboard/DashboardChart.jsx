import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * DashboardChart component renders line/bar charts using pure SVG for maximum speed and React 19 safety.
 * 
 * @param {string} title - Chart title
 * @param {string} [subtitle] - Subtitle or description
 * @param {string} [totalValue] - Optional highlighted metric (e.g. "$45,231")
 * @param {object} [trend] - Optional trend object: { value: "+8%", isPositive: true }
 * @param {Array} data - Array of data points: [ { label: 'Jan', value: 400 }, ... ]
 * @param {string} [layout] - 'line' | 'bar'
 * @param {string} [colorType] - 'primary' | 'secondary' | 'pink'
 * @param {number} [height] - Chart SVG area height (default 240)
 */
export default function DashboardChart({
  title,
  subtitle,
  totalValue,
  trend,
  data = [],
  layout = 'line',
  colorType = 'primary',
  height = 240
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [containerWidth, setContainerWidth] = useState(500);
  const containerRef = useRef(null);

  // Responsive width tracking
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleResize = () => {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Dimensions
  const svgWidth = Math.max(containerWidth, 100);
  const svgHeight = height;

  const padding = {
    top: 25,
    right: 20,
    bottom: 35,
    left: 45
  };

  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  // Data processing
  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 10);
  const minVal = Math.min(...values, 0);
  
  // Y-axis scale calculation
  const yBuffer = (maxVal - minVal) * 0.15 || 5;
  const yMax = maxVal + yBuffer;
  const yMin = Math.max(0, minVal - yBuffer); // Don't go below 0 for gym stats usually

  const getX = (index) => {
    if (data.length <= 1) return padding.left + chartWidth / 2;
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val) => {
    const scale = (val - yMin) / (yMax - yMin);
    return svgHeight - padding.bottom - scale * chartHeight;
  };

  // Color mappings
  const colors = {
    primary: {
      stroke: '#ccff00',      // Neon lime
      fillGrad: 'url(#grad-primary)',
      shadow: 'rgba(204, 255, 0, 0.4)',
      accent: '#ccff00',
      text: 'text-primary'
    },
    secondary: {
      stroke: '#00f0ff',      // Cyber cyan
      fillGrad: 'url(#grad-secondary)',
      shadow: 'rgba(0, 240, 255, 0.4)',
      accent: '#00f0ff',
      text: 'text-secondary'
    },
    pink: {
      stroke: '#ff007f',      // Neon pink
      fillGrad: 'url(#grad-pink)',
      shadow: 'rgba(255, 0, 127, 0.4)',
      accent: '#ff007f',
      text: 'text-accent-pink'
    }
  };

  const activeColor = colors[colorType] || colors.primary;

  // Grid ticks (Y-axis)
  const ticksCount = 4;
  const yTicks = Array.from({ length: ticksCount }, (_, i) => {
    const val = yMin + (i / (ticksCount - 1)) * (yMax - yMin);
    return {
      value: Math.round(val),
      y: getY(val)
    };
  });

  // SVG Line paths
  let linePath = '';
  let areaPath = '';

  if (layout === 'line' && data.length > 0) {
    const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
    linePath = `M ${points.join(' L ')}`;
    areaPath = `${linePath} L ${getX(data.length - 1)},${svgHeight - padding.bottom} L ${getX(0)},${svgHeight - padding.bottom} Z`;
  }

  return (
    <div 
      ref={containerRef}
      className="glass-card relative p-6 rounded-2xl border border-gym-gray-800 bg-gym-gray-900/60 backdrop-blur-md w-full overflow-hidden"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gym-gray-400">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gym-gray-500 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {totalValue && (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-black text-white">
              {totalValue}
            </span>
            {trend && (
              <span className={`text-xs font-bold ${trend.isPositive ? 'text-primary' : 'text-red-500'}`}>
                {trend.value}
              </span>
            )}
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative select-none">
        <svg 
          width="100%" 
          height={svgHeight} 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="overflow-visible"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="grad-primary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ccff00" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="grad-secondary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="grad-pink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff007f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ff007f" stopOpacity="0.0" />
            </linearGradient>
            
            {/* Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines */}
          <g className="opacity-40">
            {yTicks.map((tick, i) => (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={tick.y}
                  x2={svgWidth - padding.right}
                  y2={tick.y}
                  stroke="#1a1a1e"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Y Axis Labels */}
                <text
                  x={padding.left - 10}
                  y={tick.y + 4}
                  fill="#a1a1aa"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="end"
                  className="font-mono"
                >
                  {tick.value}
                </text>
              </g>
            ))}
          </g>

          {/* Bar Layout rendering */}
          {layout === 'bar' && data.map((d, i) => {
            const barWidth = Math.max(4, (chartWidth / data.length) * 0.55);
            const x = padding.left + (i / data.length) * chartWidth + (chartWidth / data.length - barWidth) / 2;
            const y = getY(d.value);
            const barH = Math.max(2, svgHeight - padding.bottom - y);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                {/* Bar Path with rounded top corners */}
                <path
                  d={`
                    M ${x},${y + Math.min(4, barH)}
                    a ${Math.min(4, barH)},${Math.min(4, barH)} 0 0 1 ${Math.min(4, barH)},-${Math.min(4, barH)}
                    h ${barWidth - 2 * Math.min(4, barH)}
                    a ${Math.min(4, barH)},${Math.min(4, barH)} 0 0 1 ${Math.min(4, barH)},${Math.min(4, barH)}
                    v ${barH - Math.min(4, barH)}
                    h -${barWidth}
                    Z
                  `}
                  fill={activeColor.stroke}
                  fillOpacity={isHovered ? 0.95 : 0.7}
                  className="transition-all duration-200"
                  style={isHovered ? { filter: 'drop-shadow(0 0 8px ' + activeColor.shadow + ')' } : {}}
                />
              </g>
            );
          })}

          {/* Line Layout rendering */}
          {layout === 'line' && data.length > 0 && (
            <>
              {/* Area under the line */}
              <path
                d={areaPath}
                fill={activeColor.fillGrad}
                className="transition-all duration-300"
              />

              {/* Line path */}
              <path
                d={linePath}
                fill="none"
                stroke={activeColor.stroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
              
              {/* Active vertical cursor line */}
              {hoveredIndex !== null && (
                <line
                  x1={getX(hoveredIndex)}
                  y1={padding.top}
                  x2={getX(hoveredIndex)}
                  y2={svgHeight - padding.bottom}
                  stroke={activeColor.stroke}
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="opacity-60"
                />
              )}

              {/* Active data point glow node */}
              {hoveredIndex !== null && (
                <g>
                  <circle
                    cx={getX(hoveredIndex)}
                    cy={getY(data[hoveredIndex].value)}
                    r="8"
                    fill={activeColor.stroke}
                    fillOpacity="0.2"
                  />
                  <circle
                    cx={getX(hoveredIndex)}
                    cy={getY(data[hoveredIndex].value)}
                    r="4"
                    fill={activeColor.stroke}
                    stroke="#0a0a0a"
                    strokeWidth="1.5"
                    style={{ filter: 'drop-shadow(0 0 4px ' + activeColor.shadow + ')' }}
                  />
                </g>
              )}
            </>
          )}

          {/* X Axis Labels */}
          {data.map((d, i) => {
            const x = layout === 'line'
              ? getX(i)
              : padding.left + (i / data.length) * chartWidth + (chartWidth / data.length) / 2;
            
            // Show labels conditionally if there are too many items to fit
            const interval = Math.ceil(data.length / 10);
            if (i % interval !== 0 && i !== data.length - 1) return null;

            return (
              <text
                key={i}
                x={x}
                y={svgHeight - 12}
                fill="#a1a1aa"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                className="font-sans"
              >
                {d.label}
              </text>
            );
          })}

          {/* Transparent Hover Hit Bands */}
          {data.map((_, i) => {
            const bandWidth = chartWidth / data.length;
            const x = padding.left + i * bandWidth;
            return (
              <rect
                key={i}
                x={x}
                y={padding.top}
                width={bandWidth}
                height={chartHeight}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {/* HTML Tooltip overlay */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                left: `${getX(hoveredIndex) - 60}px`,
                top: `${Math.max(0, getY(data[hoveredIndex].value) - 65)}px`,
              }}
              className="pointer-events-none z-10 w-32 glass-card bg-gym-gray-900 border border-gym-gray-800 p-2.5 rounded-xl text-center shadow-xl shadow-black/60"
            >
              <p className="text-[10px] text-gym-gray-400 font-semibold uppercase tracking-wider">
                {data[hoveredIndex].label}
              </p>
              <p className={`text-sm font-bold mt-0.5 ${activeColor.text}`}>
                {data[hoveredIndex].value}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
