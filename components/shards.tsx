// falling debris. glass shards break off the screen and drop with gravity,
// nearest the impact first, edge slabs last. dust follows.

import type { CSSProperties } from "react";

type Shard = {
  pts: string;
  dx: number;
  rot: number;
  del: number;
  dur: number;
};

const SHARDS: Shard[] = [
  // inner ring — closest to the impact, falls first
  { pts: "820,400 752,322 940,360", dx: -30, rot: -40, del: 1.0, dur: 1.6 },
  { pts: "820,400 940,360 962,468", dx: 60, rot: 55, del: 1.06, dur: 1.7 },
  { pts: "820,400 962,468 872,532", dx: 20, rot: -65, del: 1.12, dur: 1.55 },
  { pts: "820,400 872,532 742,512", dx: -15, rot: 35, del: 1.18, dur: 1.75 },
  { pts: "820,400 742,512 692,412", dx: -70, rot: -30, del: 1.24, dur: 1.6 },
  { pts: "820,400 692,412 752,322", dx: -45, rot: 70, del: 1.3, dur: 1.7 },
  // outer ring
  { pts: "940,360 962,468 1092,498 1058,330", dx: 90, rot: 45, del: 1.5, dur: 1.9 },
  { pts: "962,468 872,532 980,640 1092,498", dx: 55, rot: -50, del: 1.6, dur: 2.0 },
  { pts: "872,532 742,512 788,662 980,640", dx: 10, rot: 25, del: 1.7, dur: 1.85 },
  { pts: "742,512 692,412 558,402 598,572", dx: -90, rot: -35, del: 1.8, dur: 2.05 },
  { pts: "692,412 752,322 650,262 558,402", dx: -110, rot: 60, del: 1.9, dur: 1.95 },
  { pts: "752,322 940,360 858,212 650,262", dx: 30, rot: -20, del: 2.0, dur: 2.1 },
  // edge slabs — the last, heaviest pieces
  { pts: "0,0 400,0 300,220 0,260", dx: -60, rot: -12, del: 2.2, dur: 2.3 },
  { pts: "420,0 1020,0 880,150 560,120", dx: 25, rot: 8, del: 2.35, dur: 2.2 },
  { pts: "1040,0 1440,0 1440,240 1180,180", dx: 70, rot: 14, del: 2.5, dur: 2.25 },
  { pts: "0,620 260,560 340,900 0,900", dx: -40, rot: -9, del: 2.6, dur: 2.1 },
  { pts: "1180,900 1440,640 1440,900", dx: 50, rot: 18, del: 2.7, dur: 2.0 },
];

const MOTES = [
  { x: 760, y: 380, s: 7, dx: -25, del: 2.3, dur: 2.4 },
  { x: 900, y: 430, s: 5, dx: 40, del: 2.5, dur: 2.6 },
  { x: 840, y: 520, s: 9, dx: 15, del: 2.7, dur: 2.2 },
  { x: 700, y: 300, s: 5, dx: -50, del: 2.9, dur: 2.8 },
  { x: 980, y: 350, s: 6, dx: 65, del: 3.1, dur: 2.5 },
  { x: 620, y: 450, s: 8, dx: -35, del: 3.3, dur: 2.7 },
  { x: 1050, y: 520, s: 5, dx: 30, del: 3.5, dur: 2.3 },
  { x: 560, y: 340, s: 6, dx: -60, del: 3.7, dur: 2.9 },
];

export function Shards() {
  return (
    <div className="shards" aria-hidden="true">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {SHARDS.map((s, i) => (
          <polygon
            key={i}
            className="shard"
            points={s.pts}
            style={
              {
                "--dx": `${s.dx}px`,
                "--rot": `${s.rot}deg`,
                animationDelay: `${s.del}s`,
                animationDuration: `${s.dur}s`,
              } as CSSProperties
            }
          />
        ))}
        {MOTES.map((m, i) => (
          <rect
            key={i}
            className="mote"
            x={m.x}
            y={m.y}
            width={m.s}
            height={m.s}
            style={
              {
                "--dx": `${m.dx}px`,
                "--rot": "140deg",
                animationDelay: `${m.del}s`,
                animationDuration: `${m.dur}s`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}
