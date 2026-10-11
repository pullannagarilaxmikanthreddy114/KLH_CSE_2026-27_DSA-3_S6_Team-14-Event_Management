import "../event-pages.css";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  MapPin,
  MoreHorizontal,
  QrCode,
  Share2,
  Ticket,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const demoTickets = [
  {
    id: "EVT-92841",
    title: "Sunset Music Festival",
    category: "Music",
    date: "Saturday, October 18, 2026",
    time: "5:00 PM – 11:00 PM",
    venue: "Gachibowli Stadium",
    location: "Hyderabad, Telangana",
    type: "General Admission",
    person: "N Teja",
    quantity: 1,
    total: "₹839",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "EVT-77320",
    title: "Hyderabad Tech Summit",
    category: "Technology",
    date: "Saturday, October 10, 2026",
    time: "10:00 AM – 6:00 PM",
    venue: "HICC",
    location: "Hyderabad, Telangana",
    type: "Standard Pass",
    person: "N Teja",
    quantity: 1,
    total: "₹599",
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
  },
];

function FakeQR() {
  const cells = Array.from({ length: 144 });

  return (
    <div className="eo-qr">
      {cells.map((_, i) => (
        <span
          key={i}
          className={
            [0, 1, 2, 12, 14, 24, 25, 26, 35, 36, 48, 49, 50, 60, 62, 72,
              73, 74, 84, 86, 96, 97, 98, 108, 110, 120, 121, 122, 132, 134,
              143].includes(i)
              ? "dark"
              : ""
          }
        />
      ))}
    </div>
  );
}

export default function MyTickets() {
  const [active, setActive] = useState("upcoming");
  const [expanded, setExpanded] = useState(null);
  const [tickets] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tickets") || "[]");
      return [...saved, ...demoTickets];
    } catch {
      return demoTickets;
    }
  });

  const printTicket = () => window.print();

  return (
    <div className="eo-page">
      <div className="eo-container eo-tickets-container">
        <div className="eo-page-header">
          <div>
            <span className="eo-eyebrow">
              <Ticket size={14} />
              Your tickets
            </span>

            <h1>Ready when you are.</h1>

            <p>
              Everything you need for your upcoming experiences, all in one
              place.
            </p>
          </div>

          <div className="eo-ticket-summary">
            <strong>{tickets.length}</strong>
            <span>active tickets</span>
          </div>
        </div>

        <div className="eo-tabs">
          <button
            className={active === "upcoming" ? "active" : ""}
            onClick={() => setActive("upcoming")}
          >
            Upcoming
            <span>{tickets.length}</span>
          </button>

          <button
            className={active === "past" ? "active" : ""}
            onClick={() => setActive("past")}
          >
            Past
            <span>0</span>
          </button>
        </div>

        {active === "past" ? (
          <div className="eo-empty-state">
            <div className="eo-empty-icon">
              <Ticket size={30} />
            </div>
            <h2>No past tickets</h2>
            <p>
              Your attended events will appear here after the event date.
            </p>
            <Link to="/explore" className="eo-primary-btn">
              Discover events
            </Link>
          </div>
        ) : (
          <div className="eo-ticket-list">
            {tickets.map((ticket) => (
              <article className="eo-ticket" key={ticket.id}>
                <div className="eo-ticket-image">
                  <img src={ticket.image} alt={ticket.title} />
                  <span>{ticket.category}</span>
                </div>

                <div className="eo-ticket-main">
                  <div className="eo-ticket-top">
                    <div>
                      <span className="eo-confirmed">
                        <CheckCircle2 size={14} />
                        {ticket.status}
                      </span>

                      <h2>{ticket.title}</h2>

                      <div className="eo-ticket-meta">
                        <span>
                          <CalendarDays size={15} />
                          {ticket.date}
                        </span>

                        <span>
                          <Clock3 size={15} />
                          {ticket.time}
                        </span>

                        <span>
                          <MapPin size={15} />
                          {ticket.venue}, {ticket.location}
                        </span>
                      </div>
                    </div>

                    <button
                      className="eo-more-btn"
                      onClick={() =>
                        setExpanded(
                          expanded === ticket.id ? null : ticket.id
                        )
                      }
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  <div className="eo-ticket-divider">
                    <span />
                    <span />
                  </div>

                  <div className="eo-ticket-bottom">
                    <div>
                      <small>PASS TYPE</small>
                      <strong>{ticket.type}</strong>
                    </div>

                    <div>
                      <small>ATTENDEE</small>
                      <strong>
                        <UserRound size={14} />
                        {ticket.person}
                      </strong>
                    </div>

                    <div>
                      <small>QUANTITY</small>
                      <strong>{ticket.quantity}</strong>
                    </div>

                    <div>
                      <small>TOTAL PAID</small>
                      <strong>{ticket.total}</strong>
                    </div>
                  </div>

                  {expanded === ticket.id && (
                    <div className="eo-ticket-actions">
                      <button onClick={printTicket}>
                        <Download size={16} />
                        Print ticket
                      </button>

                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: ticket.title,
                              text: `My ticket for ${ticket.title}`,
                            });
                          }
                        }}
                      >
                        <Share2 size={16} />
                        Share
                      </button>

                      <Link to={`/event/${ticket.eventId || ticket.id}`}>
                        View event
                      </Link>
                    </div>
                  )}
                </div>

                <div className="eo-ticket-stub">
                  <div className="eo-stub-top">
                    <QrCode size={15} />
                    <span>ENTRY PASS</span>
                  </div>

                  <FakeQR />

                  <strong>{ticket.id}</strong>

                  <small>Scan at entrance</small>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="eo-ticket-help">
          <div>
            <strong>Need help with a ticket?</strong>
            <span>
              Keep your confirmation ready when contacting event support.
            </span>
          </div>

          <Link to="/explore">Find more events →</Link>
        </div>
      </div>
    </div>
  );
}