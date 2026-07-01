import { useState } from "react";
import { getPerson } from "../api";
import { useFetch } from "../hooks/useFetch";
import RandomPerson from "../components/RandomPerson";

function RandomPersonPage() {
  // Bumping reloadKey re-runs the fetch (it's in the deps array).
  const [reloadKey, setReloadKey] = useState(0);

  // One line replaces all the useState + useEffect + try/catch boilerplate.
  // `person` is fully typed as ApiState<Person>.
  const person = useFetch(getPerson, [reloadKey]);

  return (
    <article className="page">
      <h1>Random Person</h1>

      {person.loading && <p className="muted">Loading…</p>}
      {person.error && <p className="error">{person.error}</p>}
      {person.data && <RandomPerson person={person.data} />}

      <button
        className="nav__link nav__link--active"
        style={{ marginTop: "1rem" }}
        onClick={() => setReloadKey((k) => k + 1)}
      >
        New person
      </button>
    </article>
  );
}

export default RandomPersonPage;
