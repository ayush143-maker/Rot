import { useState } from "react";

type Props = {
  marks: string[];
  onAdd: (line: string) => void;
};

export function Guestbook({ marks, onAdd }: Props) {
  const [line, setLine] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const clean = line.trim().slice(0, 100);
    if (!clean) return;
    onAdd(clean);
    setLine("");
  }

  return (
    <section className="guestbook" aria-labelledby="guestbook-title">
      <h2 id="guestbook-title" className="kicker">
        the guestbook
      </h2>
      <p className="guestbook-sub">
        leave a mark for the dead. it will be scratched in faintly, like
        everything else here.
      </p>

      <form className="guestbook-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="mark-input">
          leave a mark for the dead
        </label>
        <input
          id="mark-input"
          className="guestbook-input"
          type="text"
          value={line}
          maxLength={100}
          placeholder="leave a mark for the dead"
          autoComplete="off"
          onChange={(e) => setLine(e.target.value)}
        />
        <button type="submit" className="guestbook-btn">
          carve
        </button>
      </form>

      <ol className="marks">
        {marks.length === 0 ? (
          <li className="mark mark-empty">
            no marks yet. the dead are patient.
          </li>
        ) : (
          marks.map((m, i) => (
            <li className="mark" key={`${i}-${m}`}>
              <span className="mark-idx">
                mark {String(i + 1).padStart(2, "0")}
              </span>
              {m}
            </li>
          ))
        )}
      </ol>
    </section>
  );
}
