import {
  CalendarDays,
  MapPin,
  Ticket,
} from "lucide-react";

function TicketCard({ ticket }) {
  const quantity = Number(ticket.quantity || 1);
  const total =
    Number(ticket.total) ||
    Number(ticket.price || 0) * quantity;

  return (
    <article className="ticket-card">
      <div className="ticket-main">
        <span className="ticket-label">
          {ticket.category}
        </span>

        <h2>{ticket.title}</h2>

        <div className="ticket-info">
          <span>
            <CalendarDays size={16} />
            {ticket.date}
          </span>

          <span>
            <MapPin size={16} />
            {ticket.location}
          </span>
        </div>

        <div className="ticket-booking-info">
          <span>
            Booking ID: <strong>{ticket.bookingId}</strong>
          </span>

          <span>
            Tickets: <strong>{quantity}</strong>
          </span>
        </div>
      </div>

      <div className="ticket-divider" />

      <div className="ticket-side">
        <Ticket size={26} />

        <small>Amount Paid</small>

        <strong>₹{total}</strong>

        <span className="confirmed">
          Confirmed
        </span>
      </div>
    </article>
  );
}

export default TicketCard;