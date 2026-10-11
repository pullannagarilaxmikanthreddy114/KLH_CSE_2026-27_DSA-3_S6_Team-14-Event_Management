import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Ticket,
} from "lucide-react";

import "../App.css";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;
  const quantity = Number(location.state?.quantity || 1);

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");
  const [paid, setPaid] = useState(false);
  const [bookingId, setBookingId] = useState("");

  if (!event) {
    return (
      <div className="payment-empty">
        <Ticket size={50} />

        <h1>No Event Selected</h1>

        <p>
          Please select an event before continuing to payment.
        </p>

        <Link to="/explore">
          Explore Events
        </Link>
      </div>
    );
  }

  const price = Number(event.price || 0);
  const total = price * quantity;

  const handlePayment = (e) => {
    e.preventDefault();

    const newBookingId =
      "EVT-" + Math.floor(100000 + Math.random() * 900000);

    const existingTickets =
      JSON.parse(localStorage.getItem("tickets")) || [];

    const ticket = {
      ...event,
      bookingId: newBookingId,
      quantity,
      totalAmount: total,
      paymentMethod: method,
      bookedAt: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "tickets",
      JSON.stringify([...existingTickets, ticket])
    );

    setBookingId(newBookingId);
    setPaid(true);
  };

  if (paid) {
    return (
      <div className="payment-success">
        <div className="success-icon">
          <CheckCircle2 size={55} />
        </div>

        <h1>Payment Successful!</h1>

        <p>
          Your booking for <strong>{event.title}</strong>{" "}
          is confirmed.
        </p>

        <div className="success-ticket">
          <span>Booking ID</span>
          <strong>{bookingId}</strong>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate("/tickets")}>
            View My Tickets
          </button>

          <button
            className="secondary-payment-btn"
            onClick={() => navigate("/explore")}
          >
            Explore More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">

      <header className="payment-header">

        <Link to={`/event/${event.id}`}>
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="payment-logo">
          eventora
        </div>

        <div className="secure-label">
          <ShieldCheck size={16} />
          Secure Checkout
        </div>

      </header>

      <main className="payment-container">

        <div className="payment-title">
          <span>CHECKOUT</span>

          <h1>Complete your booking</h1>

          <p>
            Choose your preferred payment method.
          </p>
        </div>

        <div className="payment-layout">

          <section className="payment-box">

            <h2>Payment Method</h2>

            <div className="payment-methods">

              <button
                type="button"
                className={
                  method === "upi"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setMethod("upi")}
              >
                <Smartphone size={22} />

                <span>
                  <strong>UPI</strong>
                  <small>
                    GPay · PhonePe · Paytm
                  </small>
                </span>
              </button>

              <button
                type="button"
                className={
                  method === "card"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() => setMethod("card")}
              >
                <CreditCard size={22} />

                <span>
                  <strong>Card</strong>
                  <small>
                    Credit / Debit Card
                  </small>
                </span>
              </button>

              <button
                type="button"
                className={
                  method === "netbanking"
                    ? "payment-method active"
                    : "payment-method"
                }
                onClick={() =>
                  setMethod("netbanking")
                }
              >
                <Building2 size={22} />

                <span>
                  <strong>Net Banking</strong>
                  <small>
                    All major banks
                  </small>
                </span>
              </button>

            </div>

            <form onSubmit={handlePayment}>

              {method === "upi" && (
                <div className="payment-fields">

                  <label>UPI ID</label>

                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(e.target.value)
                    }
                    required
                  />

                  <p className="field-help">
                    Example: yourname@upi
                  </p>

                </div>
              )}

              {method === "card" && (
                <div className="payment-fields">

                  <label>Card Number</label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="19"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value)
                    }
                    required
                  />

                  <label>Name on Card</label>

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={cardName}
                    onChange={(e) =>
                      setCardName(e.target.value)
                    }
                    required
                  />

                  <div className="card-row">

                    <div>
                      <label>Expiry</label>

                      <input
                        type="text"
                        maxLength="5"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(e.target.value)
                        }
                        required
                      />
                    </div>

                    <div>
                      <label>CVV</label>

                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength="3"
                        placeholder="•••"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value)
                        }
                        required
                      />
                    </div>

                  </div>

                </div>
              )}

              {method === "netbanking" && (
                <div className="payment-fields">

                  <label>Select Bank</label>

                  <select
                    value={bank}
                    onChange={(e) =>
                      setBank(e.target.value)
                    }
                    required
                  >
                    <option value="">
                      Select your bank
                    </option>

                    <option>
                      State Bank of India
                    </option>

                    <option>
                      HDFC Bank
                    </option>

                    <option>
                      ICICI Bank
                    </option>

                    <option>
                      Axis Bank
                    </option>

                    <option>
                      Kotak Mahindra Bank
                    </option>
                  </select>

                </div>
              )}

              <button
                type="submit"
                className="pay-now-btn"
              >
                Pay ₹{total}
              </button>

            </form>

            <div className="payment-security">
              <ShieldCheck size={18} />

              <span>
                Demo checkout — no real money is charged.
              </span>
            </div>

          </section>

          <aside className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-event">

              <img
                src={event.image}
                alt={event.title}
              />

              <div>

                <span>
                  {event.category}
                </span>

                <h3>
                  {event.title}
                </h3>

                <p>
                  {event.location}
                </p>

              </div>

            </div>

            <div className="summary-row">
              <span>Ticket Price</span>
              <strong>₹{price}</strong>
            </div>

            <div className="summary-row">
              <span>Quantity</span>
              <strong>× {quantity}</strong>
            </div>

            <div className="summary-line" />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default Payment;