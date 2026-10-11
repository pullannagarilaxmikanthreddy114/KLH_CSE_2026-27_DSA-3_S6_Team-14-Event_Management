const events = [
  {
    id: 1,
    title: "Hyderabad Tech Summit",
    category: "Technology",
    date: "2026-09-28",
    time: "10:00 AM",
    location: "HICC, Hyderabad",
    price: 499,
    description:
      "A technology conference featuring AI, cloud computing, startups, cybersecurity and the future of digital innovation.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Future Beats Festival",
    category: "Music",
    date: "2026-10-04",
    time: "6:00 PM",
    location: "Gachibowli Stadium",
    price: 799,
    description:
      "An energetic music festival featuring live performances, electronic music and a spectacular evening experience.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "Startup India Connect",
    category: "Business",
    date: "2026-10-12",
    time: "9:30 AM",
    location: "T-Hub, Hyderabad",
    price: 299,
    description:
      "Meet founders, entrepreneurs, investors and students interested in India's startup ecosystem.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 4,
    title: "Designverse 2026",
    category: "Design",
    date: "2026-10-18",
    time: "11:00 AM",
    location: "Hitex Exhibition Centre",
    price: 399,
    description:
      "Explore UI/UX, product design, creative technology and the future of digital experiences.",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: 5,
    title: "AI & Robotics Expo",
    category: "Technology",
    date: "2026-10-25",
    time: "10:00 AM",
    location: "Hitex, Hyderabad",
    price: 599,
    description:
      "Discover robotics, artificial intelligence, automation and emerging technologies.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 6,
    title: "Hyderabad Night Marathon",
    category: "Sports",
    date: "2026-11-01",
    time: "7:00 PM",
    location: "Necklace Road",
    price: 699,
    description:
      "A community running event with multiple distance categories and an exciting night-time atmosphere.",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: 7,
    title: "Creative Photography Walk",
    category: "Arts",
    date: "2026-11-08",
    time: "7:00 AM",
    location: "Charminar, Hyderabad",
    price: 199,
    description:
      "A guided photography walk exploring Hyderabad's architecture, streets and culture.",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
  {
    id: 8,
    title: "Student Innovation Meetup",
    category: "Education",
    date: "2026-11-15",
    time: "10:30 AM",
    location: "University of Hyderabad",
    price: 149,
    description:
      "A student-focused event for ideas, projects, innovation and networking.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
];

export function getAllEvents() {
  let customEvents = [];

  try {
    customEvents = JSON.parse(
      localStorage.getItem("customEvents") || "[]"
    );
  } catch {
    customEvents = [];
  }

  return [...customEvents, ...events];
}

export default events;