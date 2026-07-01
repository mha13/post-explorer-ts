import { useEffect, useState } from "react";
import type { Person } from "../types";
import { getPerson } from "../api";
import RandomPerson from "../components/RandomPerson";

function RandomPersonPage() {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // `reloadKey` bumps each time we want a NEW person → re-runs the effect.
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const result = await getPerson();
        if (!cancelled) setPerson(result);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load(); // ← called in the effect BODY, not the cleanup

    return () => {
      cancelled = true; // cleanup just cancels; it does NOT render
    };
  }, [reloadKey]);

  return (
    <article className="page">
      <h1>Random Person</h1>

      {loading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}

      {/* render the badge only when we actually have a person */}
      {person && <RandomPerson person={person} />}

      <button
        className="nav__link nav__link--active"
        style={{ marginTop: "1rem" }}
        onClick={() => setReloadKey((k) => k + 1)}
      >
        New person {reloadKey}
      </button>
    </article>
  );
}

export default RandomPersonPage;