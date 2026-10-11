import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Heart, ArrowUpRight } from "lucide-react";

function formatDate(date) {
  if (!date) return "Date TBA";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function EventCard({
  event,
  favorite = false,
  toggleFavorite,
}) {
  return (
    <article className="event-card">
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />

        <span className="event-category">
          {event.category}
        </span>

        {toggleFavorite && (
          <button
            className={`favorite-button ${
              favorite ? "selected" : ""
            }`}
            onClick={() => toggleFavorite(event)}
            aria-label="Toggle favorite"
          >
            <Heart
              size={18}
              fill={favorite ? "currentColor" : "none"}
            />
          </button>
        )}
      </div>

      <div className="event-card-content">
        <div className="event-date">
          <CalendarDays size={15} />
          {formatDate(event.date)}
        </div>

        <h3>{event.title}</h3>

        <p className="event-location">
          <MapPin size={15} />
          {event.location}
        </p>

        <div className="event-card-bottom">
          <div>
            <small>From</small>
            <strong>₹{Number(event.price || 0)}</strong>
          </div>

          <Link
            to={`/event/${event.id}`}
            className="details-button"
          >
            View Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;