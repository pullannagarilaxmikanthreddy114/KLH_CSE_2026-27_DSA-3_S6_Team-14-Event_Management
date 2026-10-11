import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ImagePlus,
  MapPin,
  Save,
  Sparkles,
  Ticket,
  Upload,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const categories = [
  "Music",
  "Food",
  "Technology",
  "Comedy",
  "Workshop",
  "Sports",
  "Business",
  "Other",
];

function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "Music",
    description: "",
    date: "",
    time: "",
    endTime: "",
    venue: "",
    city: "Hyderabad",
    address: "",
    price: "",
    capacity: "",
    organizer: "",
    email: "",
  });

  const [imageName, setImageName] = useState("");
  const [imageData, setImageData] = useState("");
  const [saveError, setSaveError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaveError("");

    try {
      const saved = JSON.parse(localStorage.getItem("customEvents") || "[]");
      const dateObj = new Date(`${form.date}T00:00:00`);
      const formattedDate = Number.isNaN(dateObj.getTime())
        ? form.date
        : dateObj.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
      const formatTime = (value) => {
        if (!value) return "";
        const [hour, minute] = value.split(":").map(Number);
        const suffix = hour >= 12 ? "PM" : "AM";
        return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${suffix}`;
      };
      const newEvent = {
        id: `custom-${Date.now()}`,
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        date: formattedDate,
        dateISO: form.date,
        time: `${formatTime(form.time)}${form.endTime ? ` – ${formatTime(form.endTime)}` : ""}`,
        venue: form.venue.trim(),
        city: form.city.trim(),
        address: form.address.trim() || `${form.venue.trim()}, ${form.city.trim()}`,
        price: Number(form.price),
        capacity: Number(form.capacity),
        attendees: 0,
        organizer: form.organizer.trim(),
        email: form.email.trim(),
        image: imageData || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
        highlights: ["Event hosted by " + form.organizer.trim(), "Venue: " + form.venue.trim(), "Category: " + form.category],
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("customEvents", JSON.stringify([newEvent, ...saved]));
      window.dispatchEvent(new Event("eventora:events-updated"));
      setSubmitted(true);
      setTimeout(() => navigate("/explore"), 1000);
    } catch (error) {
      console.error("Unable to save event", error);
      setSaveError("Could not save this event. If you uploaded a very large image, choose a smaller image and try again.");
    }
  };

  if (submitted) {
    return (
      <main className="create-event-page">
        <div className="create-event-container">
          <section className="create-success-card">
            <div className="create-success-icon">
              <CheckCircle2 size={38} />
            </div>

            <span className="create-kicker">
              EVENTORA CREATOR
            </span>

            <h1>Event created successfully!</h1>

            <p>
              Your event has been saved successfully. Taking you
              to your dashboard...
            </p>

            <div className="create-success-details">
              <strong>
                {form.title || "Your new event"}
              </strong>

              <span>
                {form.date || "Date not selected"} ·{" "}
                {form.city || "Location not selected"}
              </span>
            </div>

            <Link
              to="/dashboard"
              className="create-primary-btn"
            >
              Go to Dashboard
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="create-event-page">
      <div className="create-event-container">

        {/* TOP BAR */}

        <div className="create-event-topbar">
          <Link
            to="/dashboard"
            className="create-back-link"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <span className="create-draft-label">
            <Save size={15} />
            Draft
          </span>
        </div>

        {/* HEADER */}

        <section className="create-event-header">
          <div>
            <span className="create-kicker">
              EVENTORA CREATOR
            </span>

            <h1>Create an Event</h1>

            <p>
              Bring your next experience to life with a
              beautiful event page.
            </p>
          </div>

          <div className="create-header-icon">
            <Sparkles size={24} />
          </div>
        </section>

        <form
          className="create-event-form"
          onSubmit={handleSubmit}
        >

          {/* BASIC INFORMATION */}

          <section className="create-form-card">
            <div className="create-section-heading">
              <div className="create-section-number">
                01
              </div>

              <div>
                <h2>Event basics</h2>

                <p>
                  Tell people what your event is about.
                </p>
              </div>
            </div>

            <div className="create-form-grid">

              <label className="create-field create-field-full">
                <span>Event title *</span>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  placeholder="e.g. Sunset Music Festival"
                  required
                />
              </label>

              <label className="create-field">
                <span>Category *</span>

                <select
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  required
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="create-field">
                <span>Organizer *</span>

                <input
                  type="text"
                  name="organizer"
                  value={form.organizer}
                  onChange={updateField}
                  placeholder="Your name or organization"
                  required
                />
              </label>

              <label className="create-field create-field-full">
                <span>Description *</span>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Tell attendees what makes this event special..."
                  rows="5"
                  required
                />
              </label>

            </div>
          </section>

          {/* IMAGE */}

          <section className="create-form-card">
            <div className="create-section-heading">
              <div className="create-section-number">
                02
              </div>

              <div>
                <h2>Event image</h2>

                <p>
                  Add a cover image that represents your event.
                </p>
              </div>
            </div>

            <label className="create-upload-box">

              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setImageName(file?.name || "");
                  setImageData("");
                  if (file) {
                    if (file.size > 1500000) {
                      setSaveError("Please choose an image smaller than 1.5 MB.");
                      event.target.value = "";
                      setImageName("");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () => setImageData(String(reader.result || ""));
                    reader.onerror = () => setSaveError("Could not read the image. Please try another file.");
                    reader.readAsDataURL(file);
                  }
                }}
              />

              <div className="create-upload-icon">
                {imageName ? (
                  <CheckCircle2 size={25} />
                ) : (
                  <ImagePlus size={25} />
                )}
              </div>

              <strong>
                {imageName || "Upload your event cover"}
              </strong>

              <span>
                {imageName
                  ? "Image selected successfully"
                  : "PNG, JPG or WEBP · Recommended 1600 × 900"}
              </span>

              {!imageName && (
                <span className="create-upload-button">
                  <Upload size={15} />
                  Choose Image
                </span>
              )}

            </label>
          </section>

          {/* DATE AND LOCATION */}

          <section className="create-form-card">
            <div className="create-section-heading">
              <div className="create-section-number">
                03
              </div>

              <div>
                <h2>Date & location</h2>

                <p>
                  Tell attendees when and where to arrive.
                </p>
              </div>
            </div>

            <div className="create-form-grid">

              <label className="create-field">
                <span>Date *</span>

                <div className="create-input-icon">
                  <CalendarDays size={17} />

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={updateField}
                    required
                  />
                </div>
              </label>

              <label className="create-field">
                <span>City *</span>

                <div className="create-input-icon">
                  <MapPin size={17} />

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={updateField}
                    placeholder="Hyderabad"
                    required
                  />
                </div>
              </label>

              <label className="create-field">
                <span>Start time *</span>

                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={updateField}
                  required
                />
              </label>

              <label className="create-field">
                <span>End time</span>

                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={updateField}
                />
              </label>

              <label className="create-field">
                <span>Venue *</span>

                <input
                  type="text"
                  name="venue"
                  value={form.venue}
                  onChange={updateField}
                  placeholder="HITEX Exhibition Center"
                  required
                />
              </label>

              <label className="create-field">
                <span>Address</span>

                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={updateField}
                  placeholder="Street, area or landmark"
                />
              </label>

            </div>
          </section>

          {/* TICKETS */}

          <section className="create-form-card">
            <div className="create-section-heading">
              <div className="create-section-number">
                04
              </div>

              <div>
                <h2>Tickets & capacity</h2>

                <p>
                  Set your ticket price and attendee limit.
                </p>
              </div>
            </div>

            <div className="create-form-grid">

              <label className="create-field">
                <span>Ticket price (₹) *</span>

                <div className="create-input-icon">
                  <Ticket size={17} />

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={updateField}
                    placeholder="799"
                    min="0"
                    required
                  />
                </div>
              </label>

              <label className="create-field">
                <span>Maximum attendees *</span>

                <input
                  type="number"
                  name="capacity"
                  value={form.capacity}
                  onChange={updateField}
                  placeholder="500"
                  min="1"
                  required
                />
              </label>

              <label className="create-field">
                <span>Organizer email *</span>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  required
                />
              </label>

            </div>
          </section>

          {saveError && <p role="alert" className="create-save-error" style={{ color: "#dc2626", margin: "12px 0" }}>{saveError}</p>}

          {/* FOOTER */}

          <div className="create-form-footer">

            <div>
              <strong>Ready to publish?</strong>

              <span>
                You can manage your event from the dashboard.
              </span>
            </div>

            <div className="create-form-actions">

              <Link
                to="/dashboard"
                className="create-secondary-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="create-primary-btn"
              >
                <Sparkles size={17} />
                Create Event
              </button>

            </div>

          </div>

        </form>
      </div>
    </main>
  );
}

export default CreateEvent;