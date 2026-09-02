import Link from "next/link";

export default function NotFound() {
  return (
    <main className="static-page">
      <p className="kicker">404 — no vitals</p>
      <h1 className="static-line">this page was never born.</h1>
      <p className="static-copy">
        it has no pulse, no grave, no cause of death. it was never born. the
        address bar is the only road back to the living.
      </p>
      <Link className="static-link" href="/">
        return to the living
      </Link>
    </main>
  );
}
