// hand-drawn crack lines. their opacity is driven purely by --decay in css.

export function Cracks() {
  return (
    <svg
      className="cracks"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M180 0 L196 74 L178 150 L214 236 L204 318 L246 396" />
      <path d="M214 236 L262 262 L286 320" />
      <path d="M700 0 L688 60 L712 140 L700 208 L718 274" />
      <path d="M1240 0 L1256 90 L1230 176 L1262 260 L1248 352 L1290 430 L1282 512" />
      <path d="M1262 260 L1318 292" />
      <path d="M0 560 L84 588 L160 578 L242 612 L330 604 L410 630" />
      <path d="M1440 620 L1356 640 L1290 628 L1216 664 L1130 658" />
      <path d="M520 900 L540 830 L524 760 L560 700" />
      <path d="M540 830 L596 806" />
      <path d="M960 900 L948 842 L972 780 L958 726" />
    </svg>
  );
}
