import "../event-pages.css";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Music2,
  PartyPopper,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const recommendations = [
  {
    id: 1,
    title: "Sunset Music Festival",
    category: "Music",
    date: "Oct 18",
    time: "5:00 PM",
    location: "Gachibowli",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
    reason: "Because you like live music",
  },
  {
    id: 2,
    title: "Hyderabad Tech Summit",
    category: "Technology",
    date: "Oct 10",
    time: "10:00 AM",
    location: "HICC",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
    reason: "Trending in Hyderabad",
  },
  {
    id: 3,
    title: "Stand-up Night",
    category: "Comedy",
    date: "Oct 24",
    time: "7:30 PM",
    location: "The Laugh House",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=1000&q=85",
    reason: "Popular with similar interests",
  },
  {
    id: 4,
    title: "Food & Culture Fest",
    category: "Lifestyle",
    date: "Oct 31",
    time: "12:00 PM",
    location: "NTR Gardens",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85",
    reason: "Something new to explore",
  },
  {
    id: 5,
    title: "Night Market",
    category: "Lifestyle",
    date: "Nov 07",
    time: "6:00 PM",
    location: "Jubilee Hills",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=85",
    reason: "Weekend pick",
  },
  {
    id: 6,
    title: "Creative Minds",
    category: "Community",
    date: "Nov 14",
    time: "4:00 PM",
    location: "Banjara Hills",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1000&q=85",
    reason: "Worth discovering",
  },
];

const categories = ["All", "Music", "Technology", "Comedy", "Lifestyle", "Community"];

export default function Recommendation() {
  const [category, setCategory] = useState("All");
  const [liked, setLiked] = useState([]);

  const filtered =
    category === "All"
      ? recommendations
      : recommendations.filter((event) => event.category === category);

  const toggleLike = (id) => {
    setLiked((items) =>
      items.includes(id)
        ? items.filter((item) => item !== id)
        : [...items, id]
    );
  };

  return (
    <div className="eo-page">
      <div className="eo-container">
        <section className="eo-for-you-hero">
          <div className="eo-for-you-copy">
            <span className="eo-eyebrow">
              <Sparkles size={14} />
              Personalized for you
            </span>

            <h1>
              Your next
              <br />
              <em>great experience.</em>
            </h1>

            <p>
              We picked these events based on what people with similar
              interests are enjoying.
            </p>

            <div className="eo-preference-row">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="eo-for-you-art">
            <div className="eo-art-glow" />
            <Sparkles size={42} />
            <strong>Discover</strong>
            <span>something unexpected</span>
          </div>
        </section>

        <section className="eo-featured-recommendation">
          <div className="eo-featured-image">
            <img
              src={recommendations[0].image}
              alt={recommendations[0].title}
            />
          </div>

          <div className="eo-featured-content">
            <span className="eo-reason">
              <Sparkles size={13} />
              {recommendations[0].reason}
            </span>

            <h2>{recommendations[0].title}</h2>

            <p>
              An unforgettable evening of live performances, great music,
              food, and thousands of people coming together.
            </p>

            <div className="eo-featured-meta">
              <span>
                <CalendarDays size={15} />
                October 18
              </span>

              <span>
                <Clock3 size={15} />
                5:00 PM
              </span>

              <span>
                <MapPin size={15} />
                Gachibowli
              </span>
            </div>

            <Link to="/event/1" className="eo-primary-btn">
              Explore event
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="eo-recommend-section">
          <div className="eo-section-title">
            <div>
              <span>HANDPICKED FOR YOU</span>
              <h2>More to explore</h2>
            </div>

            <Link to="/explore">
              See everything <ArrowRight size={15} />
            </Link>
          </div>

          <div className="eo-recommend-grid">
            {filtered.map((event) => (
              <article className="eo-recommend-card" key={event.id}>
                <Link to={`/event/${event.id}`} className="eo-card-image">
                  <img src={event.image} alt={event.title} />

                  <span>{event.category}</span>

                  <button
                    className={`eo-heart ${
                      liked.includes(event.id) ? "liked" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(event.id);
                    }}
                  >
                    <Heart
                      size={17}
                      fill={liked.includes(event.id) ? "currentColor" : "none"}
                    />
                  </button>
                </Link>

                <div className="eo-card-body">
                  <span className="eo-card-reason">{event.reason}</span>

                  <Link
                    to={`/event/${event.id}`}
                    className="eo-card-title"
                  >
                    {event.title}
                  </Link>

                  <div className="eo-card-info">
                    <span>
                      <CalendarDays size={14} />
                      {event.date}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {event.location}
                    </span>
                  </div>

                  <div className="eo-card-footer">
                    <span className="eo-rating">
                      <Star size={13} fill="currentColor" />
                      {event.rating}
                    </span>

                    <strong>
                      {event.category === "Music"
                        ? "From ₹799"
                        : event.category === "Technology"
                        ? "From ₹599"
                        : "From ₹399"}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="eo-discovery-banner">
          <div className="eo-discovery-icon">
            <PartyPopper size={25} />
          </div>

          <div>
            <strong>Not sure what you're looking for?</strong>
            <span>
              Explore everything happening around you and find your next
              favorite experience.
            </span>
          </div>

          <Link to="/explore">
            Browse events <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}