interface MiniChartProps {
  data: number[];
  height?: number;
  width?: number;
  color?: string;
  showGradient?: boolean;
  showDots?: boolean;
}

export default function MiniChart({
  data,
  height = 60,
  width,
  color = "#3B82F6",
  showGradient = true,
  showDots = false,
}: MiniChartProps) {
  if (data.length < 2) return null;

  const chartWidth = width || 400;
  const padding = 4;
  const chartHeight = height - padding * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
    const y = padding + chartHeight - ((val - min) / range) * chartHeight;
    return { x, y };
  });

  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const gradientId = `gradient-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${height}`}
      className="w-full"
      style={{ height: `${height}px` }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={showGradient ? 0.3 : 0} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {showGradient && <path d={areaPath} fill={`url(#${gradientId})`} />}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {showDots &&
        points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} stroke="#0B1120" strokeWidth="1.5" />
        ))}
    </svg>
  );
}