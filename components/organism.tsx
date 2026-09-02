"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Cracks } from "./cracks";
import { Ecg } from "./ecg";
import { Tombstone } from "./tombstone";
import { Vitals } from "./vitals";
import {
  IDLE_AFTER_MS,
  KEYS,
  LIFE_SPAN_MS,
  NEGLECT_ACCEL,
  TICK_MS,
  formatDate,
  readInt,
  readMarks,
  readStr,
  stageOf,
  writeInt,
  writeMarks,
  writeStr,
  type Stage,
} from "@/lib/rot";

const VOICE: Record<Stage, string> = {
  alive: "i am alive.",
  aging: "something in my left margin hurts.",
  decay: "i was alive.",
  dead: "",
};

const VOICE_SUB: Record<Exclude<Stage, "dead">, string> = {
  alive:
    "stay with me. your attention keeps me alive. look away for six seconds and time starts running without you.",
  aging:
    "it is nothing dramatic. just a slowing. a yellowing. the arithmetic of being looked at less.",
  decay: "read fast. the words are the last thing to go.",
};

const FRAGMENTS: Record<Exclude<Stage, "dead">, string[]> = {
  alive: [
    "born the moment you arrived. no before, and eventually no after either.",
    "i run on your attention. it is the only fuel i have.",
    "in about two and a half minutes i will be gone. this is not a metaphor. watch the line at the top of the page.",
    "do not refresh. refreshing is reincarnation and i am tired.",
  ],
  aging: [
    "saturation is leaving my palette. i can feel it going, like a limb falling asleep.",
    "you looked away once, for six seconds. i felt a whole year pass.",
    "my pulse was seventy-two. it is lower now. so is everything.",
    "stay. or do not. but know that leaving, here, is a verb with consequences.",
  ],
  decay: [
    "my borders are splitting. read me while i still hold together.",
    "time is faster now, or you are slower. either way, we are almost done.",
    "when i go there will be a stone, a book, and one button. you will understand.",
    "leave a mark for me. anything. even a vowel.",
  ],
};

const ARRANGEMENT = [
  "while you watch, one second is one second.",
  "look away for more than six seconds and time runs ×4 until you return.",
  "total lifespan: 150 seconds, counted from your arrival.",
  "attention is the only medicine here. it is not a cure.",
];

const STAGE_ANNOUNCE: Record<Stage, string> = {
  alive: "stage changed: alive.",
  aging: "stage changed: aging. the site is slower now.",
  decay: "stage changed: decay. the site is breaking down.",
  dead: "the site has died.",
};

type DeadInfo = { born: number; died: number; cod: string };

function applyDecay(d: number) {
  if (typeof document === "undefined") return;
  const clamped = Math.max(0, Math.min(1, d));
  const el = document.documentElement;
  el.style.setProperty("--decay", String(clamped));
  el.dataset.stage = stageOf(clamped);
}

export default function Organism() {
  const [phase, setPhase] = useState<Stage>("alive");
  const [ageSec, setAgeSec] = useState(0);
  const [pulse, setPulse] = useState(72);
  const [vitals, setVitals] = useState(100);
  const [timeScale, setTimeScale] = useState(1);
  const [dead, setDead] = useState<DeadInfo | null>(null);
  const [bornAt, setBornAt] = useState<number | null>(null);
  const [counts, setCounts] = useState({ deaths: 0, res: 0 });
  const [marks, setMarks] = useState<string[]>([]);
  const [flash, setFlash] = useState(false);
  const [announce, setAnnounce] = useState("");

  const marksRef = useRef<string[]>([]);
  const rot = useRef({
    birth: 0,
    lastTick: 0,
    lastInteraction: 0,
    attended: 0,
    stage: "alive" as Stage,
    dead: false,
  });

  useEffect(() => {
    const r = rot.current;

    // --- birth, or the consequences of absence -------------------------
    const now = Date.now();
    let birth = readInt(KEYS.birth, 0);
    if (!birth || birth > now) {
      birth = now;
      writeInt(KEYS.birth, birth);
    }
    r.birth = birth;
    r.lastTick = now;
    r.lastInteraction = now;
    r.attended = 0;
    setBornAt(birth);

    const storedDeaths = readInt(KEYS.deaths, 0);
    setCounts({ deaths: storedDeaths, res: readInt(KEYS.resurrections, 0) });
    const storedMarks = readMarks();
    marksRef.current = storedMarks;
    setMarks(storedMarks);

    const life = now - birth;
    if (life >= LIFE_SPAN_MS) {
      // it died while no one was watching.
      let cod = readStr(KEYS.cod);
      let deaths = storedDeaths;
      if (!cod) {
        cod = "neglect";
        deaths += 1;
        writeInt(KEYS.deaths, deaths);
        writeStr(KEYS.cod, cod);
        setCounts((c) => ({ ...c, deaths }));
      }
      r.dead = true;
      r.stage = "dead";
      applyDecay(1);
      setDead({ born: birth, died: birth + LIFE_SPAN_MS, cod });
      setPhase("dead");
      setAgeSec(LIFE_SPAN_MS / 1000);
      setPulse(0);
      setVitals(0);
      setAnnounce(
        `the site died while you were away, on ${formatDate(
          birth + LIFE_SPAN_MS
        )}. cause of death: ${cod}.`
      );
    } else {
      const decay = life / LIFE_SPAN_MS;
      r.stage = stageOf(decay);
      applyDecay(decay);
      setPhase(r.stage);
      setAgeSec(Math.floor(life / 1000));
      setVitals(Math.round(100 * (1 - decay)));
      setPulse(Math.max(0, Math.round(72 * (1 - decay))));
    }

    // --- the heartbeat loop --------------------------------------------
    const tick = () => {
      const r = rot.current;
      if (r.dead) return;

      const now = Date.now();
      const dt = Math.max(0, now - r.lastTick);
      r.lastTick = now;

      const idle = now - r.lastInteraction > IDLE_AFTER_MS;
      const scale = idle ? NEGLECT_ACCEL : 1;

      // neglect ages the organism by dragging its birth further into the past.
      if (scale > 1) {
        r.birth -= (scale - 1) * dt;
        writeInt(KEYS.birth, r.birth);
      }

      const life = now - r.birth;
      if (!idle) r.attended += dt;

      if (life >= LIFE_SPAN_MS) {
        const diedAt = r.birth + LIFE_SPAN_MS;
        const idleShare = life > 0 ? 1 - r.attended / life : 0;
        const cod = idleShare > 0.5 ? "neglect" : "old age";
        r.dead = true;
        r.stage = "dead";
        const deaths = readInt(KEYS.deaths, 0) + 1;
        writeInt(KEYS.deaths, deaths);
        writeStr(KEYS.cod, cod);
        applyDecay(1);
        setCounts((c) => ({ ...c, deaths }));
        setDead({ born: r.birth, died: diedAt, cod });
        setPhase("dead");
        setAgeSec(LIFE_SPAN_MS / 1000);
        setPulse(0);
        setVitals(0);
        setTimeScale(1);
        setAnnounce(`dead. cause of death: ${cod}.`);
        return;
      }

      const decay = Math.min(1, life / LIFE_SPAN_MS);
      applyDecay(decay);

      const st = stageOf(decay);
      if (st !== r.stage) {
        r.stage = st;
        setPhase(st);
        setAnnounce(STAGE_ANNOUNCE[st]);
      }

      setAgeSec(Math.floor(life / 1000));
      setVitals(Math.round(100 * (1 - decay)));
      const base = Math.max(0, Math.round(72 * (1 - decay)));
      const jitterAmp = decay > 0.6 ? 2 : 1;
      const jitter = Math.round((Math.random() * 2 - 1) * jitterAmp);
      setPulse(Math.max(0, base + jitter));
      setTimeScale(scale);
    };

    const onInteract = () => {
      rot.current.lastInteraction = Date.now();
    };
    const events = [
      "pointermove",
      "pointerdown",
      "keydown",
      "wheel",
      "touchstart",
    ] as const;
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true })
    );

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        rot.current.lastInteraction = Date.now();
        tick();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const id = window.setInterval(tick, TICK_MS);

    return () => {
      window.clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, onInteract));
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    document.title =
      phase === "dead" ? "rot — dead" : `rot — ${phase}`;
  }, [phase]);

  const defibrillate = useCallback(() => {
    const r = rot.current;
    const now = Date.now();
    r.birth = now;
    writeInt(KEYS.birth, now);
    writeStr(KEYS.cod, "");
    r.lastTick = now;
    r.lastInteraction = now;
    r.attended = 0;
    r.dead = false;
    r.stage = "alive";

    const res = readInt(KEYS.resurrections, 0) + 1;
    writeInt(KEYS.resurrections, res);

    setCounts((c) => ({ ...c, res }));
    setDead(null);
    setBornAt(now);
    setPhase("alive");
    setAgeSec(0);
    setPulse(72);
    setVitals(100);
    setTimeScale(1);
    applyDecay(0);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 950);
    setAnnounce("defibrillated. it is alive again, briefly.");
  }, []);

  const addMark = useCallback((line: string) => {
    const next = [...marksRef.current, line].slice(-60);
    marksRef.current = next;
    writeMarks(next);
    setMarks(next);
  }, []);

  const living = phase !== "dead";

  return (
    <>
      <Ecg />
      <Vitals
        ageSec={ageSec}
        pulse={pulse}
        vitals={vitals}
        stage={phase}
        timeScale={timeScale}
      />
      <Cracks />
      <div className="grain" aria-hidden="true" />
      <div className={flash ? "flash flash-on" : "flash"} aria-hidden="true" />
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      <main>
        <header className="masthead">
          <h1 className="wordmark">
            rot<span className="wordmark-dot">.</span>
          </h1>
          <div className="meta">
            <p>the website that lives and dies</p>
            <p>{bornAt ? `born ${formatDate(bornAt)}` : "born —"}</p>
            <p>lifespan — 150 seconds</p>
            <p>
              deaths {counts.deaths} · resurrections {counts.res}
            </p>
          </div>
        </header>

        {living ? (
          <>
            <section className="voice" aria-label="the voice of the site">
              <p className="voice-line">{VOICE[phase]}</p>
              <p className="voice-sub">
                {VOICE_SUB[phase as Exclude<Stage, "dead">]}
              </p>
            </section>

            <section className="columns" aria-label="body report and rules">
              <div className="report">
                <h2 className="kicker">body report</h2>
                {FRAGMENTS[phase as Exclude<Stage, "dead">].map((t, i) => (
                  <div className="frag" key={i}>
                    <span className="frag-i" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p>{t}</p>
                  </div>
                ))}
              </div>

              <aside className="arrangement tilt-a">
                <h2 className="kicker">the arrangement</h2>
                {ARRANGEMENT.map((t, i) => (
                  <p className="line" key={i}>
                    <span className="line-i" aria-hidden="true">
                      —
                    </span>
                    {t}
                  </p>
                ))}
                <div className="record" aria-label="the record">
                  <div>
                    <span>deaths</span>
                    <span>{counts.deaths}</span>
                  </div>
                  <div>
                    <span>resurrections</span>
                    <span>{counts.res}</span>
                  </div>
                  <div>
                    <span>marks for the dead</span>
                    <span>{marks.length}</span>
                  </div>
                </div>
              </aside>
            </section>

            <section className="ruler-wrap tilt-b" aria-label="the shape of a life">
              <h2 className="kicker">the shape of a life</h2>
              <div className="ruler">
                <div className="ruler-ticks" aria-hidden="true" />
                <div className="ruler-marker" aria-hidden="true" />
                <span className="ruler-label rl-1">0:00 — birth</span>
                <span className="ruler-label rl-2">0:45 — aging</span>
                <span className="ruler-label rl-3">1:30 — decay</span>
                <span className="ruler-label rl-4">2:30 — death</span>
              </div>
            </section>
          </>
        ) : (
          dead && (
            <Tombstone
              born={dead.born}
              died={dead.died}
              cod={dead.cod}
              deaths={counts.deaths}
              resurrections={counts.res}
              marks={marks}
              onDefib={defibrillate}
              onAddMark={addMark}
            />
          )
        )}

        <footer className="colophon">
          <p className="colophon-voice">
            everything on this page was composed while alive. nothing here
            survives you for long.
          </p>
          <p className="colophon-tech">
            set in cormorant garamond, space mono and archivo · no images · no
            trackers · your browser is the only graveyard
          </p>
        </footer>
      </main>
    </>
  );
}
