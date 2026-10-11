import {
  ArrowLeft,
  Check,
  CreditCard,
  LockKeyhole,
  Smartphone,
  Ticket,
  WalletCards,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

const eventData = {
  1: {
    title: "Sunset Music Festival",
    date: "October 18, 2026",
    time: "6:00 PM – 11:00 PM",
    venue: "HITEX Exhibition Center",
    city: "Hyderabad",
    price: 799,
  },
  2: {
    title: "Future Tech Summit",
    date: "November 07, 2026",
    time: "10:00 AM – 5:00 PM",
    venue: "T-Hub",
    city: "Hyderabad",
    price: 499,
  },
  3: {
    title: "Hyderabad Food Carnival",
    date: "October 25, 2026",
    time: "12:00 PM – 9:00 PM",
    venue: "NTR Gardens",
    city: "Hyderabad",
    price: 299,
  },
  4: {
    title: "Stand Up Night",
    date: "October 31, 2026",
    time: "7:30 PM – 10:00 PM",
    venue: "Shilpakala Vedika",
    city: "Hyderabad",
    price: 599,
  },
  5: {
    title: "Design & Creative Workshop",
    date: "November 14, 2026",
    time: "11:00 AM – 4:00 PM",
    venue: "The Park Hyderabad",
    city: "Hyderabad",
    price: 699,
  },
  6: {
    title: "Hyderabad Business Meetup",
    date: "November 21, 2026",
    time: "5:00 PM – 8:00 PM",
    venue: "Novotel HICC",
    city: "Hyderabad",
    price: 399,
  },
};

const paymentMethods = [
  {
    id: "upi",
    title: "UPI",
    subtitle: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    subtitle: "Visa, Mastercard, RuPay",
    icon: CreditCard,
  },
  {
    id: "wallet",
    title: "Wallet",
    subtitle: "Paytm Wallet and more",
    icon: WalletCards,
  },
];

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  let savedEvents = [];
  try { savedEvents = JSON.parse(localStorage.getItem("customEvents") || "[]"); } catch { savedEvents = []; }
  const event = savedEvents.find((item) => String(item.id) === String(id)) || eventData[id] || eventData[1];

  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("upi");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [upiId, setUpiId] = useState("");

  const subtotal = useMemo(
    () => event.price * quantity,
    [event.price, quantity]
  );

  const bookingFee = Math.round(subtotal * 0.05);
  const total = subtotal + bookingFee;

  const handleSubmit = (eventSubmit) => {
    eventSubmit.preventDefault();

    // This is a local demo checkout: it records the booking in this browser.
    // It does not charge a real payment method or contact a payment provider.
    const bookingId = "EVT-" + Date.now().toString().slice(-8);
    let existingTickets = [];
    try { existingTickets = JSON.parse(localStorage.getItem("tickets") || "[]"); } catch { existingTickets = []; }

    const ticket = {
      id: bookingId,
      bookingId,
      eventId: String(id),
      title: event.title,
      category: event.category || "Event",
      date: event.date || "Date to be announced",
      time: event.time || "Time to be announced",
      venue: event.venue || event.location || "Venue to be announced",
      location: event.city || event.location || "",
      type: "General Admission",
      person: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      quantity,
      totalAmount: total,
      total: `₹${total}`,
      paymentMethod: payment,
      paymentStatus: "Demo booking — payment not processed",
      status: "Booking Confirmed (Demo)",
      image: event.image || event.coverImage || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
      bookedAt: new Date().toLocaleString(),
    };

    localStorage.setItem("tickets", JSON.stringify([ticket, ...existingTickets]));
    navigate("/tickets", { state: { newBookingId: bookingId } });
  };

  return (
    <main className="booking-page">
      <div className="booking-container">

        <Link
          to={`/event/${id}`}
          className="booking-back-link"
        >
          <ArrowLeft size={17} />
          Back to Event
        </Link>

        <div className="booking-header">
          <span className="booking-kicker">
            SECURE CHECKOUT
          </span>

          <h1>Complete your booking</h1>

          <p>
            Reserve your tickets in just a few steps.
          </p>
        </div>

        <form
          className="booking-layout"
          onSubmit={handleSubmit}
        >

          <div className="booking-main">

            <section className="booking-card">

              <div className="booking-section-heading">
                <div>01</div>

                <span>
                  <strong>Attendee details</strong>
                  Tell us who is attending.
                </span>
              </div>

              <div className="booking-fields">

                <label>
                  <span>Full name *</span>

                  <input
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    required
                  />
                </label>

                <label>
                  <span>Email address *</span>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label>
                  <span>Phone number *</span>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="+91 98765 43210"
                    required
                  />
                </label>

              </div>

            </section>

            <section className="booking-card">

              <div className="booking-section-heading">
                <div>02</div>

                <span>
                  <strong>Choose tickets</strong>
                  Select how many tickets you need.
                </span>
              </div>

              <div className="booking-ticket-selector">

                <div>
                  <Ticket size={22} />

                  <span>
                    <strong>General Admission</strong>
                    <small>
                      ₹{event.price} per ticket
                    </small>
                  </span>
                </div>

                <div className="booking-quantity">

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        Math.max(quantity - 1, 1)
                      )
                    }
                  >
                    −
                  </button>

                  <strong>{quantity}</strong>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        Math.min(quantity + 1, 10)
                      )
                    }
                  >
                    +
                  </button>

                </div>

              </div>

            </section>

            <section className="booking-card">

              <div className="booking-section-heading">
                <div>03</div>

                <span>
                  <strong>Payment method</strong>
                  Choose how you'd like to pay.
                </span>
              </div>

              <div className="booking-payment-options">

                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const selected =
                    payment === method.id;

                  return (
                    <button
                      type="button"
                      key={method.id}
                      className={`booking-payment-option ${
                        selected ? "selected" : ""
                      }`}
                      onClick={() =>
                        setPayment(method.id)
                      }
                    >
                      <div className="booking-payment-icon">
                        <Icon size={20} />
                      </div>

                      <span>
                        <strong>{method.title}</strong>
                        <small>{method.subtitle}</small>
                      </span>

                      <div className="booking-radio">
                        {selected && <Check size={13} />}
                      </div>
                    </button>
                  );
                })}

              </div>

              {payment === "upi" && (
                <div className="booking-extra-field">
                  <label>
                    <span>UPI ID</span>

                    <input
                      value={upiId}
                      onChange={(event) =>
                        setUpiId(event.target.value)
                      }
                      placeholder="example@upi"
                    />
                  </label>
                </div>
              )}

              {payment === "card" && (
                <div className="booking-card-fields">

                  <label>
                    <span>Card number</span>
                    <input
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                    />
                  </label>

                  <div>
                    <label>
                      <span>Expiry</span>
                      <input placeholder="MM / YY" />
                    </label>

                    <label>
                      <span>CVV</span>
                      <input
                        placeholder="•••"
                        type="password"
                      />
                    </label>
                  </div>

                </div>
              )}

              {payment === "wallet" && (
                <div className="booking-wallet-note">
                  You will be redirected to your selected
                  wallet after confirming your booking.
                </div>
              )}

            </section>

          </div>

          <aside className="booking-summary">

            <div className="booking-summary-card">

              <span className="booking-summary-label">
                YOUR EVENT
              </span>

              <h2>{event.title}</h2>

              <div className="booking-summary-info">
                <span>{event.date}</span>
                <span>{event.time}</span>
                <span>
                  {event.venue}, {event.city}
                </span>
              </div>

              <div className="booking-summary-divider" />

              <div className="booking-summary-row">
                <span>
                  ₹{event.price} × {quantity}
                </span>
                <strong>₹{subtotal}</strong>
              </div>

              <div className="booking-summary-row">
                <span>Booking fee</span>
                <strong>₹{bookingFee}</strong>
              </div>

              <div className="booking-total">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>

              <button
                type="submit"
                className="booking-confirm-btn"
              >
                <LockKeyhole size={17} />
                Confirm & Pay ₹{total}
              </button>

              <div className="booking-secure-note">
                <ShieldIcon />
                Secure payment · Instant confirmation
              </div>

            </div>

          </aside>

        </form>

      </div>
    </main>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3L20 6V11C20 16.2 16.7 20 12 21C7.3 20 4 16.2 4 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 12L10.8 14.3L15.5 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Booking;