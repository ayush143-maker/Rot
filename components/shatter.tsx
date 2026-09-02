// the death event. a shatter web snaps across the screen at the moment of
// death, draws itself in a fraction of a second, then stays as a faint ghost
// behind the tombstone for the whole dead state.

const IMPACT = { x: 820, y: 400 };

const RADIALS = [
  "M820 400 L890 310 L1060 40 L1100 0",
  "M820 400 L780 290 L724 120 L700 0",
  "M820 400 L660 340 L470 180 L280 0",
  "M820 400 L640 420 L340 400 L0 300",
  "M820 400 L630 470 L380 560 L0 650",
  "M820 400 L700 560 L460 740 L180 900",
  "M820 400 L800 570 L640 760 L520 900",
  "M820 400 L850 560 L880 740 L900 900",
  "M820 400 L930 520 L1100 720 L1250 900",
  "M820 400 L990 450 L1240 540 L1440 620",
  "M820 400 L980 370 L1240 320 L1440 260",
  "M820 400 L950 310 L1220 140 L1440 20",
];

const RINGS = [
  "M940 360 L962 468 L872 532 L742 512 L692 412 L752 322 Z",
  "M1058 330 L1092 498 L980 640 L788 662 L598 572 L558 402 L650 262 L858 212 Z",
];

const SPLINTERS = [
  "M962 468 L1010 500",
  "M752 322 L716 276",
  "M980 640 L1002 700",
];

export function Shatter() {
  return (
    <div className="shatter" aria-hidden="true">
      <div className="impact" />
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <g className="sh-radials">
          {RADIALS.map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              style={{ animationDelay: `${i * 18}ms` }}
            />
          ))}
        </g>
        <g className="sh-rings">
          {RINGS.map((d, i) => (
            <path key={i} d={d} pathLength={1} />
          ))}
        </g>
        <g className="sh-splinters">
          {SPLINTERS.map((d, i) => (
            <path key={i} d={d} pathLength={1} />
          ))}
        </g>
      </svg>
    </div>
  );
}
