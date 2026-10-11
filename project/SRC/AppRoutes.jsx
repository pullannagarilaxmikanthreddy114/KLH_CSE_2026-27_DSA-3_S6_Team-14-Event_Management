import { Routes, Route } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";
import MyTickets from "./pages/MyTickets";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import CreateEvent from "./pages/CreateEvent";
import Recommendation from "./pages/Recommendation";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="explore" element={<Explore />} />
        <Route path="event/:id" element={<EventDetails />} />
        <Route path="booking/:id" element={<Booking />} />
        <Route path="tickets" element={<MyTickets />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="create" element={<CreateEvent />} />
        <Route
          path="recommendations"
          element={<Recommendation />}
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;