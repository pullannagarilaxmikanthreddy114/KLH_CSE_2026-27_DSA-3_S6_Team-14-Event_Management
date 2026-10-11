import "../event-pages.css";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Music2,
  PartyPopper,
  Search,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    date: "2026-10-10",
    title: "Hyderabad Tech Summit",
    category: "Technology",
    time: "10:00 AM",
    location: "HICC, Hyderabad",
    color: "purple",
    icon: Sparkles,
  },
  {
    id: 2,
    date: "2026-10-18",
    title: "Sunset Music Festival",
    category: "Music",
    time: "5:00 PM",
    location: "Gachibowli Stadium",
    color: "pink",
    icon: Music2,
  },
  {
    id: 3,
    date: "2026-10-24",
    title: "Stand-up Night",
    category: "Comedy",
    time: "7:30 PM",
    location: "The Laugh House",
    color: "orange",
    icon: PartyPopper,
  },
  {
    id: 4,
    date: "2026-10-31",
    title: "Food & Culture Fest",
    category: "Lifestyle",
    time: "12:00 PM",
    location: "NTR Gardens",
    color: "green",
    icon: Users,
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(todayString);
  const [search, setSearch] = useState("");
  const [customEvents, setCustomEvents] = useState(() => {
    try { return JSON.parse(localStorage.getItem("customEvents") || "[]"); }
    catch { return []; }
  });

  // Keep the calendar in sync with events created on the Create Event page.
  useEffect(() => {
    const refreshCustomEvents = () => {
      try { setCustomEvents(JSON.parse(localStorage.getItem("customEvents") || "[]")); }
      catch { setCustomEvents([]); }
    };
    window.addEventListener("storage", refreshCustomEvents);
    window.addEventListener("focus", refreshCustomEvents);
    window.addEventListener("eventora:events-updated", refreshCustomEvents);
    return () => {
      window.removeEventListener("storage", refreshCustomEvents);
      window.removeEventListener("focus", refreshCustomEvents);
      window.removeEventListener("eventora:events-updated", refreshCustomEvents);
    };
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const previousMonthDays = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({
        day: previousMonthDays - i,
        currentMonth: false,
        date: new Date(year, month - 1, previousMonthDays - i),
      });
    }

    for (let day = 1; day <= totalDays; day++) {
      cells.push({
        day,
        currentMonth: true,
        date: new Date(year, month, day),
      });
    }

    let nextDay = 1;
    while (cells.length < 42) {
      cells.push({
        day: nextDay,
        currentMonth: false,
        date: new Date(year, month + 1, nextDay),
      });
      nextDay++;
    }

    return cells;
  }, [year, month]);

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const categoryIcon = (category = "") => {
    const normalized = category.toLowerCase();
    if (normalized.includes("music")) return Music2;
    if (normalized.includes("tech") || normalized.includes("workshop")) return Sparkles;
    if (normalized.includes("food")) return Users;
    return PartyPopper;
  };

  const createdEvents = customEvents.map((event) => ({
    ...event,
    date: event.dateISO || (event.date && /^\d{4}-\d{2}-\d{2}$/.test(event.date) ? event.date : ""),
    time: event.time || "Time not specified",
    location: event.location || [event.venue, event.city].filter(Boolean).join(", ") || "Location not specified",
    color: event.color || "purple",
    icon: categoryIcon(event.category),
  })).filter((event) => event.date);
  const allEvents = [...events.map((event) => ({ ...event, icon: event.icon || categoryIcon(event.category) })), ...createdEvents];
  const filteredEvents = allEvents.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const selectedEvents = filteredEvents.filter(
    (event) => event.date === selectedDate
  );

  const upcomingEvents = [...filteredEvents]
    .filter((event) => event.date >= todayString)
    .sort((a, b) => a.date.localeCompare(b.date));

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
  };

  const goToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(todayString);
  };

  return (
    <div className="calendar-page">
      <style>{`
        .calendar-page {
          min-height: calc(100vh - 72px);
          background:
            radial-gradient(circle at 10% 0%, rgba(124, 58, 237, .08), transparent 28%),
            radial-gradient(circle at 90% 10%, rgba(236, 72, 153, .07), transparent 25%),
            #0b0b0f;
          padding: 42px 28px 70px;
          color: #111827;
        }

        .calendar-container {
          max-width: 1380px;
          margin: 0 auto;
        }

        .calendar-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          margin-bottom: 28px;
        }

        .calendar-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid #e8e9f1;
          color: #6d28d9;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .04em;
          text-transform: uppercase;
          box-shadow: 0 5px 18px rgba(17,24,39,.04);
        }

        .calendar-title {
          margin: 13px 0 7px;
          font-size: clamp(32px, 4vw, 50px);
          line-height: 1.02;
          letter-spacing: -.045em;
          font-weight: 900;
        }

        .calendar-subtitle {
          margin: 0;
          max-width: 650px;
          color: #6b7280;
          font-size: 15px;
          line-height: 1.7;
        }

        .calendar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .calendar-search {
          height: 44px;
          width: 230px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 13px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 13px;
          color: #9ca3af;
        }

        .calendar-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          font-size: 13px;
          color: #111827;
        }

        .calendar-search input::placeholder {
          color: #9ca3af;
        }

        .today-btn {
          height: 44px;
          padding: 0 16px;
          border: 1px solid #e5e7eb;
          background: #fff;
          border-radius: 13px;
          font-weight: 750;
          color: #374151;
          cursor: pointer;
        }

        .calendar-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 350px;
          gap: 22px;
          align-items: start;
        }

        .calendar-card,
        .agenda-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #e7e9f0;
          border-radius: 24px;
          box-shadow: 0 15px 45px rgba(17,24,39,.06);
        }

        .calendar-card {
          overflow: hidden;
        }

        .calendar-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 22px;
          border-bottom: 1px solid #eef0f4;
        }

        .month-heading {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .month-heading h2 {
          margin: 0;
          font-size: 20px;
          letter-spacing: -.02em;
        }

        .month-heading span {
          color: #9ca3af;
          font-size: 13px;
          font-weight: 650;
        }

        .month-controls {
          display: flex;
          gap: 7px;
        }

        .month-btn {
          width: 37px;
          height: 37px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          border: 1px solid #e5e7eb;
          background: #fff;
          cursor: pointer;
          color: #374151;
          transition: .2s ease;
        }

        .month-btn:hover {
          border-color: #c4b5fd;
          color: #6d28d9;
          transform: translateY(-1px);
        }

        .weekdays,
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
        }

        .weekday {
          padding: 14px 8px;
          text-align: center;
          color: #9ca3af;
          font-size: 11px;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: .08em;
          border-bottom: 1px solid #eef0f4;
        }

        .calendar-day {
          min-height: 105px;
          padding: 10px;
          border-right: 1px solid #f0f1f5;
          border-bottom: 1px solid #f0f1f5;
          cursor: pointer;
          transition: .18s ease;
          position: relative;
        }

        .calendar-day:nth-child(7n) {
          border-right: 0;
        }

        .calendar-day:hover {
          background: #faf9ff;
        }

        .calendar-day.muted {
          background: #fafafa;
          color: #c7cbd3;
        }

        .calendar-day.selected {
          background: #f5f3ff;
        }

        .day-number {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .calendar-day.selected .day-number {
          background: #111827;
          color: #fff;
        }

        .day-event {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 7px;
          margin-top: 5px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 750;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .day-event.purple {
          background: #ede9fe;
          color: #6d28d9;
        }

        .day-event.pink {
          background: #fce7f3;
          color: #be185d;
        }

        .day-event.orange {
          background: #ffedd5;
          color: #c2410c;
        }

        .day-event.green {
          background: #dcfce7;
          color: #15803d;
        }

        .event-dot {
          width: 5px;
          height: 5px;
          flex: 0 0 5px;
          border-radius: 50%;
          background: currentColor;
        }

        .agenda-card {
          padding: 22px;
        }

        .agenda-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .agenda-header h3 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -.025em;
        }

        .agenda-count {
          padding: 5px 9px;
          border-radius: 999px;
          background: #f3f4f6;
          color: #6b7280;
          font-size: 11px;
          font-weight: 800;
        }

        .selected-label {
          margin: 0 0 12px;
          color: #8b5cf6;
          font-size: 11px;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .selected-date {
          margin: 0 0 15px;
          font-size: 25px;
          letter-spacing: -.04em;
          font-weight: 900;
        }

        .agenda-event {
          padding: 15px;
          border: 1px solid #eceef3;
          border-radius: 17px;
          margin-bottom: 11px;
          transition: .2s ease;
        }

        .agenda-event:hover {
          border-color: #d8d1ff;
          box-shadow: 0 10px 25px rgba(79,70,229,.08);
        }

        .agenda-event-top {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .event-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          flex: 0 0 40px;
        }

        .event-icon.purple { background:#ede9fe; color:#7c3aed; }
        .event-icon.pink { background:#fce7f3; color:#db2777; }
        .event-icon.orange { background:#ffedd5; color:#ea580c; }
        .event-icon.green { background:#dcfce7; color:#16a34a; }

        .agenda-event h4 {
          margin: 0 0 4px;
          font-size: 14px;
          line-height: 1.35;
        }

        .event-category {
          color: #9ca3af;
          font-size: 11px;
          font-weight: 650;
        }

        .event-meta {
          display: grid;
          gap: 7px;
          margin-top: 13px;
          padding-top: 12px;
          border-top: 1px solid #f0f1f5;
        }

        .event-meta-row {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #6b7280;
          font-size: 11px;
          font-weight: 600;
        }

        .agenda-empty {
          padding: 30px 10px;
          text-align: center;
          color: #9ca3af;
        }

        .agenda-empty-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          margin: 0 auto 10px;
          border-radius: 14px;
          background: #f3f4f6;
        }

        .upcoming-section {
          margin-top: 22px;
        }

        .upcoming-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .upcoming-header h3 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -.025em;
        }

        .upcoming-header a {
          color: #6d28d9;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
        }

        .upcoming-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .upcoming-card {
          display: flex;
          gap: 13px;
          padding: 16px;
          background: #fff;
          border: 1px solid #e7e9ef;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(17,24,39,.04);
        }

        .date-box {
          width: 52px;
          height: 58px;
          flex: 0 0 52px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: #f5f3ff;
          color: #6d28d9;
        }

        .date-box strong {
          font-size: 19px;
          line-height: 1;
        }

        .date-box span {
          margin-top: 4px;
          font-size: 9px;
          font-weight: 850;
          text-transform: uppercase;
        }

        .upcoming-card h4 {
          margin: 1px 0 5px;
          font-size: 13px;
          line-height: 1.35;
        }

        .upcoming-card p {
          margin: 0;
          color: #9ca3af;
          font-size: 10px;
          line-height: 1.5;
        }

        @media (max-width: 1050px) {
          .calendar-layout {
            grid-template-columns: 1fr;
          }

          .upcoming-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 760px) {
          .calendar-page {
            padding: 28px 14px 50px;
          }

          .calendar-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .calendar-actions {
            width: 100%;
          }

          .calendar-search {
            flex: 1;
            width: auto;
          }

          .calendar-card {
            border-radius: 18px;
          }

          .calendar-toolbar {
            padding: 16px;
          }

          .calendar-day {
            min-height: 75px;
            padding: 6px;
          }

          .day-event {
            padding: 4px;
            font-size: 0;
            justify-content: center;
          }

          .event-dot {
            width: 6px;
            height: 6px;
            flex-basis: 6px;
          }

          .weekday {
            font-size: 9px;
            padding: 11px 2px;
          }

          .upcoming-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .calendar-title {
            font-size: 34px;
          }

          .today-btn {
            display: none;
          }

          .month-heading span {
            display: none;
          }

          .calendar-day {
            min-height: 63px;
          }

          .day-number {
            width: 25px;
            height: 25px;
            font-size: 11px;
          }

          .agenda-card {
            padding: 17px;
          }
        }
      `}</style>

      <div className="calendar-container">
        <div className="calendar-top">
          <div>
            <div className="calendar-kicker">
              <CalendarDays size={13} />
              Your event calendar
            </div>

            <h1 className="calendar-title">Plan your moments.</h1>

            <p className="calendar-subtitle">
              Keep your upcoming experiences organized and never miss an event
              worth remembering.
            </p>
          </div>

          <div className="calendar-actions">
            <label className="calendar-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events..."
              />
            </label>

            <button className="today-btn" onClick={goToday}>
              Today
            </button>
          </div>
        </div>

        <div className="calendar-layout">
          <section className="calendar-card">
            <div className="calendar-toolbar">
              <div className="month-heading">
                <h2>
                  {monthNames[month]} {year}
                </h2>
                <span>{filteredEvents.length} events</span>
              </div>

              <div className="month-controls">
                <button
                  className="month-btn"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                >
                  <ArrowLeft size={17} />
                </button>

                <button
                  className="month-btn"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>

            <div className="weekdays">
              {weekdays.map((day) => (
                <div className="weekday" key={day}>
                  {day}
                </div>
              ))}
            </div>

            <div className="calendar-grid">
              {days.map((item, index) => {
                const dateString = formatDate(item.date);

                const dayEvents = filteredEvents.filter(
                  (event) => event.date === dateString
                );

                const isSelected = dateString === selectedDate;

                return (
                  <div
                    key={index}
                    className={`calendar-day ${
                      item.currentMonth ? "" : "muted"
                    } ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedDate(dateString)}
                  >
                    <div className="day-number">{item.day}</div>

                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`day-event ${event.color}`}
                        title={event.title}
                      >
                        <span className="event-dot" />
                        <span>{event.title}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="agenda-card">
            <div className="agenda-header">
              <h3>Selected day</h3>
              <span className="agenda-count">
                {selectedEvents.length} event
                {selectedEvents.length !== 1 ? "s" : ""}
              </span>
            </div>

            <p className="selected-label">Your schedule</p>

            <h2 className="selected-date">
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </h2>

            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => {
                const Icon = event.icon;

                return (
                  <div className="agenda-event" key={event.id}>
                    <div className="agenda-event-top">
                      <div className={`event-icon ${event.color}`}>
                        <Icon size={18} />
                      </div>

                      <div>
                        <h4>{event.title}</h4>
                        <span className="event-category">
                          {event.category}
                        </span>
                      </div>
                    </div>

                    <div className="event-meta">
                      <div className="event-meta-row">
                        <Clock3 size={13} />
                        {event.time}
                      </div>

                      <div className="event-meta-row">
                        <MapPin size={13} />
                        {event.location}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="agenda-empty">
                <div className="agenda-empty-icon">
                  <CalendarDays size={20} />
                </div>
                <strong>No events scheduled</strong>
                <p>Pick another date to see your plans.</p>
              </div>
            )}
          </aside>
        </div>

        <section className="upcoming-section">
          <div className="upcoming-header">
            <h3>Upcoming events</h3>
            <Link to="/explore">Explore all →</Link>
          </div>

          <div className="upcoming-grid">
            {upcomingEvents.slice(0, 3).map((event) => {
              const date = new Date(`${event.date}T12:00:00`);

              return (
                <div className="upcoming-card" key={event.id}>
                  <div className="date-box">
                    <strong>{date.getDate()}</strong>
                    <span>
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </div>

                  <div>
                    <h4>{event.title}</h4>
                    <p>
                      {event.time} · {event.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Calendar;