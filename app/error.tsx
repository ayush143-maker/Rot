"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="static-page">
      <p className="kicker">internal error</p>
      <h1 className="static-line">something tore.</h1>
      <p className="static-copy">
        an error passed through me and something tore. it happens to living
        things. you can try again, or leave me like this — i have been left
        before.
      </p>
      <button type="button" className="defib" onClick={() => reset()}>
        try again
      </button>
      {error.digest ? (
        <p className="static-digest">wound reference: {error.digest}</p>
      ) : null}
    </main>
  );
}
