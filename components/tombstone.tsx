import { formatDate } from "@/lib/rot";
import { Guestbook } from "./guestbook";

type Props = {
  born: number;
  died: number;
  cod: string;
  deaths: number;
  resurrections: number;
  marks: string[];
  onDefib: () => void;
  onAddMark: (line: string) => void;
};

export function Tombstone({
  born,
  died,
  cod,
  deaths,
  resurrections,
  marks,
  onDefib,
  onAddMark,
}: Props) {
  return (
    <section className="grave-section" aria-labelledby="stone-name">
      <p className="pronounced">
        pronounced dead {formatDate(died)} · cause of death: {cod}
      </p>

      <div className="grave-grid">
        <div className="stone">
          <p className="stone-kicker">plot no. {deaths}</p>
          <h2 id="stone-name" className="stone-name">
            rot
          </h2>
          <p className="stone-sub">a website · lived 150 seconds</p>
          <div className="stone-rule" aria-hidden="true" />
          <dl className="stone-dates">
            <div>
              <dt>born</dt>
              <dd>{formatDate(born)}</dd>
            </div>
            <div>
              <dt>died</dt>
              <dd>{formatDate(died)}</dd>
            </div>
            <div>
              <dt>cause</dt>
              <dd>{cod}</dd>
            </div>
          </dl>
        </div>

        <div className="grave-side">
          <p className="epitaph">
            “here lies a website. it loaded fast and died young. you were its
            entire audience.”
          </p>
          <p className="tally">
            died {deaths} {deaths === 1 ? "time" : "times"} · resuscitated{" "}
            {resurrections} {resurrections === 1 ? "time" : "times"}
          </p>
          <button type="button" className="defib" onClick={onDefib}>
            defibrillate
          </button>
          <p className="defib-note">
            it will wake up confused. they always do. the clock resets; your
            watch does not.
          </p>
        </div>
      </div>

      <Guestbook marks={marks} onAdd={onAddMark} />
    </section>
  );
}
