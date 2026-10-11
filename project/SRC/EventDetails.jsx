import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Ticket,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const events = {
  1: {
    title: "Sunset Music Festival",
    category: "Music",
    date: "October 18, 2026",
    time: "6:00 PM – 11:00 PM",
    venue: "HITEX Exhibition Center",
    city: "Hyderabad",
    address: "HITEX Road, Madhapur, Hyderabad",
    price: 799,
    capacity: 500,
    attendees: 248,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90",
    description:
      "An unforgettable evening of live music, incredible performances, great food and an atmosphere built for making memories.",
    highlights: [
      "Live performances",
      "Food & beverage zones",
      "Professional sound & lighting",
      "General admission access",
    ],
  },

  2: {
    title: "Future Tech Summit",
    category: "Technology",
    date: "November 07, 2026",
    time: "10:00 AM – 5:00 PM",
    venue: "T-Hub",
    city: "Hyderabad",
    address: "Raidurg, Hyderabad",
    price: 499,
    capacity: 300,
    attendees: 126,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=90",
    description:
      "Meet innovators, founders and technology enthusiasts for a full day of ideas, conversations and future-focused experiences.",
    highlights: [
      "Industry speakers",
      "Startup showcases",
      "Networking sessions",
      "Interactive discussions",
    ],
  },

  3: {
    title: "Hyderabad Food Carnival",
    category: "Food",
    date: "October 25, 2026",
    time: "12:00 PM – 9:00 PM",
    venue: "NTR Gardens",
    city: "Hyderabad",
    address: "Necklace Road, Hyderabad",
    price: 299,
    capacity: 1000,
    attendees: 412,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=90",
    description:
      "A celebration of local flavours, street food, live entertainment and unforgettable culinary experiences.",
    highlights: [
      "50+ food stalls",
      "Live entertainment",
      "Family friendly",
      "Local food creators",
    ],
  },

  4: {
    title: "Stand Up Night",
    category: "Comedy",
    date: "October 31, 2026",
    time: "7:30 PM – 10:00 PM",
    venue: "Shilpakala Vedika",
    city: "Hyderabad",
    address: "Madhapur, Hyderabad",
    price: 599,
    capacity: 600,
    attendees: 321,
    image:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1600&q=90",
    description:
      "A night of live stand-up comedy featuring fresh jokes, big laughs and a room full of good energy.",
    highlights: [
      "Live stand-up",
      "Multiple comedians",
      "Premium venue",
      "Limited seats",
    ],
  },

  5: {
    title: "Design & Creative Workshop",
    category: "Workshop",
    date: "November 14, 2026",
    time: "11:00 AM – 4:00 PM",
    venue: "The Park Hyderabad",
    city: "Hyderabad",
    address: "Somajiguda, Hyderabad",
    price: 699,
    capacity: 100,
    attendees: 62,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=90",
    description:
      "A practical creative workshop for people who want to sharpen their design thinking and turn ideas into experiences.",
    highlights: [
      "Hands-on activities",
      "Expert guidance",
      "Creative exercises",
      "Workshop materials",
    ],
  },

  6: {
    title: "Hyderabad Business Meetup",
    category: "Business",
    date: "November 21, 2026",
    time: "5:00 PM – 8:00 PM",
    venue: "Novotel HICC",
    city: "Hyderabad",
    address: "HITEC City, Hyderabad",
    price: 399,
    capacity: 250,
    attendees: 143,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=90",
    description:
      "Connect with founders, professionals and ambitious people from Hyderabad's growing business community.",
    highlights: [
      "Professional networking",
      "Founder conversations",
      "Business connections",
      "Refreshments",
    ],
  },
};

function EventDetails() {
  const { id } = useParams();
  let customEvents = [];
  try { customEvents = JSON.parse(localStorage.getItem("customEvents") || "[]"); } catch { customEvents = []; }
  const customEvent = customEvents.find((item) => String(item.id) === String(id));
  const event = customEvent || events[id] || events[1];
  const normalizedEvent = {
    ...event,
    venue: event.venue || event.location || "Venue to be announced",
    city: event.city || "Hyderabad",
    address: event.address || `${event.venue || event.location || "Venue"}, ${event.city || "Hyderabad"}`,
    capacity: Number(event.capacity || 0),
    attendees: Number(event.attendees || 0),
    description: event.description || "Event details provided by the organizer.",
    highlights: event.highlights || ["Event hosted by the organizer", "Explore event details", "Booking subject to availability"],
  };
  const displayEvent = normalizedEvent;

  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  const availability = Math.max(
    displayEvent.capacity - displayEvent.attendees,
    0
  );

  const filled = Math.round(
    (displayEvent.attendees / displayEvent.capacity) * 100
  );

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );
      setShared(true);

      setTimeout(() => {
        setShared(false);
      }, 1800);
    } catch {
      setShared(true);

      setTimeout(() => {
        setShared(false);
      }, 1800);
    }
  };

  return (
    <main className="event-details-page">
      <div className="event-details-container">

        <Link
          to="/explore"
          className="event-back-link"
        >
          <ArrowLeft size={17} />
          Back to Explore
        </Link>

        <section className="event-details-hero">

          <div className="event-details-image">
            <img
              src={displayEvent.image}
              alt={displayEvent.title}
            />

            <span className="event-details-category">
              {displayEvent.category}
            </span>
          </div>

          <div className="event-details-info">

            <div className="event-details-actions">

              <button
                type="button"
                className={`event-action-btn ${
                  liked ? "liked" : ""
                }`}
                onClick={() =>
                  setLiked((current) => !current)
                }
                aria-label="Add to favorites"
              >
                <Heart
                  size={19}
                  fill={liked ? "currentColor" : "none"}
                />
              </button>

              <button
                type="button"
                className="event-action-btn"
                onClick={handleShare}
                aria-label="Share event"
              >
                {shared ? (
                  <Check size={19} />
                ) : (
                  <Share2 size={19} />
                )}
              </button>

            </div>

            <span className="event-details-kicker">
              {displayEvent.category.toUpperCase()} · HYDERABAD
            </span>

            <h1>{displayEvent.title}</h1>

            <p className="event-details-description">
              {displayEvent.description}
            </p>

            <div className="event-details-meta">

              <div>
                <CalendarDays size={20} />
                <span>
                  <small>Date</small>
                  <strong>{displayEvent.date}</strong>
                </span>
              </div>

              <div>
                <Clock3 size={20} />
                <span>
                  <small>Time</small>
                  <strong>{displayEvent.time}</strong>
                </span>
              </div>

              <div>
                <MapPin size={20} />
                <span>
                  <small>Venue</small>
                  <strong>{displayEvent.venue}</strong>
                </span>
              </div>

            </div>

            <div className="event-details-price-box">

              <div>
                <span>Tickets from</span>
                <strong>₹{displayEvent.price}</strong>
                <small>per person</small>
              </div>

              <Link
                to={`/booking/${id}`}
                className="event-book-btn"
              >
                Book Tickets
                <ArrowRightIcon />
              </Link>

            </div>

            <div className="event-trust-row">
              <ShieldCheck size={17} />
              Secure booking
              <span />
              <Ticket size={17} />
              Instant confirmation
            </div>

          </div>
        </section>

        <section className="event-details-lower">

          <div className="event-about-card">

            <span className="event-details-kicker">
              ABOUT THIS EVENT
            </span>

            <h2>Everything you need to know</h2>

            <p>
              {displayEvent.description} Whether you're coming
              with friends, meeting new people or simply
              looking for something different to do,
              this experience is designed to make your
              time worthwhile.
            </p>

            <div className="event-highlights">

              {displayEvent.highlights.map((highlight) => (
                <div key={highlight}>
                  <Check size={16} />
                  <span>{highlight}</span>
                </div>
              ))}

            </div>

          </div>

          <aside className="event-side-card">

            <div className="event-side-heading">
              <Users size={20} />
              <div>
                <strong>{displayEvent.attendees}</strong>
                <span>people attending</span>
              </div>
            </div>

            <div className="event-capacity">

              <div>
                <span>Availability</span>
                <strong>
                  {availability} spots left
                </strong>
              </div>

              <div className="event-capacity-track">
                <div
                  style={{
                    width: `${filled}%`,
                  }}
                />
              </div>

              <small>
                {filled}% of available tickets are booked
              </small>

            </div>

            <div className="event-location-box">
              <MapPin size={19} />

              <div>
                <strong>{displayEvent.venue}</strong>
                <span>{displayEvent.address}</span>
              </div>
            </div>

            <Link
              to={`/booking/${id}`}
              className="event-side-book-btn"
            >
              <Ticket size={17} />
              Get Tickets
            </Link>

          </aside>

        </section>

      </div>
    </main>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default EventDetails;