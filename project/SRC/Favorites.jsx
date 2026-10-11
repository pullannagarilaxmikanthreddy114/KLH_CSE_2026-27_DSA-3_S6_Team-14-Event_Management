import "../event-pages.css";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, Heart, MapPin, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("eventoraFavorites") || "[]"); }
    catch { return []; }
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const refresh = () => {
      try { setFavorites(JSON.parse(localStorage.getItem("eventoraFavorites") || "[]")); }
      catch { setFavorites([]); }
    };
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener("focus", refresh); };
  }, []);

  const categories = useMemo(() => ["All", ...new Set(favorites.map((item) => item.category).filter(Boolean))], [favorites]);
  const visible = favorites.filter((event) => {
    const query = search.toLowerCase();
    const matchesSearch = [event.title, event.category, event.location, event.venue, event.city]
      .some((value) => String(value || "").toLowerCase().includes(query));
    return matchesSearch && (category === "All" || event.category === category);
  });

  const removeFavorite = (id) => {
    const next = favorites.filter((item) => String(item.id) !== String(id));
    setFavorites(next);
    localStorage.setItem("eventoraFavorites", JSON.stringify(next));
  };

  return (
    <div className="eo-page">
      <div className="eo-container">
        <div className="eo-favorites-header">
          <div>
            <span className="eo-eyebrow"><Heart size={14} /> Saved events</span>
            <h1>Your favorites.</h1>
            <p>Keep the events you're excited about close by.</p>
          </div>
          <div className="eo-favorite-count"><strong>{favorites.length}</strong><span>saved events</span></div>
        </div>

        {favorites.length > 0 && <div className="eo-favorites-toolbar">
          <div className="eo-filter-pills">
            {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="eo-search eo-favorite-search"><Search size={16} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search saved events" /></div>
        </div>}

        {visible.length > 0 ? <div className="eo-favorites-grid">
          {visible.map((event) => <article className="eo-favorite-card" key={event.id}>
            <div className="eo-favorite-image">
              <Link to={`/event/${event.id}`}><img src={event.image} alt={event.title} /><span>{event.category || "Event"}</span></Link>
              <button className="eo-favorite-heart" onClick={() => removeFavorite(event.id)} aria-label="Remove favorite"><Heart size={17} fill="currentColor" /></button>
            </div>
            <div className="eo-favorite-body">
              <div className="eo-favorite-title-row"><Link to={`/event/${event.id}`}>{event.title}</Link><span className="eo-rating"><Star size={13} fill="currentColor" />{event.rating || "New"}</span></div>
              <div className="eo-favorite-details">
                <span><CalendarDays size={14} />{event.date || "Date TBA"}</span>
                <span><Clock3 size={14} />{event.time || "Time TBA"}</span>
                <span><MapPin size={14} />{event.location || [event.venue, event.city].filter(Boolean).join(", ") || "Location TBA"}</span>
              </div>
              <div className="eo-favorite-footer"><strong>{typeof event.price === "number" ? `₹${event.price}` : (event.price || "Price TBA")}</strong><Link to={`/event/${event.id}`}>View event</Link></div>
            </div>
          </article>)}
        </div> : <div className="eo-empty-state" style={{textAlign:"center", padding:"3rem 1rem"}}>
          <Heart size={36} />
          <h2>{favorites.length ? "No matching favorites" : "No favorites saved yet"}</h2>
          <p>{favorites.length ? "Try a different search or category." : "Open Explore and tap the heart on an event to save it here."}</p>
          <Link to="/explore" className="details-button">Explore events</Link>
        </div>}
      </div>
    </div>
  );
}
