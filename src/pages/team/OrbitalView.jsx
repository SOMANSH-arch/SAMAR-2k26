import React, { useMemo } from "react";

const OrbitalView = ({ name, primaryColor }) => {
  // Unique ID per instance to prevent SVG path conflicts
const cardId = useMemo(() => name.replace(/\s+/g, "-").toLowerCase(), [name]);

  const orbitalColors = useMemo(() => {
    // 20+ Space-themed vibrant colors
    const colors = [
      "#6366f1", "#22d3ee", "#f472b6", "#fbbf24", "#a855f7", "#34d399",
      "#ff0000", "#00ffcc", "#ff00ff", "#0088ff", "#7cfc00", "#ff4500",
      "#d8bfd8", "#00ced1", "#ff1493", "#00fa9a", "#ffd700", "#87ceeb",
      "#ff6347", "#40e0d0", "#9370db", "#f0e68c"
    ];

    const randomColor = () => {
      // Logic: 25% chance to return White, 75% chance for a random palette color
      const isWhite = Math.random() < 0.25; 
      if (isWhite) return "#ffffff";
      
      return colors[Math.floor(Math.random() * colors.length)];
    };

    return {
      color1: randomColor(),
      color2: randomColor(),
      // Adding a third for star-specific variety if needed
      starColor: randomColor() 
    };
  }, [name]);

  return (
    <svg viewBox="0 0 144 144" className="absolute inset-0 w-full h-full">
      <defs>
        <filter
          id={`starGlow-${cardId}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <path
          id={`orbitPath-${cardId}`}
          d="M 72,10 A 42,62 -25 1 1 71.9,10 Z"
          fill="none"
        />

        <linearGradient
          id={`gradient-${cardId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={orbitalColors.color1} stopOpacity="0" />
          <stop offset="50%" stopColor={orbitalColors.color2} stopOpacity="1" />
          <stop
            offset="100%"
            stopColor={orbitalColors.color1}
            stopOpacity="0"
          />
        </linearGradient>
      </defs>

      {/* Static Background Ring */}
      <use
        href={`#orbitPath-${cardId}`}
        stroke={orbitalColors.color1}
        strokeWidth="4"
        opacity="0.15"
      />

      {/* Animated Glowing Trail */}
      <use
        href={`#orbitPath-${cardId}`}
        stroke={`url(#gradient-${cardId})`}
        strokeWidth="3"
        strokeDasharray="100 300"
        style={{
          animation: "orbit-trail 4s linear infinite",
          strokeLinecap: "round",
        }}
      />

      {/* Star 1 */}
      <g filter={`url(#starGlow-${cardId})`}>
        <circle r="3" fill="#ffffff">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href={`#orbitPath-${cardId}`} />
          </animateMotion>
        </circle>
        <circle r="5" fill={orbitalColors.color2} opacity="0.6">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href={`#orbitPath-${cardId}`} />
          </animateMotion>
        </circle>
      </g>

      {/* Star 2 (Opposite Side) */}
      <g filter={`url(#starGlow-${cardId})`}>
        <circle r="3" fill="#ffffff">
          <animateMotion
            dur="4s"
            begin="-2s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#orbitPath-${cardId}`} />
          </animateMotion>
        </circle>
        <circle r="5" fill={orbitalColors.color1} opacity="0.6">
          <animateMotion
            dur="4s"
            begin="-2s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#orbitPath-${cardId}`} />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
};

export default OrbitalView;
