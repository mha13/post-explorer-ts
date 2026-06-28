interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

function SearchBar({ query, onQueryChange }: SearchBarProps) {
  // The DOM event is typed; we hand the parent just the string value.
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onQueryChange(e.target.value);
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Filter posts by title…"
      value={query}
      onChange={handleChange}
    />
  );
}

export default SearchBar;
