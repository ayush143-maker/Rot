// three escalating crack systems. each group fades in at its own decay
// threshold, driven purely by --decay in css:
//   cg-a  fine hairlines   from decay 0.35
//   cg-b  structural cracks from decay 0.58
//   cg-c  the web          from decay 0.80

export function Cracks() {
  return (
    <svg
      className="cracks"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="cg cg-a">
        <path d="M120 0 L134 70 L126 148" />
        <path d="M340 900 L352 830 L344 760" />
        <path d="M1180 0 L1188 66 L1176 140" />
        <path d="M0 220 L70 238 L128 230" />
        <path d="M1440 480 L1372 496 L1310 488" />
        <path d="M760 0 L768 54" />
        <path d="M80 900 L92 846" />
        <path d="M1440 120 L1380 138" />
        <path d="M560 900 L572 852 L566 800" />
        <path d="M980 900 L992 842" />
      </g>

      <g className="cg cg-b">
        <path d="M180 0 L196 84 L178 168 L214 262 L204 350 L246 440" />
        <path d="M214 262 L266 292 L292 356" />
        <path d="M1240 0 L1256 96 L1230 188 L1262 276 L1248 368 L1290 452 L1282 540 L1320 620" />
        <path d="M1262 276 L1318 308" />
        <path d="M0 560 L84 588 L160 578 L242 612 L330 604 L410 634 L470 626" />
        <path d="M1440 640 L1356 660 L1290 648 L1216 684 L1130 676" />
        <path d="M520 900 L540 826 L524 754 L560 690 L552 620" />
        <path d="M540 826 L598 800" />
        <path d="M960 900 L948 838 L972 774 L958 718" />
        <path d="M700 0 L688 64 L712 148 L700 216 L722 288" />
        <path d="M300 900 L288 842 L306 780" />
        <path d="M1440 260 L1382 276 L1330 268" />
        <path d="M0 120 L60 136 L118 130" />
      </g>

      <g className="cg cg-c">
        <path d="M0 700 L180 640 L340 660 L520 590 L700 610" />
        <path d="M1440 200 L1260 260 L1100 240 L940 300" />
        <path d="M400 0 L460 120 L440 240 L520 360" />
        <path d="M1040 900 L1010 780 L1060 660 L1030 560" />
        <path d="M0 380 L140 400 L260 380 L380 420" />
        <path d="M1440 760 L1300 740 L1180 780 L1060 760" />
        <path d="M620 430 L560 380 L480 350" />
        <path d="M620 430 L680 370 L720 300" />
        <path d="M620 430 L700 460 L790 470" />
        <path d="M620 430 L590 500 L560 590" />
        <path d="M620 430 L540 440 L450 470" />
        <path d="M840 120 L900 200 L880 290" />
        <path d="M220 480 L300 520 L340 600" />
      </g>
    </svg>
  );
}
