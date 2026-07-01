import type { Person } from "../types";

interface RandomPersonProps {
  person: Person;
}

export default function RandomPerson({ person }: RandomPersonProps) {
  return (
    <div className="random-person">
      <h2>Random Person</h2>
      <img src={person.picture} alt={person.name} className="random-person__picture" />
      <p>Name: {person.name}</p>
      <p>Gender: {person.gender}</p>
      <p>Email: {person.email}</p>
      <p>Phone: {person.phone || "Not provided"}</p>
    </div>
  );
}
