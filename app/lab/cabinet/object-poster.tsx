import type { ObjectKind } from "./projects";

export default function ObjectPoster({ kind }: { kind: ObjectKind }) {
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <ellipse cx="123" cy="205" rx="69" ry="11" fill="#385772" opacity=".13" />
      {kind === "data" && (
        <g>
          {[134, 91, 48].map((y) => (
            <g key={y}>
              <path d={`M65 ${y + 15}v34c0 22 112 22 112 0V${y + 15}`} fill="#e8e8db" stroke="#d0d4ca" />
              <ellipse cx="121" cy={y + 15} rx="56" ry="19" fill="#f8f8ef" stroke="#c6d0c9" />
              <path d={`M78 ${y + 44}c25 12 59 12 85 0`} stroke="#536c70" strokeWidth="3" />
              <rect x="130" y={y + 32} width="23" height="5" rx="2.5" fill="#d87755" />
            </g>
          ))}
          <ellipse cx="121" cy="63" rx="31" ry="10" stroke="#6b9b9b" strokeWidth="5" />
        </g>
      )}
      {kind === "speech" && (
        <g>
          <path d="M92 51V38c0-19 56-19 56 0v13" stroke="#d36d4b" strokeWidth="10" />
          <path d="m65 67 25-18h79l14 12v125l-24 17H78l-13-12Z" fill="#dadbca" />
          <rect x="65" y="64" width="98" height="139" rx="16" fill="#f7f5e7" />
          <circle cx="114" cy="124" r="35" fill="#d67554" />
          <circle cx="114" cy="124" r="27" fill="#3e5355" />
          <circle cx="114" cy="124" r="17" fill="#697b75" />
          <rect x="89" y="175" width="34" height="4" rx="2" fill="#586f6c" />
          <circle cx="140" cy="177" r="5" fill="#d67554" />
        </g>
      )}
      {kind === "events" && (
        <g>
          <path d="m68 56 25-15h73l18 14v126l-25 19H83l-15-13Z" fill="#bd694d" />
          <rect x="68" y="56" width="94" height="144" rx="12" fill="#dc8968" />
          <rect x="83" y="77" width="63" height="50" rx="5" fill="#f6f0dd" />
          <circle cx="104" cy="97" r="8" stroke="#536d66" strokeWidth="3" />
          <path d="M87 116h51m-16-23h17m-17 8h13" stroke="#536d66" strokeWidth="3" />
          <rect x="82" y="148" width="65" height="9" rx="3" fill="#5b5145" />
          <path d="M92 151h45l-2 65H90Z" fill="#f6f2df" />
          <path d="M100 174h25m-25 7h18m-22 21h32" stroke="#7e8a7d" strokeWidth="3" />
        </g>
      )}
      {kind === "search" && (
        <g>
          <path d="m72 176 91-6 21 18-23 19H75l-16-17Z" fill="#e5e8d9" />
          <rect x="109" y="137" width="19" height="48" rx="8" fill="#4c827e" transform="rotate(-23 109 137)" />
          <ellipse cx="129" cy="99" rx="53" ry="56" fill="#477a78" transform="rotate(-18 129 99)" />
          <ellipse cx="117" cy="104" rx="53" ry="56" fill="#78aaa2" transform="rotate(-18 117 104)" />
          <ellipse cx="117" cy="104" rx="40" ry="43" fill="#e7eddb" transform="rotate(-18 117 104)" />
          <circle cx="117" cy="104" r="23" stroke="#85b0a3" strokeWidth="2" />
          <path d="m105 115 25-24m-32 12h38m-20-19v39" stroke="#92b9aa" strokeWidth="2" />
          <circle cx="117" cy="104" r="5" fill="#d07856" />
        </g>
      )}
    </svg>
  );
}
