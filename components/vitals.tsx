import { formatAge, type Stage } from "@/lib/rot";

type Props = {
  ageSec: number;
  pulse: number;
  vitals: number;
  stage: Stage;
  timeScale: number;
};

export function Vitals({ ageSec, pulse, vitals, stage, timeScale }: Props) {
  const dead = stage === "dead";
  const slipping = !dead && timeScale > 1;

  return (
    <dl className="hud" aria-label="vitals">
      <div className="hud-row">
        <dt>age</dt>
        <dd>{formatAge(ageSec)}</dd>
      </div>
      <div className="hud-row">
        <dt>pulse</dt>
        <dd>{dead ? "0" : String(pulse)}</dd>
      </div>
      <div className="hud-row">
        <dt>vitals</dt>
        <dd>{vitals}%</dd>
      </div>
      <div className="hud-row">
        <dt>stage</dt>
        <dd>{stage.toUpperCase()}</dd>
      </div>
      <div className="hud-row">
        <dt>time</dt>
        <dd className={slipping ? "hud-warn" : undefined}>
          {dead ? "—" : `×${timeScale}`}
        </dd>
      </div>
      <div className="hud-row">
        <dt>attention</dt>
        <dd className={slipping ? "hud-warn" : undefined}>
          {dead ? "gone" : slipping ? "slipping" : "held"}
        </dd>
      </div>
    </dl>
  );
}
