import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function CategoryCard({ name, icon, count }) {
  return (
    <Link
      to={`/explore?category=${encodeURIComponent(name)}`}
      className="category-card"
    >
      <div className="category-icon">{icon}</div>

      <div>
        <h3>{name}</h3>
        <p>{count || "Explore events"}</p>
      </div>

      <ArrowUpRight size={20} />
    </Link>
  );
}

export default CategoryCard;