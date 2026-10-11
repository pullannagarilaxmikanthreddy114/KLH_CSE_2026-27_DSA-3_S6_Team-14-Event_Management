import { Search, X } from "lucide-react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search events...",
}) {
  return (
    <div className="search-bar">
      <Search size={20} />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;