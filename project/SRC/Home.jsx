import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Compass,
  MapPin,
  Search,
  Sparkles,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const featuredEvents = [
  {
    id: 1,
    title: "Sunset Music Festival",
    category: "Music",
    date: "Oct 18",
    city: "Hyderabad",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Future Tech Summit",
    category: "Technology",
    date: "Nov 07",
    city: "Hyderabad",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Hyderabad Food Carnival",
    category: "Food",
    date: "Oct 25",
    city: "Hyderabad",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
  },
];

const categories = [
  {
    name: "Music",
    icon: "♫",
    count: "12 events",
  },
  {
    name: "Technology",
    icon: "⌘",
    count: "8 events",
  },
  {
    name: "Food",
    icon: "✦",
    count: "15 events",
  },
  {
    name: "Comedy",
    icon: "☻",
    count: "7 events",
  },
];

function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="home-page">

      <section className="home-hero">
        <div className="home-hero-glow home-glow-one" />
        <div className="home-hero-glow home-glow-two" />

        <div className="home-container">

          <div className="home-hero-content">

            <span className="home-eyebrow">
              <Sparkles size={15} />
              DISCOVER · CONNECT · EXPERIENCE
            </span>

            <h1>
              Your next
              <span> great experience</span>
              starts here.
            </h1>

            <p>
              Discover concerts, workshops, food festivals,
              comedy nights and unforgettable experiences
              happening around you.
            </p>

            <div className="home-search">

              <Search size={20} />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="What are you looking for?"
              />

              <div className="home-search-location">
                <MapPin size={16} />
                Hyderabad
              </div>

              <Link
                to={
                  search
                    ? `/explore?search=${encodeURIComponent(
                        search
                      )}`
                    : "/explore"
                }
                className="home-search-btn"
              >
                Search
              </Link>

            </div>

            <div className="home-quick-links">
              <span>Popular:</span>

              <Link to="/explore">Music</Link>
              <Link to="/explore">Food</Link>
              <Link to="/explore">Technology</Link>
              <Link to="/explore">Comedy</Link>
            </div>

          </div>

          <div className="home-hero-visual">

            <div className="home-floating-card home-floating-top">
              <div>
                <CalendarDays size={17} />
              </div>
              <span>
                <strong>50+</strong>
                events this month
              </span>
            </div>

            <div className="home-hero-photo">
              <img
                src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=90"
                alt="People enjoying a live event"
              />

              <div className="home-photo-overlay">
                <span>LIVE EXPERIENCES</span>
                <strong>Make memories.</strong>
              </div>
            </div>

            <div className="home-floating-card home-floating-bottom">
              <Ticket size={18} />
              <span>
                <strong>Instant tickets</strong>
                <small>Secure & simple booking</small>
              </span>
            </div>

          </div>

        </div>
      </section>

      <section className="home-section home-categories">
        <div className="home-container">

          <div className="home-section-heading">
            <div>
              <span className="home-kicker">
                EXPLORE BY INTEREST
              </span>
              <h2>What are you into?</h2>
            </div>

            <Link to="/explore">
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-category-grid">

            {categories.map((category) => (
              <Link
                to="/explore"
                className="home-category-card"
                key={category.name}
              >
                <span className="home-category-icon">
                  {category.icon}
                </span>

                <span>
                  <strong>{category.name}</strong>
                  <small>{category.count}</small>
                </span>

                <ChevronRight size={18} />
              </Link>
            ))}

          </div>

        </div>
      </section>

      <section className="home-section home-featured">
        <div className="home-container">

          <div className="home-section-heading">
            <div>
              <span className="home-kicker">
                CURATED FOR YOU
              </span>
              <h2>Events worth showing up for</h2>
            </div>

            <Link to="/explore">
              Explore all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-featured-grid">

            {featuredEvents.map((event) => (
              <article
                className="home-event-card"
                key={event.id}
              >
                <Link
                  to={`/event/${event.id}`}
                  className="home-event-image"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                  />

                  <span>{event.category}</span>
                </Link>

                <div className="home-event-content">

                  <div className="home-event-date">
                    <CalendarDays size={15} />
                    {event.date}
                  </div>

                  <h3>{event.title}</h3>

                  <div className="home-event-location">
                    <MapPin size={14} />
                    {event.city}
                  </div>

                  <div className="home-event-footer">
                    <span>
                      From <strong>₹{event.price}</strong>
                    </span>

                    <Link to={`/event/${event.id}`}>
                      View
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                </div>
              </article>
            ))}

          </div>

        </div>
      </section>

      <section className="home-creator-section">
        <div className="home-container">

          <div className="home-creator-card">

            <div>
              <span className="home-kicker">
                FOR CREATORS
              </span>

              <h2>
                Have an experience
                <br />
                worth sharing?
              </h2>

              <p>
                Create your event on EVENTORA and
                bring your community together.
              </p>

              <Link
                to="/create"
                className="home-creator-btn"
              >
                Create an Event
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="home-creator-icon">
              <Sparkles size={62} />
            </div>

          </div>

        </div>
      </section>

      <section className="home-bottom-cta">
        <div className="home-container">

          <Compass size={28} />

          <div>
            <strong>There's always something happening.</strong>
            <span>
              Find your next favourite experience today.
            </span>
          </div>

          <Link to="/explore">
            Explore Events
            <ArrowRight size={17} />
          </Link>

        </div>
      </section>

    </main>
  );
}

export default Home;