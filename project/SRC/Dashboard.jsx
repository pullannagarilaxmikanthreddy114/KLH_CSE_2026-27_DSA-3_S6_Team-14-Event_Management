import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Plus,
  Ticket,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import AlgorithmCoverage from "../components/AlgorithmCoverage";

const events = [
  {
    id: 1,
    title: "Sunset Music Festival",
    category: "Music",
    date: "Oct 18, 2026",
    time: "6:00 PM",
    venue: "HITEX Exhibition Center",
    city: "Hyderabad",
    attendees: 248,
    capacity: 500,
    status: "Published",
  },
  {
    id: 2,
    title: "Future Tech Summit",
    category: "Technology",
    date: "Nov 07, 2026",
    time: "10:00 AM",
    venue: "T-Hub",
    city: "Hyderabad",
    attendees: 126,
    capacity: 300,
    status: "Published",
  },
];

function Dashboard() {
  const totalAttendees = events.reduce(
    (total, event) => total + event.attendees,
    0
  );

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">

        <section className="dashboard-hero">
          <div>
            <span className="dashboard-kicker">
              EVENTORA CREATOR
            </span>

            <h1>Your Dashboard</h1>

            <p>
              Manage your events, track attendees and create
              your next experience.
            </p>
          </div>

          <Link
            to="/create"
            className="dashboard-create-btn"
          >
            <Plus size={18} />
            Create Event
          </Link>
        </section>

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CalendarDays size={21} />
            </div>

            <div>
              <span>Total Events</span>
              <strong>{events.length}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Users size={21} />
            </div>

            <div>
              <span>Total Attendees</span>
              <strong>{totalAttendees}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Ticket size={21} />
            </div>

            <div>
              <span>Tickets Sold</span>
              <strong>{totalAttendees}</strong>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>Published</span>
              <strong>
                {events.filter(
                  (event) => event.status === "Published"
                ).length}
              </strong>
            </div>
          </div>

        </section>

        <section className="dashboard-section">

          <div className="dashboard-section-header">
            <div>
              <span className="dashboard-kicker">
                YOUR EVENTS
              </span>

              <h2>Manage your events</h2>
            </div>

            <Link
              to="/create"
              className="dashboard-small-create"
            >
              <Plus size={16} />
              New Event
            </Link>
          </div>

          <div className="dashboard-events">

            {events.map((event) => (
              <article
                className="dashboard-event-card"
                key={event.id}
              >

                <div className="dashboard-event-number">
                  <span>{event.category}</span>
                  <strong>0{event.id}</strong>
                </div>

                <div className="dashboard-event-content">

                  <div className="dashboard-event-title-row">
                    <div>
                      <h3>{event.title}</h3>

                      <span className="dashboard-published">
                        <CheckCircle2 size={14} />
                        {event.status}
                      </span>
                    </div>

                    <Link
                      to={`/event/${event.id}`}
                      className="dashboard-view-link"
                    >
                      View Event
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <div className="dashboard-event-details">

                    <div>
                      <CalendarDays size={17} />
                      <span>{event.date}</span>
                    </div>

                    <div>
                      <Clock3 size={17} />
                      <span>{event.time}</span>
                    </div>

                    <div>
                      <MapPin size={17} />
                      <span>
                        {event.venue}, {event.city}
                      </span>
                    </div>

                  </div>

                  <div className="dashboard-event-bottom">

                    <div className="dashboard-attendee-info">
                      <Users size={17} />

                      <div>
                        <strong>
                          {event.attendees}
                        </strong>

                        <span>
                          / {event.capacity} attendees
                        </span>
                      </div>
                    </div>

                    <div className="dashboard-progress">
                      <div>
                        <span>
                          {Math.round(
                            (event.attendees /
                              event.capacity) *
                              100
                          )}
                          % filled
                        </span>
                      </div>

                      <div className="dashboard-progress-track">
                        <div
                          className="dashboard-progress-fill"
                          style={{
                            width: `${Math.min(
                              (event.attendees /
                                event.capacity) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                  </div>

                </div>
              </article>
            ))}

          </div>
        </section>

        <section className="dashboard-bottom-card">

          <div className="dashboard-bottom-icon">
            <SparklesIcon />
          </div>

          <div>
            <span className="dashboard-kicker">
              KEEP CREATING
            </span>

            <h2>Have another event in mind?</h2>

            <p>
              Create a new event and start welcoming
              attendees.
            </p>
          </div>

          <Link
            to="/create"
            className="dashboard-bottom-btn"
          >
            Create Event
            <ArrowRight size={17} />
          </Link>

        </section>

        <AlgorithmCoverage />
      </div>
    </main>
  );
}

function SparklesIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 2L13.6 8.4L20 10L13.6 11.6L12 18L10.4 11.6L4 10L10.4 8.4L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M19 16L19.8 19.2L23 20L19.8 20.8L19 24L18.2 20.8L15 20L18.2 19.2L19 16Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Dashboard;