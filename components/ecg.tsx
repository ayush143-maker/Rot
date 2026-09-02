// the electrocardiogram along the top edge. the path is deterministic, so it
// renders identically on the server; only its animation classes change, and
// those are driven entirely by html[data-stage].

const BEAT =
  "h34 q5 0 10 -6 q5 6 10 6 h14 l5 6 l8 -28 l8 36 l5 -14 h10 q7 0 14 -10 q7 10 14 10 h108";

const PULSE_PATH = `M0 26 ${Array(6).fill(BEAT).join(" ")}`;
const FLAT_PATH = "M0 26 H1440";

export function Ecg() {
  return (
    <div className="ecg" aria-hidden="true">
      <svg
        className="ecg-svg"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          className="ecg-base"
          d={PULSE_PATH}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="ecg-live"
          d={PULSE_PATH}
          pathLength={1000}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="ecg-flat"
          d={FLAT_PATH}
          pathLength={1000}
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className="ecg-tag ecg-tag-l">vital signs</span>
      <span className="ecg-tag ecg-tag-r">do not resuscitate (or do)</span>
    </div>
  );
}
