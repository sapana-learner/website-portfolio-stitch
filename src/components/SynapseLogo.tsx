import React from 'react';

interface SynapseLogoProps {
  size?: number | string;
  className?: string;
  animated?: boolean;
  withBackground?: boolean;
  glow?: boolean;
}

export const SynapseLogo: React.FC<SynapseLogoProps> = ({
  size = 48,
  className = '',
  animated = false,
  withBackground = true,
  glow = true,
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;
  const gradientId = `synapse-grad-${Math.random().toString(36).substring(2, 8)}`;
  const filterId = `synapse-glow-${Math.random().toString(36).substring(2, 8)}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle background container gradient */}
          <linearGradient id={`${gradientId}-bg`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B1124" />
            <stop offset="50%" stopColor="#070A17" />
            <stop offset="100%" stopColor="#050711" />
          </linearGradient>

          {/* Border highlight gradient */}
          <linearGradient id={`${gradientId}-border`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.35)" />
          </linearGradient>

          {/* S-Pathway neon gradient */}
          <linearGradient id={`${gradientId}-path`} x1="75" y1="25" x2="25" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="25%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="80%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>

          {/* Glowing filter */}
          <filter id={filterId} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {withBackground && (
          <>
            {/* Background container squircle */}
            <rect
              x="3"
              y="3"
              width="94"
              height="94"
              rx="24"
              fill={`url(#${gradientId}-bg)`}
              stroke={`url(#${gradientId}-border)`}
              strokeWidth="1.5"
            />
            {/* Ambient inner glow */}
            <circle cx="50" cy="50" r="32" fill="rgba(99, 102, 241, 0.08)" filter="blur(10px)" />
          </>
        )}

        {/* Ambient glow layer behind S path */}
        {glow && (
          <g opacity="0.85" filter={`url(#${filterId})`}>
            <path
              d="M 68 31 L 34 31 C 24 31 24 49 34 49 L 66 49 C 76 49 76 69 66 69 L 32 69"
              stroke={`url(#${gradientId}-path)`}
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}

        {/* Foreground crisp S path */}
        <path
          d="M 68 31 L 34 31 C 24 31 24 49 34 49 L 66 49 C 76 49 76 69 66 69 L 32 69"
          stroke={`url(#${gradientId}-path)`}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top-Right Cyan Terminal Dot */}
        <circle
          cx="68"
          cy="31"
          r="4.8"
          fill="#38BDF8"
          stroke="#E0F2FE"
          strokeWidth="1.2"
        />

        {/* Bottom-Left Purple Terminal Dot */}
        <circle
          cx="32"
          cy="69"
          r="4.8"
          fill="#C084FC"
          stroke="#F3E8FF"
          strokeWidth="1.2"
        />

        {/* Optional animated pulse bead */}
        {animated && (
          <circle r="3" fill="#FFFFFF">
            <animateMotion
              path="M 68 31 L 34 31 C 24 31 24 49 34 49 L 66 49 C 76 49 76 69 66 69 L 32 69"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
};
