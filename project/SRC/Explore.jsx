import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Filter,
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Ticket,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const events = [
  {
    id: 1,
    title: "Sunset Music Festival",
    category: "Music",
    date: "Oct 18, 2026",
    time: "6:00 PM",
    venue: "HITEX Exhibition Center",
    city: "Hyderabad",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Future Tech Summit",
    category: "Technology",
    date: "Nov 07, 2026",
    time: "10:00 AM",
    venue: "T-Hub",
    city: "Hyderabad",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Hyderabad Food Carnival",
    category: "Food",
    date: "Oct 25, 2026",
    time: "12:00 PM",
    venue: "NTR Gardens",
    city: "Hyderabad",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Stand Up Night",
    category: "Comedy",
    date: "Oct 31, 2026",
    time: "7:30 PM",
    venue: "Shilpakala Vedika",
    city: "Hyderabad",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "Design & Creative Workshop",
    category: "Workshop",
    date: "Nov 14, 2026",
    time: "11:00 AM",
    venue: "The Park Hyderabad",
    city: "Hyderabad",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Hyderabad Business Meetup",
    category: "Business",
    date: "Nov 21, 2026",
    time: "5:00 PM",
    venue: "Novotel HICC",
    city: "Hyderabad",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  },
];

const categories = [
  "All",
  "Music",
  "Technology",
  "Food",
  "Comedy",
  "Workshop",
  "Business",
];

function Explore() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState("Popular");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("eventoraFavorites") || "[]"); }
    catch { return []; }
  });
  const toggleFavorite = (event) => {
    setFavorites((current) => {
      const exists = current.some((item) => String(item.id) === String(event.id));
      const next = exists
        ? current.filter((item) => String(item.id) !== String(event.id))
        : [...current, { ...event, location: event.location || [event.venue, event.city].filter(Boolean).join(", ") }];
      localStorage.setItem("eventoraFavorites", JSON.stringify(next));
      return next;
    });
  };
  const [customEvents, setCustomEvents] = useState(() => {
    try { return JSON.parse(localStorage.getItem("customEvents") || "[]"); }
    catch { return []; }
  });

  // Refresh custom events whenever the page becomes visible again.
  const allEvents = [...customEvents, ...events];
  const filteredEvents = useMemo(() => {
    let result = allEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.category.toLowerCase().includes(search.toLowerCase()) ||
        (event.venue || event.location || "").toLowerCase().includes(search.toLowerCase()) ||
        (event.city || "").toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || event.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort, customEvents]);

  return (
    <main className="explore-page">
      <div className="explore-container">

        <section className="explore-hero">
          <div>
            <span className="explore-kicker">
              DISCOVER EXPERIENCES
            </span>

            <h1>
              Find something
              <span> unforgettable.</span>
            </h1>

            <p>
              Explore concerts, workshops, food festivals,
              comedy nights and more happening around you.
            </p>
          </div>

          <div className="explore-hero-ticket">
            <Ticket size={34} />
            <span>Live events</span>
            <strong>50+</strong>
          </div>
        </section>

        <section className="explore-search-area">

          <div className="explore-search-box">
            <Search size={20} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search events, venues or categories..."
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="explore-clear-btn"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="button"
            className={`explore-filter-btn ${
              showFilters ? "active" : ""
            }`}
            onClick={() =>
              setShowFilters((current) => !current)
            }
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

        </section>

        <section className="explore-toolbar">

          <div className="explore-categories">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item
                    ? "explore-category active"
                    : "explore-category"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="explore-sort">
            <Filter size={16} />

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
            >
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

        </section>

        {showFilters && (
          <section className="explore-filter-panel">
            <div>
              <span>Location</span>
              <strong>
                <MapPin size={15} />
                Hyderabad
              </strong>
            </div>

            <div>
              <span>Date</span>
              <strong>
                <CalendarDays size={15} />
                All dates
              </strong>
            </div>

            <div>
              <span>Price</span>
              <strong>
                <Ticket size={15} />
                Any price
              </strong>
            </div>
          </section>
        )}

        <section className="explore-results-header">
          <div>
            <span className="explore-kicker">
              EXPLORE EVENTS
            </span>

            <h2>
              {search
                ? `Results for "${search}"`
                : "Happening soon"}
            </h2>
          </div>

          <span className="explore-result-count">
            {filteredEvents.length} events
          </span>
        </section>

        {filteredEvents.length > 0 ? (
          <section className="explore-grid">
            {filteredEvents.map((event) => (
              <article className="explore-event-card" key={event.id}>

                <Link
                  to={`/event/${event.id}`}
                  className="explore-image-wrap"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                  />

                  <span className="explore-card-category">
                    {event.category}
                  </span>

                  <span className="explore-price">
                    ₹{event.price}
                  </span>
                </Link>
                <button
                  type="button"
                  className={`explore-favorite-button ${favorites.some((item) => String(item.id) === String(event.id)) ? "selected" : ""}`}
                  onClick={() => toggleFavorite(event)}
                  aria-label={favorites.some((item) => String(item.id) === String(event.id)) ? "Remove from favorites" : "Add to favorites"}
                  title={favorites.some((item) => String(item.id) === String(event.id)) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart size={19} fill={favorites.some((item) => String(item.id) === String(event.id)) ? "currentColor" : "none"} />
                </button>

                <div className="explore-card-content">

                  <h3>{event.title}</h3>

                  <div className="explore-card-detail">
                    <CalendarDays size={15} />
                    <span>{event.date}</span>
                  </div>

                  <div className="explore-card-detail">
                    <Clock3 size={15} />
                    <span>{event.time}</span>
                  </div>

                  <div className="explore-card-detail">
                    <MapPin size={15} />
                    <span>
                      {event.venue}, {event.city}
                    </span>
                  </div>

                  <div className="explore-card-footer">
                    <span>
                      Starting at{" "}
                      <strong>₹{event.price}</strong>
                    </span>

                    <Link
                      to={`/event/${event.id}`}
                      className="explore-view-btn"
                    >
                      View
                      <ArrowRight size={15} />
                    </Link>
                  </div>

                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="explore-empty">
            <div className="explore-empty-icon">
              <Search size={27} />
            </div>

            <h3>No events found</h3>

            <p>
              Try another search term or choose a different
              category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </section>
        )}

      </div>
    </main>
  );
}

export default Explore;